import Link from "next/link";
import { services } from "@/lib/content/services";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">Our Services</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle transition-shadow hover:shadow-lg"
          >
            <PhotoPlaceholder label={service.name} aspect="aspect-square" className="rounded-none border-0 border-b border-border-subtle" />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
              <p className="mt-1.5 flex-1 text-sm text-foreground/70">{service.cardBlurb}</p>
              <span className="mt-3 text-sm font-semibold text-brand-dark group-hover:underline">
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
