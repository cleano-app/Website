import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("graffiti-removal")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function GraffitiRemovalPage() {
  return <ServicePageLayout service={service} />;
}
