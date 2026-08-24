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
      realPhotos={{ before: "/photos/driveway-before.jpg", after: "/photos/driveway-after.jpg" }}
    />
  );
}
