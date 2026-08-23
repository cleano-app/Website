import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Tell us what needs cleaning and we'll send you a free quote.",
};

export default function QuotePage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
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
