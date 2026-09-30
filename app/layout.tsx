import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, JetBrains_Mono, Unbounded, Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/services-content";
import "./globals.css";

// ===== Design-system fonts =====
// Heading typeface — "Unbounded". Body typeface — "Inter".
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Ahmad Raza | Software Engineer & Digital Solutions",
    template: "%s | Ahmad Raza",
  },

  description:
    "Ahmad Raza is a Software Engineer from Faisalabad, Pakistan, providing web development, mobile app development, AI solutions, custom software, SEO, and UI/UX services for businesses worldwide.",

  authors: [
    {
      name: "Ahmad Raza",
      url: SITE_URL,
    },
  ],

  creator: "Ahmad Raza",
  publisher: "Ahmad Raza",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),

  openGraph: {
    title: "Ahmad Raza | Software Engineer & Digital Solutions",
    description:
      "Web development, mobile apps, AI solutions, custom software, SEO, and UI/UX services by Ahmad Raza.",
    url: SITE_URL,
    siteName: "Ahmad Raza",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Raza — Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ahmad Raza | Software Engineer & Digital Solutions",
    description:
      "Web development, mobile apps, AI solutions, custom software, SEO, and UI/UX services by Ahmad Raza.",
    images: ["/og-image.png"],
  },
};

// JSON-LD structured data — helps Google show a rich "Person" result.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmad Raza",
  jobTitle: "Software Engineer",
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: [
    GITHUB_URL,
    LINKEDIN_URL,
  ],
  knowsAbout: [
    "Web Development",
    "Software Engineering",
    "Mobile App Development",
    "Artificial Intelligence",
    "AI Integration",
    "SEO",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
};

// ProfessionalService schema — ties the "buildbyraza" brand to the six
// service pages and the areas served, so Google can connect the entity to
// its offerings rather than treating each service page in isolation.
const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "buildbyraza",
  alternateName: "Ahmad Raza — Software Engineer",
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  image: `${SITE_URL}/og-image.png`,
  priceRange: "$$",
  founder: { "@type": "Person", name: "Ahmad Raza" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software engineering services",
    itemListElement: SERVICE_PAGES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.seoDescription,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
  },
};

// WebSite schema — lets Google associate the domain with the brand/name.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ahmad Raza",
  alternateName: "buildbyraza",
  url: SITE_URL,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: "Ahmad Raza",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* If JS is disabled or fails, don't leave scroll-reveal content hidden. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${unbounded.variable} ${inter.variable} ${instrument.variable} ${jetbrains.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TWL3T8CSLY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TWL3T8CSLY');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
