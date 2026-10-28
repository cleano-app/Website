"use client";

import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { whatsappHref } from "@/lib/siteConfig";
import { CausesChapter, ClearChapter, EndChapter, InspectChapter, IntroChapter, ReportChapter } from "./chapters";

// The gutter page's story, after the owner's 48s giveaway video - with the
// giveaway, the free check and the Stamford Hill limit taken out, because
// this page sells gutter cleaning anywhere, any time - and a chapter added
// for the clean itself. Landscape, to sit the width of the page. It plays
// chapter by chapter on its own while it's on screen (and restarts the
// chapter it was on when it comes back), with chapter buttons to jump and
// a pause button. With reduced motion it waits to be stepped through.

const chapters = [
  { key: "intro", nav: "Drone check", title: "We check your gutters - by drone", sub: "No ladders against your walls, and no need to be home.", ms: 5000, C: IntroChapter },
  { key: "photos", nav: "Photos", title: "Every problem, photographed", sub: "Every photo goes into your report.", ms: 15200, C: InspectChapter },
  { key: "causes", nav: "Why it matters", title: "What blocked gutters cause", sub: "Catch it early - before it costs you.", ms: 10500, C: CausesChapter },
  { key: "clear", nav: "We clear it", title: "Then we clear it", sub: "Gutters, outlets and downpipes, cleared and running.", ms: 6200, C: ClearChapter },
  { key: "report", nav: "Your report", title: "Your report, straight to your inbox", sub: "Before and after photos, and what we found.", ms: 6600, C: ReportChapter },
  { key: "end", nav: null, title: "", sub: "", ms: 3800, C: EndChapter },
] as const;

export default function GutterStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = requestAnimationFrame(() => {
      setReduced(query.matches);
      if (query.matches) setPlaying(false);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = playing && inView;
  // Part of the chapter's key: coming back on screen remounts - restarts -
  // the chapter, so it's never picked up half-way.
  const take = `${run}-${inView ? "on" : "off"}`;
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % chapters.length);
      setRun((n) => n + 1);
    }, chapters[index].ms);
    return () => clearTimeout(timer);
  }, [active, index, run]);

  function jump(i: number) {
    setIndex(i);
    setRun((n) => n + 1);
  }

  const ch = chapters[index];
  const Chapter = ch.C;

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <MotionConfig reducedMotion="user">
        <div ref={ref} className="overflow-hidden rounded-[1.6rem] bg-white shadow-2xl shadow-brand/15 ring-1 ring-black/5">
          {/* title for the chapter showing */}
          <div className="flex min-h-[5.5rem] items-center px-5 py-4 sm:min-h-[6.5rem] sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div key={ch.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                {ch.title ? (
                  <>
                    <h2 className="text-xl leading-tight font-bold text-foreground sm:text-3xl">{ch.title}</h2>
                    <p className="mt-1 text-sm text-foreground/65 sm:text-base">{ch.sub}</p>
                  </>
                ) : (
                  <h2 className="text-xl leading-tight font-bold text-foreground sm:text-3xl">Book your gutter clean</h2>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* the animation */}
          <div className="relative aspect-video bg-[#e8eef2]">
            <svg viewBox="0 0 960 540" className="absolute inset-0 h-full w-full" role="img" aria-label={`Animation, ${ch.nav ?? "Cleano"}: ${ch.title || "Cleano, www.cleano.services, 020 3370 4040"}`}>
              <AnimatePresence mode="wait">
                <motion.g key={`${ch.key}-${take}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <Chapter />
                </motion.g>
              </AnimatePresence>
            </svg>
          </div>

          {/* chapters, progress, pause */}
          <div className="flex items-center gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] sm:px-5">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
              )}
            </button>
            {chapters.map((c, i) =>
              c.nav ? (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={i === index}
                  className={`relative shrink-0 overflow-hidden rounded-full px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-sm ${i === index ? "bg-brand/15 text-brand-dark" : "bg-muted-bg text-foreground/55 hover:text-foreground"}`}
                >
                  {i === index && active && !reduced && (
                    <motion.span
                      key={`${c.key}-${take}`}
                      className="absolute inset-y-0 left-0 bg-brand/20"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: c.ms / 1000, ease: "linear" }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{c.nav}</span>
                </button>
              ) : null,
            )}
          </div>
        </div>
      </MotionConfig>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="#quote" className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand/25 transition-transform hover:-translate-y-0.5">
          Get a quote
        </Link>
        <a
          href={whatsappHref("Hi Cleano, I'd like a quote for gutter cleaning.", "/gutter-cleaning")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-brand/40 bg-white px-6 py-3 text-sm font-bold text-brand-dark transition-transform hover:-translate-y-0.5"
        >
          WhatsApp us
        </a>
      </div>
    </section>
  );
}
