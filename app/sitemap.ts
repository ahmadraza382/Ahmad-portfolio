import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    ...projectUrls,
  ];
}
