import Link from "next/link";
import { notFound } from "next/navigation";
import BlogForm, { type BlogFormData } from "@/components/admin/BlogForm";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <div>
        <Link href="/admin/blog" className="text-[13px] font-mono text-text-2 no-underline">
          ← Blog
        </Link>
        <h1 className="font-serif text-[34px] m-0 mt-2 mb-4">Edit post</h1>
        <div className="bg-soft border border-border rounded-[12px] p-5 text-[14px] text-text-2">
          Connect Supabase to edit posts. (See the Dashboard for setup steps.)
        </div>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const initial: BlogFormData = {
    id: data.id,
    slug: data.slug ?? "",
    sort: data.sort ?? 0,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "",
    body: data.body ?? "",
    tags: data.tags ?? [],
    readMinutes: data.read_minutes ?? 0,
    published: Boolean(data.published),
    publishAt: data.publish_at ?? "",
    date: data.date ?? "",
    metaTitle: data.meta_title ?? "",
    metaDescription: data.meta_description ?? "",
  };

  return (
    <div>
      <Link href="/admin/blog" className="text-[13px] font-mono text-text-2 no-underline">
        ← Blog
      </Link>
      <h1 className="font-serif text-[34px] m-0 mt-2 mb-6">Edit · {initial.title}</h1>
      <BlogForm initial={initial} />
    </div>
  );
}
