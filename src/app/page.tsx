import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/TrustStrip";
import Certifications from "@/components/Certifications";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CleanoStandard from "@/components/CleanoStandard";
import HowItWorks from "@/components/HowItWorks";
import ResidentialCommercialSplit from "@/components/ResidentialCommercialSplit";
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
              Exterior Cleaning Company · London &amp; Surrounding Areas
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Clean places. <span className="text-brand-dark">Better spaces.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-foreground/70">
              Cleano is an exterior cleaning company serving homes and businesses across London
              and the surrounding areas — gutters, windows, driveways, bins and scheduled
              commercial care.
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border-subtle shadow-xl shadow-foreground/5">
            <Image
              src="/images/hero-window-cleaning.png"
              alt="Cleano technician cleaning the upper windows of a London home with a water-fed pole"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
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
            <BeforeAfterSlider
              label="Gutter clearing"
              beforeSrc="/images/before-gutter.png"
              afterSrc="/images/after-gutter.png"
            />
            <BeforeAfterSlider
              label="Pressure-washed driveway"
              beforeSrc="/images/before-driveway.png"
              afterSrc="/images/after-driveway.png"
            />
            <BeforeAfterSlider
              label="Bin deep clean"
              beforeSrc="/images/before-bin.png"
              afterSrc="/images/after-bin.png"
            />
          </div>
        </div>
      </section>

      <CleanoStandard />
      <HowItWorks />
      <ResidentialCommercialSplit />
      <Reviews />
      <FinalCTA />
    </>
  );
}
