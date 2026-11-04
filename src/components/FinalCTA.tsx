import Link from "next/link";
import { siteConfig, telHref } from "@/lib/siteConfig";
import { btn, PhoneIcon } from "./site/ui";

// The dark green band every page ends on, just above the footer.
export default function FinalCTA() {
  return (
    <section className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-9 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-[30px]">Need something cleaned?</h2>
          <p className="mt-1.5 text-[#cfe8dd]">Send us your postcode and what needs doing, and we&apos;ll come back with a price.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className={btn.whiteOnDark}>
            Get a Free Quote
          </Link>
          <a href={telHref()} className={btn.lineOnDark}>
            <PhoneIcon />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
