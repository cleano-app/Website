import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { LEAD_SERVICE_LABELS, type NewLeadInput, validateNewLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Reject requests that didn't originate from this site's own pages. This
  // is a public, unauthenticated, side-effect-having endpoint (DB insert +
  // an email send), so it's a natural target for other sites' scripts to
  // hit directly - the browser sets Origin on every fetch/form POST and
  // JS cannot forge it, so this blocks that class of abuse outright. It
  // does nothing against a script hitting the API directly (curl etc, no
  // browser involved) - that's what the honeypot/Turnstire checks below
  // and DB-level limits are for.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  let body: Partial<NewLeadInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a field real visitors never see or fill in (see QuoteForm).
  // A bot that fills in every input trips this. Respond as if the lead was
  // saved - never let an automated client learn it was caught, or it'll
  // just adapt - but skip the DB insert and email entirely.
  if (body.website) {
    return NextResponse.json({ ok: true, id: "ok" });
  }

  const validationError = validateNewLead(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const turnstileError = await verifyTurnstile(body.turnstileToken, request);
  if (turnstileError) {
    return NextResponse.json({ error: turnstileError }, { status: 400 });
  }

  const input = body as NewLeadInput;

  let supabase;
  try {
    supabase = createServiceRoleSupabaseClient();
  } catch (err) {
    console.error("Supabase not configured:", err);
    return NextResponse.json(
      { error: "The site isn't fully set up yet - Supabase is not configured." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: input.name.trim(),
      phone: input.phone.trim(),
      postcode: input.postcode.trim().toUpperCase(),
      service: input.service,
      service_other_note: input.serviceOtherNote?.trim() || null,
      photo_paths: input.photoPaths ?? [],
      source_page: input.sourcePage,
      utm_source: input.utm?.source ?? null,
      utm_medium: input.utm?.medium ?? null,
      utm_campaign: input.utm?.campaign ?? null,
      utm_term: input.utm?.term ?? null,
      utm_content: input.utm?.content ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to insert lead:", error);
    return NextResponse.json({ error: "Something went wrong saving your request." }, { status: 500 });
  }

  await sendLeadNotification(input, data.id);

  return NextResponse.json({ ok: true, id: data.id });
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  // Same-origin requests from a browser <form>/fetch always carry an Origin
  // header on a state-changing POST like this one. No Origin at all (e.g. a
  // same-tab top-level navigation, which this endpoint never receives from
  // real usage - it's only ever called via fetch) is treated as suspicious
  // too, so this fails closed rather than open.
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Verifies a Cloudflare Turnstile token server-side when Turnstile is
 * configured (TURNSTILE_SECRET_KEY set). Returns an error message to reject
 * the request, or null to proceed. Fails OPEN (skips the check) when
 * Turnstile isn't configured yet, matching the rest of this codebase's
 * pattern for optional integrations (e.g. Resend) - the form still works
 * before someone adds the env vars, it's just less bot-resistant. */
async function verifyTurnstile(token: string | undefined, request: NextRequest): Promise<string | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null;
  if (!token) return "Please try again.";

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      }),
    });
    const result = await res.json();
    return result.success ? null : "Verification failed - please try again.";
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    // A Cloudflare/network hiccup shouldn't block a genuine customer's
    // quote request - fail open on our side, closed only on Cloudflare's.
    return null;
  }
}

async function sendLeadNotification(input: NewLeadInput, leadId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    // Not configured yet - the lead is still safely in Supabase either way.
    console.warn("RESEND_API_KEY / LEADS_NOTIFICATION_EMAIL not set - skipping notification email.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Cleano Website <leads@cleano.services>",
      to,
      subject: `New quote request: ${LEAD_SERVICE_LABELS[input.service]} - ${input.postcode}`,
      text: [
        `New lead from the website (#${leadId})`,
        "",
        `Service: ${LEAD_SERVICE_LABELS[input.service]}`,
        input.serviceOtherNote ? `Details: ${input.serviceOtherNote}` : null,
        `Name: ${input.name}`,
        `Phone: ${input.phone}`,
        `Postcode: ${input.postcode}`,
        `Source page: ${input.sourcePage}`,
        input.photoPaths?.length ? `Photos uploaded: ${input.photoPaths.length}` : "Photos uploaded: none",
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    // A failed notification email should never fail the lead submission -
    // the lead is already saved in Supabase and visible in the pipeline.
    console.error("Failed to send lead notification email:", err);
  }
}
