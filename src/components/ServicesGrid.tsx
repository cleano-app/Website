import Link from "next/link";
import { services } from "@/lib/content/services";
import ServiceIcon from "./illustrations/ServiceIcon";
import FadeIn from "./motion/FadeIn";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";

const iconBySlug: Record<string, "gutter" | "bin" | "window" | "pressure" | "commercial"> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "commercial-cleaning": "commercial",
};

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <FadeIn className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">What We Do</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Our Services</h2>
      </FadeIn>
      <StaggerGrid className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {services.map((service) => (
          <StaggerItem key={service.slug}>
            <Link
              href={`/${service.slug}`}
              className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-white px-4 py-7 text-center transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <ServiceIcon
                type={iconBySlug[service.slug]}
                className="h-20 w-20 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 [&_svg]:h-10 [&_svg]:w-10"
              />
              <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
