import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import CheckScene from "@/components/inspection/CheckScene";
import DroneScanScene from "@/components/inspection/DroneScanScene";
import MarkedPhoto from "@/components/inspection/MarkedPhoto";
import ReportArrival from "@/components/inspection/ReportArrival";
import FadeIn from "@/components/motion/FadeIn";
import FloatingButterflies from "@/components/motion/FloatingButterflies";
import { pageMetadata } from "@/lib/seo";
import {
  inspectionBookingUrl,
  inspectionPromo,
  inspectionPromoLabel,
  inspectionPromoRunning,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/siteConfig";

// The free drone gutter inspection. Unlisted: not in the nav or the
// sitemap, and noindex, so it reaches only people who have the link. The
// Book button goes to the Ops booking form, which checks the postcode,
// catches repeat bookings and creates the visit; this page only explains.
//
// The owner, 27 Oct 2026: about the inspection, not the cleaning - gutters
// and downpipes as they're found, and how the photos become the report.
// Designed for the site, not copied from the printed flyer; no video yet.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Free drone gutter inspection",
    description:
      "We fly a drone along your gutters and downpipes and email you the photos, with any blockage marked up. Free, no obligation, no need to be home. For Stamford Hill homes.",
    path: inspectionPromo.path,
    image: {
      url: "/og-inspection.jpg",
      width: 1200,
      height: 630,
      alt: "Free drone gutter inspection from Cleano - a real blocked gutter outlet, marked up as in the report",
    },
  }),
  robots: { index: false, follow: false },
};

const heroFacts = ["A drone, not a ladder", "No need to be home", "Report by email"];

const perks = ["Every gutter and downpipe", "Problems marked on the photos", "No need to be home", "No obligation"];

const checks = [
  {
    kind: "gutter" as const,
    title: "Gutters",
    body: "Leaves, moss and silt build up until rain spills over the edge - down your walls instead of down the pipe.",
  },
  {
    kind: "outlet" as const,
    title: "Outlets",
    body: "Where it usually goes wrong. One clump of leaves over the outlet and the water backs up along the gutter.",
  },
  {
    kind: "downpipe" as const,
    title: "Downpipes",
    body: "A blockage half-way down and the water has nowhere to go. You won't see it from the ground.",
  },
];

const reportHas = [
  "Photos of each gutter and downpipe",
  "Problems circled and labelled",
  "An overall condition: good, fair or poor",
  "Yours to keep, by email",
];

const steps = [
  { title: "Book online", body: "Your postcode first, so you know it's covered - then your name, address and email." },
  { title: "We fly the drone", body: "We text you the day before and again when it's done. You don't need to be in." },
  { title: "Your report arrives", body: "The photos and what we found, by email. What happens next is up to you." },
];

export default async function FreeInspectionPage() {
  // The end date is checked per request, not once at build time.
  await connection();
  const running = inspectionPromoRunning();
  const wa = whatsappHref("Hi Cleano, I'd like the free drone gutter inspection.", inspectionPromo.path);

  return (
    <>
      {/* Hero: the drone at work */}
      <section className="bg-grain relative overflow-hidden bg-brand-dark text-white">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <FloatingButterflies
          flock={[
            { top: "8%", left: "4%", size: 18, duration: 9, delay: 0.3, xDrift: [0, 10, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8], opacity: 0.45 },
            { top: "88%", left: "46%", size: 15, duration: 10, delay: 1, xDrift: [0, -8, 4, 0], yDrift: [0, 6, -4, 0], rotate: [10, -6, 8, 10], opacity: 0.35 },
          ]}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:py-20">
          <FadeIn className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-light/40 bg-white/5 px-4 py-1.5 text-sm font-semibold text-brand-light">
              <PinIcon />
              For {inspectionPromo.area} homes · {running ? inspectionPromoLabel() : "Offer ended"}
            </p>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Are your gutters <span className="text-brand-light">blocked?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-white/80 lg:mx-0">
              You can&apos;t see inside them from the ground. Our drone can. We check your gutters
              and downpipes and email you the photos - free.
            </p>
            <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {heroFacts.map((fact) => (
                <li key={fact} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90">
                  <span className="text-brand-light">
                    <TickIcon small />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.2rem] bg-brand-light/15 blur-xl" aria-hidden="true" />
              <DroneScanScene className="relative w-full drop-shadow-2xl" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The offer, and the Book button - the middle of the page */}
      <section id="book" className="relative overflow-hidden bg-gradient-to-b from-brand-light/30 via-brand-light/15 to-background">
        <div className="pointer-events-none absolute top-10 -left-20 h-64 w-64 rounded-full bg-brand-light/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
          {running ? (
            <FadeIn className="rounded-[2rem] border border-brand/20 bg-white/80 px-6 py-10 text-center shadow-xl shadow-brand-dark/5 backdrop-blur sm:px-12 sm:py-14">
              <p className="text-sm font-bold tracking-[0.2em] text-brand uppercase">Free · no obligation</p>
              <h2 className="mx-auto mt-3 max-w-2xl text-3xl leading-tight font-bold text-brand-dark sm:text-4xl">
                A free drone inspection of your gutters &amp; downpipes
              </h2>
              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {perks.map((perk, i) => (
                  <li key={perk}>
                    <FadeIn delay={0.1 + i * 0.08} y={10} className="flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand-dark">
                      <TickIcon small />
                      {perk}
                    </FadeIn>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a
                  href={inspectionBookingUrl()}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-brand-dark px-10 py-5 text-xl font-bold text-white shadow-xl shadow-brand-dark/30 transition-transform hover:-translate-y-0.5 sm:px-14 sm:text-2xl"
                >
                  <span className="absolute inset-0 rounded-full bg-brand-light/50 motion-safe:animate-ping" style={{ animationDuration: "2.4s" }} aria-hidden="true" />
                  <span className="relative">Book my free inspection</span>
                  <span className="relative">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
              <p className="mt-5 text-sm font-medium text-foreground/60">
                Takes about a minute. No payment details.
              </p>
              <p className="mt-4 text-sm text-foreground/70">
                Rather talk?{" "}
                <a href={telHref()} className="font-bold text-brand-dark underline underline-offset-2">
                  Call {siteConfig.phoneDisplay}
                </a>{" "}
                or{" "}
                <a href={wa} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-dark underline underline-offset-2">
                  WhatsApp us
                </a>
              </p>
            </FadeIn>
          ) : (
            <FadeIn className="mx-auto max-w-xl rounded-[2rem] bg-white px-6 py-10 text-center shadow-xl">
              <h2 className="text-2xl font-bold text-brand-dark">This offer has ended</h2>
              <p className="mt-2 text-foreground/70">We still inspect gutters - message us and we&apos;ll help.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3 font-bold text-white">
                  WhatsApp us
                </a>
                <Link href="/quote" className="rounded-full bg-brand-dark px-6 py-3 font-bold text-white">
                  Get a free quote
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* What we check */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">What we check</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Follow the water</h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
            Rain runs along the gutter, into the outlet and down the pipe. A blockage anywhere on
            the way and it ends up on your walls.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {checks.map((check, i) => (
            <FadeIn key={check.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border-subtle bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <CheckScene kind={check.kind} className="w-full" />
                <div className="mt-5 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-dark text-xs font-bold text-brand-light">{i + 1}</span>
                  <h3 className="text-lg font-bold text-foreground">{check.title}</h3>
                </div>
                <p className="mt-2 text-foreground/70">{check.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-foreground/60">
          While we&apos;re up there, we&apos;ll also note anything obvious on the roof, like slipped tiles.
        </p>
      </section>

      {/* Real photos, marked up live */}
      <section className="bg-muted-bg py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">Real photos, as we find them</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Every problem, circled and named</h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              From real jobs. This is how your photos come back - nothing to work out, just look.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <FadeIn>
              <figure className="overflow-hidden rounded-2xl bg-white shadow-md">
                <MarkedPhoto
                  src="/photos/gutter3-before.jpg"
                  alt="A real gutter outlet with leaves over the grate and water standing in the gutter, marked up in red"
                  width={1400}
                  height={933}
                  rings={[
                    { cx: 705, cy: 405, rx: 200, ry: 120 },
                    { cx: 242, cy: 385, rx: 227, ry: 67 },
                  ]}
                  labels={[
                    { text: "Outlet blocked with leaves", left: 40, top: 61 },
                    { text: "Standing water", left: 3, top: 21 },
                  ]}
                />
                <figcaption className="px-5 py-4 text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">The outlet.</span> Leaves over the
                  grate, so the water sits in the gutter instead of draining.
                </figcaption>
              </figure>
            </FadeIn>
            <FadeIn delay={0.12}>
              <figure className="overflow-hidden rounded-2xl bg-white shadow-md">
                <MarkedPhoto
                  src="/photos/gutter-before.jpg"
                  alt="A real gutter run full of leaves and silt, marked up in red"
                  width={1400}
                  height={933}
                  rings={[{ cx: 728, cy: 600, rx: 125, ry: 300, rotate: 10 }]}
                  labels={[{ text: "Gutter full of leaves and silt", right: 3, top: 30 }]}
                />
                <figcaption className="px-5 py-4 text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">The run.</span> Full along its
                  length - the next heavy rain goes over the edge.
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The report */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">Your photo report</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Straight to your inbox</h2>
            <p className="mt-4 text-foreground/70">
              All the photos go into one report and come to your email. If everything&apos;s clear,
              you&apos;ll know. If something needs doing, you&apos;ll see exactly what and where -
              and it&apos;s up to you what happens next.
            </p>
            <ul className="mt-6 space-y-3">
              {reportHas.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                    <TickIcon small />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <ReportArrival className="pt-6" />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted-bg py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">How it works</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Three steps, nothing to do</h2>
          </FadeIn>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            <span className="absolute top-6 right-[16%] left-[16%] hidden border-t-2 border-dashed border-brand/30 md:block" aria-hidden="true" />
            {steps.map((step, i) => (
              <li key={step.title} className="relative text-center">
                <FadeIn delay={i * 0.12}>
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-lg font-bold text-brand-light ring-8 ring-muted-bg">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-xs text-foreground/70">{step.body}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
          {running && (
            <FadeIn className="mt-12 text-center">
              <a href="#book" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:underline">
                Back to the offer
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </a>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Small print */}
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-sm text-foreground/60">
          Limited-time offer for {inspectionPromo.area} and nearby postcodes - the booking form
          checks yours. One inspection per home. No obligation and nothing to pay.{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
            Terms
          </Link>
        </p>
      </section>
    </>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TickIcon({ small = false }: { small?: boolean }) {
  const size = small ? 14 : 16;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
