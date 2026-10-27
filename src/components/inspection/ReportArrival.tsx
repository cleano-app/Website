"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// The end of the inspection: the report landing in the customer's inbox.
// A real report's photo page, with an email notification sliding in over
// its corner as it scrolls into view.
export default function ReportArrival({ className = "" }: { className?: string }) {
  const still = useReducedMotion() ?? false;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-xl"
        initial={still ? false : { opacity: 0, y: 24, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/photos/report-photos-example.jpg"
          alt="Photos inside a real Cleano report, with a defect photo marked up and described underneath"
          width={1400}
          height={931}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        className="absolute -top-5 right-3 flex max-w-[85%] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-black/5 sm:-right-4"
        initial={still ? false : { opacity: 0, y: -16, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: still ? 0 : 0.7, type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-brand-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-foreground">Your gutter inspection report</span>
          <span className="block text-xs text-foreground/60">Cleano · just now</span>
        </span>
      </motion.div>
    </div>
  );
}
