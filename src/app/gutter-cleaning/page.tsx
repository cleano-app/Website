import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import PortfolioBanner from "@/components/PortfolioBanner";
import { getServiceBySlug } from "@/lib/content/services";

const service = getServiceBySlug("gutter-cleaning")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.heroSubhead,
};

export default function GutterCleaningPage() {
  return <ServicePageLayout service={service} afterHero={<PortfolioBanner />} />;
}
