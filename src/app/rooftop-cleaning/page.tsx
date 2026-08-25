import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("rooftop-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function RooftopCleaningPage() {
  return <ServicePageLayout service={service} />;
}
