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
  photoPath: 300,
} as const;

// Phone: digits, spaces and the handful of punctuation marks real phone
// numbers use. Postcode: letters, digits and spaces. Deliberately loose
// (this is a lead form, not a strict validator) - the point is to reject
// garbage/script-like input, not to be a phone-format authority.
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
const POSTCODE_RE = /^[A-Za-z0-9\s]{2,10}$/;
// Object path this app itself generates in QuoteForm's uploadPhotos - a
// random UUID, a hyphen, then a filename we've already sanitised to a safe
// charset. Anything that doesn't match this shape didn't come from our own
// upload flow.
const PHOTO_PATH_RE = /^[0-9a-f-]{36}-[A-Za-z0-9._-]{1,255}$/;

export type NewLeadInput = {
  name: string;
  phone: string;
  postcode: string;
  service: LeadService;
  serviceOtherNote?: string;
  photoPaths?: string[];
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
  if (input.photoPaths) {
    if (input.photoPaths.length > LEAD_LIMITS.maxPhotos) return `Please attach at most ${LEAD_LIMITS.maxPhotos} photos.`;
    for (const path of input.photoPaths) {
      if (path.length > LEAD_LIMITS.photoPath || !PHOTO_PATH_RE.test(path)) return "Invalid request.";
    }
  }

  return null;
}
