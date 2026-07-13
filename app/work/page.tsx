import type { Metadata } from "next";
import WorkGallery from "@/components/WorkGallery";
import { getAllProjects } from "@/lib/projects";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work: SaaS platforms, e-commerce storefronts and management systems built end to end with React, Next.js, Node and TypeScript.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return <WorkGallery projects={projects} />;
}
