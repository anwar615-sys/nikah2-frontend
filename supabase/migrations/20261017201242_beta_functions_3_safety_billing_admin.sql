create or replace function public.block_user(uid uuid) returns void
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  if uid = me then perform public._err('VALIDATION_FAILED', 'You can''t block yourself.'); end if;
  insert into public.blocks (blocker_id, blocked_id) values (me, uid) on conflict do nothing;
end $$;

create or replace function public.report_create(t_type text, t_id uuid, reason text, details text) returns void
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  if (select count(*) from public.reports where reporter_id = me and created_at > now() - interval '1 hour') >= 10 then
    perform public._err('RATE_LIMITED', 'Too many reports. Please try again later.');
  end if;
  insert into public.reports (reporter_id, target_type, target_id, reason, details)
  values (me, t_type, t_id, reason, nullif(left(details, 2000), ''));
end $$;

create or replace function public.beta_checkout(plan text, outcome text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me public.profiles := public._me(); pl public.plans;
begin
  select * into pl from public.plans where id = beta_checkout.plan;
  if not found then perform public._err('VALIDATION_FAILED', 'Unknown plan.'); end if;
  perform public._trusted();
  if pl.id = 'free' then
    update public.profiles set plan = 'free', plan_renews_at = null where id = me.id;
    return jsonb_build_object('status', 'succeeded', 'plan', 'free');
  end if;
  if outcome not in ('success','failed') then perform public._err('VALIDATION_FAILED', 'Unknown outcome.'); end if;
  insert into public.payments (user_id, plan, amount_cents, currency, status)
  values (me.id, pl.id, pl.price_cents, pl.currency, case when outcome = 'success' then 'succeeded' else 'failed' end);
  if outcome = 'success' then
    update public.profiles set plan = pl.id, plan_renews_at = now() + interval '30 days' where id = me.id;
    return jsonb_build_object('status', 'succeeded', 'plan', pl.id);
  end if;
  return jsonb_build_object('status', 'failed', 'plan', me.plan);
end $$;

create or replace function public._admin_user_json(p public.profiles) returns jsonb
language sql stable as $$
  select jsonb_build_object('id', p.id, 'accountNumber', p.account_number, 'name', p.name, 'username', p.username, 'email', p.email,
    'verificationStatus', p.verification_status, 'blockedGlobal', p.blocked, 'plan', p.plan, 'createdAt', p.created_at);
$$;

create or replace function public._admin_user_match(p public.profiles, f jsonb) returns boolean
language sql stable as $$
  select (nullif(f->>'verificationStatus','') is null or p.verification_status = f->>'verificationStatus')
     and (nullif(f->>'blocked','') is null or p.blocked = (f->>'blocked')::boolean)
     and (nullif(f->>'nationality','') is null or p.nationality = f->>'nationality')
     and (nullif(f->>'religion','') is null or p.religion = f->>'religion')
     and (nullif(f->>'gender','') is null or p.gender = f->>'gender')
     and (nullif(f->>'city','') is null or p.city ilike '%' || (f->>'city') || '%' or p.location ilike '%' || (f->>'city') || '%')
     and (nullif(f->>'signupMethod','') is null or p.signup_method = f->>'signupMethod')
     and (nullif(f->>'plan','') is null or p.plan = f->>'plan')
     and (nullif(f->>'online','') is null or (public._presence(p.last_seen_at) = 'online') = (f->>'online')::boolean)
     and (nullif(trim(f->>'q'),'') is null or p.name ilike '%'||trim(f->>'q')||'%' or p.email ilike '%'||trim(f->>'q')||'%'
          or p.username ilike '%'||trim(f->>'q')||'%' or p.account_number::text = trim(f->>'q'));
$$;

-- Erase a member's personal details and lock the account (admin "delete").
create or replace function public._erase_user(uid uuid) returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  perform public._trusted();
  update public.profiles set name = 'Deleted member', username = null, email = null, phone_number = null, country_code = null,
    bio = '', hobbies = '{}', avatar_url = null, nationality = null, location = null, city = null, religion = null,
    gender = null, age_range = null, has_kids = null, blocked = true, contact_visibility = 'hidden'
  where id = uid;
  update auth.users set email = 'deleted-' || id::text || '@deleted.invalid', phone = null,
    raw_user_meta_data = '{}'::jsonb, banned_until = 'infinity'
  where id = uid;
end $$;

create or replace function public.admin_analytics() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object(
    'totalUsers', (select count(*) from public.profiles where email is not null),
    'verifiedUsers', (select count(*) from public.profiles where verification_status = 'verified'),
    'activePremiumUsers', (select count(*) from public.profiles where plan = 'premium'),
    'totalConversations', (select count(*) from public.conversations where deleted_at is null),
    'totalMessages', (select count(*) from public.messages),
    'messagesLast7Days', (select count(*) from public.messages where created_at > now() - interval '7 days'));
end $$;

create or replace function public.admin_users(f jsonb) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare lim int := least(greatest(coalesce((f->>'limit')::int, 20), 1), 200); pg int := greatest(coalesce((f->>'page')::int, 1), 1);
begin
  perform public._require_admin();
  return jsonb_build_object(
    'total', (select count(*) from public.profiles p where public._admin_user_match(p, f)),
    'items', coalesce((select jsonb_agg(public._admin_user_json(p) order by p.created_at desc) from public.profiles p
       where p.id in (select p2.id from public.profiles p2 where public._admin_user_match(p2, f)
                      order by p2.created_at desc offset (pg - 1) * lim limit lim)), '[]'::jsonb));
end $$;

create or replace function public.admin_users_flagged() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(jsonb_build_object('id', p.id, 'name', p.name, 'email', p.email, 'createdAt', p.created_at,
      'reasons', case when r.n >= 3 then '["many_reports"]'::jsonb else '["reported"]'::jsonb end) order by r.n desc)
    from public.profiles p
    join (select target_id, count(*) n from public.reports where target_type = 'user' and status = 'open' group by target_id) r on r.target_id = p.id
  ), '[]'::jsonb));
end $$;

create or replace function public.admin_user_get(uid uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare p public.profiles;
begin
  perform public._require_admin();
  select * into p from public.profiles where id = uid;
  if not found then perform public._err('NOT_FOUND', 'User not found.'); end if;
  return public._admin_user_json(p) || jsonb_build_object('phoneNumber', p.phone_number,
    'role', case when exists (select 1 from public.admins where user_id = uid) then 'admin' else 'user' end,
    'oauthProvider', null, 'suspendedUntil', p.suspended_until, 'suspensionReason', p.suspend_reason,
    'membership', jsonb_build_object('plan', p.plan, 'status', case when p.plan = 'free' then 'none' else 'active' end),
    'profile', jsonb_build_object('gender', p.gender, 'ageRange', p.age_range, 'nationality', p.nationality, 'religion', p.religion,
      'hasKids', p.has_kids, 'location', p.location, 'city', p.city, 'bio', p.bio));
end $$;

create or replace function public.admin_user_profile_update(uid uuid, patch jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  update public.profiles set
    nationality = case when patch ? 'nationality' then patch->>'nationality' else nationality end,
    religion = case when patch ? 'religion' then patch->>'religion' else religion end,
    age_range = case when patch ? 'ageRange' then patch->>'ageRange' else age_range end,
    gender = case when patch ? 'gender' then patch->>'gender' else gender end,
    has_kids = case when patch ? 'hasKids' then patch->>'hasKids' else has_kids end,
    location = case when patch ? 'location' then patch->>'location' else location end,
    city = case when patch ? 'city' then patch->>'city' else city end
  where id = uid;
  perform public._audit('user.profile.update', 'user', uid::text, patch);
  return public.admin_user_get(uid);
end $$;

create or replace function public.admin_user_block(uid uuid, blocked boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  update public.profiles set blocked = admin_user_block.blocked where id = uid;
  perform public._audit(case when admin_user_block.blocked then 'user.block' else 'user.unblock' end, 'user', uid::text);
  return jsonb_build_object('blocked', admin_user_block.blocked);
end $$;

create or replace function public.admin_user_suspend(uid uuid, duration text, reason text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare until timestamptz;
begin
  perform public._require_admin();
  if coalesce(trim(reason), '') = '' then perform public._err('VALIDATION_FAILED', 'A reason is required to suspend an account.'); end if;
  until := now() + case duration when '7d' then interval '7 days' when '30d' then interval '30 days' else interval '24 hours' end;
  update public.profiles set suspended_until = until, suspend_reason = left(reason, 500) where id = uid;
  perform public._audit('user.suspend', 'user', uid::text, jsonb_build_object('duration', duration, 'reason', reason));
  return jsonb_build_object('suspendedUntil', until);
end $$;

create or replace function public.admin_user_unsuspend(uid uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  update public.profiles set suspended_until = null, suspend_reason = null where id = uid;
  perform public._audit('user.unsuspend', 'user', uid::text);
end $$;

create or replace function public.admin_user_verification(uid uuid, decision text) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  if decision not in ('approve','reject') then perform public._err('VALIDATION_FAILED', 'Unknown decision.'); end if;
  update public.profiles set verification_status = case when decision = 'approve' then 'verified' else 'none' end where id = uid;
  update public.verification_requests set status = case when decision = 'approve' then 'approved' else 'rejected' end,
         reviewed_by = auth.uid(), reviewed_at = now()
   where user_id = uid and status = 'pending';
  perform public._audit('user.verification.' || decision, 'user', uid::text);
  return jsonb_build_object('verificationStatus', case when decision = 'approve' then 'verified' else 'none' end);
end $$;

create or replace function public.admin_user_delete(uid uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  if uid = auth.uid() then perform public._err('VALIDATION_FAILED', 'You can''t remove your own admin account here.'); end if;
  perform public._audit('user.delete', 'user', uid::text, jsonb_build_object('email', (select email from public.profiles where id = uid)));
  perform public._erase_user(uid);
end $$;

create or replace function public.admin_users_bulk(ids uuid[], action text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare x uuid;
begin
  perform public._require_admin();
  if action = 'block' then update public.profiles set blocked = true where id = any(ids);
  elsif action = 'unblock' then update public.profiles set blocked = false where id = any(ids);
  elsif action = 'verify' then update public.profiles set verification_status = 'verified' where id = any(ids);
  elsif action = 'reject_verification' then update public.profiles set verification_status = 'none' where id = any(ids);
  elsif action = 'delete' then
    foreach x in array ids loop
      if x <> auth.uid() then perform public._erase_user(x); end if;
    end loop;
  else perform public._err('VALIDATION_FAILED', 'Unknown bulk action.');
  end if;
  perform public._audit('users.bulk.' || action, 'user', array_to_string(ids, ','), jsonb_build_object('count', coalesce(array_length(ids, 1), 0)));
  return jsonb_build_object('updated', coalesce(array_length(ids, 1), 0));
end $$;

create or replace function public.admin_user_calls(uid uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object('items', '[]'::jsonb);
end $$;

create or replace function public.admin_verifications() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(jsonb_build_object('id', p.id, 'name', p.name, 'email', p.email, 'mediaIds', to_jsonb(v.media_paths)) order by v.created_at)
    from public.profiles p
    join lateral (select * from public.verification_requests r where r.user_id = p.id and r.status = 'pending' order by created_at desc limit 1) v on true
    where p.verification_status = 'pending'), '[]'::jsonb));
end $$;

create or replace function public.admin_reports(f jsonb) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare lim int := least(greatest(coalesce((f->>'limit')::int, 20), 1), 200); pg int := greatest(coalesce((f->>'page')::int, 1), 1); st text := nullif(f->>'status', '');
begin
  perform public._require_admin();
  return jsonb_build_object(
    'total', (select count(*) from public.reports where st is null or status = st),
    'items', coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'reporter', jsonb_build_object('id', r.reporter_id, 'displayName', coalesce(p.name, 'Deleted member')),
        'targetType', r.target_type, 'targetId', r.target_id, 'reason', r.reason, 'details', r.details, 'status', r.status, 'createdAt', r.created_at) order by r.created_at desc)
      from (select * from public.reports where st is null or status = st order by created_at desc offset (pg - 1) * lim limit lim) r
      left join public.profiles p on p.id = r.reporter_id), '[]'::jsonb));
end $$;

create or replace function public.admin_report_update(rid uuid, status text) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._require_admin();
  if admin_report_update.status not in ('open','reviewed','dismissed','actioned') then perform public._err('VALIDATION_FAILED', 'Unknown status.'); end if;
  update public.reports set status = admin_report_update.status where id = rid;
  if not found then perform public._err('NOT_FOUND', 'Report not found.'); end if;
  perform public._audit('report.status.' || admin_report_update.status, 'report', rid::text);
  return jsonb_build_object('id', rid, 'status', admin_report_update.status);
end $$;

create or replace function public.admin_report_context(rid uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r public.reports; p public.profiles; conv uuid;
begin
  perform public._require_admin();
  select * into r from public.reports where id = rid;
  if not found then perform public._err('NOT_FOUND', 'Report not found.'); end if;
  if r.target_type = 'user' then
    select * into p from public.profiles where id = r.target_id;
    if not found then return jsonb_build_object('found', false, 'targetType', 'user'); end if;
    return jsonb_build_object('found', true, 'targetType', 'user', 'user', jsonb_build_object('name', p.name, 'email', p.email,
      'verificationStatus', p.verification_status, 'profile', jsonb_build_object('bio', p.bio)));
  end if;
  conv := case when r.target_type = 'message' then (select conversation_id from public.messages where id = r.target_id) else r.target_id end;
  if conv is null or not exists (select 1 from public.conversations where id = conv) then
    return jsonb_build_object('found', false, 'targetType', r.target_type);
  end if;
  if r.target_type = 'message' then
    return jsonb_build_object('found', true, 'targetType', 'message', 'messages', coalesce((
      select jsonb_agg(jsonb_build_object('id', m.id, 'senderName', coalesce(s.name, '—'), 'type', m.type, 'text', m.text,
        'isFlagged', m.id = r.target_id, 'createdAt', m.created_at) order by m.created_at)
      from (select * from public.messages where conversation_id = conv order by created_at desc limit 20) m
      left join public.profiles s on s.id = m.sender_id), '[]'::jsonb));
  end if;
  return jsonb_build_object('found', true, 'targetType', 'conversation',
    'members', coalesce((select jsonb_agg(jsonb_build_object('name', s.name)) from public.conversation_members cm join public.profiles s on s.id = cm.user_id where cm.conversation_id = conv), '[]'::jsonb),
    'recentMessages', coalesce((select jsonb_agg(jsonb_build_object('id', m.id, 'senderName', coalesce(s.name, '—'), 'type', m.type, 'text', m.text) order by m.created_at)
      from (select * from public.messages where conversation_id = conv order by created_at desc limit 20) m
      left join public.profiles s on s.id = m.sender_id), '[]'::jsonb));
end $$;

create or replace function public.admin_audit_log(page int, lim int) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare l int := least(greatest(coalesce(lim, 50), 1), 200); pg int := greatest(coalesce(page, 1), 1);
begin
  perform public._require_admin();
  return jsonb_build_object('total', (select count(*) from public.audit_log),
    'items', coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'action', a.action, 'actorEmail', a.actor_email,
      'targetType', a.target_type, 'targetId', a.target_id, 'details', a.details, 'createdAt', a.created_at) order by a.id desc)
      from (select * from public.audit_log order by id desc offset (pg - 1) * l limit l) a), '[]'::jsonb));
end $$;

create or replace function public.admin_subscriptions() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object('stripeConfigured', true, 'byPlan', jsonb_build_object(
    'free', (select count(*) from public.profiles where plan = 'free' and email is not null),
    'basic', (select count(*) from public.profiles where plan = 'basic' and email is not null),
    'premium', (select count(*) from public.profiles where plan = 'premium' and email is not null)));
end $$;

create or replace function public.admin_payments(lim int) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._require_admin();
  return jsonb_build_object('items', coalesce((select jsonb_agg(jsonb_build_object('id', x.id,
      'user', jsonb_build_object('id', x.user_id, 'name', coalesce(p.name, 'Deleted member'), 'email', coalesce(p.email, '—')),
      'plan', x.plan, 'amountCents', x.amount_cents, 'currency', x.currency, 'status', x.status, 'provider', x.provider, 'createdAt', x.created_at)
      order by x.created_at desc)
    from (select * from public.payments order by created_at desc limit least(greatest(coalesce(lim, 30), 1), 200)) x
    left join public.profiles p on p.id = x.user_id), '[]'::jsonb));
end $$;
