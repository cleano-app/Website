import "server-only";
import { isGraphMailConfigured, sendGraphMail } from "@/lib/email/graph";

// Two ways out of this app, picked by whichever is configured:
//
//  - Resend (RESEND_API_KEY). cleano.services is verified with it on EU
//    infrastructure - DKIM at resend._domainkey.cleano.services signs as
//    d=cleano.services, and the return path is send.cleano.services with
//    its own SPF - so mail From: leads@cleano.services passes both checks.
//  - Microsoft Graph (MICROSOFT_*). Sends as a real mailbox on Cleano's own
//    365 tenant, so the message lands in that mailbox's Sent Items and any
//    reply lands in its Inbox.
//
// Resend wins when both are set: it needs one key rather than an Azure app
// registration. Graph is the fallback so a site with only the Microsoft
// values configured still delivers. Called through sendMail() only - no
// caller should care which one carried the message.
//
// Talking to Resend over plain fetch rather than its SDK keeps a dependency
// (and its transitive tree) out of a site that sends exactly one kind of
// email.

export interface MailAttachment {
  filename: string;
  contentType: string;
  /** Base64-encoded file content. */
  contentBase64: string;
}

export interface SendMailParams {
  to: string;
  subject: string;
  html: string;
  attachments?: MailAttachment[];
}

export type MailTransport = "resend" | "graph";

/** Which transport will carry the next message, or null if neither is set
 * up. Exposed so callers can report the gap precisely rather than guessing. */
export function mailTransport(): MailTransport | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (isGraphMailConfigured()) return "graph";
  return null;
}

/** The From address Resend sends as. Must stay on a domain verified in the
 * Resend dashboard, or every send is rejected. */
function resendFrom(): string {
  return process.env.RESEND_FROM || "Cleano Website <leads@cleano.services>";
}

export async function sendMail(params: SendMailParams): Promise<{ error?: string }> {
  const transport = mailTransport();
  if (transport === "resend") return sendViaResend(params);
  if (transport === "graph") {
    return sendGraphMail({
      to: params.to,
      subject: params.subject,
      html: params.html,
      attachments: params.attachments?.map((a) => ({
        filename: a.filename,
        contentType: a.contentType,
        content: a.contentBase64,
      })),
    });
  }
  return { error: "No email transport configured (set RESEND_API_KEY, or the MICROSOFT_* variables)." };
}

async function sendViaResend(params: SendMailParams): Promise<{ error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom(),
        to: [params.to],
        subject: params.subject,
        html: params.html,
        ...(params.attachments?.length
          ? {
              attachments: params.attachments.map((a) => ({
                filename: a.filename,
                content: a.contentBase64,
                content_type: a.contentType,
              })),
            }
          : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { error: `Resend send failed (${res.status}): ${body.slice(0, 300)}` };
    }
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
