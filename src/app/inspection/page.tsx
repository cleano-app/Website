import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
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

// The free drone gutter inspection - the flyer as a page. Unlisted: not in
// the nav or the sitemap, and noindex, so it reaches only people who have
// the link (flyer, WhatsApp, the drop-down card). The Book button goes to
// the Ops booking form, which checks the postcode, catches repeat bookings
// and creates the visit; this page only explains the offer.
//
// About the inspection, not the cleaning (the owner, 27 Oct 2026): it
// shows gutters as they are found - blocked, dirty - and how those photos
// become the report. No before/after cleaning shots here.
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
      alt: "Free drone gutter inspection from Cleano - real drone photos of three gutter runs",
    },
  }),
  robots: { index: false, follow: false },
};

// The flyer's three photos - taken by the drone, so the caption under
// them can say so. The job photos further down are not claimed as drone
// shots.
const dronePhotos = [
  { src: "/photos/inspection-drone-1.jpg", alt: "Drone photo looking down on a gutter and downpipes at the back of a house" },
  { src: "/photos/inspection-drone-2.jpg", alt: "Drone photo of the gutters around a slate bay roof, from above" },
  { src: "/photos/inspection-drone-3.jpg", alt: "Drone photo along a long gutter run above a garden" },
];

const perks = [
  "Photos of every gutter and downpipe",
  "Problems marked up in your report",
  "No need to be home",
  "No obligation",
];

const checks = [
  {
    title: "Blocked gutters",
    body: "Leaves, moss and silt settle in the gutter until rain spills over the edge - down your walls instead of down the pipe.",
    src: "/photos/gutter-before.jpg",
    alt: "A real gutter full of fallen leaves and debris beside a tiled roof",
  },
  {
    title: "Outlets and downpipes",
    body: "The outlet is where it usually goes wrong. One clump of leaves over the grate and the downpipe can't drain at all.",
    src: "/photos/gutter3-before.jpg",
    alt: "A real gutter outlet with leaves and debris over the grate, and water standing in the gutter",
  },
  {
    title: "The whole run, from above",
    body: "The drone follows every gutter end to end - the back, the bays, the parts no ladder reaches.",
    src: "/photos/inspection-drone-3.jpg",
    alt: "Drone photo along a full gutter run at the back of a house",
  },
];

const toReport = [
  {
    title: "We photograph it",
    body: "Every gutter, outlet and downpipe, as we find it.",
    src: "/photos/gutter3-before.jpg",
    alt: "A real gutter outlet as found: leaves over the grate and water standing in the gutter",
    width: 1400,
    height: 933,
  },
  {
    title: "We mark the problem",
    body: "Each one circled and labelled, so you can see what's wrong and where.",
    src: "/photos/inspection-marked.jpg",
    alt: "The same gutter photo marked up in red: the outlet circled and labelled 'Outlet blocked with leaves', the water labelled 'Standing water'",
    width: 1400,
    height: 933,
  },
  {
    title: "It's in your report",
    body: "All the photos together, sent to your email.",
    src: "/photos/report-photos-example.jpg",
    alt: "Photos inside a real Cleano report, with a defect photo marked up and described underneath",
    width: 1400,
    height: 931,
  },
];

const reportHas = [
  "Photos of each gutter and downpipe",
  "Problems circled and labelled",
  "An overall condition: good, fair or poor",
  "Sent to your email - yours to keep",
];

const steps = [
  {
    title: "Book online",
    body: "Your postcode first, so you know straight away it's covered - then your name, address and email.",
  },
  {
    title: "We fly the drone",
    body: "We text you the day before and again when it's done. You don't need to be in.",
  },
  {
    title: "Your report arrives",
    body: "The photos and what we found, by email. What happens next is up to you.",
  },
];

export default async function FreeInspectionPage() {
  // The end date is checked per request, not once at build time.
  await connection();
  const running = inspectionPromoRunning();
  const wa = whatsappHref("Hi Cleano, I'd like the free drone gutter inspection.", inspectionPromo.path);

  return (
    <>
      {/* Hero - the flyer's top half */}
      <section className="bg-grain relative overflow-hidden bg-brand-dark text-white">
        <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
        <FloatingButterflies
          flock={[
            { top: "6%", left: "5%", size: 18, duration: 9, delay: 0.3, xDrift: [0, 10, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8], opacity: 0.45 },
            { top: "8%", left: "90%", size: 16, duration: 10, delay: 1, xDrift: [0, -8, 4, 0], yDrift: [0, 6, -4, 0], rotate: [10, -6, 8, 10], opacity: 0.4 },
          ]}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-14 text-center sm:px-6 lg:pt-16 lg:pb-20">
          <FadeIn>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-light/40 bg-white/5 px-4 py-1.5 text-sm font-semibold text-brand-light">
              <PinIcon />
              For {inspectionPromo.area} homes · {running ? inspectionPromoLabel() : "Offer ended"}
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl">
              Are your gutters <span className="text-brand-light">blocked?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              You can&apos;t see inside your gutters from the ground. Our drone can. We check your
              gutters and downpipes and email you the photos - free.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* On a phone: one wide photo over two small ones, so the Book
                button isn't three full-width photos further down. */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {dronePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`relative aspect-[16/9] overflow-hidden rounded-2xl border-4 border-white shadow-2xl shadow-black/30 sm:border-[5px] ${
                    i === 0 ? "col-span-2 sm:col-span-1" : ""
                  } ${i === 1 ? "sm:-translate-y-3" : ""}`}
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes={i === 0 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 33vw, 50vw"} className="object-cover" priority={i === 0} />
                </div>
              ))}
            </div>
            <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-light px-5 py-2 text-sm font-bold text-brand-dark">
              <CameraIcon />
              Real photos from our drone
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The offer and the Book button - the middle of the page */}
      <section id="book" className="relative bg-brand-light">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-16">
          {running ? (
            <>
              <FadeIn className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className="text-center md:text-left">
                  <span className="inline-block rounded-2xl bg-brand-dark px-7 py-2 text-6xl font-bold tracking-tight text-brand-light sm:text-7xl">
                    FREE
                  </span>
                  <p className="mt-4 text-2xl leading-tight font-bold text-brand-dark sm:text-3xl">
                    Drone gutter &amp; downpipe inspection
                  </p>
                </div>
                <ul className="mx-auto space-y-4 md:mx-0">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-lg font-semibold text-brand-dark">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-dark text-brand-light">
                        <TickIcon />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.1} className="mt-12 text-center">
                <a
                  href={inspectionBookingUrl()}
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-dark px-10 py-5 text-xl font-bold text-white shadow-xl shadow-brand-dark/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl sm:px-14 sm:text-2xl"
                >
                  Book my free inspection
                  <ArrowIcon />
                </a>
                <p className="mt-4 text-sm font-medium text-brand-dark/80">
                  Takes about a minute. No payment details.
                </p>
                <p className="mt-6 text-sm text-brand-dark">
                  Rather talk?{" "}
                  <a href={telHref()} className="font-bold underline underline-offset-2">
                    Call {siteConfig.phoneDisplay}
                  </a>{" "}
                  or{" "}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                    WhatsApp us
                  </a>
                </p>
              </FadeIn>
            </>
          ) : (
            <FadeIn className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-brand-dark">This offer has ended</h2>
              <p className="mt-2 text-foreground/70">
                We still inspect gutters - message us and we&apos;ll help.
              </p>
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
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">What we check</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Where the water should go</h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
            Real photos from our jobs - gutters as we found them.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {checks.map((check, i) => (
            <FadeIn key={check.title} delay={i * 0.08}>
              <div className="h-full overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={check.src} alt={check.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{check.title}</h3>
                  <p className="mt-1.5 text-foreground/70">{check.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-foreground/60">
          While we&apos;re up there, we&apos;ll also note anything obvious on the roof, like slipped tiles.
        </p>
      </section>

      {/* From photo to report */}
      <section className="bg-muted-bg py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">Your photo report</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">From the drone to your inbox</h2>
          </FadeIn>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {toReport.map((frame, i) => (
              <FadeIn key={frame.title} delay={i * 0.1}>
                <li className="relative">
                  <div className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-md">
                    <Image src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[3/2] h-auto w-full object-cover object-top" />
                  </div>
                  {i < toReport.length - 1 && (
                    <span className="absolute top-[calc(33%-1rem)] -right-5 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-brand-dark text-brand-light shadow-md md:flex" aria-hidden="true">
                      <ArrowIcon small />
                    </span>
                  )}
                  <div className="mt-4 flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-brand-light">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-foreground">{frame.title}</h3>
                      <p className="mt-0.5 text-sm text-foreground/70">{frame.body}</p>
                    </div>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
          <FadeIn className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand/20 bg-white p-6 sm:p-8">
            <p className="font-semibold text-foreground">Your report includes</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {reportHas.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-foreground/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                    <TickIcon small />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">How it works</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Three steps, nothing to do</h2>
        </FadeIn>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border-subtle bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-lg font-bold text-brand-light">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-foreground/70">{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Small print */}
      <section className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6">
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

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function TickIcon({ small = false }: { small?: boolean }) {
  const size = small ? 12 : 16;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={small ? "" : "transition-transform group-hover:translate-x-1"} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
