import Hero from "@/components/Hero";
import AboutShort from "@/components/AboutShort";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import FeaturedWork from "@/components/FeaturedWork";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getFeaturedProjects } from "@/lib/projects";

// Cached (ISR) for speed; admin edits trigger revalidatePath("/") so they
// appear immediately, with a 1-hour self-healing fallback.
export const revalidate = 3600;

export default async function HomePage() {
  const featured = await getFeaturedProjects();
  return (
    <>
      <Hero />
      <AboutShort />
      <Services />
      <Skills />
      <FeaturedWork featured={featured} />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
