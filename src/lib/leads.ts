export const LEAD_SERVICES = [
  "gutter_cleaning",
  "bin_cleaning",
  "window_cleaning",
  "pressure_washing",
  "graffiti_removal",
  "rooftop_cleaning",
  "other",
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export const LEAD_SERVICE_LABELS: Record<LeadService, string> = {
  gutter_cleaning: "Gutter Cleaning",
  bin_cleaning: "Bin Cleaning",
  window_cleaning: "Window Cleaning",
  pressure_washing: "Pressure Washing",
  graffiti_removal: "Graffiti Removal",
  rooftop_cleaning: "Rooftop Cleaning",
  other: "Other",
};

// Hard caps on every free-text field, enforced both here (client + server,
// since this module is imported by both) and mirrored as CHECK constraints
// in the DB migration - defence in depth against a client that skips this
// validation entirely (e.g. someone posting to /api/leads directly).
export const LEAD_LIMITS = {
  name: 100,
  phone: 20,
  postcode: 10,
  serviceOtherNote: 500,
  sourcePage: 200,
  utmField: 200,
  maxPhotos: 8,
} as const;

// Photos are never stored by this site: the browser shrinks them (see
// QuoteForm), they travel to /api/leads as multipart form fields, and the
// API attaches them to the office notification email. The caps exist
// because that email goes through Microsoft Graph's sendMail, whose whole
// JSON payload (attachments base64-encoded, so ~1.37x the raw bytes) has
// to stay under 4MB. 8 photos x 300KB raw ~ 3.3MB encoded, with headroom.
export const PHOTO_LIMITS = {
  /** Original file size accepted from the picker before compression. */
  maxOriginalBytes: 10 * 1024 * 1024,
  /** What the client compresses each photo down to, and the per-photo cap
   * the server enforces (slightly above the target - compression isn't
   * exact). */
  targetBytes: 300 * 1024,
  maxBytesPerPhoto: 450 * 1024,
  maxTotalBytes: 2500 * 1024,
  maxWidthOrHeight: 1280,
} as const;

/** Sniffs the real image format from the first bytes. The declared MIME
 * type on an upload is whatever the client says it is; the office is going
 * to open these attachments, so only accept what actually parses as one of
 * the three formats every mail client renders. HEIC is deliberately not
 * here: it's converted client-side (iOS does this itself for a plain file
 * input) and Outlook can't display it anyway. */
export function sniffImageType(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) return "image/png";
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "image/webp";
  return null;
}

// Phone: digits, spaces and the handful of punctuation marks real phone
// numbers use. Postcode: letters, digits and spaces. Deliberately loose
// (this is a lead form, not a strict validator) - the point is to reject
// garbage/script-like input, not to be a phone-format authority.
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
const POSTCODE_RE = /^[A-Za-z0-9\s]{2,10}$/;

export type NewLeadInput = {
  name: string;
  phone: string;
  postcode: string;
  service: LeadService;
  serviceOtherNote?: string;
  sourcePage: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  /** Honeypot - a field real visitors never see or fill in. Any value here
   * means a bot filled in every input on the page; the API route accepts
   * the request (so the bot doesn't learn it was caught) but silently
   * drops it instead of saving a lead or sending an email. */
  website?: string;
  /** Cloudflare Turnstile response token - only required server-side when
   * TURNSTILE_SECRET_KEY is configured; see /api/leads route.ts. */
  turnstileToken?: string;
};

export function isLeadService(value: string): value is LeadService {
  return (LEAD_SERVICES as readonly string[]).includes(value);
}

/** Validates and length-caps a new lead. Used both client-side (for a fast,
 * friendly error) and server-side in /api/leads (the real backstop - never
 * trust the client). */
export function validateNewLead(input: Partial<NewLeadInput>): string | null {
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const postcode = input.postcode?.trim() ?? "";

  if (name.length < 2 || name.length > LEAD_LIMITS.name) return "Please enter your name.";
  if (!PHONE_RE.test(phone)) return "Please enter a valid phone number.";
  if (!POSTCODE_RE.test(postcode)) return "Please enter your postcode.";
  if (!input.service || !isLeadService(input.service)) return "Please choose a service.";

  if (input.serviceOtherNote && input.serviceOtherNote.length > LEAD_LIMITS.serviceOtherNote) {
    return "That note is too long.";
  }
  if (!input.sourcePage || input.sourcePage.length > LEAD_LIMITS.sourcePage || !input.sourcePage.startsWith("/")) {
    return "Invalid request.";
  }
  if (input.utm) {
    for (const value of Object.values(input.utm)) {
      if (typeof value === "string" && value.length > LEAD_LIMITS.utmField) return "Invalid request.";
    }
  }
  return null;
}
