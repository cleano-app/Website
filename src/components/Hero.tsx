"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroScene from "./illustrations/HeroScene";
import { whatsappHref } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/10">
      {/* animated gradient-mesh blobs */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand/20 blur-3xl"
        animate={{ y: [0, -16, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark uppercase">
            Exterior Cleaning Company · London &amp; Surrounding Areas
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Clean places. <span className="text-brand-dark">Better spaces.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-foreground/70">
            Cleano is an exterior cleaning company serving homes and businesses across London and
            the surrounding areas — gutters, windows, driveways, bins and scheduled commercial
            care.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="rounded-full bg-brand px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30"
            >
              Get a Free Quote
            </Link>
            <a
              href={whatsappHref("Hi Cleano, I'd like a quote for...")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand/40 bg-white px-8 py-3.5 text-center text-sm font-semibold text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <HeroScene className="mx-auto w-full max-w-md drop-shadow-xl" />
        </motion.div>
      </div>
    </section>
  );
}
