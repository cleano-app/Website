import type { Metadata } from "next";
import Link from "next/link";
import ServiceIcon from "@/components/illustrations/ServiceIcon";
import ReportScene from "@/components/illustrations/ReportScene";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import FloatingButterflies from "@/components/motion/FloatingButterflies";
import { mailtoHref, telHref, whatsappHref, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Portfolio Gutter Care Scheme",
  description:
    "Drone-inspect every gutter across your portfolio, clean only where it's needed, and get a free photographic report where it isn't. For landlords, property managers and commercial portfolios.",
};

// This hero is centred text running close to full width at every line, so
// butterflies are confined to the top/bottom padding bands only - never
// beside the copy itself.
const heroButterflies = [
  { top: "1%", left: "4%", size: 20, duration: 9, delay: 0, xDrift: [0, 10, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8] },
  { top: "2%", left: "88%", size: 16, duration: 10, delay: 0.8, xDrift: [0, -8, 4, 0], yDrift: [0, 6, -4, 0], rotate: [10, -6, 8, 10] },
  { top: "93%", left: "8%", size: 16, duration: 11, delay: 1.4, xDrift: [0, 8, -4, 0], yDrift: [0, -6, 4, 0], rotate: [6, -10, 12, 6], opacity: 0.55 },
  { top: "94%", left: "86%", size: 18, duration: 8, delay: 2, xDrift: [0, -8, 6, 0], yDrift: [0, -6, 4, 0], rotate: [-6, 12, -10, -6], opacity: 0.5 },
];

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

const enquiryMailto = mailtoHref({
  subject: "Portfolio Gutter Care Scheme enquiry",
  body: "Hi Cleano,\n\nHere's our property portfolio for the Portfolio Gutter Care Scheme:\n\nNumber of properties: \nAddresses / list attached: \nOne-off inspection or ongoing programme: \n\nThanks,",
});

export default function PortfolioGutterCarePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/15">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-light/30 blur-3xl" />
        <FloatingButterflies flock={heroButterflies} />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <FadeIn>
            <ServiceIcon type="gutter" idle className="mx-auto h-14 w-14" />
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark uppercase">
              For Landlords, Property Managers &amp; Portfolios
            </p>
            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Portfolio Gutter Care Scheme
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              We drone-inspect every gutter across your portfolio, report on every property with
              photographic evidence, and only clean where the inspection shows it&apos;s required.
            </p>
            <a
              href="#the-problem"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline"
            >
              See how it works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* The problem */}
      <section id="the-problem" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">The Problem</p>
          <p className="mt-3 text-lg text-foreground/80">
            Gutters across a portfolio are usually cleaned because they&apos;re <em>due</em> — not
            because they need it. Meanwhile other properties block up unnoticed until there&apos;s
            water damage. Either way, you pay and have no record of what was actually there.
          </p>
        </FadeIn>
      </section>

      {/* Our approach */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="rounded-2xl border border-brand/25 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Our Approach</p>
            <p className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Inspect first. Clean only where needed. Document everything.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">The Programme</h2>
        </FadeIn>
        <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex h-full gap-4 rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-light/30 to-brand/20 text-brand-dark">
                  <StepIcon type={step.icon} />
                  <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-[11px] font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-foreground/70">{step.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* What you receive */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Per Property
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                What You Receive
              </h2>
              <ul className="mt-6 space-y-3">
                {receive.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/80">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-foreground/60">
                A documented maintenance history for every property — not an invoice saying
                &quot;gutters cleaned.&quot;
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ReportScene className="mx-auto w-full max-w-sm" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Roof-level observations */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Included</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Roof-Level Observations
          </h2>
          <p className="mt-4 text-foreground/70">
            While the drone is up, we photograph and flag anything visible:
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {flagged.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-sm font-medium text-foreground/80"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand" aria-hidden="true">
                  <path d="M12 9v4M12 17h.01" />
                  <path d="M10.3 3.9 2.5 18a1.8 1.8 0 0 0 1.6 2.6h15.8a1.8 1.8 0 0 0 1.6-2.6L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-border-subtle bg-muted-bg p-5 text-sm text-foreground/70">
            <em>Cleano are not roofers and this is not a roofing survey.</em> We simply photograph
            what we see so you can decide whether a specialist is worth instructing — instead of
            paying a contractor to attend just to find out whether there&apos;s a problem.
          </div>
        </FadeIn>
      </section>

      {/* Why it works */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Why It Works
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">For Portfolios</h2>
          </FadeIn>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="h-full rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-light/30 to-brand/20 text-brand-dark">
                    <BenefitIcon type={b.icon} />
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-dark">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-foreground/70">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Next step */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="bg-grain relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-6 py-16 text-center text-white sm:px-12">
            <div className="pointer-events-none absolute -top-20 -left-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-white/5" />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Next Step</h2>
              <p className="mx-auto mt-3 max-w-md text-white/90">
                Send us your property list and we&apos;ll come back with a proposed inspection
                schedule and pricing.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={enquiryMailto}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/90 sm:text-sm"
                >
                  Email Us Your Portfolio
                </a>
                <a
                  href={whatsappHref("Hi Cleano, I'd like to discuss the Portfolio Gutter Care Scheme for our properties")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/60 px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:text-sm"
                >
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Prefer to call? <a href={telHref()} className="underline hover:text-white">{siteConfig.phoneDisplay}</a>. Single property instead?{" "}
                <Link href="/gutter-cleaning" className="underline hover:text-white">
                  See our standard gutter cleaning
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
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
