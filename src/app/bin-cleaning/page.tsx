import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("bin-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function BinCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[{ before: "/photos/bin-before.jpg", after: "/photos/bin-after.jpg" }]}
    />
  );
}
