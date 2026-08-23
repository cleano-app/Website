import Link from "next/link";
import { whatsappHref } from "@/lib/siteConfig";

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-brand px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">Need it cleaned?</h2>
        <p className="mx-auto mt-3 max-w-md text-white/90">
          Send us your postcode and what needs doing and we&apos;ll provide a quote.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-sm hover:bg-white/90 sm:w-auto"
          >
            Get a Free Quote
          </Link>
          <a
            href={whatsappHref("Hi Cleano, I'd like a quote for...")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
