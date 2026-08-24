import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CleanoStandard from "@/components/CleanoStandard";
import HowItWorks from "@/components/HowItWorks";
import ResidentialCommercialSplit from "@/components/ResidentialCommercialSplit";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />

      {/* Before & after */}
      <section className="bg-muted-bg py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Real Results
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              See the Difference
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
              Drag the slider on three of Cleano&apos;s strongest jobs, before and after.
            </p>
          </FadeIn>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <BeforeAfterSlider
                label="Gutter clearing"
                icon="gutter"
                photos={{ before: "/photos/gutter-before.jpg", after: "/photos/gutter-after.jpg" }}
              />
            </StaggerItem>
            <StaggerItem>
              <BeforeAfterSlider
                label="Pressure-washed driveway"
                icon="pressure"
                photos={{ before: "/photos/driveway-before.jpg", after: "/photos/driveway-after.jpg" }}
              />
            </StaggerItem>
            <StaggerItem>
              <BeforeAfterSlider label="Bin deep clean" icon="bin" />
            </StaggerItem>
          </StaggerGrid>
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
