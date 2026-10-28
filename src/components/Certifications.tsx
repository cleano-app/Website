"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { accreditations } from "@/lib/siteConfig";
import FadeIn from "./motion/FadeIn";

// Who has checked Cleano: CHAS for health and safety, the CAA for the
// drone. Straight under the trust strip on the homepage, because both are
// what a council, landlord or business checks before booking a contractor.
// Each card gets the site's green tick, popping in as it comes into view.

function VerifiedTick({ delay }: { delay: number }) {
  const still = useReducedMotion() ?? false;
  return (
    <motion.span
      className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-lg ring-4 ring-white"
      initial={still ? false : { scale: 0, rotate: -40 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 320, damping: 16, delay: still ? 0 : delay }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </motion.span>
  );
}

export default function Certifications() {
  const { chas, caa } = accreditations;

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">Accredited &amp; registered</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Checked before we arrive</h2>
        </FadeIn>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <FadeIn>
            <div className="relative flex h-full items-center gap-5 rounded-2xl border border-border-subtle bg-white p-5 shadow-sm">
              <VerifiedTick delay={0.3} />
              <div className={`flex h-20 w-28 shrink-0 items-center justify-center rounded-xl p-2 ${chas.logo ? "bg-white" : "bg-muted-bg"}`}>
                {chas.logo ? (
                  <Image src={chas.logo.src} alt="Veriforce CHAS Standard accredited contractor" width={chas.logo.width} height={chas.logo.height} className="h-[4.5rem] w-auto" />
                ) : (
                  <span className="text-center leading-none">
                    <span className="block text-2xl font-black tracking-tight text-foreground">CHAS</span>
                    <span className="mt-1 block text-[10px] font-bold tracking-wide text-foreground/60 uppercase">Accredited</span>
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-foreground">CHAS accredited</h3>
                <p className="mt-1 text-sm text-foreground/70">
                  Independently assessed for health and safety - the scheme councils, housing
                  providers and businesses use to vet their contractors.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative flex h-full items-center gap-5 rounded-2xl border border-border-subtle bg-white p-5 shadow-sm">
              <VerifiedTick delay={0.45} />
              <div className="flex h-20 w-28 shrink-0 flex-col items-center justify-center rounded-xl bg-muted-bg p-2 text-brand-dark">
                {caa.logo ? (
                  <Image src={caa.logo.src} alt="UK Civil Aviation Authority" width={caa.logo.width} height={caa.logo.height} className="h-auto max-h-16 w-auto" />
                ) : (
                  <>
                    <DroneIcon />
                    <span className="mt-1 text-[10px] font-bold tracking-wide uppercase">CAA certified</span>
                  </>
                )}
              </div>
              <div>
                <h3 className="font-bold text-foreground">CAA certified</h3>
                <p className="mt-1 text-sm text-foreground/70">
                  Our drone pilots are certified with the UK Civil Aviation Authority, and every
                  inspection is flown under its rules.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DroneIcon() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 10h24" />
      <path d="M4 5h8M28 5h8M8 5v5M32 5v5" />
      <rect x="14" y="8" width="12" height="7" rx="3" />
      <circle cx="20" cy="19" r="2.5" />
      <path d="M20 15v1.5" />
    </svg>
  );
}
