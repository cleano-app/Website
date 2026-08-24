import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand">
        What We Do
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
        Our Services
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={service.heroImage.src}
                alt={service.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-5">
              <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{service.cardBlurb}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
                View service
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
