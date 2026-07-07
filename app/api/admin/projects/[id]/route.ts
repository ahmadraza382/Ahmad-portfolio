import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-guard";

export const runtime = "nodejs";

const FIELDS = [
  "slug", "sort", "no", "mark", "shot", "category", "filter", "featured",
  "bg", "title", "blurb", "tags", "year", "role", "live", "summary",
  "problem", "process", "stack", "results", "sections", "cover", "shots",
];

function pick(body: Record<string, unknown>) {
  const row: Record<string, unknown> = {};
  for (const f of FIELDS) if (f in body) row[f] = body[f];
  return row;
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

  const { data, error } = await supabase
    .from("projects")
    .update(pick(body))
    .eq("id", params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { error } = await supabase.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
