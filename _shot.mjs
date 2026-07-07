import { chromium as pwChromium } from "playwright";
import sparticuz from "@sparticuz/chromium";

const URL = process.env.SHOT_URL || "http://localhost:3000/";
const OUT = process.env.SHOT_OUT || "/tmp/home.png";
const VIEWPORT_W = parseInt(process.env.SHOT_W || "1440", 10);

async function waitForServer(url, ms = 90000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url, { method: "GET" });
      if (r.status > 0) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 1500));
  }
  return false;
}

const execPath = await sparticuz.executablePath();
console.log("CHROMIUM:", execPath);

console.log("Waiting for server...");
const ok = await waitForServer(URL);
console.log("Server reachable:", ok);

const browser = await pwChromium.launch({
  executablePath: execPath,
  headless: true,
  args: [
    ...sparticuz.args,
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--font-render-hinting=none",
  ],
});

const page = await browser.newPage({
  viewport: { width: VIEWPORT_W, height: 900 },
  deviceScaleFactor: 2,
});

// give the page generous time; first compile in dev is slow
await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 }).catch((e) =>
  console.log("goto warning:", e.message)
);
// let hero animations settle
await page.waitForTimeout(2500);

// full page screenshot
await page.screenshot({ path: OUT, fullPage: true });
console.log("SAVED_FULL:", OUT);

// also capture just the first viewport (above the fold)
await page.screenshot({ path: OUT.replace(/\.png$/, "_fold.png"), fullPage: false });
console.log("SAVED_FOLD:", OUT.replace(/\.png$/, "_fold.png"));

await browser.close();
console.log("DONE");
