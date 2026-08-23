import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
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
      <section className="border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Clean places. <span className="text-brand-dark">Better spaces.</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              Professional exterior cleaning for homes and businesses across North London.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Get a Free Quote
              </Link>
              <a
                href={whatsappHref("Hi Cleano, I'd like a quote for...")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand px-8 py-3.5 text-center text-sm font-semibold text-brand-dark"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <PhotoPlaceholder label="Cleano job / team / vehicle" aspect="aspect-[4/3]" />
        </div>
      </section>

      <TrustStrip />
      <ServicesGrid />

      {/* Before & after */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            See the Difference
          </h2>
          <p className="mt-2 text-center text-sm text-foreground/60">
            Three of Cleano&apos;s strongest jobs, before and after.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BeforeAfterSlider label="Gutter clearing" />
            <BeforeAfterSlider label="Pressure-washed driveway" />
            <BeforeAfterSlider label="Bin deep clean" />
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
