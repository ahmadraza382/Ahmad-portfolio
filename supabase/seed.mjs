// ============================================================
// Seed Supabase `projects` table from the built-in sample data.
// Usage:  node supabase/seed.mjs   (needs .env.local with Supabase keys)
// ============================================================
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Tiny .env.local loader (no extra dependency)
try {
  const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing Supabase env vars. Fill NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Real projects (kept in sync with lib/data.ts)
const PROJECTS = [
  { slug:"linkshort", no:"01", mark:"◆", shot:"dashboard", category:"Online Product", filter:"SaaS Products", filters:["SaaS Products","Custom Websites"], featured:true, bg:"var(--sand)", title:"LinkShort", blurb:"A link-management product for businesses: short branded links on your own domain, click tracking, and monthly subscriptions.", tags:["Branded links","Click tracking","Subscriptions"], year:"2026", role:"Full-stack · solo build", live:"", summary:"I built every part myself: sign-ups, payments, click tracking, and the admin area.", problem:"Businesses share links everywhere but get no branding and no idea what happens after the click. LinkShort gives them short links on their own domain and shows who clicked, from where, on what device.", process:["Designed the backend on Spring Boot (Java 21) with MariaDB, Redis caching and versioned database migrations.","Locked it down with secure logins, per-customer API keys, rate limiting and abuse protection.","Built DNS-verified custom branded domains so customers can shorten links on their own domain.","Shipped per-click analytics — location, device, browser, OS, timing — with interactive Recharts dashboards.","Integrated Paddle subscriptions and built the admin back office; deployed with Docker and GitHub Actions."], stack:["Next.js","TypeScript","Tailwind + shadcn/ui","Spring Boot · Java 21","MariaDB · Redis","Paddle · Docker · GitHub Actions"], results:[["Your domain","short branded links"],["Every click","location, device & time tracked"],["Built solo","sign-ups → payments → admin"]] },
  { slug:"college-management-system", no:"02", mark:"❖", shot:"app", category:"Management System · Live", filter:"Custom Websites", filters:["Custom Websites"], featured:true, bg:"var(--soft)", title:"College Management System", blurb:"A full management platform running in production at Government Municipal Graduate College, Faisalabad — with real staff and real student data.", tags:["Admissions","Fees","Timetables","AI Chatbot"], year:"2025—26", role:"Full-stack · Final-year project", live:"", summary:"Not a demo — a system a real college runs on: admissions, fees, timetables and records for five different roles.", problem:"The college managed admissions, fees and records manually across paper and spreadsheets — slow, error-prone and impossible to audit.", process:["Modelled the whole domain: admissions, fee management, timetables, medical records and support tickets.","Built role-based access for five user types — Admin, Principal, Clerk, Teacher and Student.","Added timetable conflict detection, an AI chatbot for common queries, and appeals & support tickets.","Shipped reporting in four formats — PDF, Word, Excel and CSV — and deployed it for daily use."], stack:["Next.js","Node / Express","MongoDB","Tailwind"], results:[["In production","at a government college"],["5 user types","from principal to students"],["4 formats","PDF · Word · Excel · CSV reports"]] },
  { slug:"beat2k-studio", no:"03", mark:"✦", shot:"store", category:"Online Store", filter:"E-commerce & Shopify", filters:["E-commerce & Shopify","Custom Websites"], featured:true, bg:"var(--sand)", title:"Beat2K Studio", blurb:"An online beats store, rebuilt from a slow WordPress site into a fast custom storefront with its own music player.", tags:["Online store","Custom player","Rebuild"], year:"2025—26", role:"Frontend · at Devniti", live:"", summary:"Took a slow WordPress site and rebuilt it as a fast custom store for exclusive beats.", problem:"The old WordPress site was slow and hard to customise, and the listening experience was poor for a site that sells beats.", process:["Rebuilt the UI in React + Tailwind, page by page, keeping the catalogue intact.","Built a custom audio player — play/pause, track switching, responsive controls — from scratch.","Tuned the layout mobile-first so browsing and previewing beats feels instant on any device."], stack:["Next.js","TypeScript","Tailwind CSS"], results:[["Rebuilt","from slow WordPress"],["Custom player","play, pause, switch tracks"],["Phone-ready","works great on mobile"]] },
  { slug:"described-ai", no:"04", mark:"◍", shot:"app", category:"AI Product", filter:"SaaS Products", filters:["SaaS Products"], featured:false, bg:"var(--soft)", title:"Described-AI", blurb:"A Canva-style design tool powered by AI, with separate dashboards for each type of user.", tags:["AI design","Dashboards","Web product"], year:"2025—26", role:"Frontend · at Devniti", live:"", summary:"The frontend of an AI design tool, built to grow without being rebuilt.", problem:"A design tool has to feel as polished as Canva, and the code underneath has to keep up with new features every month.", process:["Structured the app on Makerkit's production architecture instead of hand-rolling auth and billing scaffolding.","Built role- and feature-based routing with distinct dashboards per user type.","Customised the component system to the product's own design language."], stack:["Next.js","Makerkit","TypeScript","Tailwind"], results:[["Per-user","dashboards for each role"],["Solid base","built to add features fast"],["Canva-style","editing experience"]] },
  { slug:"luxeurs", no:"05", mark:"◈", shot:"store", category:"Online Store", filter:"E-commerce & Shopify", filters:["E-commerce & Shopify","Custom Websites"], featured:false, bg:"var(--sand)", title:"Luxeurs", blurb:"A fashion store with instant page loads, a live cart that stays in sync, and card + PayPal checkout.", tags:["Fashion store","Live cart","Card + PayPal"], year:"2025", role:"Full-stack", live:"", summary:"Built so product pages load instantly and the catalogue always stays fresh.", problem:"Product pages change often, but the store still has to load fast. Fully static goes stale; fully dynamic feels slow.", process:["Split pages across SSR, SSG and ISR based on how often each changes.","Managed state with Redux Toolkit + React Query; added shimmer UI and lazy loading.","Integrated Stripe and PayPal checkout with a Firestore-powered real-time cart and wishlist."], stack:["Next.js","Redux Toolkit","React Query","Stripe · PayPal","Firestore"], results:[["Instant","page loads"],["Card + PayPal","both ways to pay"],["Live cart","syncs in real time"]] },
  { slug:"ar-hospitals", no:"06", mark:"⬢", shot:"app", category:"Hospital System", filter:"Custom Websites", filters:["Custom Websites"], featured:false, bg:"var(--soft)", title:"AR Hospitals", blurb:"A hospital platform — patient registration, appointments, medical records, billing and lab reports.", tags:["Appointments","Records","Billing"], year:"2025", role:"Full-stack", live:"https://ar-hospital-amber.vercel.app/", summary:"A healthcare management build covering the patient journey from registration to lab reports.", problem:"Clinics juggle appointments, records and billing across disconnected tools, which makes daily work slower for everyone.", process:["Built patient registration and appointment scheduling with real-time updates.","Structured medical records and lab reports with secure storage.","Added billing and invoicing so the front desk works from one screen."], stack:["Next.js","Node / Express","MongoDB","Tailwind"], results:[["Live","see it online"],["Complete","registration → labs → billing"],["Real-time","appointment updates"]] },
];

const rows = PROJECTS.map((p, i) => ({ ...p, sort: i }));

function explain(step, message) {
  console.error(step + " failed: " + message);
  if (/fetch failed/i.test(message)) {
    console.error([
      "",
      '  "fetch failed" means the request never reached Supabase. Common causes:',
      "   1. The Supabase project is PAUSED (free projects pause after ~1 week",
      "      of inactivity). Open https://supabase.com/dashboard -> your project",
      '      -> click "Restore" / "Resume", wait ~2 minutes, then retry.',
      "   2. No internet / VPN / firewall blocking *.supabase.co.",
      "   3. Wrong NEXT_PUBLIC_SUPABASE_URL in .env.local.",
      "  Quick check: open " + url + " in your browser - if the project is awake",
      "  you should see a JSON response, not a connection error.",
      "  Then run:  npm run test:connection",
    ].join("\n"));
  }
  process.exit(1);
}

// NOTE: cleanup disabled — the database now holds the REAL project list
// (added via /admin). Seeding only upserts these base rows by slug and will
// never delete anything else.

const { error } = await supabase.from("projects").upsert(rows, { onConflict: "slug" });
if (error) {
  if (/filters/i.test(error.message)) {
    console.error(
      "The `filters` column is missing — run supabase/schema.sql in the Supabase SQL editor first, then retry."
    );
    process.exit(1);
  }
  explain("Seed", error.message);
}

console.log("Seeded " + rows.length + " projects (existing rows upserted by slug; nothing deleted)");
