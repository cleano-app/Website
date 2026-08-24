import type { Metadata } from "next";
import Link from "next/link";
import ServiceIcon from "@/components/illustrations/ServiceIcon";
import ReportScene from "@/components/illustrations/ReportScene";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { mailtoHref, telHref, whatsappHref, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Portfolio Gutter Care Scheme",
  description:
    "Drone-inspect every gutter across your portfolio, clean only where it's needed, and get a free photographic report where it isn't. For landlords, property managers and commercial portfolios.",
};

const steps = [
  {
    title: "You send us the portfolio",
    body: "One-off inspection or ongoing programme. We build the schedule and work through it systematically.",
  },
  {
    title: "Drone inspection",
    body: "Trained operator, high-resolution photographs of gutters, outlets and downpipes at every property.",
  },
  {
    title: "No cleaning needed → free report",
    body: "Gutters clear? We don't clean them. You get the photographic inspection report free of charge as proof the property was checked.",
  },
  {
    title: "Cleaning needed → agreed price",
    body: "Before photos → clean → after photos → full report. Competitive fixed pricing agreed in advance.",
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
  },
  {
    title: "Free reports",
    body: "Where no cleaning is required, the report costs nothing.",
  },
  {
    title: "Photographic evidence",
    body: "Defensible record of condition found and work completed.",
  },
  {
    title: "Early warning",
    body: "Roof-level issues spotted before they become claims.",
  },
  {
    title: "One contractor",
    body: "Whole portfolio managed as a single programme.",
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
      <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <FadeIn>
            <ServiceIcon type="gutter" className="mx-auto h-14 w-14" />
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
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={enquiryMailto}
                className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
              >
                Email Us Your Portfolio
              </a>
              <a
                href={whatsappHref("Hi Cleano, I'd like to discuss the Portfolio Gutter Care Scheme for our properties")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand/40 bg-white px-8 py-3.5 text-center text-sm font-semibold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
              >
                WhatsApp Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The problem */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
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
        <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="flex h-full gap-4 rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand text-base font-bold text-white shadow-md shadow-brand/20">
                  {i + 1}
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
                className="rounded-full border border-border-subtle bg-white px-4 py-2 text-sm font-medium text-foreground/80"
              >
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
                  <h3 className="font-semibold text-brand-dark">{b.title}</h3>
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
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={enquiryMailto}
                  className="w-full rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
                >
                  Email Us Your Portfolio
                </a>
                <a
                  href={telHref()}
                  className="w-full rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
              <p className="mt-6 text-sm text-white/70">
                Single property instead?{" "}
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
