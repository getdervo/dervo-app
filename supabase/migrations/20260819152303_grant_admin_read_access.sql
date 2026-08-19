-- Read access for the Dervo admin app (dervo-admin), which reads this same
-- project. The public site's insert-only setup is untouched: `anon` keeps
-- INSERT and nothing else.
--
-- `TO authenticated` on its own would be authentication without authorization —
-- any account that signed up could read every submission. The gate is instead
-- membership of private.admins.

create schema if not exists private;

-- `private` is not one of Supabase's exposed schemas, so nothing in here is
-- reachable through the Data API.
revoke all on schema private from anon, authenticated;

create table if not exists private.admins (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  email    text not null,
  added_at timestamptz not null default now()
);

-- Belt and braces: nothing selects this table directly, only is_admin() does,
-- and that runs as owner.
alter table private.admins enable row level security;

-- SECURITY DEFINER so the check can see private.admins without granting anyone
-- read access to it. Kept out of `public` precisely so it is not callable as an
-- RPC endpoint, and it always filters on the caller's own uid.
create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from private.admins a where a.user_id = (select auth.uid())
  );
$$;

-- Policy expressions run as the querying role, so `authenticated` needs to be
-- able to reach and execute the function — but gets no table privileges here.
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

-- Read policies. Insert policies for anon are left exactly as they were.
drop policy if exists "admins can read assessments" on public.assessments;
create policy "admins can read assessments"
  on public.assessments for select to authenticated using (private.is_admin());

drop policy if exists "admins can read subscribers" on public.subscribers;
create policy "admins can read subscribers"
  on public.subscribers for select to authenticated using (private.is_admin());

grant select on table public.assessments to authenticated;
grant select on table public.subscribers to authenticated;
