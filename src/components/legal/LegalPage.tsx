import type { ReactNode } from "react";
import { mailtoHref, siteConfig, telHref } from "@/lib/siteConfig";

// Shared shell for the policy pages (/terms, /privacy, /cancellation,
// /refunds). Deliberately plain prose on the site's existing type and
// spacing - no new design language. The pages exist and are routed so the
// Stripe application (and the Stripe-hosted card-saving page, which links
// to /terms and /cancellation) has somewhere to point; the wording itself
// is supplied separately after legal advice, so every section ships as a
// clearly marked <Placeholder> until then. Do not draft or template-fill
// the legal wording here.

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  /** One neutral sentence under the heading - what the page covers, not terms. */
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-foreground/70">{intro}</p>}
          <p className="mt-4 text-sm text-foreground/50">
            {siteConfig.name} is the trading name of Cleano Ltd. Questions about this page:{" "}
            <a href={mailtoHref()} className="font-semibold text-brand-dark hover:underline">
              {siteConfig.email}
            </a>{" "}
            or{" "}
            <a href={telHref()} className="font-semibold text-brand-dark hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">{children}</article>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-bold text-foreground sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-foreground/75">{children}</div>
    </section>
  );
}

/**
 * A visibly marked stand-in for wording that hasn't been supplied yet.
 * Intentionally obvious (dashed box, label) rather than lorem ipsum or a
 * guessed clause: on a policy page, a plausible-looking but unreviewed
 * clause is worse than an honest gap. `note` is optional context for the
 * reader about what the section will cover - never the terms themselves.
 */
export function Placeholder({ note }: { note?: string }) {
  return (
    <div
      role="note"
      className="rounded-xl border-2 border-dashed border-brand/40 bg-muted-bg px-4 py-3 text-sm text-foreground/60"
    >
      <p className="font-semibold text-brand-dark">Wording to follow</p>
      <p className="mt-1">
        The final wording for this section is being prepared and will appear here.
        {note ? ` ${note}` : ""}
      </p>
    </div>
  );
}
