// ============================================================
// Site-wide constants. Set NEXT_PUBLIC_SITE_URL in production
// (e.g. https://ahmadraza.com) — used for canonical URLs,
// Open Graph, sitemap and robots.
// ============================================================

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ahmad-raza-1.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Ahmad Raza — Full-Stack Developer";

export const SITE_DESCRIPTION =
  "Full-stack developer from Faisalabad, Pakistan. Websites, mobile apps, online stores, SaaS products, WordPress, SEO and Meta ads — from first idea to launch.";

export const CONTACT_EMAIL = "382ahmadraza@gmail.com";
export const GITHUB_URL = "https://github.com/ahmadraza382";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ahmadraza161/";
