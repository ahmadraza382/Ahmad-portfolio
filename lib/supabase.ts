import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (uses the service-role key).
 * Only import this from server code (API routes / server components).
 * Returns null if env vars are not configured, so the app still builds.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
