-- Admins see message content only through admin_report_context (a reported message or conversation),
-- never by reading the tables directly.
alter policy messages_read on public.messages using (public.is_member(conversation_id));
alter policy conversations_read on public.conversations using (public.is_member(id));
alter policy members_read on public.conversation_members using (public.is_member(conversation_id));
