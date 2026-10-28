import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import PortfolioOffer from "@/components/PortfolioOffer";
import GutterStory from "@/components/gutter-story/GutterStory";
import { getServiceBySlug } from "@/lib/content/services";
import { pageMetadata, serviceDescription } from "@/lib/seo";

const service = getServiceBySlug("gutter-cleaning")!;

export const metadata: Metadata = pageMetadata({
  title: service.name,
  description: serviceDescription(service),
  path: `/${service.slug}`,
  // Real before and after photos and the short link - what shows when the
  // page is shared on WhatsApp, Facebook or a Google post.
  image: {
    url: "/og-gutter-cleaning.jpg",
    width: 1200,
    height: 630,
    alt: "A blocked gutter before and after a Cleano clean, with the link cleano.services/gutters",
  },
});

export default function GutterCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      beforeFaqs={<PortfolioOffer />}
      secondaryCta={{ label: "Managing a Portfolio?", href: "/gutter-cleaning/portfolio" }}
      feature={<GutterStory />}
      realPhotos={[
        { before: "/photos/gutter-before.jpg", after: "/photos/gutter-after.jpg" },
        { before: "/photos/gutter2-before.jpg", after: "/photos/gutter2-after.jpg" },
        { before: "/photos/gutter3-before.jpg", after: "/photos/gutter3-after.jpg" },
      ]}
    />
  );
}
