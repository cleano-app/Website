// Central place for the handful of values that change without a code
// review (contact details, external links) - pulled from env so they can
// be corrected in Vercel without a redeploy of source.

// The site's canonical public origin - what every og:url, canonical link
// and sitemap entry is built from. Env-overridable so a domain change never
// needs a source edit, but a Vercel deployment hostname is never accepted:
// NEXT_PUBLIC_APP_URL was pointed at https://website.vercel.app for a while
// and every social/WhatsApp preview of the live site leaked it.
function canonicalSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/+$/, "");
  if (configured && /^https:\/\//.test(configured) && !/\.vercel\.app$/i.test(configured)) {
    return configured;
  }
  return "https://www.cleano.services";
}

export const siteConfig = {
  name: "Cleano",
  tagline: "Clean places. Better spaces.",
  description:
    "Cleano is an exterior cleaning company serving homes and businesses across London and the surrounding areas: gutter cleaning, rooftop cleaning, window cleaning, pressure washing, bin cleaning and graffiti removal.",
  url: canonicalSiteUrl(),
  opsAppUrl: process.env.NEXT_PUBLIC_OPS_APP_URL || "https://ops.cleano.services",

  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "02033704040",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "020 3370 4040",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@cleano.services",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "442033704040",
};

export function telHref(): string {
  return `tel:${siteConfig.phone}`;
}

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoHref(options?: { subject?: string; body?: string }): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const query = params.toString();
  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}

// Short forms for the header nav specifically - the full service names
// live on their own pages (<h1>, <title>, cardBlurb etc.); the nav just
// needs to fit seven items across the header without wrapping.
export const mainNav: { label: string; href: string }[] = [
  { label: "Gutters", href: "/gutter-cleaning" },
  { label: "Rooftop", href: "/rooftop-cleaning" },
  { label: "Bins", href: "/bin-cleaning" },
  { label: "Windows", href: "/window-cleaning" },
  { label: "Pressure", href: "/pressure-washing" },
  { label: "Graffiti", href: "/graffiti-removal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Named areas Cleano covers, as used in the LocalBusiness structured data
// and on /contact. "London and the surrounding areas" is the umbrella; these
// are the places worth naming for local search.
export const serviceAreas = [
  "Stamford Hill",
  "Tottenham",
  "Hackney",
  "Wood Green",
  "Golders Green",
  "Edgware",
  "Enfield",
] as const;

// The registered company behind the Cleano trading name. A UK limited
// company must show its registered name, company number, place of
// registration and registered office on its website (Companies Act 2006 /
// the Company, LLP and Business (Names and Trading Disclosures) Regs) -
// rendered in the footer on every page. These are also what Stripe's
// reviewers check the site against, so they must match Companies House and
// the Stripe application exactly.
export const companyDetails = {
  legalName: "Cleano Ltd",
  registrationPlace: "England and Wales",
  companyNumber: "17237218",
  vatNumber: "GB 522 0120 63",
  // The registered office as filed at Companies House - must stay identical
  // to the filing and to the Stripe application. Structured so the footer
  // text and the LocalBusiness PostalAddress in the root layout can't
  // drift from each other.
  registeredOfficeAddress: {
    streetAddress: "14 Olinda Road",
    addressLocality: "London",
    postalCode: "N16 6TL",
    addressCountry: "GB",
  },
  get registeredOffice(): string {
    const a = this.registeredOfficeAddress;
    return `${a.streetAddress}, ${a.addressLocality}, ${a.postalCode}`;
  },
};

// The policy pages Stripe (and its card-network partners) expect to find
// linked from every page. Wording on each is supplied separately - see the
// pages themselves; this is only where the links live.
export const legalNav: { label: string; href: string }[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cancellation", href: "/cancellation" },
  { label: "Refunds", href: "/refunds" },
];
