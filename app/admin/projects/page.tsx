import Link from "next/link";
import ProjectsTable, { type AdminProjectRow } from "@/components/admin/ProjectsTable";
import { getSupabaseAdmin } from "@/lib/supabase";
import { PROJECTS as FALLBACK } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const supabase = getSupabaseAdmin();

  let rows: AdminProjectRow[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, category, filter, featured")
      .order("sort", { ascending: true });
    rows = (data ?? []) as AdminProjectRow[];
  } else {
    rows = FALLBACK.map((p, i) => ({
      id: `sample-${i}`,
      slug: p.slug,
      title: p.title,
      category: p.category,
      filter: p.filter,
      featured: p.featured,
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-[34px] m-0">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-semibold text-[14px] no-underline whitespace-nowrap"
        >
          + New
        </Link>
      </div>

      {!supabase && (
        <div className="mb-5 bg-soft border border-border rounded-[12px] p-4 text-[13px] text-text-2">
          Showing sample projects. Connect Supabase (see Dashboard) to add, edit and delete.
        </div>
      )}

      {supabase && rows.length === 0 && (
        <div className="mb-5 bg-soft border border-border rounded-[12px] p-4 text-[13px] text-text-2">
          No projects in the database yet. Click + New to add one, or run npm run seed to import the samples.
        </div>
      )}

      <ProjectsTable rows={rows} />
    </div>
  );
}
