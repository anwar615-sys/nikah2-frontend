import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

let client = null;

export function getSupabase() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: "nikha2-auth" },
    });
  }
  return client;
}

// Tests swap in a fake client.
export function __setClient(c) {
  client = c;
}

// Calls a database function; throws the raw Supabase error so errors.js can map it.
export async function rpc(name, args) {
  const { data, error } = await getSupabase().rpc(name, args);
  if (error) throw error;
  return data;
}
