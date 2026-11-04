import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { PlainHero, TrustRow } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "Get a Free Quote",
  description: "Tell us what needs cleaning and we'll send you a free quote.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PlainHero
        crumb="Get a free quote"
        title="Get a free quote"
        lead="Takes under a minute. Add a photo or two and we can often quote without a site visit."
      />
      <TrustRow />
      <section className="border-t border-border-subtle bg-muted-bg py-8 sm:py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <QuoteForm sourcePage="/quote" />
          <p className="mt-5 text-center text-sm text-foreground/60">
            Rather talk?{" "}
            <a href={telHref()} className="font-semibold text-brand-dark hover:underline">
              Call {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
