import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectForm, { type ProjectFormData } from "@/components/admin/ProjectForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditProject({ params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <div>
        <Link href="/admin/projects" className="text-[13px] font-mono text-text-2 no-underline">
          ← Projects
        </Link>
        <h1 className="font-serif text-[34px] m-0 mt-2 mb-4">Edit project</h1>
        <div className="bg-soft border border-border rounded-[12px] p-5 text-[14px] text-text-2">
          Connect Supabase to edit projects. (See the Dashboard for setup steps.)
        </div>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const initial: ProjectFormData = {
    id: data.id,
    slug: data.slug ?? "",
    sort: data.sort ?? 0,
    no: data.no ?? "",
    mark: data.mark ?? "◆",
    shot: data.shot ?? "screen",
    category: data.category ?? "",
    filter: data.filter ?? "Business Systems",
    featured: Boolean(data.featured),
    bg: data.bg ?? "var(--sand)",
    title: data.title ?? "",
    blurb: data.blurb ?? "",
    tags: data.tags ?? [],
    year: data.year ?? "",
    role: data.role ?? "",
    live: data.live ?? "",
    summary: data.summary ?? "",
    problem: data.problem ?? "",
    process: data.process ?? [],
    stack: data.stack ?? [],
    cover: data.cover ?? "",
    shots: data.shots ?? [],
    results: (data.results ?? []) as [string, string][],
    sections: (data.sections ?? []) as { heading: string; body: string }[],
  };

  return (
    <div>
      <Link href="/admin/projects" className="text-[13px] font-mono text-text-2 no-underline">
        ← Projects
      </Link>
      <h1 className="font-serif text-[34px] m-0 mt-2 mb-6">Edit · {initial.title}</h1>
      <ProjectForm initial={initial} />
    </div>
  );
}
