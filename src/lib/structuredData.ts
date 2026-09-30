import { companyDetails, serviceAreas, siteConfig, socialLinks } from "@/lib/siteConfig";
import type { Service } from "@/lib/content/services";

// Schema.org data, kept in one place so the business is described
// identically everywhere.
//
// Everything hangs off one business node with a stable @id. Service pages
// reference that id as their provider rather than restating the business,
// so Google and the AI answer engines see a single Cleano entity that
// performs six services in named areas - not seven unrelated businesses.
// That entity is also what a "what is Cleano" answer is built from.
//
// What is deliberately absent: AggregateRating. The homepage testimonials
// are collected and displayed by us, and Google disallows self-serving
// review markup for a LocalBusiness - it risks a manual action, and the
// reviews belong on the Google Business Profile where they also count
// towards local ranking.

const BUSINESS_ID = `${siteConfig.url}/#business`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    legalName: companyDetails.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    vatID: companyDetails.vatNumber,
    // Companies House number - the strongest signal that this website and
    // the registered company are the same entity.
    identifier: {
      "@type": "PropertyValue",
      name: "Company number",
      value: companyDetails.companyNumber,
    },
    address: {
      "@type": "PostalAddress",
      ...companyDetails.registeredOfficeAddress,
    },
    // Another hard fact to pin the right company: Cleano Ltd was
    // incorporated 2026-05-22, which CLEANO CLEANING LIMITED was not.
    foundingDate: companyDetails.incorporatedOn,
    areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
    image: `${siteConfig.url}/og-image.jpg`,
    logo: `${siteConfig.url}/brand/cleano-logo.png`,
    // Profiles that confirm this is the same Cleano. Left out entirely
    // while empty - an empty array says nothing and reads as an error.
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };
}

/** One service, tied back to the business that performs it. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/${service.slug}/#service`,
    name: service.name,
    serviceType: service.name,
    description: service.heroSubhead,
    provider: { "@id": BUSINESS_ID },
    areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
    url: `${siteConfig.url}/${service.slug}`,
  };
}

/** The Q&As already written on a service page, in the form answer engines
 * read. These are the site's most quotable content and were invisible to
 * machines until now. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
