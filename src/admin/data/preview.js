// Admin preview mode: open the admin dashboard without logging in, using
// sample data only, while the real backend is being built.
//
// Two ways to turn it on, nothing else can:
//   1. Local:  `npm run dev` with VITE_ADMIN_PREVIEW=true in .env.local.
//   2. Hosted demo: a build made with VITE_ADMIN_DEMO=true. Only the Vercel
//      build command sets this (see vercel.json), so the Vercel site shows
//      the sample dashboard. Render, AWS or a plain `npm run build` never do.
//
// In preview mode the admin pages use only the in-memory sample data
// (mockAdminApi.js): no real member data and no backend is ever touched.
// scripts/check-admin-preview.mjs proves a normal build contains none of it.
//
// Before the real backend goes live: remove VITE_ADMIN_DEMO from vercel.json.
const LOCAL_PREVIEW =
  import.meta.env.DEV && import.meta.env.VITE_ADMIN_PREVIEW === "true";
const HOSTED_DEMO = import.meta.env.VITE_ADMIN_DEMO === "true";

export const ADMIN_PREVIEW = LOCAL_PREVIEW || HOSTED_DEMO;
