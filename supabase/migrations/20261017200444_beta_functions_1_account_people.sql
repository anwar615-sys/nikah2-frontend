create or replace function public._err(code text, msg text) returns void
language plpgsql as $$ begin raise exception '%: %', code, msg; end $$;

create or replace function public._uid() returns uuid
language plpgsql stable as $$
begin
  if auth.uid() is null then perform public._err('AUTH_REQUIRED', 'Please sign in.'); end if;
  return auth.uid();
end $$;

create or replace function public._trusted() returns void
language plpgsql as $$ begin perform set_config('nikha2.trusted', 'on', true); end $$;

create or replace function public._age(r text) returns int
language sql immutable as $$
  select case r when '18-25' then 22 when '26-35' then 30 when '36-45' then 40
                when '46-55' then 50 when '56-65' then 60 when '65+' then 67 else null end;
$$;

create or replace function public._presence(ts timestamptz) returns text
language sql stable as $$ select case when ts > now() - interval '2 minutes' then 'online' else 'offline' end; $$;

create or replace function public._complete(p public.profiles) returns boolean
language sql immutable as $$
  select p.gender is not null and p.nationality is not null and p.religion is not null
     and p.age_range is not null and p.has_kids is not null and p.location is not null;
$$;

create or replace function public._active(p public.profiles) returns boolean
language sql stable as $$ select not p.blocked and (p.suspended_until is null or p.suspended_until < now()); $$;

create or replace function public._me() returns public.profiles
language plpgsql stable security definer set search_path = public as $$
declare p public.profiles;
begin
  select * into p from public.profiles where id = public._uid();
  if not found then perform public._err('AUTH_REQUIRED', 'Account not found.'); end if;
  if p.blocked then perform public._err('FORBIDDEN', 'This account has been blocked. Contact support.'); end if;
  if p.suspended_until is not null and p.suspended_until > now() then
    perform public._err('FORBIDDEN', 'This account is suspended until ' || to_char(p.suspended_until, 'DD Mon YYYY HH24:MI') || ' UTC.');
  end if;
  return p;
end $$;

create or replace function public._audit(action text, ttype text, tid text, details jsonb default null) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.audit_log (actor_id, actor_email, action, target_type, target_id, details)
  values (auth.uid(), (select email from auth.users where id = auth.uid()), action, ttype, tid, details);
end $$;

create or replace function public._require_admin() returns void
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then perform public._err('FORBIDDEN', 'Admins only.'); end if;
end $$;

create or replace function public._person(p public.profiles, viewer uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare vplan text; contact jsonb;
begin
  if viewer is null then
    return jsonb_build_object('id', p.id, 'displayName', split_part(p.name, ' ', 1), 'age', public._age(p.age_range),
      'gender', p.gender, 'onlineStatus', public._presence(p.last_seen_at), 'verified', p.verification_status = 'verified',
      'plan', p.plan, 'religion', p.religion, 'nationality', p.nationality, 'location', p.location, 'city', p.city,
      'hasKids', p.has_kids, 'avatarUrl', null, 'bio', '', 'hobbies', '[]'::jsonb,
      'contact', jsonb_build_object('isPrivate', true));
  end if;
  select plan into vplan from public.profiles where id = viewer;
  if p.id = viewer or p.contact_visibility = 'everyone' or (p.contact_visibility = 'premium_only' and vplan = 'premium') then
    contact := jsonb_build_object('username', p.username, 'email', p.email, 'phoneNumber',
      nullif(coalesce(p.country_code, '') || ' ' || coalesce(p.phone_number, ''), ' '), 'isPrivate', false);
  elsif p.contact_visibility = 'hidden' then
    contact := jsonb_build_object('isPrivate', true);
  else
    contact := jsonb_build_object('isPrivate', false);
  end if;
  return jsonb_build_object('id', p.id, 'displayName', p.name, 'age', public._age(p.age_range), 'gender', p.gender,
    'onlineStatus', public._presence(p.last_seen_at), 'verified', p.verification_status = 'verified', 'plan', p.plan,
    'religion', p.religion, 'nationality', p.nationality, 'location', p.location, 'city', p.city, 'hasKids', p.has_kids,
    'avatarUrl', p.avatar_url, 'bio', p.bio, 'hobbies', to_jsonb(p.hobbies), 'contact', contact);
end $$;

create or replace function public.me_get() returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles := public._me();
begin
  return jsonb_build_object('id', p.id, 'accountNumber', p.account_number, 'name', p.name, 'email', p.email,
    'phoneNumber', p.phone_number, 'countryCode', p.country_code, 'username', p.username, 'hasPassword', true,
    'role', case when public.is_admin() then 'admin' else 'user' end,
    'profileComplete', public._complete(p), 'verificationStatus', p.verification_status,
    'membership', jsonb_build_object('plan', p.plan, 'status', case when p.plan = 'free' then 'none' else 'active' end, 'renewsAt', p.plan_renews_at),
    'profile', jsonb_build_object('gender', p.gender, 'nationality', p.nationality, 'religion', p.religion,
      'ageRange', p.age_range, 'hasKids', p.has_kids, 'location', p.location, 'city', p.city, 'bio', p.bio,
      'hobbies', to_jsonb(p.hobbies), 'avatarUrl', p.avatar_url, 'contactVisibility', p.contact_visibility),
    'createdAt', p.created_at);
end $$;

create or replace function public.check_username(u text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if u is null or u !~ '^[a-z0-9_.]{3,30}$' then return jsonb_build_object('available', false, 'reason', 'invalid_format'); end if;
  if exists (select 1 from public.profiles where username = u) then return jsonb_build_object('available', false, 'reason', 'taken'); end if;
  return jsonb_build_object('available', true);
end $$;

create or replace function public.me_update(patch jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles := public._me(); u text;
begin
  if patch ? 'email' and lower(patch->>'email') is distinct from lower(p.email) then
    perform public._err('VALIDATION_FAILED', 'Email address can''t be changed during the beta.');
  end if;
  if patch ? 'username' and p.username is null then
    u := lower(patch->>'username');
    if (public.check_username(u)->>'available')::boolean is not true then
      perform public._err('VALIDATION_FAILED', 'Please choose a different, available username.');
    end if;
  end if;
  update public.profiles set
    name = coalesce(nullif(left(trim(patch->>'name'), 80), ''), name),
    phone_number = case when patch ? 'phoneNumber' then left(regexp_replace(patch->>'phoneNumber', '[^0-9]', '', 'g'), 15) else phone_number end,
    country_code = case when patch ? 'countryCode' then left(patch->>'countryCode', 6) else country_code end,
    username = coalesce(username, u)
  where id = p.id;
  return public.me_get();
end $$;

create or replace function public.me_profile_update(patch jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles := public._me(); av text;
begin
  av := patch->>'avatarUrl';
  if av is not null and av <> '' and position(('/storage/v1/object/public/avatars/' || p.id::text || '/') in av) = 0 then
    perform public._err('VALIDATION_FAILED', 'Invalid photo.');
  end if;
  if patch ? 'contactVisibility' and patch->>'contactVisibility' not in ('hidden','premium_only','everyone') then
    perform public._err('VALIDATION_FAILED', 'Invalid contact visibility.');
  end if;
  if patch ? 'gender' and patch->>'gender' not in ('man','woman','other','prefer_not_to_say') then
    perform public._err('VALIDATION_FAILED', 'Invalid gender.');
  end if;
  update public.profiles set
    gender = case when patch ? 'gender' then patch->>'gender' else gender end,
    nationality = case when patch ? 'nationality' then left(patch->>'nationality', 60) else nationality end,
    religion = case when patch ? 'religion' then left(patch->>'religion', 40) else religion end,
    age_range = case when patch ? 'ageRange' then left(patch->>'ageRange', 10) else age_range end,
    has_kids = case when patch ? 'hasKids' then left(patch->>'hasKids', 20) else has_kids end,
    location = case when patch ? 'location' then left(patch->>'location', 80) else location end,
    city = case when patch ? 'city' then left(patch->>'city', 80) else city end,
    bio = case when patch ? 'bio' then left(coalesce(patch->>'bio', ''), 1000) else bio end,
    hobbies = case when patch ? 'hobbies' then
      (select coalesce(array_agg(left(h, 40)), '{}') from (select jsonb_array_elements_text(patch->'hobbies') h limit 20) s)
      else hobbies end,
    avatar_url = case when patch ? 'avatarUrl' then nullif(av, '') else avatar_url end,
    contact_visibility = case when patch ? 'contactVisibility' then patch->>'contactVisibility' else contact_visibility end
  where id = p.id;
  return public.me_get();
end $$;

create or replace function public.me_delete() returns void
language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := public._uid();
begin
  delete from auth.users where id = uid;
end $$;

create or replace function public.touch() returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null then update public.profiles set last_seen_at = now() where id = auth.uid(); end if;
end $$;

create or replace function public.verification_request(paths text[]) returns jsonb
language plpgsql security definer set search_path = public as $$
declare p public.profiles := public._me(); x text;
begin
  if paths is null or array_length(paths, 1) is null or array_length(paths, 1) > 2 then
    perform public._err('VALIDATION_FAILED', 'Upload one or two photos.');
  end if;
  foreach x in array paths loop
    if x not like p.id::text || '/%' then perform public._err('VALIDATION_FAILED', 'Invalid photo.'); end if;
  end loop;
  insert into public.verification_requests (user_id, media_paths) values (p.id, paths);
  perform public._trusted();
  update public.profiles set verification_status = 'pending' where id = p.id and verification_status <> 'verified';
  return public.me_get();
end $$;

create or replace function public.people_search(f jsonb) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare viewer uuid := auth.uid(); lim int := least(greatest(coalesce((f->>'limit')::int, 50), 1), 50); q text := nullif(trim(f->>'q'), '');
begin
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(public._person(p, viewer) order by (p.last_seen_at > now() - interval '2 minutes') desc, p.last_seen_at desc)
    from public.profiles p where p.id in (
      select p.id from public.profiles p
      where public._active(p) and public._complete(p)
        and (viewer is null or p.id <> viewer)
        and (viewer is null or not public.is_blocked_between(viewer, p.id))
        and (q is null or p.name ilike '%' || q || '%' or p.username ilike '%' || q || '%')
        and (nullif(f->>'ageRange', '') is null or p.age_range = f->>'ageRange')
        and (nullif(f->>'religion', '') is null or p.religion = f->>'religion')
        and (nullif(f->>'nationality', '') is null or p.nationality = f->>'nationality')
        and (nullif(f->>'gender', '') is null or p.gender = f->>'gender')
        and (nullif(f->>'location', '') is null or p.location ilike '%' || (f->>'location') || '%' or p.city ilike '%' || (f->>'location') || '%')
        and (coalesce(f->>'verified', 'false') <> 'true' or p.verification_status = 'verified')
      order by (p.last_seen_at > now() - interval '2 minutes') desc, p.last_seen_at desc
      limit lim
    )), '[]'::jsonb));
end $$;

create or replace function public.person_get(pid uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare p public.profiles; viewer uuid := auth.uid();
begin
  select * into p from public.profiles where id = pid;
  if not found or not public._active(p) or (viewer is not null and public.is_blocked_between(viewer, pid)) then
    perform public._err('NOT_FOUND', 'Profile not found.');
  end if;
  return public._person(p, viewer);
end $$;

create or replace function public.people_ai_match() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare me public.profiles := public._me();
begin
  if me.plan <> 'premium' then perform public._err('PLAN_REQUIRED', 'AI-Based Match is a Premium feature.'); end if;
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(public._person(p, me.id) order by s.score desc, p.last_seen_at desc)
    from public.profiles p join (
      select p.id, (case when p.religion = me.religion then 3 else 0 end)
                + (case when p.nationality = me.nationality then 2 else 0 end)
                + (case when p.location = me.location then 2 else 0 end)
                + (case when abs(coalesce(public._age(p.age_range), 0) - coalesce(public._age(me.age_range), 0)) <= 10 then 2 else 0 end)
                + (case when p.has_kids = me.has_kids then 1 else 0 end)
                + (case when p.verification_status = 'verified' then 1 else 0 end) as score
      from public.profiles p
      where p.id <> me.id and public._active(p) and public._complete(p) and not public.is_blocked_between(me.id, p.id)
        and (me.gender not in ('man','woman') or p.gender = case me.gender when 'man' then 'woman' else 'man' end)
      order by score desc, p.last_seen_at desc limit 20
    ) s on s.id = p.id), '[]'::jsonb));
end $$;
