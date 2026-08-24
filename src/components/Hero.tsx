"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroScene from "./illustrations/HeroScene";
import FloatingButterflies from "./motion/FloatingButterflies";
import { whatsappHref } from "@/lib/siteConfig";

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

      <FloatingButterflies />

      <div className="relative mx-auto grid max-w-6xl items-center gap-2 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark uppercase">
            Exterior Cleaning Company · London &amp; Surrounding Areas
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Clean places.
            <br />
            <span className="text-brand-dark">Better spaces.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-foreground/70">
            Cleano is an exterior cleaning company serving homes and businesses across London and
            the surrounding areas — gutters, windows, driveways, bins and scheduled commercial
            care.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/quote"
                className="block rounded-full bg-brand px-4 py-2 text-center text-xs font-semibold text-white shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark hover:shadow-md sm:text-sm"
              >
                Get a Free Quote
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappHref("Hi Cleano, I'd like a quote for...")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand/40 bg-white px-4 py-2 text-center text-xs font-semibold text-brand-dark transition-colors hover:border-brand hover:shadow-sm sm:text-sm"
            >
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeroScene className="mx-auto w-full max-w-[13rem] drop-shadow-xl sm:max-w-xs lg:max-w-md" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
