import Link from "next/link";
import type { ReactNode } from "react";
import type { Service } from "@/lib/content/services";
import { servicePhotos } from "@/lib/content/photos";
import BeforeAfter from "./BeforeAfterSlider";
import FAQAccordion from "./FAQAccordion";
import QuoteForm from "./QuoteForm";
import FinalCTA from "./FinalCTA";
import ServiceScene, { type ServiceSceneType } from "./scenes/ServiceScenes";
import { jobPhotosConfirmed, siteConfig, telHref } from "@/lib/siteConfig";
import JsonLd from "./JsonLd";
import { faqSchema, serviceSchema } from "@/lib/structuredData";
import { btn, Framed, PageHero, PhoneIcon, SectionHeading, TickList, TrustRow } from "./site/ui";

// Every service page, in one layout: a photo header saying what and where,
// the trust row, how we do it (the gutter story, or the service's own
// animation), what's included next to the quote form, the FAQs, then an
// optional offer (the Portfolio scheme) and the closing band.

const sceneBySlug: Record<string, ServiceSceneType> = {
  "gutter-cleaning": "gutter",
  "bin-cleaning": "bin",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "graffiti-removal": "graffiti",
  "rooftop-cleaning": "rooftop",
};

export default function ServicePageLayout({
  service,
  feature,
  afterFaqs,
  secondaryCta,
  realPhotos,
}: {
  service: Service;
  /** A full-width feature under the trust row - e.g. the gutter story. */
  feature?: ReactNode;
  /** A full-width section after the FAQs - e.g. the Portfolio scheme offer. */
  afterFaqs?: ReactNode;
  /** Replaces the header's Call button - e.g. a separate path for
   * portfolio customers. */
  secondaryCta?: { label: string; href: string };
  /** Before/after job photos - shown only once they're confirmed as
   * Cleano's own (jobPhotosConfirmed in siteConfig). */
  realPhotos?: { before: string; after: string }[];
}) {
  const leadService = service.slug.replace(/-/g, "_") as
    | "gutter_cleaning"
    | "bin_cleaning"
    | "window_cleaning"
    | "pressure_washing"
    | "graffiti_removal"
    | "rooftop_cleaning";
  const photo = servicePhotos[service.slug].hero;

  return (
    <>
      {/* This service, tied to the one business node in the root layout,
          plus the page's own Q&As in the form answer engines read. */}
      <JsonLd data={serviceSchema(service)} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}

      <PageHero image={photo.src} imageAlt={photo.alt} position={photo.position} crumb={service.name} title={`${service.name} in London`} lead={service.heroSubhead}>
        <Link href="#quote" className={btn.solidOnDark}>
          Get a Free Quote
        </Link>
        {secondaryCta ? (
          <Link href={secondaryCta.href} className={btn.lineOnDark}>
            {secondaryCta.label}
          </Link>
        ) : (
          <a href={telHref()} className={btn.lineOnDark}>
            <PhoneIcon />
            {siteConfig.phoneDisplay}
          </a>
        )}
      </PageHero>
      <TrustRow />

      {feature && (
        <section className="pt-10 pb-5 sm:pt-14 sm:pb-9">
          <SectionHeading
            className="mx-auto max-w-5xl px-4 sm:px-6"
            eyebrow="How we do it"
            title="From drone check to photo report"
            sub="Watch how the job works, from the first drone photo to the report in your inbox."
          />
          <div className="mt-6">{feature}</div>
        </section>
      )}

      {/* Every other service: its own animation of the job, beside the steps */}
      {!feature && (
        <section className="py-10 sm:py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="How we do it"
                title="Found, cleaned, photographed"
                sub="Every job follows the same steps, so you know exactly what you're getting."
              />
              <TickList
                className="mt-5"
                items={[
                  "We check the job first and choose the right method for it",
                  "We clean it properly, with professional equipment",
                  "We photograph it before and after, and email you the report",
                ]}
              />
            </div>
            <Framed>
              <ServiceScene type={sceneBySlug[service.slug]} tone="soft" plain className="block w-full" />
            </Framed>
          </div>
        </section>
      )}

      {/* Bin cleaning: one-off vs regular */}
      {service.serviceOptions && (
        <section className="py-10 sm:py-14">
          <ul className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6">
            {service.serviceOptions.map((option) => (
              <li key={option.title} className="rounded-[12px] border border-border-subtle bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-foreground">{option.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{option.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* What's included, why it matters and the price - next to the form */}
      <section id="quote" className="scroll-mt-24 border-y border-border-subtle bg-muted-bg py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="What's included" title={`Every ${service.name.toLowerCase()} job includes`} />
            <TickList className="mt-5" columns={2} items={service.included} />

            {!service.hidePricing && (
              <div className="mt-7 rounded-[12px] border border-border-subtle bg-white p-5">
                <p className="text-sm font-semibold text-foreground/65">Pricing</p>
                <p className="mt-1 font-display text-2xl font-bold text-brand-dark">
                  {service.pricingFrom !== "Custom" ? `From ${service.pricingFrom}` : "Custom pricing"}
                </p>
                <p className="mt-1 text-sm text-foreground/65">{service.pricingNote}</p>
              </div>
            )}

            <h3 className="mt-8 text-lg font-bold text-foreground">Why it matters</h3>
            <ul className="mt-3 grid gap-3">
              {service.why.map((point) => (
                <li key={point.title} className="rounded-[12px] border border-border-subtle bg-white p-4">
                  <p className="font-bold text-foreground">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[25px] font-bold text-foreground sm:text-[28px]">Get a free quote</h2>
            <p className="mt-1.5 mb-4 text-sm text-foreground/65">Takes under a minute. Add a photo and we can often quote without a visit.</p>
            <QuoteForm sourcePage={`/${service.slug}`} defaultService={leadService} />
          </div>
        </div>
      </section>

      {jobPhotosConfirmed && realPhotos && realPhotos.length > 0 && (
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Real results" title="Before & after" sub={`Cleano ${service.name.toLowerCase()} jobs.`} />
            <div className="mt-7">
              <BeforeAfter jobs={realPhotos.map((photos, i) => ({ label: `Job ${i + 1}`, ...photos }))} />
            </div>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="Questions" title={`${service.name} FAQs`} />
          <div className="mt-6">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {afterFaqs}
      <FinalCTA />
    </>
  );
}
