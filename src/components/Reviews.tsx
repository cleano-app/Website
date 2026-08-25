import FadeIn from "./motion/FadeIn";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";
import FloatingButterflies from "./motion/FloatingButterflies";

// PLACEHOLDER CONTENT: no real reviews were supplied. Replace every entry
// below with genuine Google/customer reviews before launch - do not publish
// these sample quotes as-is. (A later iteration could pull these live from
// the Google Places API instead of hardcoding them.)
const sampleReviews = [
  {
    quote: "Sample review text goes here - replace with a real customer quote.",
    name: "Replace with real name",
    context: "Gutter Cleaning · Stamford Hill",
  },
  {
    quote: "Sample review text goes here - replace with a real customer quote.",
    name: "Replace with real name",
    context: "Rooftop Cleaning · Enfield",
  },
  {
    quote: "Sample review text goes here - replace with a real customer quote.",
    name: "Replace with real name",
    context: "Window Cleaning · Hackney",
  },
];

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-muted-bg py-20">
      <FloatingButterflies
        flock={[
          { top: "3%", left: "2%", size: 18, duration: 9, delay: 0.3, xDrift: [0, 8, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8], opacity: 0.4 },
          { top: "3%", left: "94%", size: 16, duration: 10, delay: 1.2, xDrift: [0, -6, 4, 0], yDrift: [0, 6, -4, 0], rotate: [8, -10, 6, 8], opacity: 0.35 },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Trusted Locally</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
        </FadeIn>
        <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((review, i) => (
            <StaggerItem key={i}>
              <figure className="relative h-full rounded-2xl border border-border-subtle bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-brand/20" aria-hidden="true">
                  <path d="M7 7c-2.2 0-4 1.8-4 4v6h6v-6H6.2C6.6 9.5 8 8 10 7.6V5C8.3 5.2 7 6 7 7Zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-2.8c.4-1.5 1.8-3 3.8-3.4V5c-1.7.2-3 1-3 2Z" />
                </svg>
                <div className="mt-2 flex gap-0.5 text-brand" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <StarIcon key={star} />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-foreground/80">“{review.quote}”</blockquote>
                <figcaption className="mt-4 border-t border-border-subtle pt-4 text-sm font-semibold text-foreground">
                  {review.name}
                  <span className="block text-xs font-normal text-foreground/50">{review.context}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  );
}
