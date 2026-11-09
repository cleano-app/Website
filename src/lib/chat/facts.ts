import { services } from "@/lib/content/services";
import {
  companyDetails,
  inspectionPromo,
  inspectionPromoRunning,
  serviceAreas,
  siteConfig,
} from "@/lib/siteConfig";
import { portfolioPath } from "@/lib/portfolio";

// What the website chat's assistant knows: the site's own content and
// nothing else - every service, its FAQs, where we work, how to reach us,
// the Portfolio scheme and (while it runs) the free inspection offer. Built
// from the same sources the pages use, so the chat can't say something the
// site doesn't. No prices except the ones the site itself shows.

/** The pages the assistant may link to: href -> what it's for. */
export function chatPages(): Record<string, string> {
  const pages: Record<string, string> = {
    "/quote": "get a free quote (the quote form, under a minute)",
    "/contact": "phone, WhatsApp and email",
    "/about": "about Cleano",
    [portfolioPath]: "the Portfolio Gutter Care Scheme for landlords and property managers",
  };
  for (const s of services) pages[`/${s.slug}`] = `${s.name}: what's included and FAQs`;
  if (inspectionPromoRunning()) pages[inspectionPromo.path] = `the free drone gutter inspection offer (${inspectionPromo.area} only)`;
  return pages;
}

export function chatFacts(): string {
  const serviceFacts = services.map((s) => {
    const lines = [
      `## ${s.name} (page /${s.slug})`,
      s.heroSubhead,
      `Included: ${s.included.join("; ")}.`,
    ];
    if (s.serviceOptions?.length) lines.push(`Options: ${s.serviceOptions.map((o) => `${o.title} - ${o.description}`).join(" | ")}`);
    if (!s.hidePricing) lines.push(`Price shown on the site: from ${s.pricingFrom}. ${s.pricingNote}`);
    lines.push(...s.faqs.map((f) => `Q: ${f.q} A: ${f.a}`));
    return lines.join("\n");
  });

  const offer = inspectionPromoRunning()
    ? `## Free drone gutter inspection (offer page ${inspectionPromo.path})
For a limited time, free for homes in ${inspectionPromo.area} only. We fly a drone along the gutters and downpipes and email the photos, with any blockage marked up. No need to be home, no obligation, no payment details. Booking is online (the Book button on the offer page); the booking form checks the postcode. One inspection per home.`
    : "";

  return [
    `# ${siteConfig.name}`,
    `${companyDetails.legalName}, trading as ${siteConfig.name}: professional exterior cleaning for homes and businesses across London and the surrounding areas.`,
    `Areas named on the site: ${serviceAreas.join(", ")} - and the surrounding areas. For anywhere else, the office confirms from the postcode.`,
    `Contact: phone ${siteConfig.phoneDisplay}, WhatsApp on the same number, email ${siteConfig.email}.`,
    "Credentials: CHAS accredited (health and safety), a CAA-registered drone operator, fully insured, VAT registered.",
    "Every job ends with a photo report: before and after photos by email, plus anything noticed that needs attention.",
    "How it works: 1) get a quote (a photo or two often means no visit is needed), 2) book a time, confirmed in writing, 3) we do the work, 4) the photo report arrives by email.",
    `Portfolio Gutter Care Scheme (page ${portfolioPath}): for landlords, managing agents and housing providers. Every property is inspected by drone; where gutters are clear, the photo report is free; cleaning only where it's needed, at a fixed price agreed in advance. Start by emailing the property list.`,
    offer,
    ...serviceFacts,
  ]
    .filter(Boolean)
    .join("\n\n");
}
