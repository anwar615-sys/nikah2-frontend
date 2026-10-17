create or replace function public._require_member(conv uuid) returns public.conversation_members
language plpgsql stable security definer set search_path = public as $$
declare m public.conversation_members;
begin
  select cm.* into m from public.conversation_members cm join public.conversations c on c.id = cm.conversation_id
   where cm.conversation_id = conv and cm.user_id = public._uid() and cm.left_at is null and c.deleted_at is null;
  if not found then perform public._err('NOT_FOUND', 'Conversation not found.'); end if;
  return m;
end $$;

create or replace function public.start_conversation(target uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me public.profiles := public._me(); t public.profiles; conv uuid; used int; cap int;
begin
  if target = me.id then perform public._err('VALIDATION_FAILED', 'You can''t message yourself.'); end if;
  select * into t from public.profiles where id = target;
  if not found or not public._active(t) or public.is_blocked_between(me.id, target) then
    perform public._err('NOT_FOUND', 'This member isn''t available.');
  end if;
  select c.id into conv from public.conversations c
    join public.conversation_members a on a.conversation_id = c.id and a.user_id = me.id
    join public.conversation_members b on b.conversation_id = c.id and b.user_id = target
   where not c.is_group and c.deleted_at is null limit 1;
  if conv is not null then
    if exists (select 1 from public.conversation_members where conversation_id = conv and unmatched_at is not null) then
      perform public._err('FORBIDDEN', 'This conversation was closed.');
    end if;
    return jsonb_build_object('conversationId', conv);
  end if;
  select monthly_new_contacts into cap from public.plans where id = me.plan;
  if cap is not null then
    select count(*) into used from public.conversations
     where created_by = me.id and not is_group and created_at >= date_trunc('month', now());
    if used >= cap then
      perform public._err('CHAT_LIMIT_REACHED', 'You''ve reached your Free plan''s conversation limit. Upgrade to Basic or Premium for unlimited conversations.');
    end if;
  end if;
  insert into public.conversations (created_by) values (me.id) returning id into conv;
  insert into public.conversation_members (conversation_id, user_id) values (conv, me.id), (conv, target);
  return jsonb_build_object('conversationId', conv);
end $$;

create or replace function public._message_json(m public.messages) returns jsonb
language sql stable as $$
  select jsonb_build_object('id', m.id, 'conversationId', m.conversation_id, 'senderId', m.sender_id, 'type', m.type,
    'text', m.text, 'createdAt', m.created_at,
    'mediaPath', case when m.type = 'image' then m.media_path end,
    'timed', case when m.type = 'timed_image' then jsonb_build_object('durationSeconds', coalesce(m.duration_seconds, 5), 'noScreenshot', m.no_screenshot) end);
$$;

create or replace function public._preview(m public.messages) returns text
language sql immutable as $$
  select case m.type when 'text' then left(m.text, 80) when 'image' then '📷 Photo' when 'timed_image' then '⏱ View-once photo'
                     when 'call' then '📞 Call' else coalesce(m.text, '') end;
$$;

create or replace function public.conversations_summary() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(item order by sort_at desc) from (
      select coalesce(c.last_message_at, c.created_at) as sort_at,
        jsonb_build_object(
          'conversationId', c.id,
          'isGroup', c.is_group,
          'memberCount', (select count(*) from public.conversation_members x where x.conversation_id = c.id and x.left_at is null),
          'group', case when c.is_group then jsonb_build_object('name', c.name, 'avatarUrl', null) end,
          'other', case when not c.is_group then (
              select jsonb_build_object('id', o.id, 'displayName', o.name, 'avatarUrl', o.avatar_url, 'age', public._age(o.age_range),
                                        'city', coalesce(o.city, o.location), 'religion', o.religion, 'plan', o.plan)
              from public.profiles o where o.id = public._other_member(c.id, me)) end,
          'presence', case when not c.is_group then (
              select public._presence(o.last_seen_at) from public.profiles o where o.id = public._other_member(c.id, me)) end,
          'lastMessage', (select jsonb_build_object('preview', public._preview(m)) from public.messages m
                           where m.conversation_id = c.id order by m.created_at desc limit 1),
          'unreadCount', (select count(*) from public.messages m
                           where m.conversation_id = c.id and m.sender_id is distinct from me
                             and not exists (select 1 from public.message_reads r where r.message_id = m.id and r.user_id = me))
        ) as item
      from public.conversations c
      join public.conversation_members cm on cm.conversation_id = c.id and cm.user_id = me
      where cm.unmatched_at is null and cm.left_at is null and c.deleted_at is null
        and (c.is_group or not public.is_blocked_between(me, public._other_member(c.id, me)))
    ) s), '[]'::jsonb));
end $$;

create or replace function public.messages_list(conv uuid, lim int default 50) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._me();
  perform public._require_member(conv);
  return jsonb_build_object('items', coalesce((
    select jsonb_agg(public._message_json(m) order by m.created_at desc)
    from public.messages m where m.id in (
      select id from public.messages where conversation_id = conv order by created_at desc limit least(greatest(coalesce(lim, 50), 1), 200))
  ), '[]'::jsonb));
end $$;

create or replace function public.send_message(conv uuid, kind text, body text, media text, dur int, noshot boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me public.profiles := public._me(); mem public.conversation_members; c public.conversations; other uuid; m public.messages;
begin
  mem := public._require_member(conv);
  select * into c from public.conversations where id = conv;
  if exists (select 1 from public.conversation_members where conversation_id = conv and unmatched_at is not null) and not c.is_group then
    perform public._err('FORBIDDEN', 'This conversation was closed.');
  end if;
  if not c.is_group then
    other := public._other_member(conv, me.id);
    if public.is_blocked_between(me.id, other) or (mem.settings->>'blocked')::boolean then
      perform public._err('FORBIDDEN', 'You can''t message this member.');
    end if;
  end if;
  if kind not in ('text','image','timed_image') then perform public._err('VALIDATION_FAILED', 'Unsupported message type.'); end if;
  if kind = 'text' and coalesce(trim(body), '') = '' then perform public._err('VALIDATION_FAILED', 'Message is empty.'); end if;
  if kind in ('image','timed_image') and (media is null or media not like conv::text || '/%') then
    perform public._err('VALIDATION_FAILED', 'Invalid photo.');
  end if;
  if kind = 'timed_image' and me.plan <> 'premium' then
    perform public._err('PLAN_REQUIRED', 'View-once photos are a Premium feature.');
  end if;
  insert into public.messages (conversation_id, sender_id, type, text, media_path, duration_seconds, no_screenshot)
  values (conv, me.id, kind, case when kind = 'text' then left(body, 4000) end, media,
          case when kind = 'timed_image' then least(greatest(coalesce(dur, 5), 1), 60) end, coalesce(noshot, false))
  returning * into m;
  update public.conversations set last_message_at = m.created_at where id = conv;
  return jsonb_build_object('message', public._message_json(m));
end $$;

create or replace function public.mark_read(conv uuid, ids uuid[]) returns void
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  perform public._require_member(conv);
  insert into public.message_reads (message_id, user_id)
  select m.id, me from public.messages m
   where m.conversation_id = conv and m.id = any(ids) and m.sender_id is distinct from me
  on conflict do nothing;
  update public.conversation_members set last_read_at = now() where conversation_id = conv and user_id = me;
end $$;

create or replace function public.conv_settings_get(conv uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public._me();
  return (public._require_member(conv)).settings;
end $$;

create or replace function public.conv_settings_update(conv uuid, patch jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare mem public.conversation_members; k text; clean jsonb := '{}';
begin
  perform public._me();
  mem := public._require_member(conv);
  for k in select jsonb_object_keys(patch) loop
    if k in ('ignoreCalls','ignoreVideoCalls','readReceipts') and jsonb_typeof(patch->k) = 'boolean' then
      clean := clean || jsonb_build_object(k, patch->k);
    end if;
  end loop;
  update public.conversation_members set settings = settings || clean where conversation_id = conv and user_id = mem.user_id;
  return mem.settings || clean;
end $$;

create or replace function public.unmatch(conv uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public._me();
  perform public._require_member(conv);
  if (select is_group from public.conversations where id = conv) then perform public._err('VALIDATION_FAILED', 'Use leave group instead.'); end if;
  update public.conversation_members set unmatched_at = now() where conversation_id = conv;
end $$;

create or replace function public.timed_image_view(mid uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id; m public.messages;
begin
  select * into m from public.messages where id = mid and type = 'timed_image';
  if not found then perform public._err('NOT_FOUND', 'Photo not found.'); end if;
  perform public._require_member(m.conversation_id);
  if m.sender_id <> me then
    if exists (select 1 from public.timed_image_views where message_id = mid and viewer_id = me) then
      perform public._err('TIMED_IMAGE_NOT_ACCESSIBLE', 'Already viewed.');
    end if;
    insert into public.timed_image_views (message_id, viewer_id) values (mid, me);
  end if;
  return jsonb_build_object('path', m.media_path, 'durationSeconds', coalesce(m.duration_seconds, 5));
end $$;

create or replace function public.group_get(gid uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare mem public.conversation_members; c public.conversations;
begin
  perform public._me();
  mem := public._require_member(gid);
  select * into c from public.conversations where id = gid and is_group;
  if not found then perform public._err('NOT_FOUND', 'Group not found.'); end if;
  return jsonb_build_object('id', c.id, 'name', c.name, 'myRole', mem.role, 'members', coalesce((
    select jsonb_agg(jsonb_build_object('id', p.id, 'displayName', p.name, 'avatarUrl', p.avatar_url, 'role', cm.role) order by cm.joined_at)
    from public.conversation_members cm join public.profiles p on p.id = cm.user_id
    where cm.conversation_id = gid and cm.left_at is null), '[]'::jsonb));
end $$;

create or replace function public.group_create(name text, member_ids uuid[]) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me public.profiles := public._me(); gid uuid; uid uuid;
begin
  if me.plan = 'free' then perform public._err('PLAN_REQUIRED', 'Group chats are available on Basic and Premium.'); end if;
  if coalesce(trim(group_create.name), '') = '' then perform public._err('VALIDATION_FAILED', 'Group name is required.'); end if;
  if member_ids is null or array_length(member_ids, 1) is null then perform public._err('VALIDATION_FAILED', 'Add at least one member.'); end if;
  if array_length(member_ids, 1) > 49 then perform public._err('VALIDATION_FAILED', 'Groups can have up to 50 members.'); end if;
  insert into public.conversations (is_group, name, created_by) values (true, left(trim(group_create.name), 60), me.id) returning id into gid;
  insert into public.conversation_members (conversation_id, user_id, role) values (gid, me.id, 'admin');
  foreach uid in array member_ids loop
    if uid <> me.id and exists (select 1 from public.profiles p where p.id = uid and public._active(p))
       and not public.is_blocked_between(me.id, uid) then
      insert into public.conversation_members (conversation_id, user_id) values (gid, uid) on conflict do nothing;
    end if;
  end loop;
  return public.group_get(gid);
end $$;

create or replace function public._require_group_admin(gid uuid) returns void
language plpgsql stable security definer set search_path = public as $$
begin
  if (public._require_member(gid)).role <> 'admin' then perform public._err('FORBIDDEN', 'Only the group admin can do that.'); end if;
  if not exists (select 1 from public.conversations where id = gid and is_group) then perform public._err('NOT_FOUND', 'Group not found.'); end if;
end $$;

create or replace function public.group_update(gid uuid, name text) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform public._me();
  perform public._require_group_admin(gid);
  if coalesce(trim(group_update.name), '') = '' then perform public._err('VALIDATION_FAILED', 'Group name is required.'); end if;
  update public.conversations set name = left(trim(group_update.name), 60) where id = gid;
  return public.group_get(gid);
end $$;

-- Groups and memberships are soft-removed (marked, not erased).
create or replace function public.group_delete(gid uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public._me();
  perform public._require_group_admin(gid);
  update public.conversations set deleted_at = now() where id = gid;
end $$;

create or replace function public.group_add_member(gid uuid, uid uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  perform public._require_group_admin(gid);
  if not exists (select 1 from public.profiles p where p.id = uid and public._active(p)) or public.is_blocked_between(me, uid) then
    perform public._err('NOT_FOUND', 'This member isn''t available.');
  end if;
  insert into public.conversation_members (conversation_id, user_id) values (gid, uid)
  on conflict (conversation_id, user_id) do update set left_at = null, joined_at = now(), role = 'member';
  return public.group_get(gid);
end $$;

create or replace function public.group_remove_member(gid uuid, uid uuid) returns void
language plpgsql security definer set search_path = public as $$
declare me uuid := (public._me()).id;
begin
  if uid <> me then perform public._require_group_admin(gid); else perform public._require_member(gid); end if;
  update public.conversation_members set left_at = now() where conversation_id = gid and user_id = uid and left_at is null;
  if not exists (select 1 from public.conversation_members where conversation_id = gid and left_at is null) then
    update public.conversations set deleted_at = now() where id = gid;
  elsif not exists (select 1 from public.conversation_members where conversation_id = gid and role = 'admin' and left_at is null) then
    update public.conversation_members set role = 'admin'
     where conversation_id = gid and user_id = (select user_id from public.conversation_members
                                                 where conversation_id = gid and left_at is null order by joined_at limit 1);
  end if;
end $$;
