import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getServiceBySlug("bin-cleaning")!;

export const metadata: Metadata = pageMetadata({
  title: service.name,
  description: service.heroSubhead,
  path: `/${service.slug}`,
});

export default function BinCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[
        { before: "/photos/bin-before.jpg", after: "/photos/bin-after.jpg" },
        { before: "/photos/bin2-before.jpg", after: "/photos/bin2-after.jpg" },
        { before: "/photos/bin3-before.jpg", after: "/photos/bin3-after.jpg" },
      ]}
    />
  );
}
