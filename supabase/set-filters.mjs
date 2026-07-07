// ============================================================
// One-shot: organise project filters + featured flags to match
// Ahmad's services. Run:  node supabase/set-filters.mjs
// Safe: only updates `filter` and `featured` on matched titles.
// ============================================================
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch { /* ignore */ }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) { console.error("Missing Supabase env vars."); process.exit(1); }
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Most-specific rules first. [title match (lowercase), filter, featured]
const RULES = [
  ["wordrig admin",        "SaaS",       false],
  ["wordrig",              "SaaS",       true],   // flagship — 10,000+ learners
  ["dentistry99 ims",      "SaaS",       false],
  ["dentistry99 vendor",   "Web Apps",   false],
  ["dentistry99",          "E-commerce", true],   // 12,000+ professionals
  ["college management",   "Web Apps",   true],   // in production, govt college
  ["linkshort",            "SaaS",       true],   // solo-built SaaS
  ["tooldit",              "Web Apps",   false],  // 77 free online tools
  ["described",            "AI",         false],
  ["guru technical",       "Websites",   false],
  ["ferrano",              "Websites",   false],
  ["links media",          "WordPress",  false],
  ["mian umair",           "WordPress",  false],
  ["beat2k",               "E-commerce", false],
];

const { data, error } = await supabase.from("projects").select("id, slug, title, filter, featured");
if (error) { console.error("Fetch failed:", error.message); process.exit(1); }

let changed = 0;
for (const row of data) {
  const t = (row.title || "").toLowerCase();
  const rule = RULES.find(([needle]) => t.includes(needle));
  if (!rule) { console.log(`- skip (no rule): ${row.title}`); continue; }
  const [, filter, featured] = rule;
  if (row.filter === filter && row.featured === featured) {
    console.log(`= ok: ${row.title} [${filter}${featured ? " · featured" : ""}]`);
    continue;
  }
  const { error: upErr } = await supabase
    .from("projects")
    .update({ filter, featured })
    .eq("id", row.id);
  if (upErr) { console.error(`! failed: ${row.title}: ${upErr.message}`); continue; }
  console.log(`~ updated: ${row.title} -> ${filter}${featured ? " · FEATURED" : ""}`);
  changed++;
}
console.log(`\nDone — ${changed} project(s) updated.`);
console.log("Featured on home: WordRig, Dentistry99, LinkShort, College Management System.");
console.log("Change any of this anytime from /admin (filter dropdown + featured checkbox).");
