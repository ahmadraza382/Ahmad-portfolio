// ============================================================
// Site-wide constants. NEXT_PUBLIC_SITE_URL (env) overrides the
// default below — used for canonical URLs, Open Graph, sitemap
// and robots. Keep the default in sync with the live domain.
// ============================================================

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://buildbyraza.site"
).replace(/\/+$/, "");

export const SITE_NAME = "Ahmad Raza — Full-Stack Developer";

export const SITE_DESCRIPTION =
  "Full-stack developer from Faisalabad, Pakistan. Websites, mobile apps, online stores, SaaS products, WordPress, SEO and Meta ads — from first idea to launch.";

export const CONTACT_EMAIL = "382ahmadraza@gmail.com";
export const GITHUB_URL = "https://github.com/ahmadraza382";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ahmadraza161/";
