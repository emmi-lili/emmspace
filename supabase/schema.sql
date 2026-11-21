-- Notes app — Postgres schema with Row Level Security.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- 1. Table ------------------------------------------------------------------

create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  type        text not null check (
                type in ('text', 'checklist', 'audio', 'photos', 'files', 'pdf')
              ),
  title       text not null default '',
  body        text,
  headline    text,
  items       jsonb,                       -- checklist items: [{ id, label, done }]
  media_urls  text[],                      -- storage paths / public URLs
  color       text not null default 'frostedWhite',
  collection  text,
  important    boolean not null default false,
  waveform    double precision[],          -- normalized 0..1 amplitudes
  duration_sec integer,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists notes_user_id_idx    on public.notes (user_id);
create index if not exists notes_collection_idx  on public.notes (collection);
create index if not exists notes_created_at_idx  on public.notes (created_at desc);

-- 2. updated_at trigger ------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists notes_set_updated_at on public.notes;
create trigger notes_set_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

-- 3. Row Level Security ------------------------------------------------------

alter table public.notes enable row level security;

drop policy if exists "Users can read their own notes"   on public.notes;
drop policy if exists "Users can insert their own notes"  on public.notes;
drop policy if exists "Users can update their own notes"  on public.notes;
drop policy if exists "Users can delete their own notes"  on public.notes;

create policy "Users can read their own notes"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notes"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notes"
  on public.notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own notes"
  on public.notes for delete
  using (auth.uid() = user_id);

-- 4. Storage buckets ---------------------------------------------------------
-- Private buckets for user media; access is granted per-user via policies.

insert into storage.buckets (id, name, public)
values
  ('note-images', 'note-images', false),
  ('note-audio',  'note-audio',  false),
  ('note-files',  'note-files',  false)
on conflict (id) do nothing;

-- Allow each user to manage objects under a folder named after their uid,
-- e.g. `note-images/<auth.uid()>/photo.jpg`.
drop policy if exists "Users manage own media" on storage.objects;
create policy "Users manage own media"
  on storage.objects for all
  using (
    bucket_id in ('note-images', 'note-audio', 'note-files')
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id in ('note-images', 'note-audio', 'note-files')
    and (storage.foldername(name))[1] = auth.uid()::text
  );
