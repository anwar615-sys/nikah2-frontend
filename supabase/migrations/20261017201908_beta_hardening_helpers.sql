-- Internal helpers are not part of the API: only other functions (running as owner) call them.
do $$
declare r record;
begin
  for r in
    select p.oid::regprocedure as sig, p.proname
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and (p.proname like '\_%' or p.proname in ('is_blocked_between','handle_new_user','guard_profile_columns','audit_log_immutable'))
  loop
    execute format('revoke execute on function %s from public, anon, authenticated', r.sig);
    execute format('alter function %s set search_path = public, pg_temp', r.sig);
  end loop;
end $$;

-- RLS policies call these as the signed-in user, so authenticated keeps them; anon never needs them.
revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.is_member(uuid) from public, anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_member(uuid) to authenticated;
