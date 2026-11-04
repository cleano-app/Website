import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";
import { btn, PlainHero } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";
import { portfolioPath } from "@/lib/portfolio";
import { mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Call, WhatsApp or email ${siteConfig.name} for a free quote. ${siteConfig.phoneDisplay} · ${siteConfig.email} · London and the surrounding areas.`,
  path: "/contact",
});

// One place with every way to reach Cleano. Everything here comes from
// siteConfig / companyDetails so it can never disagree with the header,
// footer or the policy pages. The quote form sits here too, so someone who
// came to get in touch can ask for a price without another click.
const ways = [
  {
    label: "Call us",
    value: siteConfig.phoneDisplay,
    href: telHref(),
    note: "The quickest way to reach the office.",
    icon: <PhoneIcon />,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Message us on WhatsApp",
    href: whatsappHref("Hi Cleano, I'd like a quote for...", "/contact"),
    note: "Send photos of the job and we can often quote from them.",
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: mailtoHref(),
    note: "For quotes, invoices, and anything else.",
    icon: <MailIcon />,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PlainHero
        crumb="Contact"
        title="Contact us"
        lead="Call, message or email - whichever suits you. For a price, the quote form takes under a minute."
      />

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-3">
            {ways.map((way) => (
              <li key={way.label}>
                <a
                  href={way.href}
                  {...(way.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block h-full rounded-[12px] border border-border-subtle bg-white p-5 transition-colors hover:border-brand-dark"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e9f5ef] text-brand-dark">{way.icon}</span>
                  <p className="mt-3.5 text-[13px] font-bold tracking-[0.06em] text-brand-dark uppercase">{way.label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">{way.value}</p>
                  <p className="mt-1 text-sm text-foreground/60">{way.note}</p>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-[25px] font-bold text-foreground sm:text-[32px]">Where we work</h2>
              <p className="mt-2 leading-relaxed text-foreground/65">
                We cover London and the surrounding areas. Tell us your postcode when you get in touch and we&apos;ll let you
                know straight away.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[12px] border border-border-subtle bg-white p-5">
                  <p className="font-display text-[17px] font-bold text-foreground">Landlord or property manager?</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                    Our Portfolio Gutter Care Scheme inspects every property by drone and cleans only where it&apos;s needed.
                    Where the gutters are clear, the report is free.
                  </p>
                  <Link href={portfolioPath} className={`${btn.solid} mt-4`}>
                    See the Portfolio Scheme
                  </Link>
                </div>
                <div className="rounded-[12px] border border-border-subtle bg-white p-5">
                  <p className="font-display text-[17px] font-bold text-foreground">Already a customer?</p>
                  <p className="mt-1 text-sm text-foreground/65">Sign in to the Cleano app to see your bookings, reports and invoices.</p>
                  <a href={`${siteConfig.opsAppUrl}/login`} className={`${btn.line} mt-4`}>
                    Customer sign in
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[25px] font-bold text-foreground sm:text-[28px]">Get a free quote</h2>
              <p className="mt-1.5 mb-4 text-sm text-foreground/65">Add a photo or two and we can often quote without a visit.</p>
              <QuoteForm sourcePage="/contact" />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.5 3.9 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
