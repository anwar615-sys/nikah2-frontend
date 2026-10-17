create or replace function public._other_member(conv uuid, me uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select user_id from public.conversation_members where conversation_id = conv and user_id <> me limit 1;
$$;
