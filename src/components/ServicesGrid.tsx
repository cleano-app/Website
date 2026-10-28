"use client";

import Link from "next/link";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content/services";
import ServiceScene, { type ServiceSceneType } from "./scenes/ServiceScenes";
import FadeIn from "./motion/FadeIn";
import FloatingButterflies from "./motion/FloatingButterflies";

// Our Services, as flip cards (the owner picked "flip cards", and asked
// that they keep moving on their own). Each card is its service's scene,
// dirty on the front and clean on the back. On their own they flip to
// clean, hold, flip back, and go again - each a little after the one
// before, so a slow ripple of flips keeps running across the grid. Each
// landing on clean sends a band of light across it. Pointing at a card
// (desktop) flips it to clean and holds it there. Flipping only runs
// while the section is on screen; with reduced motion the cards simply
// show their clean side.

const sectionButterflies = [
  { top: "1%", left: "1%", size: 18, duration: 9, delay: 0.2, xDrift: [0, 8, -4, 0], yDrift: [0, -4, 2, 0], rotate: [-8, 10, -4, -8], opacity: 0.4 },
  { top: "1%", left: "96%", size: 16, duration: 10, delay: 1.1, xDrift: [0, -6, 4, 0], yDrift: [0, 4, -2, 0], rotate: [8, -10, 6, 8], opacity: 0.35 },
];

const sceneBySlug: Record<string, ServiceSceneType> = {
  "gutter-cleaning": "gutter",
  "rooftop-cleaning": "rooftop",
  "window-cleaning": "window",
  "pressure-washing": "pressure",
  "bin-cleaning": "bin",
  "graffiti-removal": "graffiti",
};

const order = ["gutter-cleaning", "rooftop-cleaning", "window-cleaning", "pressure-washing", "bin-cleaning", "graffiti-removal"];

// Short names - the full ones truncate on a phone card.
const tileName: Record<string, string> = {
  "gutter-cleaning": "Gutters",
  "rooftop-cleaning": "Roofs",
  "window-cleaning": "Windows",
  "pressure-washing": "Pressure Washing",
  "bin-cleaning": "Wheelie Bins",
  "graffiti-removal": "Graffiti",
};

const FIRST_MS = 500; //   before the first card's first flip
const STAGGER_MS = 900; // between neighbouring cards starting
const DIRTY_MS = 2600; //  how long a card shows dirty
const CLEAN_MS = 4800; //  ...and clean

function Chip({ text, clean }: { text: string; clean: boolean }) {
  return (
    <span className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full bg-white/80 py-1 pr-3 pl-2 text-[11px] font-bold text-brand-dark shadow-lg ring-1 ring-white/70 backdrop-blur-md sm:bottom-3 sm:left-3 sm:text-xs">
      {clean ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#fb923c]" />
      )}
      <span className="truncate">{text}</span>
    </span>
  );
}

function FlipCard({ slug, index, running, reduced }: { slug: string; index: number; running: boolean; reduced: boolean }) {
  const service = services.find((s) => s.slug === slug)!;
  const [clean, setClean] = useState(false);
  const [flips, setFlips] = useState(0);
  const [held, setHeld] = useState(false);

  // The cycle: wait (staggered the first time), flip, wait, flip back...
  useEffect(() => {
    if (!running || held || reduced) return;
    const wait = flips === 0 ? FIRST_MS + index * STAGGER_MS : clean ? CLEAN_MS : DIRTY_MS;
    const timer = setTimeout(() => {
      setClean((c) => !c);
      setFlips((n) => n + 1);
    }, wait);
    return () => clearTimeout(timer);
  }, [running, held, reduced, clean, flips, index]);

  const showClean = reduced || clean;
  const face = "absolute inset-0 overflow-hidden rounded-[1.2rem] shadow-md shadow-brand/15 ring-1 ring-black/5 [backface-visibility:hidden]";

  return (
    <Link
      href={`/${slug}`}
      aria-label={service.name}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setHeld(true);
        if (!clean) {
          setClean(true);
          setFlips((n) => n + 1);
        }
      }}
      onPointerLeave={() => setHeld(false)}
      className="group relative block aspect-[3/2] [perspective:1000px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.3,1.4,0.5,1)] [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${showClean ? 180 : 0}deg)` }}
      >
        <div className={face} aria-hidden={showClean}>
          <ServiceScene type={sceneBySlug[slug]} className="block h-full w-full" tone="soft" labels={false} play={false} stillAt={0.02} />
          <Chip text={tileName[slug]} clean={false} />
        </div>
        <div className={`${face} [transform:rotateY(180deg)]`} aria-hidden={!showClean}>
          <ServiceScene type={sceneBySlug[slug]} className="block h-full w-full" tone="soft" labels={false} play={false} stillAt={0.9} />
          {/* light sweeping across each time it lands on clean */}
          {clean && !reduced && (
            <span key={flips} className="animate-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" aria-hidden="true" />
          )}
          <Chip text={tileName[slug]} clean />
        </div>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  // Not "once": the cards pause whenever the section is off screen.
  const inView = useInView(ref, { amount: 0.2 });
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const frame = requestAnimationFrame(sync);
    query.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6">
      <FloatingButterflies flock={sectionButterflies} />
      <FadeIn className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">What We Do</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Our Services</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">Before and after - tap one to see more.</p>
      </FadeIn>
      <div ref={ref} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {order.map((slug, i) => (
          <FlipCard key={slug} slug={slug} index={i} running={inView} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
