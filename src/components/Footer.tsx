import Image from "next/image";
import Link from "next/link";
import { mainNav, siteConfig, telHref, mailtoHref } from "@/lib/siteConfig";
import { priorityAreas } from "@/lib/content/areas";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-muted-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/brand/cleano-logo.png"
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={160}
            height={80}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm text-foreground/70">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-foreground/70">
            <a href={telHref()} className="font-semibold text-brand-dark hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            {" · "}
            <a href={mailtoHref()} className="font-semibold text-brand-dark hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {mainNav.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-foreground/70 hover:text-brand-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Areas We Cover</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {priorityAreas.slice(0, 5).map((area) => (
              <li key={area.name} className="text-foreground/70">
                {area.name}
              </li>
            ))}
          </ul>
          <Link
            href="/areas-we-cover"
            className="mt-2 inline-block text-sm font-medium text-brand-dark hover:underline"
          >
            View all areas
          </Link>
        </div>
      </div>

      <div className="border-t border-border-subtle px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Fully insured · VAT registered</p>
        </div>
      </div>
    </footer>
  );
}
