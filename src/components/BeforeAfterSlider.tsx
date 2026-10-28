"use client";

import Image from "next/image";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Before & after on real job photos: one compact slider, with chips to
// switch between jobs, rather than three full-size sliders stacked down
// the page. Built to be obviously something you drag (the owner: it should
// read as a game): the handle is a labelled "Drag" pill that pulses, and
// whenever the slider comes into view untouched, the line sweeps across on
// its own to show what it does. The first touch stops the demo for good.

export interface BeforeAfterJob {
  label: string;
  before: string;
  after: string;
}

function Slider({ job }: { job: BeforeAfterJob }) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { amount: 0.6 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    return () => cancelAnimationFrame(frame);
  }, []);

  // The demo sweep: now, and again every few seconds, until touched.
  useEffect(() => {
    if (!inView || touched || reduced) return;
    let sweep: ReturnType<typeof animate> | undefined;
    const run = () => {
      sweep = animate(50, [50, 18, 82, 50], { duration: 2.8, ease: "easeInOut", onUpdate: setPosition });
    };
    const first = setTimeout(run, 500);
    const again = setInterval(run, 7000);
    return () => {
      clearTimeout(first);
      clearInterval(again);
      sweep?.stop();
    };
  }, [inView, touched, reduced]);

  function moveTo(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }

  return (
    <div
      ref={trackRef}
      className="relative aspect-[3/2] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl shadow-xl shadow-brand/15 ring-1 ring-black/5 select-none"
      onPointerDown={(e) => {
        setTouched(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        moveTo(e.clientX);
      }}
    >
      {/* after, underneath */}
      <Image src={job.after} alt={`${job.label} - after`} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
      <span className="absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow">After</span>

      {/* before, clipped to the left of the line */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={job.before} alt={`${job.label} - before`} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
        <span className="absolute top-3 left-3 rounded-full bg-stone-700 px-3 py-1 text-xs font-bold text-white shadow">Before</span>
      </div>

      {/* the line and its handle */}
      <div className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {!touched && !reduced && <span className="absolute inset-0 rounded-full bg-white/70 motion-safe:animate-ping" aria-hidden="true" />}
          <span className="relative flex h-11 items-center gap-1 rounded-full bg-white px-3 text-xs font-extrabold text-brand-dark shadow-lg ring-2 ring-brand/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Drag
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        onChange={(e) => {
          setTouched(true);
          setPosition(Number(e.target.value));
        }}
        className="absolute inset-x-0 bottom-2 mx-auto w-3/4 opacity-0 focus:opacity-100"
        aria-label={`Before and after: ${job.label}`}
      />
    </div>
  );
}

export default function BeforeAfter({ jobs }: { jobs: BeforeAfterJob[] }) {
  const [index, setIndex] = useState(0);
  const job = jobs[index];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand" aria-hidden="true">
            <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-.5V4.5a1.5 1.5 0 0 1 3 0V10m0-.5V6a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 13.5a1.6 1.6 0 0 1 2.6-1.8L8 14" />
          </svg>
          Drag the line to compare
        </p>
        {jobs.length > 1 && (
          <div className="flex gap-1.5" role="tablist" aria-label="Jobs">
            {jobs.map((j, i) => (
              <button
                key={j.before}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${i === index ? "bg-brand-dark text-white" : "bg-white text-foreground/60 ring-1 ring-black/10 hover:text-foreground"}`}
              >
                {j.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* keyed: a new job starts centred, with its own demo sweep */}
      <Slider key={job.before} job={job} />
    </div>
  );
}
