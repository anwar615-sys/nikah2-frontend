// Proves where the public-beta code can appear.
//
// 1. A normal production build (Render, AWS, plain `npm run build`) must contain
//    no beta code: no Supabase connector, no beta project address or key, no
//    beta checkout, even if VITE_BETA is set to something other than "true".
// 2. The beta build (VITE_BETA=true, set only in vercel.json) must contain it.
//
// Run: npm run check:beta
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const MARKERS = [
  "myniyprtyewhogrjkwcj", // beta project address
  "sb_publishable_", // beta public key
  "nikha2-auth", // beta session storage key
  "Beta checkout – no charge",
  "Voice and video calls arrive after the beta.",
];

function build(env) {
  const out = mkdtempSync(join(tmpdir(), "nikha2-beta-check-"));
  try {
    const clean = { ...process.env };
    delete clean.VITE_BETA;
    execSync(`npx vite build --outDir "${out}" --emptyOutDir --logLevel error`, { stdio: "inherit", env: { ...clean, ...env } });
    return readdirSync(join(out, "assets"))
      .filter((f) => f.endsWith(".js"))
      .map((f) => readFileSync(join(out, "assets", f), "utf8"))
      .join("\n");
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
}

let failed = false;
const normal = build({ VITE_BETA: "yes" });
if (!normal.includes("/admin/analytics")) throw new Error("Sanity check failed: admin code not found in the build.");
const leaked = MARKERS.filter((m) => normal.includes(m));
if (leaked.length) {
  console.error(`FAIL: normal production build contains beta code: ${leaked.join(", ")}`);
  failed = true;
} else console.log("OK: normal production build (Render/AWS) contains no beta code.");

const beta = build({ VITE_BETA: "true" });
const missing = MARKERS.filter((m) => !beta.includes(m));
if (missing.length) {
  console.error(`FAIL: beta build is missing: ${missing.join(", ")}`);
  failed = true;
} else console.log("OK: beta build (Vercel) includes the Supabase connector, beta checkout and beta notes.");

process.exit(failed ? 1 : 0);
