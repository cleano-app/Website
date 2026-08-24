import type { MetadataRoute } from "next";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/quote", "/gutter-cleaning/portfolio"];
  const serviceRoutes = services.map((s) => `/${s.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
