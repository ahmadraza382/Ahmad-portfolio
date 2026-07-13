// ============================================================
// One-shot: organise project categories + featured flags to match
// Ahmad's services. Run:  node supabase/set-filters.mjs
// Requires the `filters` column (run supabase/schema.sql first).
// Safe: only updates `filters`/`filter`/`featured` on matched titles.
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

// Most-specific rules first. [title match (lowercase), categories, featured]
// Categories must match the service titles in lib/data.ts.
const RULES = [
  ["wordrig admin",        ["SaaS Products"],                          false],
  ["wordrig",              ["SaaS Products"],                          true],   // flagship — 10,000+ learners
  ["dentistry99 ims",      ["SaaS Products"],                          false],
  ["dentistry99 vendor",   ["Custom Websites"],                        false],
  ["dentistry99",          ["E-commerce & Shopify"],                   true],   // 12,000+ professionals
  ["college management",   ["Custom Websites"],                        true],   // in production, govt college
  ["linkshort",            ["SaaS Products", "Custom Websites"],       true],   // solo-built SaaS
  ["tooldit",              ["Custom Websites"],                        false],  // 77 free online tools
  ["described",            ["SaaS Products"],                          false],
  ["guru technical",       ["Custom Websites"],                        false],
  ["ferrano",              ["Custom Websites"],                        false],
  ["links media",          ["WordPress"],                              false],
  ["mian umair",           ["WordPress"],                              false],
  ["beat2k",               ["E-commerce & Shopify", "Custom Websites"], false],
];

const { data, error } = await supabase.from("projects").select("id, slug, title, filter, filters, featured");
if (error) { console.error("Fetch failed:", error.message); process.exit(1); }

const same = (a, b) => JSON.stringify(a ?? []) === JSON.stringify(b ?? []);

let changed = 0;
for (const row of data) {
  const t = (row.title || "").toLowerCase();
  const rule = RULES.find(([needle]) => t.includes(needle));
  if (!rule) { console.log(`- skip (no rule): ${row.title}`); continue; }
  const [, filters, featured] = rule;
  if (same(row.filters, filters) && row.featured === featured) {
    console.log(`= ok: ${row.title} [${filters.join(", ")}${featured ? " · featured" : ""}]`);
    continue;
  }
  const { error: upErr } = await supabase
    .from("projects")
    .update({ filters, filter: filters[0] ?? "", featured })
    .eq("id", row.id);
  if (upErr) { console.error(`! failed: ${row.title}: ${upErr.message}`); continue; }
  console.log(`~ updated: ${row.title} -> ${filters.join(", ")}${featured ? " · FEATURED" : ""}`);
  changed++;
}
console.log(`\nDone — ${changed} project(s) updated.`);
console.log("Featured on home: WordRig, Dentistry99, LinkShort, College Management System.");
console.log("Change any of this anytime from /admin (Categories dropdown + featured checkbox).");
