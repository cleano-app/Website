import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key - bypasses RLS, so this
// must never be imported into a "use client" component or exposed via a
// NEXT_PUBLIC_ env var. Used only from API routes (e.g. /api/leads).
export function createServiceRoleSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase server env vars are missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
