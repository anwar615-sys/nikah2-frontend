-- Members may remove their own profile and verification photos (used when they delete their account).
create policy avatars_owner_remove on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy verification_owner_remove on storage.objects for delete to authenticated
  using (bucket_id = 'verification' and (storage.foldername(name))[1] = auth.uid()::text);

-- A 1-to-1 chat whose other member closed their account is hidden and can't receive messages.
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
        and (c.is_group or public._other_member(c.id, me) is not null)
        and (c.is_group or not public.is_blocked_between(me, public._other_member(c.id, me)))
    ) s), '[]'::jsonb));
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
    if other is null then perform public._err('FORBIDDEN', 'This member has closed their account.'); end if;
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
