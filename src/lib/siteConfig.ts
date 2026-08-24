// Central place for the handful of values that change without a code
// review (contact details, external links) - pulled from env so they can
// be corrected in Vercel without a redeploy of source.

export const siteConfig = {
  name: "Cleano",
  tagline: "Clean places. Better spaces.",
  description:
    "Cleano is an exterior cleaning company serving homes and businesses across London and the surrounding areas: gutter cleaning, window cleaning, pressure washing, bin cleaning and commercial cleaning.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cleano.services",
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

export const mainNav: { label: string; href: string }[] = [
  { label: "Gutter Cleaning", href: "/gutter-cleaning" },
  { label: "Bin Cleaning", href: "/bin-cleaning" },
  { label: "Window Cleaning", href: "/window-cleaning" },
  { label: "Pressure Washing", href: "/pressure-washing" },
  { label: "Commercial", href: "/commercial-cleaning" },
  { label: "Areas We Cover", href: "/areas-we-cover" },
  { label: "About", href: "/about" },
];
