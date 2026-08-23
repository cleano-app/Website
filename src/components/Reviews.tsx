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
    context: "Commercial Cleaning · Enfield",
  },
  {
    quote: "Sample review text goes here - replace with a real customer quote.",
    name: "Replace with real name",
    context: "Window Cleaning · Hackney",
  },
];

export default function Reviews() {
  return (
    <section className="bg-muted-bg py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          What Our Customers Say
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((review, i) => (
            <figure key={i} className="rounded-2xl border border-border-subtle bg-background p-6">
              <div className="flex gap-0.5 text-brand" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, star) => (
                  <StarIcon key={star} />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-foreground/80">“{review.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-foreground">
                {review.name}
                <span className="block text-xs font-normal text-foreground/50">{review.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
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
