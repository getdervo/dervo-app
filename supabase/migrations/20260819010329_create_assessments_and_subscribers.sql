-- Public write-only tables behind the /napkin assessments and the newsletter
-- signup. Applied to the hosted project on 2026-08-19; recorded here so the
-- schema lives in version control rather than only in the database.

create table if not exists public.assessments (
  id          uuid primary key default gen_random_uuid(),
  assessment  text not null check (assessment in ('idea', 'scale', 'fix')),
  name        text not null check (length(btrim(name)) between 1 and 120),
  email       text not null check (length(email) between 3 and 200),
  answers     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (length(email) between 3 and 200),
  created_at  timestamptz not null default now()
);

create index if not exists assessments_created_at_idx on public.assessments (created_at desc);
create index if not exists assessments_assessment_idx on public.assessments (assessment);
create index if not exists assessments_email_idx on public.assessments (email);

alter table public.assessments enable row level security;
alter table public.subscribers enable row level security;

-- Insert only. Deliberately no select/update/delete policy, so a leaked
-- publishable key cannot read back anyone's submission.
drop policy if exists "anon can submit an assessment" on public.assessments;
create policy "anon can submit an assessment"
  on public.assessments for insert to anon with check (true);

drop policy if exists "anon can subscribe" on public.subscribers;
create policy "anon can subscribe"
  on public.subscribers for insert to anon with check (true);

-- Supabase grants all privileges on new public tables by default; strip them
-- back so INSERT is the only privilege that exists, rather than leaning on RLS
-- alone to hold back SELECT/UPDATE/DELETE.
revoke all on table public.assessments from anon, authenticated;
revoke all on table public.subscribers from anon, authenticated;

grant usage on schema public to anon;
grant insert on table public.assessments to anon;
grant insert on table public.subscribers to anon;

-- Pre-existing project helper: an event-trigger function that auto-enables RLS
-- on new public tables. Postgres grants EXECUTE to PUBLIC by default, which the
-- security advisor flags. The event trigger fires through the DDL mechanism,
-- not a caller's privilege, so revoking this does not disable it.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
