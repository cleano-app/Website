import Link from "next/link";
import PortfolioScene from "./scenes/PortfolioScene";
import { portfolioMailto, portfolioPath } from "@/lib/portfolio";
import { btn, Framed, SectionHeading, TickList } from "./site/ui";

// The Portfolio Gutter Care Scheme, offered wherever a landlord or property
// manager is likely to be reading: the homepage, the gutter and roof pages
// and About. Its animation stays - it explains the scheme - in a plain frame.

export default function PortfolioOffer() {
  return (
    <section className="border-y border-border-subtle bg-muted-bg py-10 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Landlords & property managers"
            title="Several properties? Only pay for the gutters that need it."
            sub="Our Portfolio Gutter Care Scheme inspects every property by drone and cleans only where it's needed. Where the gutters are clear, the report is free."
          />
          <TickList
            className="mt-5"
            items={[
              "Every property inspected by drone",
              "Gutters clear? The report is free",
              "Cleaning only where it's needed, at a price agreed in advance",
            ]}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={portfolioPath} className={btn.solid}>
              See the Portfolio Scheme
            </Link>
            <a href={portfolioMailto} className={btn.line}>
              Email us your portfolio
            </a>
          </div>
        </div>
        <Framed>
          <PortfolioScene className="block w-full" plain />
        </Framed>
      </div>
    </section>
  );
}
