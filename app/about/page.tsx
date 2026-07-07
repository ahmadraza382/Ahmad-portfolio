import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer from Faisalabad, Pakistan — building SaaS, e-commerce and platform products with React, Next.js, Node and TypeScript.",
};

export default function About() {
  return <AboutPage />;
}
