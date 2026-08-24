import Link from "next/link";

/** Cross-sell banner pointing landlords/property managers from the
 * standard (private/residential) gutter-cleaning page to the dedicated
 * Portfolio Gutter Care Scheme page. */
export default function PortfolioBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <Link
        href="/gutter-cleaning/portfolio"
        className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand/25 bg-brand-light/10 p-6 transition-colors hover:border-brand/50 sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
            Landlords &amp; Property Managers
          </p>
          <h2 className="mt-1 text-lg font-bold text-foreground">
            Managing a portfolio? See our Portfolio Gutter Care Scheme
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            Drone inspection first, cleaning only where it&apos;s needed — free reports where it
            isn&apos;t.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5">
          View the scheme
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </section>
  );
}
