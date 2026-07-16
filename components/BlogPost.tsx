import Link from "next/link";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/richtext";
import type { BlogPost as Post } from "@/lib/data";

function formatDate(d: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ post, related = [] }: { post: Post; related?: Post[] }) {
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
          className="font-heading font-normal leading-[1.02] tracking-[-.02em] m-0 mb-[26px] text-[clamp(36px,6vw,72px)]"
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

        <div
          data-reveal=""
          className="blog-content max-w-[68ch]"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body) }}
        />

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

      </article>

      {related.length > 0 && (
        <section className="max-w-content mx-auto px-[clamp(20px,5vw,64px)] pb-[90px]">
          <div data-reveal="" className="pt-10 border-t border-border">
            <h2 className="font-heading font-normal text-[clamp(24px,3vw,34px)] m-0 mb-8">
              Keep reading
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[clamp(20px,3vw,36px)]">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  data-cursor="cta"
                  data-magnetic=""
                  className="group/rel no-underline flex flex-col"
                >
                  <div
                    className="relative rounded-[14px] overflow-hidden border border-border mb-4"
                    style={{ aspectRatio: "16/9", background: "var(--soft)" }}
                  >
                    {r.cover ? (
                      <Image
                        src={r.cover}
                        alt={r.title}
                        fill
                        sizes="(min-width: 700px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover/rel:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-serif text-accent opacity-20 text-[clamp(48px,7vw,90px)]">
                        ✦
                      </div>
                    )}
                  </div>
                  {r.date && (
                    <span className="font-mono text-[12px] text-text-2 uppercase tracking-[.1em] mb-2">
                      {formatDate(r.date)}
                    </span>
                  )}
                  <h3 className="font-heading font-normal text-[22px] leading-[1.15] tracking-[-.01em] m-0 text-text transition-colors group-hover/rel:text-accent">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
