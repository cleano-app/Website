import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { companyDetails, mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy",
  description:
    "How to cancel a Cleano bin cleaning subscription or skip a visit, what happens to your last clean, and your 14-day right to cancel.",
  path: "/cancellation",
});

// Wording supplied 2026-09-22 (cancellation-policy draft), published with
// the four figures confirmed by the office: cancellation cut-off 2 working
// days, complaint window 7 days, two failed payments before a pause, and
// 30 days' notice of a price change. Every one of these is a promise the
// business now has to keep - if any changes, this page changes with it.
//
// Two corrections against the draft:
//  - It told customers to cancel or skip from "Your bins" in their account.
//    No such page exists: the customer portal is Dashboard / Book /
//    Documents / Messages / Profile / Settings, and there is no cancel,
//    pause or skip action anywhere in Cleano Ops. Both routed to the office
//    instead. If self-service ever ships, add it back here.
//  - The pause after two failed payments is an office decision, not an
//    automatic one - nothing in the app pauses anything - so it's worded as
//    something we may do after getting in touch.
//
// The 14-day section states a statutory right under the Consumer Contracts
// (Information, Cancellation and Additional Charges) Regulations 2013,
// which applies because customers book at a distance. It is written in the
// customer's favour and is the section the drafter flagged as worth having
// checked by an adviser; it is also the one Stripe's reviewers read.
const LAST_UPDATED = "22 September 2026";

const linkClass = "font-semibold text-brand-dark hover:underline";

export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation Policy"
      intro="How to cancel your bin cleaning, skip a visit while you're away, and what happens to your last clean."
    >
      <LegalSection heading="Cancelling your bin cleaning">
        <p className="text-lg font-semibold text-foreground">
          You can stop at any time. There&apos;s no notice period and no fee.
        </p>
        <p>Tell us however suits you:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            WhatsApp{" "}
            <a href={whatsappHref("Hi Cleano, I'd like to cancel my bin cleaning.")} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            Phone{" "}
            <a href={telHref()} className={linkClass}>
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li>
            Email{" "}
            <a href={mailtoHref({ subject: "Cancelling my bin cleaning" })} className={linkClass}>
              {siteConfig.email}
            </a>
          </li>
        </ul>
        <p>We&apos;ll confirm by email within one working day.</p>
      </LegalSection>

      <LegalSection heading="Your last clean">
        <p>
          If you cancel <strong className="text-foreground">more than 2 working days</strong> before
          your next clean, that clean won&apos;t happen and you won&apos;t be charged for it.
        </p>
        <p>
          If you cancel <strong className="text-foreground">less than 2 working days</strong> before,
          we may already have built the round and planned the van, so that clean goes ahead and is
          charged as normal. It&apos;s your last one — nothing is charged after it.
        </p>
      </LegalSection>

      <LegalSection heading="Nothing is charged in advance">
        <p>
          We charge <strong className="text-foreground">after</strong> each clean, never before, and
          only for the bins we actually cleaned. There&apos;s no subscription payment to get back, no
          balance to refund and nothing to claim. If a bin wasn&apos;t out and we couldn&apos;t reach
          it, it isn&apos;t charged.
        </p>
      </LegalSection>

      <LegalSection heading="If you've just booked">
        <p>
          If you booked online and have changed your mind, you have a legal right to cancel within{" "}
          <strong className="text-foreground">14 days</strong> of booking, under the Consumer
          Contracts (Information, Cancellation and Additional Charges) Regulations 2013. Just tell us
          — no reason needed.
        </p>
        <p>
          If you asked us to start cleaning inside those 14 days and we&apos;ve already been,
          we&apos;ll charge for the cleans we&apos;ve done. Nothing more.
        </p>
      </LegalSection>

      <LegalSection heading="Going away, or just skipping one">
        <p>You don&apos;t have to cancel to skip a clean.</p>
        <p>
          Message the office at least <strong className="text-foreground">2 working days</strong>{" "}
          before — WhatsApp, phone or email, whichever is easiest. We&apos;ll skip that visit and pick
          up as normal next time. A skipped visit is never charged.
        </p>
        <p>If you&apos;re away for longer, tell us the dates and we&apos;ll pause you for as long as you need.</p>
      </LegalSection>

      <LegalSection heading="If something goes wrong">
        <p>
          If we miss you, or you&apos;re not happy with a clean, tell us within{" "}
          <strong className="text-foreground">7 days</strong>. We&apos;ll come back and do it again at
          no charge, or refund that clean — whichever you&apos;d rather.
        </p>
        <p>Refunds go back to the card we charged, usually within 5 working days.</p>
        <p>
          For a charge you don&apos;t recognise, or a duplicate payment, see our{" "}
          <Link href="/refunds" className={linkClass}>Refund policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="If a payment fails">
        <p>
          Cards expire and banks decline things. If a payment doesn&apos;t go through, we&apos;ll let
          you know and try again. Nothing is added for a failed payment.
        </p>
        <p>
          If we can&apos;t collect for two cleans in a row, we&apos;ll get in touch, and we may pause
          your cleaning rather than keep turning up. As soon as the card is sorted, we start again.
        </p>
      </LegalSection>

      <LegalSection heading="If our prices change">
        <p>
          We&apos;ll tell you at least <strong className="text-foreground">30 days</strong> before any
          price change, by email and by text. If you&apos;d rather stop, cancel before it takes effect
          and the old price stands for every clean up to then.
        </p>
      </LegalSection>

      <LegalSection heading="If we need to cancel">
        <p>
          We might have to stop cleaning at an address — a round changes, or we can&apos;t get safe
          access to the bins. If so we&apos;ll give you at least{" "}
          <strong className="text-foreground">30 days&apos; notice</strong> and charge nothing further.
        </p>
        <p>
          We may stop sooner if we can&apos;t get to the bins repeatedly, if payment keeps failing, or
          if our staff are treated abusively.
        </p>
      </LegalSection>

      <LegalSection heading="Who we are">
        <p>
          <strong className="text-foreground">{companyDetails.legalName}</strong>
          <br />
          {companyDetails.registeredOffice}
          <br />
          <a href={telHref()} className={linkClass}>{siteConfig.phoneDisplay}</a> ·{" "}
          <a href={mailtoHref()} className={linkClass}>{siteConfig.email}</a>
        </p>
        <p className="text-sm text-foreground/60">Last updated: {LAST_UPDATED}</p>
      </LegalSection>
    </LegalPage>
  );
}
