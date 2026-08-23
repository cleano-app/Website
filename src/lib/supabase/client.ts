import { createClient } from "@supabase/supabase-js";

// Browser client - used only for the direct-to-storage photo upload from
// the quote form (anon key, RLS-restricted to inserting into the
// `lead-photos` bucket). Never used to read leads back out.
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env vars are missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  return createClient(url, anonKey);
}
