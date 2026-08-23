import Link from "next/link";
import type { Service } from "@/lib/content/services";
import PhotoPlaceholder from "./PhotoPlaceholder";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQAccordion from "./FAQAccordion";
import QuoteForm from "./QuoteForm";
import { whatsappHref } from "@/lib/siteConfig";

export default function ServicePageLayout({ service }: { service: Service }) {
  const leadService = service.slug.replace(/-/g, "_") as
    | "gutter_cleaning"
    | "bin_cleaning"
    | "window_cleaning"
    | "pressure_washing"
    | "commercial_cleaning";

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {service.heroHeadline}
            </h1>
            <p className="mt-4 text-lg text-foreground/70">{service.heroSubhead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#quote"
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref(`Hi Cleano, I'd like a quote for ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand px-8 py-3.5 text-center text-sm font-semibold text-brand-dark"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <PhotoPlaceholder label={`${service.name} in progress`} aspect="aspect-[4/3]" />
        </div>
      </section>

      {/* Service options (bin cleaning: one-off vs regular) */}
      {service.serviceOptions && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {service.serviceOptions.map((option) => (
              <div key={option.title} className="rounded-2xl border border-border-subtle p-6">
                <h2 className="text-lg font-bold text-foreground">{option.title}</h2>
                <p className="mt-2 text-sm text-foreground/70">{option.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">What&apos;s Included</h2>
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
      <section className="bg-muted-bg py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Before &amp; After</h2>
          <p className="mt-2 text-sm text-foreground/60">Real {service.name.toLowerCase()} jobs.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BeforeAfterSlider label={`${service.name} job 1`} />
            <BeforeAfterSlider label={`${service.name} job 2`} />
            <BeforeAfterSlider label={`${service.name} job 3`} />
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Why {service.name}?
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {service.why.map((point) => (
            <div key={point.title}>
              <h3 className="text-base font-semibold text-brand-dark">{point.title}</h3>
              <p className="mt-1.5 text-sm text-foreground/70">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted-bg py-14">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Pricing</h2>
          <p className="mt-3 text-3xl font-bold text-brand-dark">
            {service.pricingFrom !== "Custom" ? `Prices from ${service.pricingFrom}` : "Custom pricing"}
          </p>
          <p className="mt-2 text-sm text-foreground/60">{service.pricingNote}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6">
          <FAQAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="bg-muted-bg py-14">
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
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-0.5 shrink-0 text-brand"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
