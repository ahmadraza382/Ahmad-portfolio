import Link from "next/link";
import BlogTable, { type AdminBlogRow } from "@/components/admin/BlogTable";
import { getSupabaseAdmin } from "@/lib/supabase";
import { POSTS as FALLBACK } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const supabase = getSupabaseAdmin();

  let rows: AdminBlogRow[] = [];

  if (supabase) {
    // select * so the page still works if the publish_at migration hasn't run yet.
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("sort", { ascending: true });
    rows = ((data ?? []) as (AdminBlogRow & { publish_at: string | null })[]).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      date: p.date,
      published: p.published,
      publishAt: p.publish_at ?? "",
    }));
  } else {
    rows = FALLBACK.map((p, i) => ({
      id: `sample-${i}`,
      slug: p.slug,
      title: p.title,
      date: p.date,
      published: p.published,
      publishAt: p.publishAt ?? "",
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-[34px] m-0">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-semibold text-[14px] no-underline whitespace-nowrap"
        >
          + New
        </Link>
      </div>

      {!supabase && (
        <div className="mb-5 bg-soft border border-border rounded-[12px] p-4 text-[13px] text-text-2">
          Showing sample posts. Connect Supabase (see Dashboard) to add, edit and delete.
        </div>
      )}

      {supabase && rows.length === 0 && (
        <div className="mb-5 bg-soft border border-border rounded-[12px] p-4 text-[13px] text-text-2">
          No posts in the database yet. Click + New to write one.
        </div>
      )}

      <BlogTable rows={rows} />
    </div>
  );
}
