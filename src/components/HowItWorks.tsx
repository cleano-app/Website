import { SectionHeading } from "./site/ui";

// Four plain numbered steps on the light grey band.
const steps = [
  { title: "Get a quote", body: "Tell us what needs cleaning. A photo or two and we can often quote without a visit." },
  { title: "Book a time", body: "Choose a date that suits you. We confirm it in writing." },
  { title: "We do the work", body: "Fully insured, with the right equipment for the job." },
  { title: "Your photo report", body: "Before and after photos by email, so you can see it's done." },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-border-subtle bg-muted-bg py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="How it works" title="Four simple steps" />
        <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-[3px] border-brand pt-4">
              <p className="font-display text-[13px] font-extrabold tracking-[0.05em] text-brand-dark">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
