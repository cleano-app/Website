import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { companyDetails, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${companyDetails.legalName}, trading as ${siteConfig.name}, collects and uses your personal information.`,
  path: "/privacy",
});

// Wording supplied 2026-09-15 (privacy-policy draft), published with the
// factual corrections needed to match what this site actually does:
//   - the quote form collects name, phone, postcode, service, a note and
//     optional photos (no email/address field) plus source page and any
//     campaign tag; photos are emailed to the office and never stored here
//     (src/app/api/leads/route.ts)
//   - providers: Microsoft 365 carries the enquiry email, Vercel hosts the
//     site, Cloudflare runs the quote-form bot check; Resend is gone
//   - Cookies section written against the build: the site sets no cookies
//     and runs no analytics; only Cloudflare's Turnstile check on the form
//   - the twelve-month deletion is enforced by /api/cron/purge-leads
const LAST_UPDATED = "15 September 2026";

const providers: { name: string; holds: string; where: string }[] = [
  { name: "Stripe", holds: "Payment and card processing", where: "UK / EU / US" },
  {
    name: "Supabase",
    holds: "Our job management system, and the enquiry records from this website — customer, job and photo records",
    where: "United Kingdom (London)",
  },
  {
    name: "Microsoft (Office 365)",
    holds: "Email, including quote enquiries and any photos sent with them, and documents",
    where: "UK / EU",
  },
  {
    name: "Vercel",
    holds: "Hosts this website. Standard server logs, including your IP address, kept briefly for security",
    where: "US / EU",
  },
  {
    name: "Cloudflare",
    holds: "Our domain, and the check on the quote form that tells a person from an automated script",
    where: "Worldwide",
  },
];

const rights = [
  "Ask what information we hold about you, and get a copy",
  "Have inaccurate information corrected",
  "Ask us to delete information, where we are not required to keep it",
  "Object to us using your information for our legitimate interests, including marketing",
  "Ask us to restrict how we use your information",
  "Ask for your information in a portable format",
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What personal information we collect when you use this site or ask us for a quote, why, and what we do with it."
    >
      <p className="text-foreground/75">
        {companyDetails.legalName} takes your privacy seriously. This page explains what information
        we collect, why we collect it, and what we do with it.
      </p>

      <LegalSection heading="Who we are">
        <p>
          {siteConfig.name} is the trading name of {companyDetails.legalName}, a company registered in{" "}
          {companyDetails.registrationPlace} under company number {companyDetails.companyNumber}.
          Registered office: {companyDetails.registeredOffice}.
        </p>
        <p>
          We are the data controller for the information described on this page. If you have any
          question about your information, contact us at {siteConfig.email} or on{" "}
          {siteConfig.phoneDisplay}.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          <strong className="text-foreground">When you ask for a quote</strong>
          <br />
          Your name, telephone number and postcode, the service you are asking about, anything you
          tell us about the work, and any photographs you choose to attach. If you use the form on
          this site we also record which page you sent it from and any campaign tag in the link you
          followed. Enquiries by telephone, email or WhatsApp are recorded with whatever details you
          give us, which may include your address and email address.
        </p>
        <p>
          <strong className="text-foreground">When you become a customer</strong>
          <br />
          The above, plus the property address or addresses we attend, access instructions you give
          us, the dates we attend, and a record of the work carried out.
        </p>
        <p>
          <strong className="text-foreground">When you pay</strong>
          <br />
          We do not collect or store card details. Card payments are handled by Stripe, our payment
          provider. Card details are entered on a page hosted by Stripe and are never seen or stored
          by Cleano. We hold a record of payments made, amounts, and whether a payment succeeded.
        </p>
        <p>
          <strong className="text-foreground">Photographs of your property</strong>
          <br />
          For gutter cleaning, rooftop cleaning and similar work, our team photographs the areas we
          work on before and after cleaning. These photographs form part of the report we send you
          and are kept as a record of the work. They show the parts of the building we cleaned.
          Photographs you send us with an enquiry are emailed to our office together with your
          enquiry; this website does not store them.
        </p>
        <p>
          <strong className="text-foreground">When you contact us</strong>
          <br />A record of your message, whether by the form on this site, by email, by telephone
          or on WhatsApp.
        </p>
      </LegalSection>

      <LegalSection heading="Why we collect it">
        <ul className="list-disc space-y-1 pl-5">
          <li>To give you a quote and to carry out work you have booked</li>
          <li>To reach you about a job, before, during or after it</li>
          <li>To take payment and keep proper accounting records</li>
          <li>To evidence the work carried out, including photographs</li>
          <li>To send you service messages, such as confirming a visit</li>
          <li>To meet our legal obligations, including tax and VAT records</li>
        </ul>
        <p>
          Our lawful basis for most of this is performance of a contract with you, or taking steps at
          your request before entering one. For accounting and tax records it is a legal obligation.
          Where we use your information to improve or promote our services, our lawful basis is our
          legitimate interests, and you can object at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Marketing">
        <p>We may send you occasional emails or WhatsApp messages about our services.</p>
        <p>
          You can stop these at any time — reply STOP to a WhatsApp message, use the unsubscribe link
          in an email, or contact us on any of the details above. Stopping marketing messages does
          not stop service messages about work you have booked.
        </p>
        <p>
          We do not sell your information to anyone, and we do not share it for anyone else’s
          marketing.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>We use a small number of service providers who process information on our behalf:</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-foreground">
                <th scope="col" className="py-2 pr-4 font-semibold">Provider</th>
                <th scope="col" className="py-2 pr-4 font-semibold">What they hold</th>
                <th scope="col" className="py-2 font-semibold">Where</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.name} className="border-b border-border-subtle align-top">
                  <td className="py-2 pr-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-2 pr-4">{p.holds}</td>
                  <td className="py-2 whitespace-nowrap">{p.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Each of these is bound by contract to handle your information only on our instructions.</p>
        <p>
          We may also share information where we are required to by law, or with our accountants and
          professional advisers where necessary.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep customer and job records, including photographs, for as long as you are a customer
          and for six years after our last job for you. This allows us to answer questions about past
          work, deal with any claim, and meet our accounting obligations.
        </p>
        <p>
          We keep accounting records for six years after the end of the accounting period they relate
          to, as required by law.
        </p>
        <p>Quote enquiries that do not become jobs are kept for twelve months and then deleted.</p>
        <p>
          You can ask us to delete your information sooner. We will do so unless we are required to
          keep it — for example, records that form part of our accounts.
        </p>
      </LegalSection>

      <LegalSection heading="Keeping it safe">
        <p>
          Access to customer information is limited to the people who need it. Our systems are
          password protected and our providers hold recognised security certifications. Card details
          never reach our systems.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>Under UK data protection law you have the right to:</p>
        <ul className="list-disc space-y-1 pl-5">
          {rights.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          To exercise any of these, contact us at {siteConfig.email}. We will respond within one
          month.
        </p>
        <p>
          If you are unhappy with how we have handled your information, you can complain to the
          Information Commissioner’s Office at ico.org.uk or on 0303 123 1113.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This website sets no cookies of its own and uses no analytics, advertising or tracking
          tools.
        </p>
        <p>
          The quote form uses Cloudflare Turnstile to check that a request comes from a person rather
          than an automated script. Cloudflare may place a cookie in your browser for that check
          while you are on the form. It is used only for that purpose and not to identify or track
          you. Because we set nothing that needs your consent, we do not show a cookie banner.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this page">
        <p>
          We may update this page from time to time. The current version is always the one published
          here.
        </p>
        <p className="text-sm text-foreground/60">Last updated: {LAST_UPDATED}</p>
      </LegalSection>
    </LegalPage>
  );
}
