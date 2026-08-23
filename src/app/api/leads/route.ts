import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { LEAD_SERVICE_LABELS, type NewLeadInput, validateNewLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: Partial<NewLeadInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validateNewLead(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
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
