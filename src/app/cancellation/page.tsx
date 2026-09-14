import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy",
  description: "How to cancel a Cleano bin cleaning subscription or a booked visit, and what happens when you do.",
  path: "/cancellation",
});

// Section headings are the ones card networks look for on a recurring
// billing policy. The notice period and the treatment of an already-paid
// cycle are decided under UK consumer law advice, not here - every section
// is a marked placeholder until that wording is supplied.
export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation Policy"
      intro="How to cancel a bin cleaning subscription or a booked visit, and what happens to charges when you do."
    >
      <LegalSection heading="How to cancel">
        <Placeholder note="It will list the ways to tell us you want to cancel (phone, email, WhatsApp) and what to include." />
      </LegalSection>

      <LegalSection heading="Notice period required">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="What happens to a cycle already paid for">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="When the final charge is taken">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="How cancellation is confirmed">
        <Placeholder note="It will describe the confirmation you receive and what to do if it doesn't arrive." />
      </LegalSection>

      <p className="mt-10 text-sm text-foreground/60">
        For missed visits, work not to standard, or a charge you don&apos;t recognise, see our{" "}
        <Link href="/refunds" className="font-semibold text-brand-dark hover:underline">Refund policy</Link>.
      </p>
    </LegalPage>
  );
}
