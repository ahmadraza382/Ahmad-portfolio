// ============================================================
// Server-side project data layer.
// Reads projects from Supabase when configured; otherwise falls back
// to the built-in sample data in lib/data.ts. This keeps the public
// site working with or without a database, and never throws.
// ============================================================
import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { PROJECTS as FALLBACK, type Project } from "./data";

export type { Project };

interface DbProject {
  slug: string;
  no: string;
  mark: string;
  shot: string;
  category: string;
  filter: string;
  featured: boolean;
  bg: string;
  title: string;
  blurb: string;
  tags: string[] | null;
  year: string;
  role: string;
  live: string;
  cover: string | null;
  shots: string[] | null;
  summary: string;
  problem: string;
  process: string[] | null;
  stack: string[] | null;
  results: [string, string][] | null;
  sections: { heading: string; body: string }[] | null;
  sort?: number;
}

function fromDb(r: DbProject): Project {
  return {
    slug: r.slug,
    no: r.no,
    mark: r.mark,
    shot: r.shot,
    category: r.category,
    filter: r.filter,
    featured: r.featured,
    bg: r.bg,
    title: r.title,
    blurb: r.blurb,
    tags: r.tags ?? [],
    year: r.year,
    role: r.role,
    live: r.live,
    cover: r.cover ?? "",
    shots: r.shots ?? [],
    summary: r.summary,
    problem: r.problem,
    process: r.process ?? [],
    stack: r.stack ?? [],
    results: (r.results ?? []) as [string, string][],
    sections: r.sections ?? [],
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return FALLBACK;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK;
    return (data as DbProject[]).map(fromDb);
  } catch {
    return FALLBACK;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getAllProjects()).find((p) => p.slug === slug);
}

export async function getNextProjectAfter(slug: string): Promise<Project> {
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  return all[(Math.max(idx, 0) + 1) % all.length];
}
