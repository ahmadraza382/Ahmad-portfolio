import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default function NewPost() {
  return (
    <div>
      <Link href="/admin/blog" className="text-[13px] font-mono text-text-2 no-underline">
        ← Blog
      </Link>
      <h1 className="font-serif text-[34px] m-0 mt-2 mb-6">New post</h1>
      <BlogForm />
    </div>
  );
}
