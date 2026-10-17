// Public beta settings. The URL and publishable key are public by design:
// access is controlled by row-level security in the database, not by hiding them.
const env = (typeof import.meta !== "undefined" && import.meta.env) || {};

export const BETA = env.VITE_BETA === "true";
export const SUPABASE_URL = env.VITE_SUPABASE_URL || "https://myniyprtyewhogrjkwcj.supabase.co";
export const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_lAl6YUThDfvUTmhn9XP3BA_ZLg9L9-H";

// Version of the Terms/Privacy text a member accepts at signup (stored with their consent).
export const TERMS_VERSION = "2026-10-beta-1";

export const CALLS_NOTE = "Voice and video calls arrive after the beta.";
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
