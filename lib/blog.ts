// ============================================================
// Server-side blog data layer.
// Reads posts from Supabase when configured; otherwise falls back
// to the built-in sample posts in lib/data.ts. Mirrors lib/projects.ts
// so the public site works with or without a database, and never throws.
// ============================================================
import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { POSTS as FALLBACK, type BlogPost } from "./data";

export type { BlogPost };

interface DbBlogPost {
  slug: string;
  sort: number;
  title: string;
  excerpt: string;
  cover: string | null;
  body: string;
  tags: string[] | null;
  read_minutes: number | null;
  published: boolean;
  date: string;
  meta_title: string | null;
  meta_description: string | null;
}

function fromDb(r: DbBlogPost): BlogPost {
  return {
    slug: r.slug,
    sort: r.sort ?? 0,
    title: r.title,
    excerpt: r.excerpt ?? "",
    cover: r.cover ?? "",
    body: r.body ?? "",
    tags: r.tags ?? [],
    readMinutes: r.read_minutes ?? 0,
    published: r.published,
    date: r.date ?? "",
    metaTitle: r.meta_title ?? "",
    metaDescription: r.meta_description ?? "",
  };
}

/** All posts (published + drafts), ordered. Supabase if available, else samples. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [...FALLBACK].sort((a, b) => a.sort - b.sort);
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0)
      return [...FALLBACK].sort((a, b) => a.sort - b.sort);
    return (data as DbBlogPost[]).map(fromDb);
  } catch {
    return [...FALLBACK].sort((a, b) => a.sort - b.sort);
  }
}

/** Only published posts — for the public /blog pages. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((p) => p.published);
}

/** A single post by slug (published or not — the page decides). */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

/** Estimate read time (minutes) from an HTML body at ~200 wpm; min 1. */
export function estimateReadMinutes(html: string): number {
  const text = (html ?? "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
