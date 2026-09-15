import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

// The privacy policy says "quote enquiries that do not become jobs are kept
// for twelve months and then deleted". Nothing else makes that true, so
// this does: Vercel calls it daily (vercel.json), it deletes lead rows
// older than twelve months, plus any legacy objects still sitting in the
// old lead-photos bucket from before photos stopped being stored here.
//
// Every lead older than a year goes, converted or not - a lead that became
// a customer lives on in Cleano Ops (a separate system with its own
// retention), not here. Deleting the enquiry record doesn't touch that.
//
// Auth: Vercel sends `Authorization: Bearer <CRON_SECRET>` on cron
// invocations when the CRON_SECRET env var is set. Anything else is
// rejected, and with no secret configured the route refuses to run at all
// rather than being callable by anyone who finds the URL.
const RETENTION_MONTHS = 12;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let supabase;
  try {
    supabase = createServiceRoleSupabaseClient();
  } catch (err) {
    console.error("purge-leads: Supabase not configured:", err);
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);
  const cutoffIso = cutoff.toISOString();

  const { data: deletedLeads, error: leadsError } = await supabase
    .from("leads")
    .delete()
    .lt("created_at", cutoffIso)
    .select("id");
  if (leadsError) {
    console.error("purge-leads: failed to delete leads:", leadsError);
    return NextResponse.json({ error: "Failed to delete leads" }, { status: 500 });
  }

  // Legacy photos only - nothing has been written here since photos moved
  // to email attachments. Best effort: a storage hiccup shouldn't fail the
  // lead purge that already succeeded above.
  let deletedPhotos = 0;
  try {
    const { data: objects } = await supabase.storage
      .from("lead-photos")
      .list("", { limit: 1000, sortBy: { column: "created_at", order: "asc" } });
    const stale = (objects ?? [])
      .filter((o) => o.created_at && o.created_at < cutoffIso)
      .map((o) => o.name);
    if (stale.length > 0) {
      const { error } = await supabase.storage.from("lead-photos").remove(stale);
      if (error) console.error("purge-leads: failed to delete legacy photos:", error);
      else deletedPhotos = stale.length;
    }
  } catch (err) {
    console.error("purge-leads: legacy photo cleanup failed:", err);
  }

  console.info(
    `purge-leads: removed ${deletedLeads?.length ?? 0} lead(s) and ${deletedPhotos} legacy photo(s) older than ${cutoffIso}`
  );
  return NextResponse.json({
    ok: true,
    cutoff: cutoffIso,
    deletedLeads: deletedLeads?.length ?? 0,
    deletedPhotos,
  });
}
