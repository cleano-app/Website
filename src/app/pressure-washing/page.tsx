import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("pressure-washing")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function PressureWashingPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[
        { before: "/photos/driveway-before.jpg", after: "/photos/driveway-after.jpg" },
        { before: "/photos/driveway2-before.jpg", after: "/photos/driveway2-after.jpg" },
        { before: "/photos/driveway3-before.jpg", after: "/photos/driveway3-after.jpg" },
      ]}
    />
  );
}
