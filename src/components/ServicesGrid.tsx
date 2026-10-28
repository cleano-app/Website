"use client";

import Link from "next/link";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { services } from "@/lib/content/services";
import ServiceScene, { type ServiceSceneType } from "./scenes/ServiceScenes";
import { LOOP } from "./scenes/kit";
import FadeIn from "./motion/FadeIn";
import FloatingButterflies from "./motion/FloatingButterflies";

// Our Services, as tiles that clean themselves. Each tile is its service's
// scene, edge to edge, with the name on a frosted label - no box inside a
// box. They wait dirty; when the section scrolls into view they play one
// after another, a wave of cleaning across the grid, then rest clean on a
// green tick so the section is calm once it's done. Pointing at a tile
// (desktop) tilts it toward the pointer, runs a shine across its label and
// plays its clean again. Small, so the scenes run without text labels and
// with soft flags.

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

// Gutters first and biggest; the order the wave runs in.
const order = ["gutter-cleaning", "rooftop-cleaning", "window-cleaning", "pressure-washing", "bin-cleaning", "graffiti-removal"];

// Bento layout on desktop: gutters spans two columns and two rows. On a
// phone all six are equal, two by three.
const span: Record<string, string> = {
  "gutter-cleaning": "sm:col-span-2 sm:row-span-2",
};

// Tile labels are short - the full names truncate on a phone tile.
const tileName: Record<string, string> = {
  "gutter-cleaning": "Gutters",
  "rooftop-cleaning": "Roofs",
  "window-cleaning": "Windows",
  "pressure-washing": "Pressure Washing",
  "bin-cleaning": "Wheelie Bins",
  "graffiti-removal": "Graffiti",
};

const WAVE_STEP = 650; // ms between tiles starting
const RESTS_AT = 0.92; // share of the loop a tile plays before resting clean

type Phase = "wait" | "play" | "rest";

function Tile({ slug, index, go }: { slug: string; index: number; go: boolean }) {
  const service = services.find((s) => s.slug === slug)!;
  const [phase, setPhase] = useState<Phase>("wait");
  const [run, setRun] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Start in the wave once the section is on screen...
  useEffect(() => {
    if (!go || phase !== "wait") return;
    const timer = setTimeout(() => setPhase("play"), index * WAVE_STEP);
    return () => clearTimeout(timer);
  }, [go, phase, index]);

  // ...and rest clean when the clean is done.
  useEffect(() => {
    if (phase !== "play") return;
    const timer = setTimeout(() => setPhase("rest"), LOOP * 1000 * RESTS_AT);
    return () => clearTimeout(timer);
  }, [phase, run]);

  function replay() {
    if (phase !== "rest") return;
    setRun((n) => n + 1);
    setPhase("play");
  }

  function lean(e: PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    setTilt({ x: -py * 8, y: px * 10 });
  }

  return (
    <Link
      href={`/${slug}`}
      aria-label={service.name}
      onPointerEnter={replay}
      onPointerMove={lean}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={`group relative block overflow-hidden rounded-[1.4rem] bg-[#ecfdf5] shadow-md shadow-brand/15 ring-1 ring-black/5 transition-[transform,box-shadow] duration-200 ease-out hover:shadow-2xl hover:shadow-brand/25 ${span[slug] ?? ""}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <ServiceScene
        key={run}
        type={sceneBySlug[slug]}
        className="block h-full w-full"
        tone="soft"
        labels={false}
        play={phase === "play"}
        stillAt={phase === "rest" ? 0.9 : 0.02}
      />
      {/* the frosted label, with a shine that runs across it on hover */}
      <span className="absolute bottom-2.5 left-2.5 flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 overflow-hidden rounded-full bg-white/75 py-1.5 pr-3 pl-3.5 text-[11px] font-bold text-brand-dark shadow-lg ring-1 ring-white/70 backdrop-blur-md sm:bottom-3.5 sm:left-3.5 sm:text-sm">
        <span className="truncate">{tileName[slug]}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-none group-hover:left-[130%] group-hover:opacity-90 group-hover:transition-all group-hover:duration-700" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <FloatingButterflies flock={sectionButterflies} />
      <FadeIn className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">What We Do</p>
        <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Our Services</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">Watch them clean - then tap one to see more.</p>
      </FadeIn>
      <div ref={ref} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {order.map((slug, i) => (
          <Tile key={slug} slug={slug} index={i} go={inView} />
        ))}
      </div>
    </section>
  );
}
