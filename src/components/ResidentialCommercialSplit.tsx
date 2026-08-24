import Link from "next/link";
import HeroScene from "./illustrations/HeroScene";
import BuildingScene from "./illustrations/BuildingScene";

export default function ResidentialCommercialSplit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white">
          <div className="flex items-center justify-center bg-muted-bg px-8 py-10">
            <HeroScene className="w-full max-w-[280px]" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-foreground">For Your Home</h3>
            <p className="mt-2 flex-1 text-sm text-foreground/70">
              Gutters, bins, windows, patios, driveways and exterior cleaning.
            </p>
            <Link href="/gutter-cleaning" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline">
              Explore Residential Services
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white">
          <div className="flex items-center justify-center bg-muted-bg px-8 py-10">
            <BuildingScene className="w-full max-w-[280px]" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-foreground">For Your Business</h3>
            <p className="mt-2 flex-1 text-sm text-foreground/70">
              Scheduled cleaning for commercial properties, landlords, property managers and organisations.
            </p>
            <Link href="/commercial-cleaning" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline">
              Commercial Cleaning
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
