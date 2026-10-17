-- Nikha2 public beta: core schema, security rules and trusted functions.
-- Spec: docs/superpowers/specs/2026-10-18-public-beta-design.md
-- Every table has row-level security ON. Members can only do what a policy
-- or a trusted (security definer) function below allows.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- admins
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- no policies: invisible through the API; managed by the developer in SQL.

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------- plans
create table public.plans (
  id text primary key check (id in ('free','basic','premium')),
  name text not null,
  price_cents int not null,
  currency text not null default 'USD',
  period text,
  features text[] not null default '{}',
  monthly_new_contacts int,          -- null = unlimited
  calls_per_contact int,             -- 0 = none, null = unlimited
  ai_match boolean not null default false,
  view_once boolean not null default false,
  sort int not null
);
alter table public.plans enable row level security;
create policy plans_read on public.plans for select using (true);

insert into public.plans values
 ('free','Free',0,'USD',null,array['Unlimited Explore','Message up to 3 new contacts per month','View and receive photos'],3,0,false,false,1),
 ('basic','Basic',3000,'USD','month',array['Unlimited messaging','Voice & video: 2 calls per contact each month','Basic badge'],null,2,false,false,2),
 ('premium','Premium',10000,'USD','month',array['Unlimited messaging and calls','AI-Based Match','Send view-once photos','See member ID and phone (subject to their privacy)','Premium badge'],null,null,true,true,3);

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  account_number bigint generated always as identity (start with 10001) unique,
  name text not null default '',
  username text unique check (username is null or username ~ '^[a-z0-9_.]{3,30}$'),
  email text,
  phone_number text,
  country_code text,
  gender text check (gender in ('man','woman','other','prefer_not_to_say')),
  nationality text,
  location text,
  city text,
  religion text,
  age_range text,
  has_kids text,
  bio text not null default '',
  hobbies text[] not null default '{}',
  avatar_url text,
  contact_visibility text not null default 'hidden' check (contact_visibility in ('hidden','premium_only','everyone')),
  plan text not null default 'free' references public.plans(id),
  plan_renews_at timestamptz,
  verification_status text not null default 'none' check (verification_status in ('none','pending','verified')),
  blocked boolean not null default false,
  suspended_until timestamptz,
  suspend_reason text,
  signup_method text not null default 'local',
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create index profiles_explore_idx on public.profiles (gender, religion, age_range, nationality);
create policy profiles_read_own on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_update_own on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Members may not change protected columns. Trusted functions set
-- nikha2.trusted = 'on' for the duration of their transaction.
create or replace function public.guard_profile_columns() returns trigger
language plpgsql as $$
begin
  if coalesce(current_setting('nikha2.trusted', true), '') = 'on' or public.is_admin() then
    new.updated_at := now();
    return new;
  end if;
  if new.plan is distinct from old.plan
     or new.plan_renews_at is distinct from old.plan_renews_at
     or new.verification_status is distinct from old.verification_status
     or new.blocked is distinct from old.blocked
     or new.suspended_until is distinct from old.suspended_until
     or new.suspend_reason is distinct from old.suspend_reason
     or new.account_number is distinct from old.account_number
     or new.email is distinct from old.email
     or new.signup_method is distinct from old.signup_method
     or (old.username is not null and new.username is distinct from old.username) then
    raise exception 'FORBIDDEN: protected profile field' using errcode = '42501';
  end if;
  new.updated_at := now();
  return new;
end $$;
create trigger profiles_guard before update on public.profiles
  for each row execute function public.guard_profile_columns();

-- New auth user -> profile + consent record (fields come from signup metadata).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles (id, email, name, username, gender, nationality, location, religion,
                               phone_number, country_code, has_kids, age_range, signup_method)
  values (new.id, new.email, coalesce(m->>'name',''), nullif(lower(m->>'username'),''), m->>'gender',
          m->>'nationality', m->>'location', m->>'religion', m->>'phoneNumber', m->>'countryCode',
          m->>'hasKids', m->>'ageRange', coalesce(m->>'signupMethod','local'));
  if (m->>'acceptTerms') = 'true' then
    insert into public.consents (user_id, kind, version) values
      (new.id, 'terms', coalesce(m->>'termsVersion','beta-1')),
      (new.id, 'privacy', coalesce(m->>'termsVersion','beta-1'));
    if (m->>'sensitiveConsent') = 'true' then
      insert into public.consents (user_id, kind, version) values (new.id, 'sensitive_data', coalesce(m->>'termsVersion','beta-1'));
    end if;
  end if;
  return new;
end $$;

-- ---------------------------------------------------------------- consents
create table public.consents (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('terms','privacy','sensitive_data','cookies')),
  version text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);
alter table public.consents enable row level security;
create policy consents_read on public.consents for select using (user_id = auth.uid() or public.is_admin());
create policy consents_insert_own on public.consents for insert with check (user_id = auth.uid());

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- blocks
create table public.blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);
alter table public.blocks enable row level security;
create policy blocks_own on public.blocks for all using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());

create or replace function public.is_blocked_between(a uuid, b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.blocks where (blocker_id = a and blocked_id = b) or (blocker_id = b and blocked_id = a));
$$;

-- ---------------------------------------------------------------- conversations
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  name text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  last_message_at timestamptz
);
create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('admin','member')),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  settings jsonb not null default '{"ignoreCalls":false,"ignoreVideoCalls":false,"readReceipts":true,"blocked":false}',
  unmatched_at timestamptz,
  primary key (conversation_id, user_id)
);
create index conversation_members_user_idx on public.conversation_members (user_id);
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;

create or replace function public.is_member(conv uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.conversation_members where conversation_id = conv and user_id = auth.uid());
$$;

create policy conversations_read on public.conversations for select using (public.is_member(id) or public.is_admin());
create policy members_read on public.conversation_members for select using (public.is_member(conversation_id) or public.is_admin());
create policy members_update_own on public.conversation_members for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------- messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  type text not null check (type in ('text','image','timed_image','call','system')),
  text text check (char_length(text) <= 4000),
  media_path text,
  duration_seconds int check (duration_seconds is null or duration_seconds between 1 and 60),
  no_screenshot boolean not null default false,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);
create index messages_conv_idx on public.messages (conversation_id, created_at desc);
alter table public.messages enable row level security;
create policy messages_read on public.messages for select using (public.is_member(conversation_id) or public.is_admin());
-- Members insert directly only through send_message() (below), which checks limits/blocks.

create table public.message_reads (
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (message_id, user_id)
);
alter table public.message_reads enable row level security;
create policy reads_read on public.message_reads for select using (
  exists (select 1 from public.messages m where m.id = message_id and public.is_member(m.conversation_id)));
create policy reads_insert_own on public.message_reads for insert with check (
  user_id = auth.uid() and exists (select 1 from public.messages m where m.id = message_id and public.is_member(m.conversation_id)));

create table public.timed_image_views (
  message_id uuid not null references public.messages(id) on delete cascade,
  viewer_id uuid not null references public.profiles(id) on delete cascade,
  first_viewed_at timestamptz not null default now(),
  primary key (message_id, viewer_id)
);
alter table public.timed_image_views enable row level security;
create policy tiv_read_own on public.timed_image_views for select using (viewer_id = auth.uid());

-- ---------------------------------------------------------------- reports, verification
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  target_type text not null check (target_type in ('user','message','conversation')),
  target_id uuid not null,
  reason text not null check (reason in ('harassment','fake_profile','inappropriate_content','spam','safety_concern','other')),
  details text check (char_length(details) <= 2000),
  status text not null default 'open' check (status in ('open','reviewed','dismissed','actioned')),
  created_at timestamptz not null default now()
);
alter table public.reports enable row level security;
create policy reports_insert_own on public.reports for insert with check (reporter_id = auth.uid());
create policy reports_admin_read on public.reports for select using (public.is_admin() or reporter_id = auth.uid());

create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  media_paths text[] not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.verification_requests enable row level security;
create policy vr_read on public.verification_requests for select using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------- payments, audit
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  plan text not null references public.plans(id),
  amount_cents int not null,
  currency text not null default 'USD',
  status text not null check (status in ('succeeded','failed')),
  provider text not null default 'beta',
  created_at timestamptz not null default now()
);
alter table public.payments enable row level security;
create policy payments_read on public.payments for select using (user_id = auth.uid() or public.is_admin());

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  action text not null,
  target_type text,
  target_id text,
  details jsonb,
  created_at timestamptz not null default now()
);
alter table public.audit_log enable row level security;
create policy audit_admin_read on public.audit_log for select using (public.is_admin());
create or replace function public.audit_log_immutable() returns trigger language plpgsql as $$
begin raise exception 'audit log is append-only'; end $$;
create trigger audit_log_no_change before update or delete on public.audit_log
  for each row execute function public.audit_log_immutable();

-- ---------------------------------------------------------------- realtime
alter publication supabase_realtime add table public.messages, public.message_reads, public.conversation_members;
