// ============================================================
// Portfolio content — single source of truth.
// Edit these arrays to update the site; the components read from here.
// All content below is REAL — keep it that way. No invented metrics.
// ============================================================

export interface Service {
  no: string;
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Value {
  title: string;
  desc: string;
}

export interface TimelineEntry {
  year: string;
  role: string;
  desc: string;
}

export interface Project {
  slug: string;
  no: string;
  mark: string;
  shot: string;
  category: string;
  filter: string;
  featured: boolean;
  bg: string;
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  role: string;
  live: string;
  /** Cover image URL — shown on cards and as the case-study hero. */
  cover?: string;
  /** Extra screenshot URLs — shown in the case-study image grid. */
  shots?: string[];
  summary: string;
  problem: string;
  process: string[];
  stack: string[];
  results: [string, string][];
  /** Optional extra free-form blocks (heading + body), added from the admin. */
  sections?: { heading: string; body: string }[];
}

export const SERVICES: Service[] = [
  {
    no: "01",
    icon: "❖",
    title: "Websites",
    desc: "Business websites that look premium, load fast and work perfectly on phones. Design included if you need it.",
  },
  {
    no: "02",
    icon: "◐",
    title: "Mobile Apps",
    desc: "Android and iOS apps from one codebase with React Native — native feel, both app stores, easier to maintain.",
  },
  {
    no: "03",
    icon: "⬡",
    title: "Desktop Apps",
    desc: "Windows and Mac software for your business: internal tools, dashboards and systems your team runs every day.",
  },
  {
    no: "04",
    icon: "⌘",
    title: "SaaS Products",
    desc: "Have an idea people would pay monthly for? I build the whole product: accounts, payments, subscriptions, your admin area. WordRig and LinkShort were built exactly this way.",
  },
  {
    no: "05",
    icon: "✦",
    title: "E-commerce & Shopify",
    desc: "Online stores that make buying easy — custom builds or Shopify setups, with payments, shipping and inventory sorted. Dentistry99, which I build for, serves 12,000+ professionals.",
  },
  {
    no: "06",
    icon: "◈",
    title: "WordPress",
    desc: "WordPress sites built, fixed or sped up: themes, plugins, performance — or a full modern rebuild if the old site is holding you back.",
  },
  {
    no: "07",
    icon: "▲",
    title: "SEO",
    desc: "Get found on Google. Technical fixes, on-page work and content planning so customers find you before your competitors.",
  },
  {
    no: "08",
    icon: "✳",
    title: "Meta Ads",
    desc: "Facebook and Instagram campaigns that bring customers, not just likes: setup, targeting, creatives and clear monthly reporting.",
  },
];

export const SKILLS: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "Tailwind CSS",
  "Redis",
  "Docker",
  "Spring Boot",
  "React Native",
];

// Grouped tech stack — shown on the About page ("Full toolkit").
export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
      "HTML5", "CSS3", "React Native", "Redux", "Zustand", "Zod",
      "shadcn/ui", "TanStack",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "NestJS", "Java", "Spring Boot", "Python"],
  },
  {
    title: "Desktop Apps",
    items: ["Electron", "Tauri"],
  },
  {
    title: "Database",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "MariaDB", "Redis"],
  },
  {
    title: "ORM",
    items: ["Prisma", "Mongoose"],
  },
  {
    title: "Tools & Other",
    items: ["Git", "GitHub", "Docker", "Vercel", "WordPress", "Makerkit", "Prompt Engineering", "DSA"],
  },
];

// Add REAL client quotes here (name + role + permission).
// Until then, the section shows the STATEMENTS below instead.
export const TESTIMONIALS: Testimonial[] = [];

// Ahmad's own working principles — shown in the big quote section
// until real client testimonials are added above.
export const STATEMENTS: string[] = [
  "I treat your project like my own product — my name goes on it too.",
  "Deadlines are promises. I do not make ones I cannot keep.",
  "Good work brings the next client. That has been my whole marketing plan.",
];

export const VALUES: Value[] = [
  {
    title: "Small things matter",
    desc: "Empty states, loading states, what happens when the API fails. Most complaints users have live there, so I handle them up front.",
  },
  {
    title: "Ship, then improve",
    desc: "I would rather put a working version in front of you this week than a perfect one next month. Feedback beats guessing.",
  },
  {
    title: "Straight answers",
    desc: "If something will take three weeks, I say three weeks. If a feature is not worth building, I will tell you that too.",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2026—now",
    role: "Full-Stack Developer · Techzone Media",
    desc: "Building complete web apps with React, Next.js, Node and TypeScript. Built LinkShort here: a URL-shortening SaaS with billing, custom domains and click analytics.",
  },
  {
    year: "2025—26",
    role: "Frontend Developer · Devniti (remote)",
    desc: "Shipped Beat2K Studio, a WordPress-to-Next.js marketplace migration with a custom audio player, and the frontend of an AI design platform.",
  },
  {
    year: "2025",
    role: "Frontend Developer · Fuzion Dev",
    desc: "Started as an intern, stayed on as a junior developer. Built responsive pages and reusable components for a live real-estate platform.",
  },
  {
    year: "2023—24",
    role: "MERN Stack Diploma · SMIT",
    desc: "Where it really started. A one-year web and mobile development course at Saylani Mass IT Training, alongside my degree — learned the MERN stack by building real projects, and knew this was what I wanted to do.",
  },
  {
    year: "2022—26",
    role: "BS Computer Science · GCU Faisalabad",
    desc: "CGPA 3.5/4.0. My final-year project, a college management system, now runs in production at a government college. Also taught DSA at iCodeGuru and competed in hackathons (Harvard CS50x, UC Berkeley Calico, lablab.ai).",
  },
];

export const FILTERS: string[] = ["All", "Websites", "Web Apps", "SaaS", "E-commerce", "WordPress", "AI"];

export const PROJECTS: Project[] = [
  {
    slug: "linkshort",
    no: "01",
    mark: "◆",
    shot: "dashboard",
    category: "Online Product",
    filter: "SaaS",
    featured: true,
    bg: "var(--sand)",
    title: "LinkShort",
    blurb:
      "A link-management product for businesses: short branded links on your own domain, click tracking, and monthly subscriptions.",
    tags: ["Branded links", "Click tracking", "Subscriptions"],
    year: "2026",
    role: "Full-stack · solo build",
    live: "",
    summary:
      "I built every part myself: sign-ups, payments, click tracking, and the admin area.",
    problem:
      "Businesses share links everywhere but get no branding and no idea what happens after the click. LinkShort gives them short links on their own domain and shows who clicked, from where, on what device.",
    process: [
      "Designed the backend on Spring Boot (Java 21) with MariaDB, Redis caching and versioned database migrations.",
      "Locked it down with secure logins, per-customer API keys, rate limiting and abuse protection.",
      "Built DNS-verified custom branded domains so customers can shorten links on their own domain.",
      "Shipped per-click analytics — location, device, browser, OS, timing — with interactive Recharts dashboards.",
      "Integrated Paddle subscriptions and built the admin back office; deployed with Docker and GitHub Actions.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind + shadcn/ui",
      "Spring Boot · Java 21",
      "MariaDB · Redis",
      "Paddle · Docker · GitHub Actions",
    ],
    results: [
      ["Your domain", "short branded links"],
      ["Every click", "location, device & time tracked"],
      ["Built solo", "sign-ups → payments → admin"],
    ],
  },
  {
    slug: "college-management-system",
    no: "02",
    mark: "❖",
    shot: "app",
    category: "Management System · Live",
    filter: "Web Apps",
    featured: true,
    bg: "var(--soft)",
    title: "College Management System",
    blurb:
      "A full management platform running in production at Government Municipal Graduate College, Faisalabad — with real staff and real student data.",
    tags: ["Admissions", "Fees", "Timetables", "AI Chatbot"],
    year: "2025—26",
    role: "Full-stack · Final-year project",
    live: "",
    summary:
      "Not a demo — a system a real college runs on: admissions, fees, timetables and records for five different roles.",
    problem:
      "The college managed admissions, fees and records manually across paper and spreadsheets — slow, error-prone and impossible to audit.",
    process: [
      "Modelled the whole domain: admissions, fee management, timetables, medical records and support tickets.",
      "Built role-based access for five user types — Admin, Principal, Clerk, Teacher and Student.",
      "Added timetable conflict detection, an AI chatbot for common queries, and appeals & support tickets.",
      "Shipped reporting in four formats — PDF, Word, Excel and CSV — and deployed it for daily use.",
    ],
    stack: ["Next.js", "Node / Express", "MongoDB", "Tailwind"],
    results: [
      ["In production", "at a government college"],
      ["5 user types", "from principal to students"],
      ["4 formats", "PDF · Word · Excel · CSV reports"],
    ],
  },
  {
    slug: "beat2k-studio",
    no: "03",
    mark: "✦",
    shot: "store",
    category: "Online Store",
    filter: "E-commerce",
    featured: true,
    bg: "var(--sand)",
    title: "Beat2K Studio",
    blurb:
      "An online beats store, rebuilt from a slow WordPress site into a fast custom storefront with its own music player.",
    tags: ["Online store", "Custom player", "Rebuild"],
    year: "2025—26",
    role: "Frontend · at Devniti",
    live: "",
    summary:
      "Took a slow WordPress site and rebuilt it as a fast custom store for exclusive beats.",
    problem:
      "The old WordPress site was slow and hard to customise, and the listening experience was poor for a site that sells beats.",
    process: [
      "Rebuilt the UI in React + Tailwind, page by page, keeping the catalogue intact.",
      "Built a custom audio player — play/pause, track switching, responsive controls — from scratch.",
      "Tuned the layout mobile-first so browsing and previewing beats feels instant on any device.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    results: [
      ["Rebuilt", "from slow WordPress"],
      ["Custom player", "play, pause, switch tracks"],
      ["Phone-ready", "works great on mobile"],
    ],
  },
  {
    slug: "described-ai",
    no: "04",
    mark: "◍",
    shot: "app",
    category: "AI Product",
    filter: "AI",
    featured: false,
    bg: "var(--soft)",
    title: "Described-AI",
    blurb:
      "A Canva-style design tool powered by AI, with separate dashboards for each type of user.",
    tags: ["AI design", "Dashboards", "Web product"],
    year: "2025—26",
    role: "Frontend · at Devniti",
    live: "",
    summary:
      "The frontend of an AI design tool, built to grow without being rebuilt.",
    problem:
      "A design tool has to feel as polished as Canva, and the code underneath has to keep up with new features every month.",
    process: [
      "Structured the app on Makerkit's production architecture instead of hand-rolling auth and billing scaffolding.",
      "Built role- and feature-based routing with distinct dashboards per user type.",
      "Customised the component system to the product's own design language.",
    ],
    stack: ["Next.js", "Makerkit", "TypeScript", "Tailwind"],
    results: [
      ["Per-user", "dashboards for each role"],
      ["Solid base", "built to add features fast"],
      ["Canva-style", "editing experience"],
    ],
  },
  {
    slug: "luxeurs",
    no: "05",
    mark: "◈",
    shot: "store",
    category: "Online Store",
    filter: "E-commerce",
    featured: false,
    bg: "var(--sand)",
    title: "Luxeurs",
    blurb:
      "A fashion store with instant page loads, a live cart that stays in sync, and card + PayPal checkout.",
    tags: ["Fashion store", "Live cart", "Card + PayPal"],
    year: "2025",
    role: "Full-stack",
    live: "",
    summary:
      "Built so product pages load instantly and the catalogue always stays fresh.",
    problem:
      "Product pages change often, but the store still has to load fast. Fully static goes stale; fully dynamic feels slow.",
    process: [
      "Split pages across SSR, SSG and ISR based on how often each changes.",
      "Managed state with Redux Toolkit + React Query; added shimmer UI and lazy loading.",
      "Integrated Stripe and PayPal checkout with a Firestore-powered real-time cart and wishlist.",
    ],
    stack: ["Next.js", "Redux Toolkit", "React Query", "Stripe · PayPal", "Firestore"],
    results: [
      ["Instant", "page loads"],
      ["Card + PayPal", "both ways to pay"],
      ["Live cart", "syncs in real time"],
    ],
  },
  {
    slug: "ar-hospitals",
    no: "06",
    mark: "⬢",
    shot: "app",
    category: "Hospital System",
    filter: "Web Apps",
    featured: false,
    bg: "var(--soft)",
    title: "AR Hospitals",
    blurb:
      "A hospital platform — patient registration, appointments, medical records, billing and lab reports.",
    tags: ["Appointments", "Records", "Billing"],
    year: "2025",
    role: "Full-stack",
    live: "https://ar-hospital-amber.vercel.app/",
    summary:
      "A healthcare management build covering the patient journey from registration to lab reports.",
    problem:
      "Clinics juggle appointments, records and billing across disconnected tools, which makes daily work slower for everyone.",
    process: [
      "Built patient registration and appointment scheduling with real-time updates.",
      "Structured medical records and lab reports with secure storage.",
      "Added billing and invoicing so the front desk works from one screen.",
    ],
    stack: ["Next.js", "Node / Express", "MongoDB", "Tailwind"],
    results: [
      ["Live", "see it online"],
      ["Complete", "registration → labs → billing"],
      ["Real-time", "appointment updates"],
    ],
  },
];

// ---- Extended team ------------------------------------------------
// Shown under Services. Edit areas to match your actual team.
export const TEAM_BLURB =
  "Some projects need more than one person. For those I bring in people I work with regularly, across design, apps and marketing. You talk to one person and the whole thing gets delivered.";

export const TEAM_AREAS: string[] = [
  "UI/UX Design",
  "Mobile & Desktop Apps",
  "SEO & Content",
  "Meta Ads",
];

export const getFeatured = () => PROJECTS.filter((p) => p.featured);
export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug: string) => {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(Math.max(idx, 0) + 1) % PROJECTS.length];
};
