import Image from "next/image";
import Link from "next/link";
import { accreditations, companyDetails, legalNav, siteConfig, telHref, mailtoHref } from "@/lib/siteConfig";
import { services } from "@/lib/content/services";

const companyNav = [
  { label: "About Cleano", href: "/about" },
  { label: "Landlords & portfolios", href: "/gutter-cleaning/portfolio" },
  { label: "Contact us", href: "/contact" },
  { label: "Get a free quote", href: "/quote" },
];

export default function Footer() {
  const { chas } = accreditations;
  return (
    <footer className="border-t border-border-subtle bg-[#f3f6f4] text-sm text-foreground/65">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-7 px-4 pt-11 pb-7 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/brand/cleano-logo.png"
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={4491}
            height={1162}
            className="h-10 w-auto"
          />
          <p className="mt-3 max-w-xs leading-relaxed">
            Professional exterior cleaning for homes and businesses across London and the surrounding areas.
          </p>
          <p className="mt-3 font-semibold text-foreground">
            <a href={telHref()} className="hover:text-brand-dark hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            {" · "}
            <a href={mailtoHref()} className="hover:text-brand-dark hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-2.5 text-sm font-bold text-foreground">Services</h2>
          <ul className="space-y-1.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}`} className="hover:text-brand-dark">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2.5 text-sm font-bold text-foreground">Company</h2>
          <ul className="space-y-1.5">
            {companyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-dark">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`${siteConfig.opsAppUrl}/login`} className="hover:text-brand-dark">
                Customer sign in
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className="mb-2.5 text-sm font-bold text-foreground">Accredited</h2>
          {chas.logo && (
            <Image src={chas.logo.src} alt="CHAS accredited contractor" width={chas.logo.width} height={chas.logo.height} className="h-[46px] w-auto" />
          )}
          <p className="mt-2 leading-relaxed">
            CAA-certified drone pilots
            <br />
            Fully insured · VAT registered
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="border-t border-border-subtle pt-4 text-[12.5px] leading-relaxed text-foreground/55">
          {/* Statutory trading disclosures for a UK limited company - name,
              company number, place of registration, registered office.
              Values live in siteConfig so they can't drift from the
              structured data in the root layout. */}
          <p>
            © {new Date().getFullYear()} {companyDetails.legalName} · Registered in {companyDetails.registrationPlace} · Company number{" "}
            {companyDetails.companyNumber} · VAT registration number {companyDetails.vatNumber} · Registered office:{" "}
            {companyDetails.registeredOffice}
          </p>
          {/* Policy pages - Stripe and its card-network partners expect
              these reachable from every page, hence the footer. */}
          <nav aria-label="Legal" className="mt-1.5">
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
      </div>
    </footer>
  );
}
