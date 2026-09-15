import { createClient } from "@supabase/supabase-js";

/** What kind of Supabase API key a string is, judged from its shape alone -
 * never by sending it anywhere. Supabase's dashboard puts the publishable
 * key front and centre and the secret key behind a reveal, so pasting the
 * wrong one into SUPABASE_SERVICE_ROLE_KEY is the easy mistake; the symptom
 * is every insert failing row-level security with Postgres code 42501,
 * which on its own says nothing about why. */
export type SupabaseKeyKind =
  | "secret"
  | "service_role_jwt"
  | "publishable"
  | "anon_jwt"
  | "unknown";

export function classifySupabaseKey(key: string): SupabaseKeyKind {
  if (key.startsWith("sb_secret_")) return "secret";
  if (key.startsWith("sb_publishable_")) return "publishable";
  if (key.startsWith("eyJ")) {
    try {
      const [, payload] = key.split(".");
      const claims = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
      if (claims.role === "service_role") return "service_role_jwt";
      if (claims.role === "anon") return "anon_jwt";
    } catch {
      // Not a JWT we can read - fall through to "unknown" and let the
      // request itself be the judge.
    }
  }
  return "unknown";
}

/** Human-readable reason this key can't work, or null if it looks usable.
 * Deliberately says nothing about the key's contents beyond its type. */
export function supabaseKeyProblem(kind: SupabaseKeyKind): string | null {
  if (kind === "publishable") {
    return "SUPABASE_SERVICE_ROLE_KEY is set to the PUBLISHABLE key (sb_publishable_...). It needs the SECRET key (sb_secret_...) from Supabase -> Project Settings -> API Keys.";
  }
  if (kind === "anon_jwt") {
    return "SUPABASE_SERVICE_ROLE_KEY is set to the ANON key. It needs the service_role key from Supabase -> Project Settings -> API Keys -> Legacy API keys (or the newer sb_secret_... key).";
  }
  return null;
}

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

  // Fail here, with the actual reason, rather than letting Postgres reject
  // the insert with a bare 42501 several layers down.
  const problem = supabaseKeyProblem(classifySupabaseKey(serviceRoleKey));
  if (problem) throw new Error(problem);

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
