alter table public.conversations add column deleted_at timestamptz;
alter table public.conversation_members add column left_at timestamptz;

create or replace function public.is_member(conv uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.conversation_members cm join public.conversations c on c.id = cm.conversation_id
                 where cm.conversation_id = conv and cm.user_id = auth.uid() and cm.left_at is null and c.deleted_at is null);
$$;
