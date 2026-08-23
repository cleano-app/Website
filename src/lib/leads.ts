export const LEAD_SERVICES = [
  "gutter_cleaning",
  "bin_cleaning",
  "window_cleaning",
  "pressure_washing",
  "commercial_cleaning",
  "other",
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export const LEAD_SERVICE_LABELS: Record<LeadService, string> = {
  gutter_cleaning: "Gutter Cleaning",
  bin_cleaning: "Bin Cleaning",
  window_cleaning: "Window Cleaning",
  pressure_washing: "Pressure Washing",
  commercial_cleaning: "Commercial",
  other: "Other",
};

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
};

export function isLeadService(value: string): value is LeadService {
  return (LEAD_SERVICES as readonly string[]).includes(value);
}

/** Very light validation - the DB constraints are the real backstop. */
export function validateNewLead(input: Partial<NewLeadInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your name.";
  if (!input.phone || input.phone.trim().length < 7) return "Please enter a valid phone number.";
  if (!input.postcode || input.postcode.trim().length < 3) return "Please enter your postcode.";
  if (!input.service || !isLeadService(input.service)) return "Please choose a service.";
  return null;
}
