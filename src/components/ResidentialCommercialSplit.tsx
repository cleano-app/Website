import Link from "next/link";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function ResidentialCommercialSplit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle">
          <PhotoPlaceholder label="Residential job" aspect="aspect-[16/9]" className="rounded-none border-0 border-b border-border-subtle" />
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-foreground">For Your Home</h3>
            <p className="mt-2 flex-1 text-sm text-foreground/70">
              Gutters, bins, windows, patios, driveways and exterior cleaning.
            </p>
            <Link href="/gutter-cleaning" className="mt-4 text-sm font-semibold text-brand-dark hover:underline">
              Explore Residential Services →
            </Link>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle">
          <PhotoPlaceholder label="Commercial job" aspect="aspect-[16/9]" className="rounded-none border-0 border-b border-border-subtle" />
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-foreground">For Your Business</h3>
            <p className="mt-2 flex-1 text-sm text-foreground/70">
              Scheduled cleaning for commercial properties, landlords, property managers and organisations.
            </p>
            <Link href="/commercial-cleaning" className="mt-4 text-sm font-semibold text-brand-dark hover:underline">
              Commercial Cleaning →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
