import Link from "next/link";
import { whatsappHref } from "@/lib/siteConfig";
import FadeIn from "./motion/FadeIn";
import FloatingButterflies from "./motion/FloatingButterflies";

const ctaButterflies = [
  { top: "15%", left: "8%", size: 22, duration: 9, delay: 0.2, xDrift: [0, 12, -6, 0], yDrift: [0, -12, 6, 0], rotate: [-8, 10, -4, -8], opacity: 0.5 },
  { top: "70%", left: "88%", size: 18, duration: 10, delay: 1, xDrift: [0, -10, 8, 0], yDrift: [0, 10, -8, 0], rotate: [8, -10, 6, 8], opacity: 0.4 },
];

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <FadeIn>
        <div className="bg-grain relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-dark px-6 py-16 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -top-20 -left-16 h-56 w-56 rounded-full bg-white/15" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-brand-light/20" />
          <FloatingButterflies flock={ctaButterflies} />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Need it cleaned?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/90">
              Send us your postcode and what needs doing and we&apos;ll provide a quote.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/quote"
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/90 sm:text-sm"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref("Hi Cleano, I'd like a quote for...")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/60 px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
