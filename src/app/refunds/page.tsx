import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, Placeholder } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description: "What Cleano does about a missed visit, work not to standard, or a duplicate or incorrect charge, and how to raise it.",
  path: "/refunds",
});

// Kept separate from the Cancellation policy on purpose - one is about
// ending a subscription, this is about putting a charge or a visit right.
export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="What we do if a visit is missed, the work isn't up to standard, or you've been charged incorrectly."
    >
      <LegalSection heading="Missed visit">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="Work not to standard">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="Duplicate or incorrect charge">
        <Placeholder />
      </LegalSection>

      <LegalSection heading="How to raise it">
        <Placeholder note="It will say who to contact, how, and what details help us resolve it quickly." />
      </LegalSection>

      <LegalSection heading="How long a resolution takes">
        <Placeholder />
      </LegalSection>

      <p className="mt-10 text-sm text-foreground/60">
        To end a subscription rather than query a charge, see our{" "}
        <Link href="/cancellation" className="font-semibold text-brand-dark hover:underline">Cancellation policy</Link>.
      </p>
    </LegalPage>
  );
}
