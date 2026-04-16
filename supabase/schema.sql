-- Moss & Mirth — Supabase schema
-- Run this in the Supabase SQL editor to initialise the database.

-- ─── Profiles ───────────────────────────────────────────────────────────────
create table if not exists profiles (
  id   uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('admin', 'player')) default 'player'
);

alter table profiles enable row level security;

-- Users can only read their own profile
create policy "profiles: own row select"
  on profiles for select
  using (auth.uid() = id);

-- Profiles are created by a trigger on auth.users insert
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'player')
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();


-- ─── Content Snapshots ──────────────────────────────────────────────────────
create table if not exists content_snapshots (
  id                 uuid        primary key default gen_random_uuid(),
  created_at         timestamptz not null    default now(),
  label              text        not null,
  cards_data         jsonb       not null    default '[]',
  oracle_tables_data jsonb       not null    default '[]',
  rules_text_data    jsonb       not null    default '[]'
);

alter table content_snapshots enable row level security;

-- Anyone can read snapshots (players need them to play)
create policy "snapshots: public select"
  on content_snapshots for select
  using (true);

-- Only admins can insert/update
create policy "snapshots: admin insert"
  on content_snapshots for insert
  with check (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "snapshots: admin update"
  on content_snapshots for update
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );


-- ─── Content Drafts ─────────────────────────────────────────────────────────
-- Always exactly ONE row — seeded manually or via the admin panel on first run.
create table if not exists content_drafts (
  id                 uuid        primary key default gen_random_uuid(),
  cards_data         jsonb       not null    default '[]',
  oracle_tables_data jsonb       not null    default '[]',
  rules_text_data    jsonb       not null    default '[]',
  last_edited_at     timestamptz not null    default now()
);

alter table content_drafts enable row level security;

-- Admin only for all operations
create policy "drafts: admin all"
  on content_drafts for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );


-- ─── Game Sessions ───────────────────────────────────────────────────────────
create table if not exists game_sessions (
  id          uuid        primary key default gen_random_uuid(),
  player_name text        not null,
  snapshot_id uuid        not null references content_snapshots (id),
  game_state  jsonb       not null default '{}',
  journal     text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table game_sessions enable row level security;

-- Public access — no auth required for players
create policy "sessions: public select"
  on game_sessions for select
  using (true);

create policy "sessions: public insert"
  on game_sessions for insert
  with check (true);

create policy "sessions: public update"
  on game_sessions for update
  using (true);

-- Automatically update updated_at on change
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger game_sessions_updated_at
  before update on game_sessions
  for each row execute procedure update_updated_at();
