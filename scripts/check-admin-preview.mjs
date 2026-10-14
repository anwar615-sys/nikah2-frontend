// Proves where admin preview mode (no login + sample data) can appear.
//
// 1. A normal production build (Render, AWS, plain `npm run build`) must
//    contain NO preview code or sample data, even if VITE_ADMIN_PREVIEW=true
//    is set on the host.
// 2. The Vercel demo build (VITE_ADMIN_DEMO=true, set only in vercel.json)
//    must contain it, so the hosted demo dashboard works.
//
// Run: npm run check:admin-preview
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const MARKERS = ["preview-admin@nikha2.local", "Sample photo", "Rukhsar", "Preview has no sample data"];

function build(env) {
  const out = mkdtempSync(join(tmpdir(), "nikha2-preview-check-"));
  try {
    const clean = { ...process.env };
    delete clean.VITE_ADMIN_PREVIEW;
    delete clean.VITE_ADMIN_DEMO;
    execSync(`npx vite build --outDir "${out}" --emptyOutDir --logLevel error`, { stdio: "inherit", env: { ...clean, ...env } });
    return readdirSync(join(out, "assets")).filter((f) => f.endsWith(".js"))
      .map((f) => readFileSync(join(out, "assets", f), "utf8")).join("\n");
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
}

let failed = false;
const normal = build({ VITE_ADMIN_PREVIEW: "true" });
if (!normal.includes("/admin/analytics")) throw new Error("Sanity check failed: admin code not found in the build.");
const leaked = MARKERS.filter((m) => normal.includes(m));
if (leaked.length) {
  console.error(`FAIL: normal production build contains admin preview code: ${leaked.join(", ")}`);
  failed = true;
} else console.log("OK: normal production build (Render/AWS) contains no admin preview code or sample data.");

const demo = build({ VITE_ADMIN_DEMO: "true" });
const missing = MARKERS.filter((m) => !demo.includes(m));
if (missing.length) {
  console.error(`FAIL: Vercel demo build is missing preview code: ${missing.join(", ")}`);
  failed = true;
} else console.log("OK: Vercel demo build includes the sample-data admin dashboard.");

process.exit(failed ? 1 : 0);
