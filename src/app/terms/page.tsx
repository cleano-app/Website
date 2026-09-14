import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { companyDetails, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms on which ${companyDetails.legalName}, trading as ${siteConfig.name}, provides its exterior cleaning services.`,
  path: "/terms",
});

// Wording for the terms themselves is supplied after legal advice - see
// LegalPage.tsx. The one drafted section is "How payment works", which
// describes the existing quote-led process (no online sales, no public
// pricing, no checkout) so a reviewer can see how a card comes to be stored.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The terms that apply when you ask Cleano for a quote or book one of our services."
    >
      <LegalSection heading="Who we are">
        <p>
          {siteConfig.name} is the trading name of {companyDetails.legalName}, a company registered in{" "}
          {companyDetails.registrationPlace} under company number {companyDetails.companyNumber}. VAT
          registration number {companyDetails.vatNumber}. Registered office:{" "}
          {companyDetails.registeredOffice}.
        </p>
        <p>
          You can contact us on {siteConfig.phoneDisplay} or at {siteConfig.email}.
        </p>
      </LegalSection>

      <LegalSection heading="Our services">
        <Placeholder note="It will describe the exterior cleaning services Cleano provides and where." />
      </LegalSection>

      <LegalSection heading="Quotes and pricing">
        <Placeholder note="It will explain that every job is priced by quotation, confirmed by our office before any work is booked." />
      </LegalSection>

      <LegalSection heading="How payment works">
        <p>Cleano does not sell online, and no work is booked or charged for from this website.</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            You request a quote — by the form on this site, by phone, or on WhatsApp — telling us what
            needs cleaning and where.
          </li>
          <li>
            Our office confirms the price with you directly. Nothing is booked until you have agreed it.
          </li>
          <li>
            For a bin cleaning subscription, once the price is agreed we send you a secure link to save a
            payment card. Card details are entered on a page hosted by our payment provider, Stripe; they
            are never seen or stored by Cleano.
          </li>
          <li>
            Each visit is then charged automatically to that saved card after the visit has been carried
            out, at the price confirmed with you.
          </li>
        </ol>
        <p>
          Our <Link href="/cancellation" className="font-semibold text-brand-dark hover:underline">Cancellation policy</Link>{" "}
          explains how to end a subscription and our{" "}
          <Link href="/refunds" className="font-semibold text-brand-dark hover:underline">Refund policy</Link>{" "}
          explains what happens if a charge is wrong or a visit falls short.
        </p>
      </LegalSection>

      <LegalSection heading="Bookings, access and cancellation">
        <Placeholder note="It will cover booking confirmation, access to the property on the day, and will point to the Cancellation policy." />
      </LegalSection>

      <LegalSection heading="Our work and your rights">
        <Placeholder note="It will set out the standard of work, our insurance, and your statutory rights as a consumer." />
      </LegalSection>

      <LegalSection heading="Complaints">
        <Placeholder note="It will explain how to raise a complaint and how we respond." />
      </LegalSection>

      <LegalSection heading="Governing law">
        <Placeholder />
      </LegalSection>
    </LegalPage>
  );
}
