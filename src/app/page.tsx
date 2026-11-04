import HeroSlideshow from "@/components/home/HeroSlideshow";
import ServiceCards from "@/components/home/ServiceCards";
import PhotoReport from "@/components/home/PhotoReport";
import HowItWorks from "@/components/HowItWorks";
import PortfolioOffer from "@/components/PortfolioOffer";
import FinalCTA from "@/components/FinalCTA";
import BeforeAfter from "@/components/BeforeAfterSlider";
import { SectionHeading, TrustRow } from "@/components/site/ui";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { jobPhotosConfirmed, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <TrustRow />
      <ServiceCards />
      <HowItWorks />
      {jobPhotosConfirmed && (
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Real results" title="See the difference" sub="Three Cleano jobs, before and after." />
            <div className="mt-7">
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
      )}
      <PhotoReport />
      <PortfolioOffer />
      <FinalCTA />
    </>
  );
}
