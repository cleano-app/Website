import Link from "next/link";
import { BusinessScene, HomeVisitScene } from "./scenes/MoreScenes";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";
import { portfolioPath } from "@/lib/portfolio";
import FloatingButterflies from "./motion/FloatingButterflies";

const panelButterflies = [
  { top: "10%", left: "8%", size: 16, duration: 8, delay: 0.2, xDrift: [0, 8, -5, 0], yDrift: [0, -8, 5, 0], rotate: [-8, 10, -4, -8], opacity: 0.5 },
];

export default function ResidentialCommercialSplit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
      <StaggerGrid className="grid gap-6 md:grid-cols-2">
        <StaggerItem>
          <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white transition-shadow hover:shadow-lg">
            <div className="relative flex items-center justify-center bg-muted-bg px-5 py-6 sm:px-8 sm:py-8">
              <FloatingButterflies flock={panelButterflies} />
              <div className="w-full max-w-md overflow-hidden rounded-[1.2rem] shadow-lg shadow-brand/15 ring-1 ring-white transition-transform duration-300 group-hover:scale-[1.02]">
                <HomeVisitScene className="block w-full" tone="soft" />
              </div>
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
        </StaggerItem>

        <StaggerItem>
          <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white transition-shadow hover:shadow-lg">
            <div className="relative flex items-center justify-center bg-muted-bg px-5 py-6 sm:px-8 sm:py-8">
              <FloatingButterflies flock={panelButterflies} />
              <div className="w-full max-w-md overflow-hidden rounded-[1.2rem] shadow-lg shadow-brand/15 ring-1 ring-white transition-transform duration-300 group-hover:scale-[1.02]">
                <BusinessScene className="block w-full" tone="soft" />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-foreground">For Your Business</h3>
              <p className="mt-2 flex-1 text-sm text-foreground/70">
                Scheduled cleaning for commercial properties, landlords, property managers and organisations.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <Link href={portfolioPath} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline">
                  Portfolio Gutter Care Scheme
                  <ArrowIcon />
                </Link>
                <Link href="/quote" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline">
                  Get a Quote
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerGrid>
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
