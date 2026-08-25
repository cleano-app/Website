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

type IconType = "gutter" | "bin" | "window" | "pressure" | "graffiti" | "rooftop";

const iconBySlug: Record<string, IconType> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "graffiti-removal": "graffiti",
  "rooftop-cleaning": "rooftop",
};

// A soft colour wash per card - much lower opacity than the icon badge's
// own tint (which needs to read clearly at icon size), just enough to give
// each card its own personality instead of six identical white boxes.
const cardTint: Record<IconType, string> = {
  gutter: "from-brand-light/25 via-white to-white",
  bin: "from-brand/20 via-white to-white",
  window: "from-brand-light/30 via-white to-white",
  pressure: "from-brand-dark/15 via-white to-white",
  graffiti: "from-brand-dark/20 via-white to-white",
  rooftop: "from-brand/15 via-brand-light/15 to-white",
};

// The corner accent blob - same idea, one shared shape reused per card via
// a per-card colour so it reads as a family rather than random spots.
const cornerAccent: Record<IconType, string> = {
  gutter: "bg-brand-light/40",
  bin: "bg-brand/35",
  window: "bg-brand-light/45",
  pressure: "bg-brand-dark/25",
  graffiti: "bg-brand-dark/30",
  rooftop: "bg-brand/30",
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
      <StaggerGrid className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {services.map((service, i) => {
          const icon = iconBySlug[service.slug];
          return (
            <StaggerItem key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className={`group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br px-5 py-7 text-center shadow-sm transition-all duration-300 ${cardTint[icon]} ${tilt[i % tilt.length]} hover:-translate-y-1 hover:rotate-0 hover:border-brand/40 hover:shadow-lg active:rotate-0`}
              >
                {/* Corner accent - a soft blurred blob peeking from behind
                    the card, tucked further in on hover like it's being
                    pulled into frame. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full blur-2xl transition-transform duration-300 group-hover:scale-125 ${cornerAccent[icon]}`}
                />

                <ServiceIcon
                  type={icon}
                  idle
                  className="relative h-20 w-20 [&_svg]:h-10 [&_svg]:w-10"
                />
                <div className="relative">
                  <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                  <p className="mt-1 text-xs leading-snug text-foreground/60">{service.cardBlurb}</p>
                </div>
                <span className="relative mt-auto flex items-center gap-1 pt-2 text-xs font-semibold text-brand-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more
                  <ArrowIcon />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
