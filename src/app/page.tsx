import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfter from "@/components/BeforeAfterSlider";
import CleanoStandard from "@/components/CleanoStandard";
import HowItWorks from "@/components/HowItWorks";
import ResidentialCommercialSplit from "@/components/ResidentialCommercialSplit";
import FinalCTA from "@/components/FinalCTA";
import FadeIn from "@/components/motion/FadeIn";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Certifications />
      <ServicesGrid />

      {/* Before & after */}
      <section className="bg-muted-bg py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Real Results
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              See the Difference
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
              Three real Cleano jobs, before and after.
            </p>
          </FadeIn>
          <div className="mt-8">
            <BeforeAfter
              jobs={[
                { label: "Gutters", before: "/photos/gutter-before.jpg", after: "/photos/gutter-after.jpg" },
                { label: "Driveway", before: "/photos/driveway-before.jpg", after: "/photos/driveway-after.jpg" },
                { label: "Wheelie bin", before: "/photos/bin-before.jpg", after: "/photos/bin-after.jpg" },
              ]}
            />
          </div>
        </div>
      </section>

      <CleanoStandard />
      <HowItWorks />
      <ResidentialCommercialSplit />
      <FinalCTA />
    </>
  );
}
