import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getPublishedPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building for the web — craft, performance, workflow, and the small decisions that add up. By Ahmad Raza, full-stack developer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Ahmad Raza",
    description:
      "Notes on building for the web — craft, performance, workflow, and the small decisions that add up.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog — ${SITE_NAME}`,
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date || undefined,
      description: p.excerpt || undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogList posts={posts} />
    </>
  );
}
