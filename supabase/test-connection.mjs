// ============================================================
// One-shot health check — run on YOUR computer (it has internet).
//   node supabase/test-connection.mjs
// Verifies: env present, Supabase reachable, both tables exist,
// service-role key works (write test), and SMTP login succeeds.
// ============================================================
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));

// load .env.local
try {
  const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch {
  console.log("⚠  No .env.local found.");
}

const ok = (m) => console.log("✓ " + m);
const bad = (m) => console.log("✗ " + m);
const info = (m) => console.log("  " + m);

let failures = 0;

// ---- 1. env vars ----
console.log("\n[1] Environment variables");
const need = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"];
for (const k of need) {
  const v = process.env[k] || "";
  if (!v || v.startsWith("your-")) {
    bad(`${k} is missing or still a placeholder`);
    failures++;
  } else {
    ok(`${k} set`);
  }
}
if (process.env.AUTH_SECRET?.includes("change-this")) {
  bad("AUTH_SECRET is still the placeholder — change it.");
  failures++;
} else if (process.env.AUTH_SECRET) {
  ok("AUTH_SECRET set");
}

// ---- 2. Supabase ----
console.log("\n[2] Supabase");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (url && (serviceKey && !serviceKey.startsWith("your-")) && anonKey) {
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // projects table
  {
    const { error, count } = await admin
      .from("projects")
      .select("*", { count: "exact", head: true });
    if (error) {
      bad(`projects table: ${error.message}`);
      info("→ Run supabase/schema.sql in the Supabase SQL editor.");
      failures++;
    } else {
      ok(`projects table OK (${count ?? 0} rows)`);
      if ((count ?? 0) === 0) info("→ It's empty. Run: npm run seed");
    }
  }

  // contact_messages table
  {
    const { error, count } = await admin
      .from("contact_messages")
      .select("*", { count: "exact", head: true });
    if (error) {
      bad(`contact_messages table: ${error.message}`);
      failures++;
    } else {
      ok(`contact_messages table OK (${count ?? 0} rows)`);
    }
  }

  // write test (service-role can insert + delete)
  {
    const testSlug = "__healthcheck__" + Date.now();
    const { error: insErr } = await admin
      .from("projects")
      .insert({ slug: testSlug, no: "00", category: "test", filter: "Web Apps", title: "Health Check", blurb: "temp" });
    if (insErr) {
      bad(`write test failed: ${insErr.message}`);
      info("→ Is SUPABASE_SERVICE_ROLE_KEY the *service_role* key (not anon)?");
      failures++;
    } else {
      ok("write test passed (insert)");
      await admin.from("projects").delete().eq("slug", testSlug);
      ok("cleanup passed (delete)");
    }
  }
} else {
  bad("Skipping Supabase checks — fill URL + service-role key first.");
  failures++;
}

// ---- 3. SMTP ----
console.log("\n[3] SMTP (email)");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && !SMTP_USER.startsWith("your-")) {
  if (SMTP_HOST.startsWith("http")) {
    bad(`SMTP_HOST should be a hostname like smtp.gmail.com — got "${SMTP_HOST}"`);
    failures++;
  } else {
    try {
      const t = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await t.verify();
      ok(`SMTP login OK (${SMTP_HOST})`);
    } catch (e) {
      bad(`SMTP failed: ${e.message}`);
      info("→ For Gmail use an App Password (not your normal password) + smtp.gmail.com.");
      failures++;
    }
  }
} else {
  info("SMTP not fully set — skipping (contact emails won't send until configured).");
}

console.log("\n" + (failures === 0 ? "✅ All checks passed." : `⚠  ${failures} issue(s) above to fix.`));
process.exit(failures === 0 ? 0 : 1);
