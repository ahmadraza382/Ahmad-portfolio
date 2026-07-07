import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getProjectBySlug, getNextProjectAfter } from "@/lib/projects";

export const dynamic = "force-dynamic";

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
    openGraph: {
      title: `${project.title} — Ahmad Raza`,
      description: project.summary,
    },
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
