// Admin preview mode: open the admin dashboard without logging in, using
// sample data, while the real backend is being built.
//
// It is ON only when BOTH are true:
//   1. the app runs with `npm run dev` (import.meta.env.DEV), and
//   2. .env.local contains VITE_ADMIN_PREVIEW=true.
//
// `npm run build` (Render, AWS or any production host) always sets DEV to
// false, so preview mode and its sample data are removed from the build even
// if VITE_ADMIN_PREVIEW is set there. scripts/check-admin-preview.mjs proves it.
export const ADMIN_PREVIEW =
  import.meta.env.DEV && import.meta.env.VITE_ADMIN_PREVIEW === "true";
