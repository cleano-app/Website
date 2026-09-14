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

const linkClass = "font-semibold text-brand-dark hover:underline";

// Wording supplied 2026-09-14 (terms-of-service draft). The five sections
// marked "safe to publish" are live below. "Our work and your rights" is
// still a placeholder - it states what a customer is legally entitled to
// and was explicitly marked "do not publish without checking"; the draft
// to take to that review is in the comment at that section. Cancellation
// lives on its own page and is drafted only under advice.
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
        <p>
          Cleano provides exterior cleaning for homes and businesses across London and the surrounding
          areas. Our services are gutter cleaning, rooftop cleaning, window cleaning, pressure washing,
          bin cleaning and graffiti removal.
        </p>
        <p>
          Work is carried out by our own uniformed team using professional equipment. We are fully
          insured. Every job ends with a Cleano Photo Report — before-and-after photographs of the
          work, sent to you by email.
        </p>
        <p>
          We work across London and the surrounding areas. Some services, including our 4-weekly bin
          cleaning subscription, are available in specific areas only. We will tell you when you ask
          for a quote whether we cover your address.
        </p>
      </LegalSection>

      <LegalSection heading="Quotes and pricing">
        <p>Every job is priced by quotation. We do not sell or take payment through this website.</p>
        <p>
          You can request a quote using the form on this site, by telephone on{" "}
          {siteConfig.phoneDisplay}, or on WhatsApp. Tell us the postcode and what needs cleaning, and
          we will come back to you with a price.
        </p>
        <p>
          Quotes are based on the information you give us. If the work turns out to be significantly
          different from what was described — more bins than agreed, a much larger area, or access
          that makes the job substantially harder — we will contact you with a revised price before
          carrying on. We will not increase a price without telling you first.
        </p>
        <p>
          Prices for bin cleaning subscriptions are confirmed per visit. Where a price is quoted
          excluding VAT, VAT is added at the prevailing rate.
        </p>
        <p>A quote is valid for 30 days unless we say otherwise.</p>
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
          Our <Link href="/cancellation" className={linkClass}>Cancellation policy</Link> explains how to
          end a subscription and our <Link href="/refunds" className={linkClass}>Refund policy</Link>{" "}
          explains what happens if a charge is wrong or a visit falls short.
        </p>
      </LegalSection>

      <LegalSection heading="Bookings and access">
        <p>
          A booking is confirmed once we have agreed the work and the price with you, and you have
          accepted. We will confirm the date with you before we attend.
        </p>
        <p>
          To carry out the work we need access to the property on the day. Depending on the service
          this may mean unlocking a side gate, moving a vehicle, leaving bins accessible, or arranging
          entry to a rear garden. We will tell you what is needed when the work is booked, and you can
          record access instructions with us so the team has them on the day.
        </p>
        <p>
          If we attend and cannot reach the work because access has not been arranged, we will
          photograph the position, let you know, and contact you to rearrange.
        </p>
        <p>
          We work outdoors and occasionally have to postpone for weather or other conditions that
          would make the work unsafe or ineffective. If that happens we will contact you as soon as we
          can and offer the next available date.
        </p>
        <p>
          For recurring bin cleaning, visits are scheduled around your council’s collection day. If
          the council changes its collection round, we will adjust the schedule and let you know.
        </p>
        <p>
          How to end a recurring subscription is set out in our{" "}
          <Link href="/cancellation" className={linkClass}>Cancellation policy</Link>.
        </p>
      </LegalSection>

      {/* NOT YET PUBLISHED - states what a customer is legally entitled to,
          so it must be checked before it goes live (a term that understates
          statutory rights is unenforceable). Draft to take to that review:

            We will carry out our services with reasonable care and skill.

            We are fully insured. If we cause damage to your property in the
            course of our work, tell us as soon as you can and we will deal
            with it through our insurance.

            Exterior cleaning cannot always restore a surface to new.
            Staining, moss damage, wear and existing defects may remain
            visible after cleaning, and we will tell you where we think that
            is likely before starting.

            Nothing in these terms affects your statutory rights as a
            consumer under the Consumer Rights Act 2015.

          Points for review: whether the damage wording limits liability in
          a way that is permitted, and whether the "cannot restore to new"
          paragraph is fair in context. */}
      <LegalSection heading="Our work and your rights">
        <Placeholder note="It will set out the standard of work, our insurance, and your statutory rights as a consumer." />
      </LegalSection>

      <LegalSection heading="Complaints">
        <p>If something is not right, tell us and we will put it right.</p>
        <p>
          Contact us on {siteConfig.phoneDisplay} or at {siteConfig.email} with the address, the date
          of the work and what the problem is. Photographs help.
        </p>
        <p>
          We aim to acknowledge every complaint within two working days and to resolve it within ten
          working days. Where a problem is with the standard of the work itself, we will normally
          return and put it right at no charge.
        </p>
        <p>
          If a charge is wrong, our <Link href="/refunds" className={linkClass}>Refund policy</Link>{" "}
          explains how that is dealt with.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the law of England and Wales. Any dispute arising from them will
          be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
