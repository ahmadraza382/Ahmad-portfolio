import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { getPublishedPosts, getPostBySlug } from "@/lib/blog";
import { stripMarkdown } from "@/lib/markdown";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) return { title: "Post not found" };

  const description = post.excerpt || stripMarkdown(post.body, 160);
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — Ahmad Raza`,
      description,
      url,
      type: "article",
      ...(post.date ? { publishedTime: post.date } : {}),
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Ahmad Raza`,
      description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) {
    notFound();
    return null;
  }

  // Next published post (by sort order), wrapping around.
  const published = await getPublishedPosts();
  const idx = published.findIndex((p) => p.slug === post.slug);
  const next =
    published.length > 1 ? published[(Math.max(idx, 0) + 1) % published.length] : undefined;

  const description = post.excerpt || stripMarkdown(post.body, 200);
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
      <BlogPost post={post} next={next} />
    </>
  );
}
