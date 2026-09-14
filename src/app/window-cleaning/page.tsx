import type { Metadata } from "next";
import ServicePageLayout from "@/components/ServicePageLayout";
import { getServiceBySlug } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getServiceBySlug("window-cleaning")!;

export const metadata: Metadata = pageMetadata({
  title: service.name,
  description: service.heroSubhead,
  path: `/${service.slug}`,
});

export default function WindowCleaningPage() {
  return (
    <ServicePageLayout
      service={service}
      realPhotos={[
        { before: "/photos/window-before.jpg", after: "/photos/window-after.jpg" },
        { before: "/photos/window2-before.jpg", after: "/photos/window2-after.jpg" },
        { before: "/photos/window3-before.jpg", after: "/photos/window3-after.jpg" },
      ]}
    />
  );
}
