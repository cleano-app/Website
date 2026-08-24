import Link from "next/link";
import type { ReactNode } from "react";
import type { Service } from "@/lib/content/services";
import ServiceIcon from "./illustrations/ServiceIcon";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQAccordion from "./FAQAccordion";
import QuoteForm from "./QuoteForm";
import FadeIn from "./motion/FadeIn";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";
import { whatsappHref } from "@/lib/siteConfig";

type IconType = "gutter" | "bin" | "window" | "pressure" | "commercial";

const iconBySlug: Record<string, IconType> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "commercial-cleaning": "commercial",
};

export default function ServicePageLayout({
  service,
  afterHero,
}: {
  service: Service;
  /** Optional extra content rendered right after the hero, before "What's Included". */
  afterHero?: ReactNode;
}) {
  const leadService = service.slug.replace(/-/g, "_") as
    | "gutter_cleaning"
    | "bin_cleaning"
    | "window_cleaning"
    | "pressure_washing"
    | "commercial_cleaning";
  const icon = iconBySlug[service.slug];

  return (
    <>
      {/* Hero */}
      <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <FadeIn className="relative">
            <ServiceIcon type={icon} className="h-14 w-14" />
            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {service.heroHeadline}
            </h1>
            <p className="mt-4 text-lg text-foreground/70">{service.heroSubhead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#quote"
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref(`Hi Cleano, I'd like a quote for ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-white px-8 py-3.5 text-center text-sm font-semibold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
              >
                WhatsApp Us
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="relative flex items-center justify-center rounded-2xl bg-white/60 p-10">
            <ServiceIcon type={icon} className="h-40 w-40 [&_svg]:h-20 [&_svg]:w-20" />
          </FadeIn>
        </div>
      </section>

      {afterHero}

      {/* Service options (bin cleaning: one-off vs regular) */}
      {service.serviceOptions && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <StaggerGrid className="grid gap-6 sm:grid-cols-2">
            {service.serviceOptions.map((option) => (
              <StaggerItem key={option.title}>
                <div className="h-full rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-foreground">{option.title}</h2>
                  <p className="mt-2 text-sm text-foreground/70">{option.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      )}

      {/* What's included */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Included</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">What&apos;s Included</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground/80">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* Before & after */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Real Results</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Before &amp; After</h2>
            <p className="mt-2 text-sm text-foreground/60">Real {service.name.toLowerCase()} jobs.</p>
          </FadeIn>
          <StaggerGrid className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <BeforeAfterSlider label={`${service.name} job 1`} icon={icon} />
            </StaggerItem>
            <StaggerItem>
              <BeforeAfterSlider label={`${service.name} job 2`} icon={icon} />
            </StaggerItem>
            <StaggerItem>
              <BeforeAfterSlider label={`${service.name} job 3`} icon={icon} />
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Why this matters */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Why {service.name}?
          </h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-6 sm:grid-cols-3">
          {service.why.map((point) => (
            <StaggerItem key={point.title}>
              <div className="h-full rounded-2xl border border-border-subtle bg-white p-5">
                <h3 className="text-base font-semibold text-brand-dark">{point.title}</h3>
                <p className="mt-1.5 text-sm text-foreground/70">{point.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Pricing */}
      <section className="bg-muted-bg py-16">
        <FadeIn className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Pricing</h2>
          <p className="mt-3 text-3xl font-bold text-brand-dark">
            {service.pricingFrom !== "Custom" ? `Prices from ${service.pricingFrom}` : "Custom pricing"}
          </p>
          <p className="mt-2 text-sm text-foreground/60">{service.pricingNote}</p>
        </FadeIn>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <FadeIn>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </FadeIn>
      </section>

      {/* Quote form */}
      <section id="quote" className="bg-muted-bg py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Get a Free Quote
          </h2>
          <div className="mt-6">
            <QuoteForm sourcePage={`/${service.slug}`} defaultService={leadService} />
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
