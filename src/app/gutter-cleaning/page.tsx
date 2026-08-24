import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("gutter-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function GutterCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      secondaryCta={{ label: "Managing a Portfolio?", href: "/gutter-cleaning/portfolio" }}
      realPhotos={{ before: "/photos/gutter-before.jpg", after: "/photos/gutter-after.jpg" }}
    />
  );
}
