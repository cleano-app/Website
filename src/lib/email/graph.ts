import "server-only";

// Sends email through Microsoft Graph as a real mailbox on Cleano's own
// Microsoft 365 tenant (app-only auth, client-credentials flow) - the same
// mechanism, and the same Azure app registration, Cleano Ops already uses.
// Sends land in that mailbox's Sent Items and any reply lands in its Inbox,
// so the office reads quote requests where it already reads everything
// else. Replaced Resend: the domain's SPF/DKIM are Microsoft's, Resend was
// never verified for it, and one email provider is one fewer processor on
// the privacy policy.
//
// Requires an Azure AD app registration with the Mail.Send Application
// permission (admin-consented), and these env vars:
//   MICROSOFT_TENANT_ID
//   MICROSOFT_CLIENT_ID
//   MICROSOFT_CLIENT_SECRET
//   MICROSOFT_SENDER_MAILBOX  (e.g. info@cleano.services - must be a real
//                               mailbox on the tenant)

interface GraphTokenResponse {
  access_token: string;
  expires_in: number;
}

// Cached across warm serverless invocations within the same instance -
// harmless to refetch on a cold start, saves a round trip on warm ones.
let cachedToken: { value: string; expiresAt: number } | null = null;

export function isGraphMailConfigured(): boolean {
  return !!(
    process.env.MICROSOFT_TENANT_ID &&
    process.env.MICROSOFT_CLIENT_ID &&
    process.env.MICROSOFT_CLIENT_SECRET &&
    process.env.MICROSOFT_SENDER_MAILBOX
  );
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Microsoft Graph email is not configured - missing MICROSOFT_TENANT_ID / MICROSOFT_CLIENT_ID / MICROSOFT_CLIENT_SECRET."
    );
  }

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Microsoft Graph auth failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as GraphTokenResponse;
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

export interface GraphMailAttachment {
  /** File name shown to the recipient, e.g. "photo-1.jpg" */
  filename: string;
  /** Base64-encoded file content */
  content: string;
  contentType: string;
}

export interface SendGraphMailParams {
  to: string;
  subject: string;
  html: string;
  /** Inline file attachments. Graph's sendMail accepts up to ~4MB of JSON
   * in total, base64 included - callers keep attachments well under that
   * (see PHOTO_LIMITS in lib/leads.ts). */
  attachments?: GraphMailAttachment[];
}

export async function sendGraphMail(params: SendGraphMailParams): Promise<{ error?: string }> {
  const mailbox = process.env.MICROSOFT_SENDER_MAILBOX;
  if (!mailbox) {
    return { error: "Microsoft Graph email is not configured - missing MICROSOFT_SENDER_MAILBOX." };
  }

  try {
    const token = await getAccessToken();

    const message = {
      subject: params.subject,
      body: { contentType: "HTML", content: params.html },
      toRecipients: [{ emailAddress: { address: params.to } }],
      ...(params.attachments && params.attachments.length > 0
        ? {
            attachments: params.attachments.map((a) => ({
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: a.filename,
              contentType: a.contentType,
              contentBytes: a.content,
            })),
          }
        : {}),
    };

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message, saveToSentItems: true }),
      }
    );

    // Graph returns 202 Accepted with an empty body on success.
    if (res.status !== 202) {
      const body = await res.text().catch(() => "");
      return { error: `Microsoft Graph send failed (${res.status}): ${body}` };
    }
    return {};
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
