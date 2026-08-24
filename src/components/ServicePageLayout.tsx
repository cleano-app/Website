import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content/services";
import ServiceIcon from "./illustrations/ServiceIcon";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQAccordion from "./FAQAccordion";
import QuoteForm from "./QuoteForm";
import { whatsappHref } from "@/lib/siteConfig";

type IconType = "gutter" | "bin" | "window" | "pressure" | "commercial";

const iconBySlug: Record<string, IconType> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "commercial-cleaning": "commercial",
};

export default function ServicePageLayout({ service }: { service: Service }) {
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
      <section className="relative overflow-hidden border-b border-border-subtle bg-muted-bg">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-light/20" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="relative">
            <ServiceIcon type={icon} className="h-14 w-14" />
            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {service.heroHeadline}
            </h1>
            <p className="mt-4 text-lg text-foreground/70">{service.heroSubhead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#quote"
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref(`Hi Cleano, I'd like a quote for ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-white px-8 py-3.5 text-center text-sm font-semibold text-brand-dark transition-colors hover:border-brand"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border-subtle shadow-xl shadow-foreground/5">
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Service options (bin cleaning: one-off vs regular) */}
      {service.serviceOptions && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {service.serviceOptions.map((option) => (
              <div key={option.title} className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground">{option.title}</h2>
                <p className="mt-2 text-sm text-foreground/70">{option.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
      </section>

      {/* Before & after */}
      {service.beforeAfter && service.beforeAfter.length > 0 && (
        <section className="bg-muted-bg py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Real Results</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Before &amp; After</h2>
            <p className="mt-2 text-sm text-foreground/60">
              Drag the slider to see a {service.name.toLowerCase()} job.
            </p>
            <div className="mt-6 grid gap-6 sm:max-w-md">
              {service.beforeAfter.map((pair) => (
                <BeforeAfterSlider
                  key={pair.label}
                  label={pair.label}
                  beforeSrc={pair.before}
                  afterSrc={pair.after}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why this matters */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Why {service.name}?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {service.why.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border-subtle bg-white p-5">
              <h3 className="text-base font-semibold text-brand-dark">{point.title}</h3>
              <p className="mt-1.5 text-sm text-foreground/70">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Pricing</h2>
          <p className="mt-3 text-3xl font-bold text-brand-dark">
            {service.pricingFrom !== "Custom" ? `Prices from ${service.pricingFrom}` : "Custom pricing"}
          </p>
          <p className="mt-2 text-sm text-foreground/60">{service.pricingNote}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6">
          <FAQAccordion faqs={service.faqs} />
        </div>
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
