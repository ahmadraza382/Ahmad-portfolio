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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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
  let { data, error } = await supabase
    .from("projects")
    .update(row)
    .eq("id", params.id)
    .select()
    .single();
  if (missingFiltersColumn(error)) {
    // DB not migrated yet — save without the array; the legacy `filter`
    // column (synced in pick) keeps the first category working meanwhile.
    const { filters: _omit, ...legacyRow } = row;
    ({ data, error } = await supabase
      .from("projects")
      .update(legacyRow)
      .eq("id", params.id)
      .select()
      .single());
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateProjects(data?.slug);
  return NextResponse.json({ project: data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  // Grab the slug first so we can revalidate that specific case-study page.
  const { data: existing } = await supabase
    .from("projects")
    .select("slug")
    .eq("id", params.id)
    .single();

  const { error } = await supabase.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateProjects(existing?.slug);
  return NextResponse.json({ ok: true });
}
