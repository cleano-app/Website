import Image from "next/image";
import Link from "next/link";
import { companyDetails, legalNav, siteConfig, telHref, mailtoHref } from "@/lib/siteConfig";
import { services } from "@/lib/content/services";

const companyNav = [
  { label: "About Cleano", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Get a Free Quote", href: "/quote" },
  { label: "Portfolio Gutter Care", href: "/gutter-cleaning/portfolio" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-muted-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div className="sm:col-span-2">
          <Image
            src="/brand/cleano-logo.png"
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={255}
            height={80}
            className="h-6 w-auto"
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
          <h2 className="text-sm font-semibold text-foreground">Company</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {companyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-foreground/70 hover:text-brand-dark">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}`} className="text-foreground/70 hover:text-brand-dark">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border-subtle px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-foreground/50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {companyDetails.legalName}. All rights reserved.
            </p>
            {/* Policy pages - Stripe and its card-network partners expect
                these reachable from every page, hence the footer. */}
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-1.5">
                {legalNav.map((item, i) => (
                  <li key={item.href} className="flex items-center gap-x-1.5">
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <Link href={item.href} className="hover:text-brand-dark hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p>London &amp; the surrounding areas · Fully insured · VAT registered</p>
          {/* Statutory trading disclosures for a UK limited company - name,
              company number, place of registration, registered office.
              Values live in siteConfig so they can't drift from the
              structured data in the root layout. */}
          <p className="leading-relaxed text-foreground/45">
            {companyDetails.legalName} · Registered in {companyDetails.registrationPlace} · Company
            number {companyDetails.companyNumber}
            <br />
            VAT registration number {companyDetails.vatNumber}
            <br />
            Registered office: {companyDetails.registeredOffice}
          </p>
        </div>
      </div>
    </footer>
  );
}
