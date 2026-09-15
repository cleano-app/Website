import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { escapeHtml } from "@/lib/escapeHtml";
import { isGraphMailConfigured, sendGraphMail, type GraphMailAttachment } from "@/lib/email/graph";
import {
  LEAD_LIMITS,
  LEAD_SERVICE_LABELS,
  PHOTO_LIMITS,
  sniffImageType,
  type NewLeadInput,
  validateNewLead,
} from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Reject requests that didn't originate from this site's own pages. This
  // is a public, unauthenticated, side-effect-having endpoint (DB insert +
  // an email send), so it's a natural target for other sites' scripts to
  // hit directly - the browser sets Origin on every fetch/form POST and
  // JS cannot forge it, so this blocks that class of abuse outright. It
  // does nothing against a script hitting the API directly (curl etc, no
  // browser involved) - that's what the honeypot/Turnstile checks below
  // and DB-level limits are for.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  const parsed = await parseRequest(request);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { body, photos } = parsed;

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

  const photoError = validatePhotos(photos);
  if (photoError) {
    return NextResponse.json({ error: photoError }, { status: 400 });
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
      // Photos are attached to the notification email below and stored
      // nowhere - the column stays for older rows only.
      photo_paths: [],
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
    // TEMPORARY diagnostic: echo Postgres' error code back to the form, so the
    // cause is readable without opening the Vercel logs. The common ones here:
    // 42P01 = the `leads` table doesn't exist on this Supabase project (the
    // migrations were never run against it), 42501 = the insert was blocked by
    // row-level security (i.e. SUPABASE_SERVICE_ROLE_KEY isn't actually the
    // service-role key). Error codes alone carry no customer data. Remove this
    // once the live Supabase project is sorted.
    return NextResponse.json(
      {
        error: `Something went wrong saving your request.${error.code ? ` [ref: ${error.code}]` : ""}`,
      },
      { status: 500 }
    );
  }

  await sendLeadNotification(input, data.id, photos);

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

interface UploadedPhoto {
  bytes: Uint8Array;
  contentType: "image/jpeg" | "image/png" | "image/webp";
}

/** The form posts multipart: a `payload` field holding the lead as JSON,
 * plus zero or more `photos` files. A plain JSON body (no photos) is still
 * accepted so nothing depends on the encoding. */
async function parseRequest(
  request: NextRequest
): Promise<{ body: Partial<NewLeadInput>; photos: UploadedPhoto[] } | { error: string }> {
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.startsWith("multipart/form-data")) {
      const form = await request.formData();
      const payload = form.get("payload");
      if (typeof payload !== "string") return { error: "Invalid request body." };
      const body = JSON.parse(payload) as Partial<NewLeadInput>;

      const files = form.getAll("photos").filter((v): v is File => v instanceof File);
      if (files.length > LEAD_LIMITS.maxPhotos) {
        return { error: `Please attach at most ${LEAD_LIMITS.maxPhotos} photos.` };
      }
      const photos: UploadedPhoto[] = [];
      for (const file of files) {
        if (file.size === 0) continue;
        const bytes = new Uint8Array(await file.arrayBuffer());
        // Never trust file.type - it's whatever the client said. Only the
        // bytes decide what this is.
        const sniffed = sniffImageType(bytes);
        if (!sniffed) return { error: "One of the photos isn't a supported image - please use JPEG or PNG." };
        photos.push({ bytes, contentType: sniffed });
      }
      return { body, photos };
    }
    return { body: (await request.json()) as Partial<NewLeadInput>, photos: [] };
  } catch {
    return { error: "Invalid request body." };
  }
}

function validatePhotos(photos: UploadedPhoto[]): string | null {
  let total = 0;
  for (const photo of photos) {
    if (photo.bytes.byteLength > PHOTO_LIMITS.maxBytesPerPhoto) {
      return "One of the photos is too large - please try again with smaller photos.";
    }
    total += photo.bytes.byteLength;
  }
  if (total > PHOTO_LIMITS.maxTotalBytes) {
    return "Those photos are too large to send together - please attach fewer photos.";
  }
  return null;
}

/** Verifies a Cloudflare Turnstile token server-side when Turnstile is
 * configured (TURNSTILE_SECRET_KEY set). Returns an error message to reject
 * the request, or null to proceed. Fails OPEN (skips the check) when
 * Turnstile isn't configured yet, matching the rest of this codebase's
 * pattern for optional integrations - the form still works before someone
 * adds the env vars, it's just less bot-resistant. */
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

async function sendLeadNotification(input: NewLeadInput, leadId: string, photos: UploadedPhoto[]) {
  const to = process.env.LEADS_NOTIFICATION_EMAIL;
  if (!to || !isGraphMailConfigured()) {
    // The lead is saved in Supabase either way - but any photos only exist
    // in this email, so make the gap loud in the logs rather than a warn.
    console.error(
      `LEAD NOTIFICATION NOT SENT for lead ${leadId}: MICROSOFT_* / LEADS_NOTIFICATION_EMAIL not configured` +
        (photos.length ? ` - ${photos.length} photo(s) attached by the customer were NOT delivered.` : ".")
    );
    return;
  }

  const serviceLabel = LEAD_SERVICE_LABELS[input.service];
  const rows: [string, string | undefined][] = [
    ["Service", serviceLabel],
    ["Details", input.serviceOtherNote],
    ["Name", input.name],
    ["Phone", input.phone],
    ["Postcode", input.postcode],
    ["Source page", input.sourcePage],
    [
      "Campaign",
      input.utm
        ? Object.entries(input.utm)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k}=${v}`)
            .join(" ")
        : undefined,
    ],
    ["Photos attached", photos.length ? String(photos.length) : "none"],
  ];
  const html =
    `<p>New quote request from the website (#${escapeHtml(leadId)})</p>` +
    `<table cellpadding="4">` +
    rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v!)}</td></tr>`)
      .join("") +
    `</table>`;

  const attachments: GraphMailAttachment[] = photos.map((photo, i) => ({
    filename: `photo-${i + 1}.${photo.contentType === "image/png" ? "png" : photo.contentType === "image/webp" ? "webp" : "jpg"}`,
    contentType: photo.contentType,
    content: Buffer.from(photo.bytes).toString("base64"),
  }));

  // A failed notification email must never fail the submission itself -
  // the lead is already saved and visible - but it must be loud in the
  // logs, because the photos travel only in this email.
  const { error } = await sendGraphMail({
    to,
    subject: `New quote request: ${serviceLabel} - ${input.postcode.toUpperCase()}`,
    html,
    attachments,
  });
  if (error) {
    console.error(`Failed to send lead notification email for lead ${leadId}:`, error);
  }
}
