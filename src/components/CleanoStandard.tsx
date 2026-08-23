import PhotoPlaceholder from "./PhotoPlaceholder";

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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">The Cleano Standard</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Professional cleaning. Properly documented.
          </h2>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-foreground/80">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <PhotoPlaceholder label="Cleano Photo Report example" aspect="aspect-[4/3]" />
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-0.5 shrink-0 text-brand"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
