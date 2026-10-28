import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import PortfolioOffer from "@/components/PortfolioOffer";
import { getServiceBySlug } from "@/lib/content/services";
import { pageMetadata, serviceDescription } from "@/lib/seo";

const service = getServiceBySlug("rooftop-cleaning")!;

export const metadata: Metadata = pageMetadata({
  title: service.name,
  description: serviceDescription(service),
  path: `/${service.slug}`,
});

export default function RooftopCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      beforeFaqs={<PortfolioOffer />}
      realPhotos={[
        { before: "/photos/rooftop-before.jpg", after: "/photos/rooftop-after.jpg" },
        { before: "/photos/rooftop2-before.jpg", after: "/photos/rooftop2-after.jpg" },
        { before: "/photos/rooftop3-before.jpg", after: "/photos/rooftop3-after.jpg" },
      ]}
    />
  );
}
