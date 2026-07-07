import type { Metadata } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
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
    default: SITE_NAME,
    template: "%s — Ahmad Raza",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Full-Stack Developer",
    "Web Development",
    "Mobile App Development",
    "SaaS Development",
    "E-commerce",
    "Shopify",
    "WordPress",
    "SEO",
    "Meta Ads",
    "React",
    "Next.js",
    "Faisalabad",
    "Pakistan",
  ],
  authors: [{ name: "Ahmad Raza", url: SITE_URL }],
  creator: "Ahmad Raza",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Ahmad Raza",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

// JSON-LD structured data — helps Google show a rich "Person" result.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmad Raza",
  jobTitle: "Full-Stack Developer",
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "SaaS Development",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${manrope.variable} ${instrument.variable} ${jetbrains.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
