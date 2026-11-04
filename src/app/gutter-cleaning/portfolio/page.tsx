import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import PortfolioScene from "@/components/scenes/PortfolioScene";
import { btn, Framed, PageHero, SectionHeading, TickList, TrustRow } from "@/components/site/ui";
import { portfolioHero, reportScreenshot } from "@/lib/content/photos";
import { telHref, siteConfig } from "@/lib/siteConfig";
import { portfolioMailto, portfolioWhatsapp } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio Gutter Care Scheme",
  description:
    "Drone-inspect every gutter across your portfolio, clean only where it's needed, and get a free photographic report where it isn't. For landlords, property managers and commercial portfolios.",
  path: "/gutter-cleaning/portfolio",
});

const steps = [
  {
    title: "You send us the portfolio",
    body: "One-off inspection or ongoing programme. We build the schedule and work through it systematically.",
    icon: "list" as const,
  },
  {
    title: "Drone inspection",
    body: "Trained operator, high-resolution photographs of gutters, outlets and downpipes at every property.",
    icon: "drone" as const,
  },
  {
    title: "No cleaning needed → free report",
    body: "Gutters clear? We don't clean them. You get the photographic inspection report free of charge as proof the property was checked.",
    icon: "reportCheck" as const,
  },
  {
    title: "Cleaning needed → agreed price",
    body: "Before photos → clean → after photos → full report. Competitive fixed pricing agreed in advance.",
    icon: "priceTag" as const,
  },
];

const receive = [
  "Property details and inspection date",
  "Drone photographs of gutter condition",
  "Cleaning required: Yes / No",
  "Before and after photographs where work was carried out",
  "Visible roof-level observations",
  "Recommended further action, where applicable",
];

const flagged = ["Slipped or missing tiles", "Damaged flashing", "Vegetation", "Damaged downpipes"];

const benefits = [
  {
    title: "Pay only when needed",
    body: "No automatic cleaning of gutters that are already clear.",
    icon: "wallet" as const,
  },
  {
    title: "Free reports",
    body: "Where no cleaning is required, the report costs nothing.",
    icon: "document" as const,
  },
  {
    title: "Photographic evidence",
    body: "Defensible record of condition found and work completed.",
    icon: "camera" as const,
  },
  {
    title: "Early warning",
    body: "Roof-level issues spotted before they become claims.",
    icon: "bell" as const,
  },
  {
    title: "One contractor",
    body: "Whole portfolio managed as a single programme.",
    icon: "handshake" as const,
  },
];

export default function PortfolioGutterCarePage() {
  return (
    <>
      <PageHero
        image={portfolioHero.src}
        imageAlt={portfolioHero.alt}
        position={portfolioHero.position}
        crumb="Landlords & portfolios"
        title="Portfolio Gutter Care Scheme"
        lead="For landlords, managing agents and housing providers. We drone-inspect every gutter across your portfolio, report on every property, and only clean where it's needed."
      >
        <a href={portfolioMailto} className={btn.solidOnDark}>
          Email us your portfolio
        </a>
        <a href={portfolioWhatsapp()} target="_blank" rel="noopener noreferrer" className={btn.lineOnDark}>
          WhatsApp us
        </a>
      </PageHero>
      <TrustRow />

      {/* The problem, the approach and the animation that shows it */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Cleaned because they're due, not because they need it"
              sub="Across a portfolio, some gutters are cleaned while still clear, and others block up unnoticed until there's water damage. Either way you pay, with no record of what was actually there."
            />
            <ul className="mt-6 grid gap-4">
              {[
                ["Inspect first", "High-resolution drone photos of gutters, outlets and downpipes at every property."],
                ["Clean only where needed", "At a fixed price agreed in advance."],
                ["Document everything", "A report for every property - free where no cleaning was needed."],
              ].map(([title, body]) => (
                <li key={title} className="border-l-[3px] border-brand py-0.5 pl-3.5">
                  <p className="font-display text-[17px] font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/65">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Framed>
            <PortfolioScene className="block w-full" plain />
          </Framed>
        </div>
      </section>

      {/* The programme */}
      <section className="border-y border-border-subtle bg-muted-bg py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="How it works" title="The programme" />
          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-[12px] border border-border-subtle bg-white p-5">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#e9f5ef] text-brand-dark">
                  <StepIcon type={step.icon} />
                  <span className="absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[11px] font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you receive */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Per property" title="What you receive" />
            <TickList className="mt-5" items={receive} />
            <p className="mt-5 text-sm font-medium text-foreground/60">
              A documented maintenance history for every property - not an invoice saying &quot;gutters cleaned.&quot;
            </p>
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

      {/* Roof-level observations */}
      <section className="border-y border-border-subtle bg-muted-bg py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="Included" title="Roof-level observations" sub="While the drone is up, we photograph and flag anything visible:" />
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {flagged.map((item) => (
              <li key={item} className="rounded-[9px] border border-border-subtle bg-white px-3.5 py-2 text-sm font-semibold text-foreground/80">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-[12px] border border-border-subtle bg-white p-5 text-sm leading-relaxed text-foreground/65">
            <em>Cleano are not roofers and this is not a roofing survey.</em> We simply photograph what we see so you can decide
            whether a specialist is worth instructing - instead of paying a contractor to attend just to find out whether
            there&apos;s a problem.
          </p>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why it works" title="For portfolios" />
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="rounded-[12px] border border-border-subtle bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e9f5ef] text-brand-dark">
                  <BenefitIcon type={b.icon} />
                </span>
                <h3 className="mt-3.5 font-bold text-foreground">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{b.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-foreground/65">
            Prefer to call?{" "}
            <a href={telHref()} className="font-semibold text-brand-dark hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            . Single property instead?{" "}
            <Link href="/gutter-cleaning" className="font-semibold text-brand-dark hover:underline">
              See our standard gutter cleaning
            </Link>
            .
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

const stepPaths: Record<"list" | "drone" | "reportCheck" | "priceTag", React.ReactNode> = {
  list: (
    <>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <circle cx="4" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  drone: (
    <>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9.5 9.5 5 5M14.5 9.5 19 5M9.5 14.5 5 19M14.5 14.5 19 19" />
      <circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    </>
  ),
  reportCheck: (
    <>
      <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M15 3v4h4" />
      <path d="M9 14l2.2 2.2L16 11.5" />
    </>
  ),
  priceTag: (
    <>
      <path d="M12.6 3.4 20 10.8a2 2 0 0 1 0 2.8l-6.4 6.4a2 2 0 0 1-2.8 0L3.4 12.6A2 2 0 0 1 3 11.3V5a2 2 0 0 1 2-2h6.3c.5 0 1 .2 1.3.4Z" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
};

function StepIcon({ type }: { type: "list" | "drone" | "reportCheck" | "priceTag" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {stepPaths[type]}
    </svg>
  );
}

const benefitPaths: Record<"wallet" | "document" | "camera" | "bell" | "handshake", React.ReactNode> = {
  wallet: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-4a2 2 0 1 0 0 4h5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M15 3v4h4M9 13h6M9 17h4" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l1.6-2.5h4.8L16 7" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 12l4-4 4 3 4-3 3 2" />
      <path d="M11 8l4 3.5a1.5 1.5 0 0 1-2 2.2M15 11.5l1.8 1.6a1.5 1.5 0 0 1-2 2.2" />
      <path d="M6 8l-4 4 5 5 2-1.6" />
      <path d="M18 10l4 2-5 6-2.2-1.8" />
    </>
  ),
};

function BenefitIcon({ type }: { type: "wallet" | "document" | "camera" | "bell" | "handshake" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {benefitPaths[type]}
    </svg>
  );
}
