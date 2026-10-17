-- Security tests for the Nikha2 beta database. Run as one batch (execute_sql).
-- Everything happens inside a transaction that is rolled back at the end, so
-- the test users and their data never persist. Any failed check raises.
begin;

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
 ('00000000-0000-4000-a000-00000000000a', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'a@test.local',
  '{"name":"Test A","username":"test_a","gender":"man","nationality":"India","location":"Telangana","religion":"Muslim","hasKids":"No","ageRange":"36-45","acceptTerms":"true"}', now(), now()),
 ('00000000-0000-4000-a000-00000000000b', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'b@test.local',
  '{"name":"Test B","username":"test_b","gender":"woman","nationality":"India","location":"Telangana","religion":"Muslim","hasKids":"No","ageRange":"26-35","acceptTerms":"true"}', now(), now()),
 ('00000000-0000-4000-a000-00000000000c', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'c@test.local',
  '{"name":"Test C","gender":"woman","nationality":"India","location":"Delhi","religion":"Hindu","hasKids":"Yes","ageRange":"36-45"}', now(), now()),
 ('00000000-0000-4000-a000-00000000000d', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'd@test.local',
  '{"name":"Test D","gender":"woman","nationality":"UAE","location":"Dubai","religion":"Muslim","hasKids":"No","ageRange":"26-35"}', now(), now()),
 ('00000000-0000-4000-a000-00000000000e', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'e@test.local',
  '{"name":"Test E","gender":"woman","nationality":"Qatar","location":"Doha","religion":"Muslim","hasKids":"No","ageRange":"26-35"}', now(), now());

-- B and the others are "offline" (seen long ago)
update public.profiles set last_seen_at = now() - interval '1 day' where id <> '00000000-0000-4000-a000-00000000000a';

do $$ begin
  if (select count(*) from public.profiles where email like '%@test.local') <> 5 then raise exception 'T0 profiles not created by trigger'; end if;
  if (select count(*) from public.consents where user_id = '00000000-0000-4000-a000-00000000000a') <> 2 then raise exception 'T0 consents not recorded'; end if;
end $$;

-- ===== act as A
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-a000-00000000000a","role":"authenticated"}', true);

do $$ declare n int; begin
  -- T1: cannot read B's private row
  select count(*) into n from public.profiles where id = '00000000-0000-4000-a000-00000000000b';
  if n <> 0 then raise exception 'T1 A can read B private profile row'; end if;
  -- T2: cannot raise own plan
  begin
    update public.profiles set plan = 'premium' where id = auth.uid();
    raise exception 'T2 plan self-upgrade allowed';
  exception when insufficient_privilege then null; end;
  -- T3: people_search treats online=true as ordering, returns offline members
  select jsonb_array_length(public.people_search('{"online":"true","limit":"50"}')->'items') into n;
  if n < 4 then raise exception 'T3 people_search hid offline members (got %)', n; end if;
  -- T4: free plan allows 3 new contacts per month, the 4th fails
  perform public.start_conversation('00000000-0000-4000-a000-00000000000b');
  perform public.start_conversation('00000000-0000-4000-a000-00000000000c');
  perform public.start_conversation('00000000-0000-4000-a000-00000000000d');
  begin
    perform public.start_conversation('00000000-0000-4000-a000-00000000000e');
    raise exception 'T4 4th new contact allowed on free plan';
  exception when others then
    if sqlerrm not like 'CHAT_LIMIT_REACHED%' then raise exception 'T4 wrong error: %', sqlerrm; end if;
  end;
  -- T5: admin functions refuse non-admins
  begin
    perform public.admin_analytics();
    raise exception 'T5 non-admin ran admin_analytics';
  exception when others then
    if sqlerrm not like 'FORBIDDEN%' then raise exception 'T5 wrong error: %', sqlerrm; end if;
  end;
  -- T6: send a message to B, B's conversation exists in A's summary
  perform public.send_message((public.start_conversation('00000000-0000-4000-a000-00000000000b')->>'conversationId')::uuid, 'text', 'Salaam', null, null, false);
  if (public.conversations_summary()->'items'->0->'lastMessage'->>'preview') <> 'Salaam' then raise exception 'T6 summary preview wrong'; end if;
  -- T7: beta checkout upgrades through the trusted function
  perform public.beta_checkout('basic', 'success');
  if (public.me_get()->'membership'->>'plan') <> 'basic' then raise exception 'T7 checkout did not upgrade'; end if;
end $$;

-- ===== act as C: not a member of the A–B chat
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-a000-00000000000c","role":"authenticated"}', true);
do $$ declare n int; begin
  select count(*) into n from public.messages m join public.conversation_members cm on cm.conversation_id = m.conversation_id
   where cm.user_id = '00000000-0000-4000-a000-00000000000b';
  if n <> 0 then raise exception 'T8 non-member can read messages'; end if;
end $$;

-- ===== act as B: can read the chat; reports A
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-a000-00000000000b","role":"authenticated"}', true);
do $$ declare c jsonb; begin
  c := public.conversations_summary()->'items'->0;
  if (c->'other'->>'displayName') <> 'Test A' then raise exception 'T9 B summary other wrong: %', c; end if;
  if (c->>'unreadCount')::int <> 1 then raise exception 'T9 unread count wrong: %', c; end if;
  perform public.report_create('user', '00000000-0000-4000-a000-00000000000a', 'spam', null);
end $$;

-- T12: internal helpers are not callable by members
do $$ begin
  begin
    perform public._erase_user('00000000-0000-4000-a000-00000000000a');
    raise exception 'T12 member could call _erase_user';
  exception when insufficient_privilege then null; end;
  begin
    perform public._trusted();
    raise exception 'T12 member could call _trusted';
  exception when insufficient_privilege then null; end;
end $$;

-- ===== audit log is append-only (even for the table owner path)
reset role;
do $$ begin
  insert into public.audit_log (action) values ('test');
  begin
    update public.audit_log set action = 'x';
    raise exception 'T10 audit log editable';
  exception when others then
    if sqlerrm not like '%append-only%' then raise exception 'T10 wrong error: %', sqlerrm; end if;
  end;
end $$;

-- ===== admin can see everything
insert into public.admins (user_id) values ('00000000-0000-4000-a000-00000000000e');
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-a000-00000000000e","role":"authenticated"}', true);
do $$ declare a jsonb; begin
  a := public.admin_analytics();
  if (a->>'totalUsers')::int < 5 then raise exception 'T11 admin analytics wrong: %', a; end if;
  if (public.admin_reports('{"status":"open"}')->>'total')::int < 1 then raise exception 'T11 admin cannot see report'; end if;
  perform public.admin_user_block('00000000-0000-4000-a000-00000000000a', true);
  if (public.admin_audit_log(1, 50)->'items'->0->>'action') <> 'user.block' then raise exception 'T11 audit not written'; end if;
  -- T13: admins read message content only through a report, never the table itself
  if (select count(*) from public.messages) <> 0 then raise exception 'T13 admin can read messages directly'; end if;
  if (public.admin_report_context((select id from public.reports limit 1))->>'found')::boolean is not true then
    raise exception 'T13 admin cannot see reported context';
  end if;
end $$;

select 'ALL BETA SECURITY TESTS PASSED' as result;
rollback;
