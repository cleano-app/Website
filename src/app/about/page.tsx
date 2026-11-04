import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import PortfolioOffer from "@/components/PortfolioOffer";
import FinalCTA from "@/components/FinalCTA";
import { Framed, PlainHero, TrustRow } from "@/components/site/ui";
import { reportScreenshot } from "@/lib/content/photos";

export const metadata: Metadata = pageMetadata({
  title: "About Cleano",
  description: "Who Cleano is, the Cleano Standard, and why every job comes with a Photo Report.",
  path: "/about",
});

// The van, kit and team pictures that were here were AI-generated stand-ins
// and came off in the redesign. When there are real photos of the team and
// the van, they belong in the right-hand column, above the report.
const facts = [
  {
    title: "The Cleano standard",
    body: "Every job follows the same standard, whether it's a single household gutter clean or a scheduled contract across multiple commercial sites: a uniformed team, professional equipment, full insurance, and clear communication before and after the job.",
  },
  {
    title: "Photo reports",
    body: "Every job ends with a Photo Report - before-and-after photos of the work, sent straight to you. It's proof the job was actually done, not just a tick on an invoice, and it's especially valued by landlords and property managers who need evidence that scheduled maintenance happened.",
  },
  {
    title: "Checked before we arrive",
    body: "CHAS accredited for health and safety, CAA-certified drone pilots, fully insured and VAT registered.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PlainHero
        crumb="About"
        title="About Cleano"
        lead="A professional exterior cleaning company serving homes and businesses across London and the surrounding areas."
      />

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-[25px] font-bold text-foreground sm:text-[32px]">Who we are</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">
              Cleano is a professional exterior cleaning company serving homes and businesses across London and the
              surrounding areas - gutter cleaning, rooftop cleaning, window cleaning, pressure washing, wheelie bin
              cleaning and graffiti removal. We built Cleano around one idea: cleaning should be done properly, by a
              professional team, with the equipment to do it right.
            </p>
            <ul className="mt-6 grid gap-5">
              {facts.map((fact) => (
                <li key={fact.title} className="border-l-[3px] border-brand py-0.5 pl-3.5">
                  <p className="font-display text-[17px] font-bold text-foreground">{fact.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">{fact.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Framed>
            <Image
              src={reportScreenshot.src}
              alt={reportScreenshot.alt}
              width={reportScreenshot.width}
              height={reportScreenshot.height}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="block h-auto w-full"
            />
          </Framed>
        </div>
      </section>

      <TrustRow />
      <PortfolioOffer />
      <FinalCTA />
    </>
  );
}
