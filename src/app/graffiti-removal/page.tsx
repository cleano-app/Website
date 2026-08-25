import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("graffiti-removal")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function GraffitiRemovalPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[
        { before: "/photos/graffiti-before.jpg", after: "/photos/graffiti-after.jpg" },
        { before: "/photos/graffiti2-before.jpg", after: "/photos/graffiti2-after.jpg" },
        { before: "/photos/graffiti3-before.jpg", after: "/photos/graffiti3-after.jpg" },
      ]}
    />
  );
}
