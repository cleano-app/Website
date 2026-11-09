"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BookButton from "../inspection/BookButton";
import OfferVideo from "../inspection/OfferVideo";
import { inspectionPromo, inspectionPromoLabel, inspectionPromoRunning } from "@/lib/siteConfig";

// The free drone gutter inspection, on the homepage for everyone while the
// offer runs - the drone card only flies in once per visitor, so this is
// the offer's permanent place on the front page. Straight under the trust
// row. On a computer the owner's offer video plays beside it, silently,
// while it's on screen; phones get the words and the Book button only.
//
// The page is built ahead of time, so a set end date is checked again in
// the browser: once it has passed, the section goes.

export default function OfferBand() {
  // "off" is fixed at build time, so server and browser agree on it; a
  // date that has since passed is only known in the browser, after mount.
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEnded(!inspectionPromoRunning()));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (inspectionPromo.until === "off" || ended) return null;

  return (
    <section className="border-b border-border-subtle bg-muted-bg py-8 sm:py-12" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-[16px] border-2 border-brand/35 bg-white p-5 shadow-[0_24px_50px_-34px_rgba(15,40,30,.45)] sm:p-8 lg:grid-cols-[1fr_auto] lg:gap-12 lg:p-10">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-3 py-1 text-[13px] font-bold text-white">
                <PinIcon />
                {inspectionPromo.area} only
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1 text-[13px] font-bold text-brand-dark">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff6b4a] opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6b4a]" />
                </span>
                {inspectionPromo.until ? inspectionPromoLabel() : "Limited-time offer"}
              </span>
            </div>
            <h2 id="offer-heading" className="mt-4 text-[26px] leading-tight font-bold text-foreground sm:text-[36px]">
              Free drone gutter inspection
            </h2>
            <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-foreground/70 sm:text-[17px]">
              We fly a drone along your gutters and downpipes and email you the photos, with any blockage marked up. No need
              to be home, and no obligation.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BookButton size="md" />
              <Link href={inspectionPromo.path} className="text-sm font-bold text-brand-dark hover:underline">
                See how it works &rarr;
              </Link>
            </div>
          </div>
          <div className="relative hidden w-[200px] lg:block">
            <OfferVideo />
            <span className="absolute -top-3 -left-6 flex h-[72px] w-[72px] -rotate-12 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#ffd84d] to-[#ffb020] text-center shadow-lg ring-4 ring-white">
              <span className="text-lg leading-none font-black text-brand-dark">FREE</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
