import Link from "next/link";
import { services } from "@/lib/content/services";
import ServiceIcon from "./illustrations/ServiceIcon";

const iconBySlug: Record<string, "gutter" | "bin" | "window" | "pressure" | "commercial"> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "commercial-cleaning": "commercial",
};

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand">
        What We Do
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        Our Services
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="group flex flex-col rounded-2xl border border-border-subtle bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
          >
            <ServiceIcon type={iconBySlug[service.slug]} className="h-14 w-14" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">{service.name}</h3>
            <p className="mt-1.5 flex-1 text-sm text-foreground/70">{service.cardBlurb}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
