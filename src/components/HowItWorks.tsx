const steps = [
  { title: "Get a Quote", body: "Tell us what needs cleaning." },
  { title: "Book", body: "Choose a convenient time." },
  { title: "We Clean", body: "Our team completes the work professionally." },
  { title: "Photo Report", body: "Receive proof of the completed work." },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted-bg py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand">
          Simple Process
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold text-foreground sm:text-4xl">
          How It Works
        </h2>
        <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line, desktop only */}
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand text-lg font-bold text-white shadow-md shadow-brand/20">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
