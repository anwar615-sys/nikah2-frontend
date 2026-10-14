// Proves that admin preview mode (no login + sample data) can never reach a
// production build, even if VITE_ADMIN_PREVIEW=true is set on the host
// (Render, AWS...). Builds the site with the flag ON into a temporary folder
// and fails if any preview code or sample data is found.
//
// Run: npm run check:admin-preview
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const out = mkdtempSync(join(tmpdir(), "nikha2-preview-check-"));
try {
  execSync(`npx vite build --outDir "${out}" --emptyOutDir --logLevel error`, {
    stdio: "inherit",
    env: { ...process.env, VITE_ADMIN_PREVIEW: "true" },
  });
  const js = readdirSync(join(out, "assets"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => readFileSync(join(out, "assets", f), "utf8"))
    .join("\n");
  const forbidden = ["Preview mode", "preview-admin@nikha2.local", "Sample photo", "NK2-10001", "Preview has no sample data"];
  const found = forbidden.filter((s) => js.includes(s));
  if (!js.includes("/admin/analytics")) throw new Error("Sanity check failed: admin code not found in the build.");
  if (found.length) {
    console.error(`FAIL: production build contains admin preview code: ${found.join(", ")}`);
    process.exit(1);
  }
  console.log("OK: production build contains no admin preview code or sample data.");
} finally {
  rmSync(out, { recursive: true, force: true });
}
