import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_PAGES, getServiceBySlug } from "@/lib/services-content";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceReasons from "@/components/services/ServiceReasons";
import ServiceProjects from "@/components/services/ServiceProjects";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCta from "@/components/services/ServiceCta";

// Static at build time, revalidated hourly like the rest of the public site
// so project data edited in the admin shows up here too.
export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.seoTitle} | Ahmad Raza`,
      description: service.ogDescription,
      url,
      siteName: "Ahmad Raza",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service.name} by Ahmad Raza — Software Engineer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.seoTitle} | Ahmad Raza`,
      description: service.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  // Real projects only — resolved from the same data layer as /work,
  // keeping the order defined in the service content.
  const allProjects = await getAllProjects();
  const projects = service.projectSlugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const url = `${SITE_URL}/services/${service.slug}`;

  // ---- Structured data -------------------------------------------------
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.seoDescription,
    url,
    provider: {
      "@type": "Person",
      name: "Ahmad Raza",
      jobTitle: "Software Engineer",
      url: SITE_URL,
      email: `mailto:${CONTACT_EMAIL}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faisalabad",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} offerings`,
      itemListElement: service.offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title, description: o.desc },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceOfferings service={service} />
      <ServiceProcess service={service} />
      <ServiceReasons service={service} />
      <ServiceProjects projects={projects} serviceName={service.name} />
      <ServiceFaq faqs={service.faqs} serviceName={service.name} />
      <ServiceCta service={service} />
    </>
  );
}
