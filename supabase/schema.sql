-- ============================================================
-- Ahmad Raza Portfolio — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- ============================================================

-- Projects (drives the work gallery, featured section, and case studies)
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  sort        int  not null default 0,        -- display order
  no          text not null,                  -- "01", "02"...
  mark        text not null default '◆',      -- decorative glyph
  shot        text not null default 'screen', -- placeholder label
  category    text not null,                  -- "SaaS · Web App"
  filter      text not null,                  -- "Web Apps" | "Landing Pages" | "E-commerce"
  featured    boolean not null default false,
  bg          text not null default 'var(--sand)',
  title       text not null,
  blurb       text not null,
  tags        text[] not null default '{}',
  year        text not null default '',
  role        text not null default '',
  live        text not null default '#',
  summary     text not null default '',
  problem     text not null default '',
  process     text[] not null default '{}',
  stack       text[] not null default '{}',
  results     jsonb  not null default '[]',   -- [["98ms","median update"], ...]
  sections    jsonb  not null default '[]',   -- [{"heading":"The problem","body":"..."}, ...]
  cover       text   not null default '',     -- cover image URL (cards + case-study hero)
  shots       text[] not null default '{}',   -- extra screenshot URLs (case-study grid)
  created_at  timestamptz not null default now()
);

-- If the table already exists from an earlier version, add the new columns:
alter table projects add column if not exists sections jsonb not null default '[]';
alter table projects add column if not exists cover text not null default '';
alter table projects add column if not exists shots text[] not null default '{}';

-- ── Storage: bucket for project images (uploaded from /admin) ──
-- Public read; uploads go through the server with the service-role key.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "public read project images" on storage.objects;
create policy "public read project images" on storage.objects
  for select using (bucket_id = 'project-images');

-- Contact form submissions
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Row Level Security: the public site uses the anon key to READ projects only.
-- All writes go through the server using the service-role key (bypasses RLS).
alter table projects enable row level security;
alter table contact_messages enable row level security;

drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects
  for select using (true);

-- contact_messages: no public select/insert policy — the server (service role)
-- handles inserts and the admin inbox, so messages stay private.
