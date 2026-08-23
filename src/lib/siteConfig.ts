// Central place for the handful of values that change without a code
// review (contact details, external links) - pulled from env so they can
// be corrected in Vercel without a redeploy of source.

export const siteConfig = {
  name: "Cleano",
  tagline: "Clean places. Better spaces.",
  description:
    "Professional exterior cleaning for homes and businesses across North London: gutter cleaning, bin cleaning, window cleaning, pressure washing and commercial cleaning.",
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

export function mailtoHref(): string {
  return `mailto:${siteConfig.email}`;
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
