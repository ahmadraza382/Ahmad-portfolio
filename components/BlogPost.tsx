import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";
import { Markdown } from "@/lib/markdown";
import type { BlogPost as Post } from "@/lib/data";

function formatDate(d: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ post, next }: { post: Post; next?: Post }) {
  return (
    <>
      <article className="max-w-[820px] mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[80px]">
        <div data-reveal="" className="flex items-center gap-[14px] mb-[30px]">
          <Link href="/blog" data-cursor="link" className="font-mono text-[13px] text-accent no-underline">
            ← All posts
          </Link>
          <span className="font-mono text-[13px] text-accent">/ {post.slug}</span>
        </div>

        <div data-reveal="" className="flex items-center gap-3 mb-[18px]">
          <span className="font-mono text-[12px] text-text-2 uppercase tracking-[.14em]">
            {formatDate(post.date)}
          </span>
          {post.readMinutes > 0 && (
            <span className="font-mono text-[12px] text-text-2">· {post.readMinutes} min read</span>
          )}
        </div>

        <h1
          data-reveal=""
          className="font-serif font-normal leading-[1.02] tracking-[-.02em] m-0 mb-[26px] text-[clamp(36px,6vw,72px)]"
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            data-reveal=""
            className="leading-[1.5] text-text max-w-[52ch] m-0 mb-[36px] font-serif italic text-[clamp(18px,2vw,24px)]"
          >
            {post.excerpt}
          </p>
        )}

        {post.cover && (
          <div
            data-reveal=""
            className="relative rounded-[18px] border border-border overflow-hidden mb-[44px]"
            style={{ aspectRatio: "16/9", background: "var(--soft)" }}
          >
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(min-width: 820px) 820px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div data-reveal="" className="max-w-[68ch]">
          <Markdown source={post.body} />
        </div>

        {post.tags.length > 0 && (
          <div data-reveal="" className="flex flex-wrap gap-[10px] mt-[44px] pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[13px] text-text border border-border rounded-full py-2 px-4"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {next && (
          <div
            data-reveal=""
            className="flex items-center justify-between flex-wrap gap-5 mt-10 pt-9 border-t border-border"
          >
            <span className="font-mono text-[13px] text-text-2">Next post</span>
            <Link
              href={`/blog/${next.slug}`}
              data-cursor="cta"
              data-magnetic=""
              className="inline-flex items-center gap-3 no-underline text-text"
            >
              <span className="font-serif italic text-[clamp(24px,4vw,40px)]">{next.title}</span>
              <span className="text-accent text-[28px]">→</span>
            </Link>
          </div>
        )}
      </article>
      <Footer />
    </>
  );
}
