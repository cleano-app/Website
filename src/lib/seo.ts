import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Per-page metadata. Next.js overwrites nested metadata objects
 * (`openGraph`, `twitter`) wholesale with the last segment that defines
 * them - it doesn't merge fields - so a page that only sets `title` and
 * `description` keeps the root layout's og:title/og:description/og:url
 * verbatim, and every page's social preview ends up identical and pointing
 * at the homepage. This builds the full set for one page so previews are
 * page-specific and og:url / canonical always carry the page's own path,
 * resolved against `metadataBase` (siteConfig.url) in the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Plain string gets the root "%s | Cleano" template; `{ absolute }` is used verbatim (the homepage). */
  title: string | { absolute: string };
  description: string;
  /** Route path starting with "/" - e.g. "/about". */
  path: string;
}): Metadata {
  const socialTitle = typeof title === "string" ? `${title} | ${siteConfig.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
