import ReportScene from "./illustrations/ReportScene";
import FadeIn from "./motion/FadeIn";

// Generic, applies to every service (gutters, bins, windows, pressure
// washing, commercial) - keep this list free of anything service-specific
// like drone photography, which only applies to roof/gutter work and
// belongs on the gutter-cleaning and portfolio pages instead.
const points = [
  "Uniformed team",
  "Professional equipment",
  "Fully insured",
  "Clear communication",
  "Before and after photos",
  "Photo report when the job is complete",
];

// The Cleano Photo Report is called out repeatedly across the V1 build
// plan as a core brand differentiator - this section is where it's
// introduced and it's echoed on every service page's "What's Included".
export default function CleanoStandard() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">The Cleano Standard</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Professional cleaning. Properly documented.
          </h2>
          <p className="mt-3 text-foreground/70">
            Every job ends with a Cleano Photo Report — before-and-after photos you can rely on,
            sent straight to your email.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-foreground/80">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ReportScene className="mx-auto w-full max-w-sm" />
        </FadeIn>
      </div>
    </section>
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
