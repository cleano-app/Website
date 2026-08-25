import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("rooftop-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function RooftopCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[
        { before: "/photos/rooftop-before.jpg", after: "/photos/rooftop-after.jpg" },
        { before: "/photos/rooftop2-before.jpg", after: "/photos/rooftop2-after.jpg" },
        { before: "/photos/rooftop3-before.jpg", after: "/photos/rooftop3-after.jpg" },
      ]}
    />
  );
}
