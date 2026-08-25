import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("window-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function WindowCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[{ before: "/photos/window-before.jpg", after: "/photos/window-after.jpg" }]}
    />
  );
}
