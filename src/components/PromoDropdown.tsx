"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Drone } from "./gutter-story/parts";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  inspectionBookingUrl,
  inspectionPromo,
  inspectionPromoLabel,
  inspectionPromoRunning,
} from "@/lib/siteConfig";

// The free drone inspection, announced to everyone who visits while it
// runs. A card under the header rather than a full-screen popup: Google
// demotes pages whose content is covered on arrival from a search, and the
// offer isn't worth the homepage's ranking. It's delivered by drone (the
// owner's idea): the card flies in hanging from a Cleano drone, swings as
// it settles, then hovers; closing it, the drone flies off with it.
// Closing sticks for this browser; once the offer ends it never appears.

// Pages where it would be in the way: the offer page itself, the policies
// (read by Stripe and by customers looking for something specific) and the
// quote form, where the visitor is already mid-enquiry.
const HIDDEN_ON = ["/inspection", "/terms", "/privacy", "/cancellation", "/refunds", "/quote"];

// Not tied to the end date: moving the date must not bring the card back
// for everyone who already closed it.
const DISMISS_KEY = "cleano-promo-inspection";

export default function PromoDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The hover pauses while a pointer is over the card or focus is in it,
  // so its buttons sit still to be pressed.
  const [steady, setSteady] = useState(false);
  const hidden = HIDDEN_ON.includes(pathname);

  useEffect(() => {
    // Decided in the browser only: the date and the "closed it already"
    // flag are both per-visitor, and the server render must not guess.
    if (hidden || !inspectionPromoRunning()) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // Storage blocked (private mode etc.) - show it; closing still works
      // for this page view.
    }
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [hidden]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Nothing to remember it in - it may show again next visit.
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && !hidden && (
          <motion.div
            role="dialog"
            aria-labelledby="promo-title"
            initial={{ opacity: 0, x: 160, y: -320, rotate: 10 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 120, y: -420, rotate: -6, transition: { duration: 0.8, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 60, damping: 11, mass: 1.1 }}
            className="fixed inset-x-3 top-[3.6rem] z-30 mx-auto max-w-sm sm:inset-x-auto sm:right-6 sm:top-[4.3rem] lg:top-[4.8rem]"
          >
            {/* hovering, with a gentle swing */}
            <motion.div
              onPointerEnter={() => setSteady(true)}
              onPointerLeave={() => setSteady(false)}
              onFocus={() => setSteady(true)}
              onBlur={() => setSteady(false)}
              animate={steady ? { y: 0, rotate: 0 } : { y: [0, -7, 0], rotate: [-0.8, 0.8, -0.8] }}
              transition={steady ? { duration: 0.3 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              style={{ originY: 0 }}
            >
              {/* the drone, and the two lines it carries the card on */}
              <svg viewBox="-60 -26 120 52" className="mx-auto block h-12 w-28" aria-hidden="true">
                <Drone />
              </svg>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="-mt-1 block h-5 w-full" aria-hidden="true">
                <path d="M47 0 L10 20 M53 0 L90 20" stroke="#475569" strokeWidth="0.8" vectorEffect="non-scaling-stroke" fill="none" />
              </svg>

              <div className="relative overflow-hidden rounded-2xl bg-white text-foreground shadow-2xl shadow-brand/25 ring-1 ring-brand/15">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-black/5 hover:text-foreground"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                <div className="h-1.5 bg-gradient-to-r from-brand-light via-brand to-sky-300" aria-hidden="true" />
                <div className="px-5 pt-3.5 pb-5">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c]">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b4a] opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6b4a]" />
                    </span>
                    {inspectionPromo.area} only · {inspectionPromoLabel()}
                  </p>
                  <h2 id="promo-title" className="mt-1.5 pr-6 text-xl leading-tight font-bold text-brand-dark">
                    Free drone gutter inspection
                  </h2>
                  <p className="mt-1.5 text-sm text-foreground/70">
                    We check your gutters and downpipes and email you the photos. No need to be home, no obligation.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {/* Straight to the booking form - the card has already said what
                        the offer is, so the offer page would only be a tap more. */}
                    <a
                      href={inspectionBookingUrl()}
                      onClick={close}
                      className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-dark to-[#16a34a] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-brand-dark/30 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="animate-shine-loop absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true" />
                      <span className="relative">Book my inspection</span>
                      <span className="relative rounded-full bg-[#ffd84d] px-2 py-0.5 text-[10px] font-black text-brand-dark">FREE</span>
                    </a>
                    <button
                      type="button"
                      onClick={close}
                      className="px-2 py-2.5 text-sm font-medium text-foreground/60 hover:text-foreground"
                    >
                      No thanks
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
