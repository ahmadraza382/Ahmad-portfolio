import Hero from "@/components/Hero";
import AboutShort from "@/components/AboutShort";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import FeaturedWork from "@/components/FeaturedWork";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getFeaturedProjects } from "@/lib/projects";

// Always render fresh so admin edits show up without a rebuild.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedProjects();
  return (
    <>
      <Hero />
      <AboutShort />
      <Services />
      <Skills />
      <FeaturedWork featured={featured} />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
