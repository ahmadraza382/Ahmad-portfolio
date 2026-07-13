import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-guard";
import { revalidateProjects } from "@/lib/revalidate";

export const runtime = "nodejs";

const FIELDS = [
  "slug", "sort", "no", "mark", "shot", "category", "filter", "filters", "featured",
  "bg", "title", "blurb", "tags", "year", "role", "live", "summary",
  "problem", "process", "stack", "results", "sections", "cover", "shots",
];

function pick(body: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const f of FIELDS) if (f in body) row[f] = body[f];
  if ("filters" in row) {
    row.filters = Array.isArray(row.filters) ? (row.filters as unknown[]).map(String) : [];
    // Keep the legacy NOT NULL `filter` column in sync with the new array.
    if (!row.filter) row.filter = (row.filters as string[])[0] ?? "";
  }
  return row;
}

/** True when Supabase rejected the write because the `filters` column
 *  doesn't exist yet (schema.sql migration not run). */
function missingFiltersColumn(error: { code?: string; message: string } | null) {
  return Boolean(error && error.code === "PGRST204" && /filters/i.test(error.message));
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data });
}

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const row = pick(body);
  if (!row.slug || !row.title) {
    return NextResponse.json({ error: "slug and title are required." }, { status: 400 });
  }

  let { data, error } = await supabase.from("projects").insert(row).select().single();
  if (missingFiltersColumn(error)) {
    // DB not migrated yet — save without the array; the legacy `filter`
    // column (synced in pick) keeps the first category working meanwhile.
    const { filters: _omit, ...legacyRow } = row;
    ({ data, error } = await supabase.from("projects").insert(legacyRow).select().single());
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateProjects(data?.slug);
  return NextResponse.json({ project: data });
}
