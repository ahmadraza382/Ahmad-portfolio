"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/data";

function formatDate(d: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();

  return (
    <>
      <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[90px]">
        <div data-reveal="" className="mb-[48px]">
          <div className="flex items-center gap-[14px] mb-5">
            <Link href="/" data-cursor="link" className="font-mono text-[13px] text-text-2 no-underline">
              ← Home
            </Link>
            <span className="font-mono text-[13px] text-text-2">/ blog</span>
          </div>
          <h1 className="font-heading font-normal leading-[.98] tracking-[-.02em] m-0 text-[clamp(44px,8vw,108px)]">
            The <span className="italic text-accent">blog</span>
          </h1>
          <p className="mt-[22px] text-text-2 max-w-[52ch] text-[clamp(16px,1.5vw,20px)]">
            Notes on building for the web — craft, performance, workflow, and the
            small decisions that add up.
          </p>
        </div>

        {posts.length === 0 ? (
          <div data-reveal="" className="bg-soft border border-border rounded-[16px] p-10 text-center text-text-2">
            No posts published yet — check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[clamp(24px,3vw,44px)]">
            {posts.map((post) => (
              <article
                key={post.slug}
                data-reveal=""
                onClick={() => router.push(`/blog/${post.slug}`)}
                data-cursor="cta"
                data-magnetic=""
                className="cursor-pointer flex flex-col"
              >
                <div
                  className="group/post relative rounded-[16px] overflow-hidden border border-border mb-[18px] bg-soft"
                  style={{ aspectRatio: "16/9" }}
                >
                  {post.cover ? (
                    <Image
                      key={post.cover}
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 700px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover/post:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-accent opacity-20 text-[clamp(60px,9vw,120px)]">
                      ✦
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[12px] text-text-2 uppercase tracking-[.12em]">
                    {formatDate(post.date)}
                  </span>
                  {post.readMinutes > 0 && (
                    <span className="font-mono text-[12px] text-text-2">· {post.readMinutes} min read</span>
                  )}
                </div>
                <h2 className="font-heading font-normal text-[26px] leading-[1.1] tracking-[-.01em] m-0 mb-[10px]">
                  {post.title}
                </h2>
                <p className="text-[14px] leading-[1.6] text-text-2 m-0 mb-4">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] font-mono text-text-2 border border-border rounded-full py-[5px] px-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
