import type { Metadata } from "next";
import BuildingScene from "@/components/illustrations/BuildingScene";
import ServiceIcon from "@/components/illustrations/ServiceIcon";
import FAQAccordion from "@/components/FAQAccordion";
import QuoteForm from "@/components/QuoteForm";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/content/services";
import { whatsappHref } from "@/lib/siteConfig";

const service = getServiceBySlug("commercial-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

const whoWeWorkWith = [
  "Property managers",
  "Landlords",
  "Offices",
  "Shops",
  "Schools",
  "Blocks",
  "Organisations",
  "Commercial premises",
];

const commercialServices = [
  { label: "Gutter Cleaning", href: "/gutter-cleaning" },
  { label: "Portfolio Gutter Care Scheme", href: "/gutter-cleaning/portfolio" },
  { label: "Bin Cleaning", href: "/bin-cleaning" },
  { label: "Window Cleaning", href: "/window-cleaning" },
  { label: "Pressure Washing", href: "/pressure-washing" },
  { label: "Scheduled Maintenance", href: "/quote" },
];

const whyCleano = [
  "VAT invoices",
  "Fully insured",
  "Professional equipment",
  "Scheduled service",
  "Photo reports",
  "One point of contact",
  "Multi-site capability",
];

export default function CommercialCleaningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-muted-bg">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-light/20" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="relative">
            <ServiceIcon type="commercial" className="h-14 w-14" />
            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {service.heroHeadline}
            </h1>
            <p className="mt-4 text-lg text-foreground/70">{service.heroSubhead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="#quote"
                className="rounded-full bg-brand px-4 py-2 text-center text-xs font-semibold text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark sm:text-sm"
              >
                Request a Commercial Quote
              </Link>
              <a
                href={whatsappHref("Hi Cleano, I'd like a quote for commercial cleaning")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-white px-4 py-2 text-center text-xs font-semibold text-brand-dark transition-colors hover:border-brand sm:text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <BuildingScene className="mx-auto w-full max-w-md" />
        </div>
      </section>

      {/* Who we work with */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Clients</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Who We Work With</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {whoWeWorkWith.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border-subtle bg-white px-4 py-2 text-sm font-medium text-foreground/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commercialServices.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl border border-border-subtle bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cleano */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why Cleano for Commercial Work?</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {whyCleano.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground/80">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQs */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Request a Commercial Quote
          </h2>
          <div className="mt-6">
            <QuoteForm sourcePage="/commercial-cleaning" defaultService="commercial_cleaning" />
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
