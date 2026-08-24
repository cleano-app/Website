import Link from "next/link";
import HeroScene from "@/components/illustrations/HeroScene";
import TrustStrip from "@/components/TrustStrip";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CleanoStandard from "@/components/CleanoStandard";
import HowItWorks from "@/components/HowItWorks";
import ResidentialCommercialSplit from "@/components/ResidentialCommercialSplit";
import AreasWeCoverSection from "@/components/AreasWeCoverSection";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import { whatsappHref } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark uppercase">
              North London&apos;s Exterior Cleaning Specialists
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Clean places. <span className="text-brand-dark">Better spaces.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-foreground/70">
              Professional exterior cleaning for homes and businesses across North London —
              gutters, bins, windows, driveways and scheduled commercial care.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref("Hi Cleano, I'd like a quote for...")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-white px-8 py-3.5 text-center text-sm font-semibold text-brand-dark transition-colors hover:border-brand"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <HeroScene className="mx-auto w-full max-w-md" />
        </div>
      </section>

      <TrustStrip />
      <ServicesGrid />

      {/* Before & after */}
      <section className="bg-muted-bg py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand">
            Real Results
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
            See the Difference
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-foreground/60">
            Drag the slider on three of Cleano&apos;s strongest jobs, before and after.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BeforeAfterSlider label="Gutter clearing" icon="gutter" />
            <BeforeAfterSlider label="Pressure-washed driveway" icon="pressure" />
            <BeforeAfterSlider label="Bin deep clean" icon="bin" />
          </div>
        </div>
      </section>

      <CleanoStandard />
      <HowItWorks />
      <ResidentialCommercialSplit />
      <AreasWeCoverSection />
      <Reviews />
      <FinalCTA />
    </>
  );
}
