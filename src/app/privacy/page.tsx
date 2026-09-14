import type { Metadata } from "next";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { companyDetails, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${companyDetails.legalName}, trading as ${siteConfig.name}, collects and uses your personal information.`,
  path: "/privacy",
});

// Wording is supplied after advice (UK GDPR / DPA 2018). The facts the
// drafter needs about what this site actually does are recorded here, in
// the source, so the policy can be written against reality rather than a
// template:
//
//  - The quote form (/quote and the service pages) collects: name, phone
//    number, postcode, the service wanted, an optional free-text note, up
//    to 8 optional photos, the page the request came from, and any UTM
//    campaign parameters in the URL. See src/lib/leads.ts.
//  - Leads are stored in a Supabase project (hosted database + file
//    storage) used only by this site - photos in a private bucket, never
//    publicly readable. See supabase/migrations/0001_init_leads.sql.
//  - A notification email is sent to Cleano's office via Resend when a
//    lead arrives (src/app/api/leads/route.ts). Leads are then handled in
//    Cleano Ops, the internal system at ops.cleano.services.
//  - The site is hosted on Vercel. Cloudflare Turnstile may run on the
//    quote form as a bot check (only if configured - see next.config.ts).
//  - No analytics, advertising or tracking cookies are set. The site sets
//    no cookies of its own at all.
//  - Phone / WhatsApp / email links hand off to those services directly.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What personal information we collect when you use this site or ask us for a quote, why, and what we do with it."
    >
      <LegalSection heading="Who we are">
        <p>
          {siteConfig.name} is the trading name of {companyDetails.legalName} (company number{" "}
          {companyDetails.companyNumber}), registered office {companyDetails.registeredOffice}. We are
          the controller of the personal information described on this page. Contact:{" "}
          {siteConfig.email}.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <Placeholder note="It will list the details collected by the quote form and through phone, WhatsApp and email enquiries." />
      </LegalSection>

      <LegalSection heading="Why we use it and our lawful basis">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <Placeholder note="It will name the service providers that host or process the information on our behalf." />
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="Your rights">
        <Placeholder note="It will explain your rights under UK data protection law and how to exercise them, including how to complain to the ICO." />
      </LegalSection>

      <LegalSection heading="Cookies">
        <Placeholder note="It will describe what, if anything, this site stores in your browser." />
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <Placeholder />
      </LegalSection>
    </LegalPage>
  );
}
