import type { Metadata } from "next";
import Link from "next/link";
import { priorityAreas, regionName } from "@/lib/content/areas";
import { whatsappHref } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description: `Exterior cleaning across ${regionName}: ${priorityAreas.map((a) => a.name).join(", ")} and surrounding areas.`,
};

export default function AreasWeCoverPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Exterior Cleaning Across {regionName}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/70">
            Gutter cleaning, bin cleaning, window cleaning, pressure washing and commercial
            cleaning across our priority areas below - and the surrounding area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {priorityAreas.map((area) => (
            <div
              key={area.name}
              className="flex items-center justify-between rounded-xl border border-border-subtle px-5 py-4"
            >
              <span className="font-semibold text-foreground">{area.name}</span>
              <span className="text-sm text-foreground/50">{area.postcodes.join(", ")}</span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border border-dashed border-border-subtle px-5 py-4">
            <span className="font-semibold text-foreground/70">Surrounding areas</span>
            <span className="text-sm text-foreground/50">Get in touch</span>
          </div>
        </div>

        <p className="mt-8 text-sm text-foreground/60">
          Not sure if we cover your postcode? Send it over and we&apos;ll let you know - we&apos;re
          usually able to help just outside our priority areas too.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Get a Free Quote
          </Link>
          <a
            href={whatsappHref("Hi Cleano, is my postcode covered?")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand px-8 py-3.5 text-center text-sm font-semibold text-brand-dark"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}
