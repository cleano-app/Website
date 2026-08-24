import Link from "next/link";
import { services } from "@/lib/content/services";
import ServiceIcon from "./illustrations/ServiceIcon";
import FadeIn from "./motion/FadeIn";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";
import FloatingButterflies from "./motion/FloatingButterflies";

const sectionButterflies = [
  { top: "1%", left: "1%", size: 18, duration: 9, delay: 0.2, xDrift: [0, 8, -4, 0], yDrift: [0, -4, 2, 0], rotate: [-8, 10, -4, -8], opacity: 0.4 },
  { top: "1%", left: "96%", size: 16, duration: 10, delay: 1.1, xDrift: [0, -6, 4, 0], yDrift: [0, 4, -2, 0], rotate: [8, -10, 6, 8], opacity: 0.35 },
];

const iconBySlug: Record<string, "gutter" | "bin" | "window" | "pressure" | "commercial" | "graffiti"> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "commercial-cleaning": "commercial",
  "graffiti-removal": "graffiti",
};

// A little scrapbook-style twist per card instead of a rigid grid - each
// card sits at a slight alternating tilt and straightens up on hover/tap.
const tilt = ["-rotate-2", "rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

export default function ServicesGrid() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <FloatingButterflies flock={sectionButterflies} />
      <FadeIn className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">What We Do</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Our Services</h2>
      </FadeIn>
      <StaggerGrid className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {services.map((service, i) => (
          <StaggerItem key={service.slug}>
            <Link
              href={`/${service.slug}`}
              className={`group flex h-full flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-white px-4 py-7 text-center shadow-sm transition-all duration-300 ${tilt[i % tilt.length]} hover:-translate-y-1 hover:rotate-0 hover:border-brand/40 hover:shadow-lg active:rotate-0`}
            >
              <ServiceIcon type={iconBySlug[service.slug]} idle className="h-20 w-20 [&_svg]:h-10 [&_svg]:w-10" />
              <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
