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
  category    text not null,                  -- card label, e.g. "Online Store · Live"
  filter      text not null default '',       -- LEGACY single category (superseded by `filters`)
  filters     text[] not null default '{}',   -- service categories — a project can have several
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
alter table projects add column if not exists filters text[] not null default '{}';
alter table projects alter column filter set default '';

-- Backfill: map the old single `filter` value onto the new `filters` array,
-- translating old filter names to today's service categories.
update projects set filters = array[
  case filter
    when 'Websites'   then 'Custom Websites'
    when 'Web Apps'   then 'Custom Websites'
    when 'Dashboards' then 'Custom Websites'
    when 'SaaS'       then 'SaaS Products'
    when 'E-commerce' then 'E-commerce & Shopify'
    when 'AI'         then 'SaaS Products'
    else filter
  end
] where filters = '{}' and filter <> '';

-- ── Storage: bucket for project images (uploaded from /admin) ──
-- Public read; uploads go through the server with the service-role key.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "public read project images" on storage.objects;
create policy "public read project images" on storage.objects
  for select using (bucket_id = 'project-images');

-- Blog posts (drives /blog and /blog/[slug]; managed from /admin/blog)
create table if not exists blog_posts (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  sort              int  not null default 0,        -- display order (lower = first)
  title             text not null,
  excerpt           text not null default '',        -- short card/summary text
  cover             text not null default '',        -- cover image URL (card + hero + OG)
  body              text not null default '',        -- rich-text HTML content
  tags              text[] not null default '{}',
  read_minutes      int  not null default 0,          -- 0 = auto-estimate from body
  published         boolean not null default false,   -- only published posts show publicly
  date              text not null default '',         -- display date, e.g. "2026-02-14"
  meta_title        text not null default '',         -- SEO <title> override (blank = use title)
  meta_description  text not null default '',         -- SEO meta description (blank = use excerpt)
  created_at        timestamptz not null default now()
);

-- If the table already exists from an earlier version, add the new columns:
alter table blog_posts add column if not exists meta_title text not null default '';
alter table blog_posts add column if not exists meta_description text not null default '';

-- Contact form submissions
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Row Level Security: the public site uses the anon key to READ projects/posts only.
-- All writes go through the server using the service-role key (bypasses RLS).
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table contact_messages enable row level security;

drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects
  for select using (true);

drop policy if exists "public read blog_posts" on blog_posts;
create policy "public read blog_posts" on blog_posts
  for select using (true);

-- contact_messages: no public select/insert policy — the server (service role)
-- handles inserts and the admin inbox, so messages stay private.
