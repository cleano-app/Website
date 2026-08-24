import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import FloatingButterflies from "@/components/motion/FloatingButterflies";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Tell us what needs cleaning and we'll send you a free quote.",
};

export default function QuotePage() {
  return (
    <section className="relative mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
      <FloatingButterflies
        flock={[
          { top: "0%", left: "4%", size: 18, duration: 9, delay: 0.2, xDrift: [0, 10, -6, 0], yDrift: [0, -10, 6, 0], rotate: [-8, 10, -4, -8], opacity: 0.4 },
          { top: "2%", left: "90%", size: 16, duration: 10, delay: 1, xDrift: [0, -8, 6, 0], yDrift: [0, 8, -6, 0], rotate: [8, -10, 6, 8], opacity: 0.35 },
        ]}
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Get a Free Quote</h1>
        <p className="mt-3 text-foreground/70">
          Takes under a minute. Add a photo or two and we can often quote without a site visit.
        </p>
      </div>
      <div className="mt-8">
        <QuoteForm sourcePage="/quote" />
      </div>
    </section>
  );
}
