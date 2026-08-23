-- Cleano Website: lead capture schema (V1).
--
-- This is a SEPARATE Supabase project from Cleano Ops (the internal field
-- -service app) - run this against the new project created for this site,
-- not the Ops database. Built deliberately simple (one table + one storage
-- bucket) so it's a clean source to later sync/connect into Cleano's wider
-- operating system, per the V1 build plan.

create type lead_status as enum (
  'new',
  'contacted',
  'quoted',
  'booked',
  'completed',
  'lost'
);

create type lead_service as enum (
  'gutter_cleaning',
  'bin_cleaning',
  'window_cleaning',
  'pressure_washing',
  'commercial_cleaning',
  'other'
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Step 2 of the quote form
  name text not null,
  phone text not null,
  postcode text not null,

  -- Step 1 of the quote form
  service lead_service not null,
  service_other_note text,

  -- Step 3 of the quote form (optional) - object paths in the
  -- `lead-photos` storage bucket, not public URLs.
  photo_paths text[] not null default '{}',

  -- Attribution
  source_page text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  -- Pipeline (matches the sitemap: New -> Contacted -> Quoted -> Booked ->
  -- Completed -> Lost)
  status lead_status not null default 'new',
  assigned_to text,
  quote_amount numeric(10, 2),
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

-- The public site only ever INSERTs a lead (via the service-role API route
-- at /api/leads, not directly from the browser) - no anon select/update/
-- delete policy exists, so leads can't be read back out or tampered with
-- via the anon key even if it leaked.
create policy "service role full access" on public.leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Storage bucket for quote-form photo uploads. Private (not publicly
-- readable) - only the service role (used by the manager tooling / a
-- future Ops integration) can read files back out.
insert into storage.buckets (id, name, public)
values ('lead-photos', 'lead-photos', false)
on conflict (id) do nothing;

-- Anonymous visitors may upload (insert) photos into this bucket directly
-- from the browser, but cannot list, read or overwrite existing files.
create policy "anon can upload lead photos" on storage.objects
  for insert
  to anon
  with check (bucket_id = 'lead-photos');

create policy "service role can read lead photos" on storage.objects
  for select
  using (bucket_id = 'lead-photos' and auth.role() = 'service_role');
