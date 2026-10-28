"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HomeHeroScene from "./scenes/HomeHeroScene";
import FloatingButterflies from "./motion/FloatingButterflies";

// Confined to the top corners of the section (above the badge/headline) so
// they never drift across the copy, which runs close to full width on mobile.
const heroButterflies = [
  { top: "1%", left: "3%", size: 22, duration: 9, delay: 0, xDrift: [0, 10, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8] },
  { top: "2%", left: "90%", size: 18, duration: 10, delay: 0.8, xDrift: [0, -8, 4, 0], yDrift: [0, 6, -4, 0], rotate: [10, -6, 8, 10] },
];

// A single butterfly scoped to just the illustration box - safe to place
// anywhere inside since there's no text in there.
const illustrationButterflies = [
  { top: "6%", left: "82%", size: 18, duration: 8, delay: 1.4, xDrift: [0, -10, 6, 0], yDrift: [0, 8, -6, 0], rotate: [8, -10, 6, 8], opacity: 0.6 },
];

export default function Hero() {
  return (
    <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/15">
      {/* animated gradient-mesh blobs - bolder and more colourful */}
      <motion.div
        className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-brand-light/40 blur-3xl sm:h-80 sm:w-80 lg:-right-32 lg:-top-24 lg:h-[28rem] lg:w-[28rem]"
        animate={{ y: [0, 24, 0], x: [0, -14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-brand/30 blur-3xl sm:h-72 sm:w-72 lg:-bottom-32 lg:-left-20 lg:h-96 lg:w-96"
        animate={{ y: [0, -18, 0], x: [0, 14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-0 h-40 w-40 rounded-full bg-brand-dark/10 blur-3xl lg:h-64 lg:w-64"
        animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingButterflies flock={heroButterflies} />

      {/* Headline, the animation, then the buttons - after the animation on every screen size. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-x-10 gap-y-6 px-4 pt-6 pb-8 sm:px-6 lg:grid-cols-2 lg:pt-12 lg:pb-14">
        <motion.div
          className="lg:row-span-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark uppercase">
            Exterior Cleaning Company · London &amp; Surrounding Areas
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Clean places.
            <br />
            <span className="text-brand-dark">Better spaces.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base sm:text-lg text-foreground/70">
            Cleano provides professional exterior cleaning for homes and businesses across London
            and the surrounding areas — gutters, roofs, windows, driveways and bins.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <FloatingButterflies flock={illustrationButterflies} />
          <div className="relative mx-auto max-w-xl">
            <div className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-brand-light/40 to-sky-200/40 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.6rem] shadow-2xl shadow-brand/25 ring-1 ring-white">
              <HomeHeroScene className="block w-full" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap gap-3 lg:col-start-2 lg:justify-center"
        >
          <Link
            href="/quote"
            className="rounded-full bg-brand px-6 py-3 text-center text-sm font-bold text-white shadow-md shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-brand/40 bg-white px-6 py-3 text-center text-sm font-bold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
