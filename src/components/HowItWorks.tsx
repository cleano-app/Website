"use client";

import { motion } from "framer-motion";
import FadeIn from "./motion/FadeIn";

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
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Simple Process
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ol className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-10">
            {/* connecting line, desktop only */}
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent lg:block" />
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <motion.span
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand text-lg font-bold text-white shadow-md shadow-brand/20"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  whileHover={{ scale: 1.2, rotate: -8 }}
                  whileTap={{ scale: 1.3, rotate: 10, transition: { type: "spring", stiffness: 400, damping: 8 } }}
                >
                  {i + 1}
                </motion.span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}
