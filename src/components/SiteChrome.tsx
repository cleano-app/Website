"use client";

import { usePathname } from "next/navigation";

/** Leaves the cleaning site's header, promo, footer and mobile bar off the /parsha pages. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/parsha" || path?.startsWith("/parsha/")) return null;
  return <>{children}</>;
}
