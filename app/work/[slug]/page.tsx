import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getProjectBySlug, getNextProjectAfter } from "@/lib/projects";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Case study" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Ahmad Raza`,
      description: project.summary,
      type: "article",
      ...(project.cover ? { images: [{ url: project.cover }] } : {}),
    },
    ...(project.cover
      ? {
          twitter: {
            card: "summary_large_image" as const,
            title: `${project.title} — Ahmad Raza`,
            description: project.summary,
            images: [project.cover],
          },
        }
      : {}),
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
    return null;
  }
  const next = await getNextProjectAfter(params.slug);
  return <CaseStudy project={project} next={next} />;
}
