import Link from "next/link";
import PortfolioScene from "./scenes/PortfolioScene";
import FadeIn from "./motion/FadeIn";
import { portfolioMailto, portfolioPath } from "@/lib/portfolio";

// The Portfolio Gutter Care Scheme, offered wherever a landlord or property
// manager is likely to be reading: the homepage, the gutter and roof pages
// and About. Headline and the three things that make it different, then
// the animation, then the buttons (after the animation, as on every page).

const points = [
  "Every property inspected by drone",
  "Gutters clear? The report is free",
  "Cleaning only where it's needed, at a price agreed in advance",
];

export default function PortfolioOffer() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#effdf7] via-white to-[#d7faec]">
      <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-brand-light/35 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-x-12 gap-y-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
        <FadeIn className="lg:row-span-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-3.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow-md shadow-brand-dark/20">
            <BuildingsIcon />
            Landlords &amp; property managers
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-foreground sm:text-4xl">
            Several properties? <span className="text-brand-dark">Only pay for the gutters that need it.</span>
          </h2>
          <p className="mt-3 text-base text-foreground/70 sm:text-lg">
            Our Portfolio Gutter Care Scheme checks every gutter across your portfolio by drone, and
            cleans only where the inspection shows it&apos;s needed - with a photo report for every property.
          </p>
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 font-semibold text-foreground/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="relative mx-auto max-w-xl">
            <div className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-brand-light/40 to-sky-200/40 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.6rem] shadow-2xl shadow-brand/25 ring-1 ring-white">
              <PortfolioScene className="block w-full" />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2} className="flex flex-wrap gap-3 lg:col-start-2 lg:justify-center">
          <Link
            href={portfolioPath}
            className="rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-white shadow-md shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
          >
            See the Portfolio Scheme
          </Link>
          <a
            href={portfolioMailto}
            className="rounded-full border border-brand/40 bg-white px-6 py-3 text-center text-sm font-bold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-sm"
          >
            Email Us Your Portfolio
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function BuildingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V9l6-4 6 4v12M15 21V12h6v9M3 21h18M7 13h4M7 17h4" />
    </svg>
  );
}
