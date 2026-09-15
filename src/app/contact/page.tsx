import type { Metadata } from "next";
import Link from "next/link";
import FloatingButterflies from "@/components/motion/FloatingButterflies";
import { pageMetadata } from "@/lib/seo";
import { mailtoHref, siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Call, WhatsApp or email ${siteConfig.name} for a free quote. ${siteConfig.phoneDisplay} · ${siteConfig.email} · London and the surrounding areas.`,
  path: "/contact",
});

// One place with every way to reach Cleano. Everything here comes from
// siteConfig / companyDetails so it can never disagree with the header,
// footer or the policy pages. No form: the quote form at /quote is the
// form, and it's linked prominently instead of duplicated.
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
    href: whatsappHref("Hi Cleano, I'd like a quote for..."),
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
      <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/15">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-light/25 blur-3xl" />
        <FloatingButterflies
          flock={[
            { top: "16%", left: "10%", size: 20, duration: 9, delay: 0.2, xDrift: [0, 12, -6, 0], yDrift: [0, -12, 6, 0], rotate: [-8, 10, -4, -8], opacity: 0.5 },
            { top: "70%", left: "88%", size: 16, duration: 10, delay: 1, xDrift: [0, -8, 6, 0], yDrift: [0, 8, -6, 0], rotate: [8, -10, 6, 8], opacity: 0.4 },
          ]}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-xl text-foreground/70">
            Call, message or email — whichever suits you. For a price, the quote form takes under a
            minute.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {ways.map((way) => (
            <a
              key={way.label}
              href={way.href}
              {...(way.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-2xl border border-border-subtle p-5 transition-colors hover:border-brand"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                {way.icon}
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand">{way.label}</p>
              <p className="mt-1 text-lg font-bold text-foreground group-hover:text-brand-dark">{way.value}</p>
              <p className="mt-1 text-sm text-foreground/60">{way.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-brand px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">Want a price?</p>
            <p className="text-sm text-white/85">
              Tell us what needs cleaning and add a photo or two — we can often quote without a visit.
            </p>
          </div>
          <Link
            href="/quote"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark shadow-sm"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <section className="bg-muted-bg py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Where we work</h2>
          <p className="mx-auto mt-3 max-w-xl text-foreground/75">
            We cover London and the surrounding areas. Tell us your postcode when you get in touch
            and we&apos;ll let you know straight away.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-border-subtle p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Already a customer?</h2>
            <p className="mt-1 text-sm text-foreground/60">
              Sign in to the Cleano app to see your bookings, reports and invoices.
            </p>
          </div>
          <a
            href={`${siteConfig.opsAppUrl}/login`}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-brand hover:text-brand-dark sm:mt-0"
          >
            Sign In
          </a>
        </div>
      </section>
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
