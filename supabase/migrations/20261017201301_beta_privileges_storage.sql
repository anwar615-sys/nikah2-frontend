revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated;
grant execute on function public.people_search(jsonb), public.person_get(uuid), public.check_username(text),
  public.is_admin(), public.is_member(uuid), public._person(public.profiles, uuid), public._age(text),
  public._presence(timestamptz), public._complete(public.profiles), public._active(public.profiles),
  public.is_blocked_between(uuid, uuid), public._err(text, text) to anon;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('avatars', 'avatars', true, 5242880, array['image/jpeg','image/png','image/webp']),
  ('chat-media', 'chat-media', false, 5242880, array['image/jpeg','image/png','image/webp','image/gif']),
  ('verification', 'verification', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy avatars_owner_write on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy avatars_owner_update on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy chat_media_write on storage.objects for insert to authenticated
  with check (bucket_id = 'chat-media' and public.is_member(((storage.foldername(name))[1])::uuid)
              and owner_id = auth.uid()::text);
create policy chat_media_read on storage.objects for select to authenticated
  using (bucket_id = 'chat-media' and public.is_member(((storage.foldername(name))[1])::uuid) and (
    (storage.foldername(name))[2] is distinct from 'timed'
    or owner_id = auth.uid()::text
    or exists (select 1 from public.messages m join public.timed_image_views v on v.message_id = m.id
               where m.media_path = storage.objects.name and v.viewer_id = auth.uid()
                 and v.first_viewed_at > now() - interval '60 seconds')));

create policy verification_owner_write on storage.objects for insert to authenticated
  with check (bucket_id = 'verification' and (storage.foldername(name))[1] = auth.uid()::text);
create policy verification_read on storage.objects for select to authenticated
  using (bucket_id = 'verification' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
