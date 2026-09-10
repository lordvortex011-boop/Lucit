-- Waitlist hardening (additive, safe to re-run).
-- Prod shape is email PK + consent + status (not the uuid id in 001).
-- Signup must go through the edge function (service role). Revoking anon
-- insert closes unthrottled PostgREST spam and stops clients from setting
-- arbitrary consent/status on insert. Do not change PK / break {email} inserts.

alter table public.waitlist enable row level security;

-- Drop public insert policy — service role bypasses RLS anyway.
drop policy if exists "allow_waitlist_signup" on public.waitlist;

-- Edge-only writes from the browser's perspective.
revoke insert, select, update, delete on table public.waitlist from anon, authenticated;
grant usage on schema public to anon, authenticated;

-- If prod columns exist: defaults so service-role `{ email }` inserts still work,
-- and reject non-true consent / non-pending status if a policy is re-added later.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'waitlist' and column_name = 'consent'
  ) then
    execute 'alter table public.waitlist alter column consent set default true';
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'waitlist' and column_name = 'status'
  ) then
    begin
      execute 'alter table public.waitlist alter column status set default ''pending''';
    exception when others then
      -- status may be an enum with a different default label — leave as-is.
      null;
    end;
  end if;
end $$;
