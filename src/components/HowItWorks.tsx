const steps = [
  { title: "Get a Quote", body: "Tell us what needs cleaning." },
  { title: "Book", body: "Choose a convenient time." },
  { title: "We Clean", body: "Our team completes the work professionally." },
  { title: "Photo Report", body: "Receive proof of the completed work." },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted-bg py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
