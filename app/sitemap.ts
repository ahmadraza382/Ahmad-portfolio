import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getPublishedPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [projects, posts] = await Promise.all([getAllProjects(), getPublishedPosts()]);

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => {
    const d = p.date ? new Date(p.date) : now;
    return {
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: Number.isNaN(d.getTime()) ? now : d,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projectUrls,
    ...postUrls,
  ];
}
