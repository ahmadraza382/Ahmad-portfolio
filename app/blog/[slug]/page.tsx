import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { getPublishedPosts, getPostBySlug } from "@/lib/blog";
import { htmlToText } from "@/lib/richtext";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { BlogPost as Post } from "@/lib/data";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) return { title: "Post not found" };

  // Admin-provided meta wins; otherwise fall back to title/excerpt/body.
  const metaTitle = post.metaTitle?.trim() || post.title;
  const description =
    post.metaDescription?.trim() || post.excerpt || htmlToText(post.body, 160);
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: metaTitle,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${metaTitle} — Ahmad Raza`,
      description,
      url,
      type: "article",
      ...(post.date ? { publishedTime: post.date } : {}),
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} — Ahmad Raza`,
      description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

/** Pick related posts: most shared tags first, then fill with newest others. */
function pickRelated(current: Post, all: Post[], count = 3): Post[] {
  const others = all.filter((p) => p.slug !== current.slug);
  const tags = new Set(current.tags ?? []);
  const scored = others
    .map((p) => ({ p, score: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) {
    notFound();
    return null;
  }

  const published = await getPublishedPosts();
  const related = pickRelated(post, published, 3);

  const description =
    post.metaDescription?.trim() || post.excerpt || htmlToText(post.body, 200);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.cover ? { image: post.cover } : {}),
    ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    keywords: post.tags.join(", ") || undefined,
    author: { "@type": "Person", name: "Ahmad Raza", url: SITE_URL },
    publisher: { "@type": "Person", name: "Ahmad Raza", url: SITE_URL },
    isPartOf: { "@type": "Blog", name: `Blog — ${SITE_NAME}`, url: `${SITE_URL}/blog` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={post} related={related} />
    </>
  );
}
