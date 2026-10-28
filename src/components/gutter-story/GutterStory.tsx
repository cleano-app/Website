"use client";

import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ClearChapter, EndChapter, InspectChapter, IntroChapter, ReportChapter } from "./chapters";
import { AfterPhotosChapter, DampChapter, DownpipeChapter, FasciaChapter, FlowTestChapter, FoundationsChapter, OutletChapter, RoofLeakChapter, WallsChapter } from "./chapters2";

// The gutter page's story, after the owner's 48s giveaway video - with the
// giveaway, the free check and the Stamford Hill limit taken out, because
// this page sells gutter cleaning anywhere, any time - and a chapter added
// for the clean itself; then made longer (about 95s) with five chapters
// on the damage and five on how the clean is done. Landscape, to sit the
// width of the page. It plays chapter by chapter on its own while it's
// on screen (and restarts the chapter it was on when it comes back), with
// buttons to jump between groups and a pause button. With reduced motion
// it waits to be stepped through.

// Chapters, in the groups the player's buttons jump between.
const chapters = [
  { key: "intro", group: "Drone check", title: "We check your gutters - by drone", sub: "No ladders against your walls, and no need to be home.", ms: 5000, C: IntroChapter },
  { key: "photos", group: "Photos", title: "Every problem, photographed", sub: "Every photo goes into your report.", ms: 15200, C: InspectChapter },
  { key: "walls", group: "The damage", title: "Blocked gutters overflow", sub: "Rain runs down your walls instead of down the pipe.", ms: 7600, C: WallsChapter },
  { key: "damp", group: "The damage", title: "Damp and mould inside", sub: "Wet walls let damp through - and mould follows.", ms: 7600, C: DampChapter },
  { key: "fascia", group: "The damage", title: "Rotting fascias, falling gutters", sub: "Sitting water rots the boards your gutters hang from.", ms: 7600, C: FasciaChapter },
  { key: "foundations", group: "The damage", title: "Water at your foundations", sub: "A blocked downpipe empties at the base of the wall.", ms: 7600, C: FoundationsChapter },
  { key: "roof", group: "The damage", title: "Leaks through the roof", sub: "Catch it early - before it costs you.", ms: 7600, C: RoofLeakChapter },
  { key: "clear", group: "How we clean", title: "We clear the gutters", sub: "A gutter vacuum on a long pole, from the ground.", ms: 6200, C: ClearChapter },
  { key: "outlets", group: "How we clean", title: "Then the outlets", sub: "Every outlet cleared, so water can leave the gutter.", ms: 5600, C: OutletChapter },
  { key: "downpipes", group: "How we clean", title: "And the downpipes", sub: "Flushed through until they run clear.", ms: 6200, C: DownpipeChapter },
  { key: "flow", group: "How we clean", title: "Then we test it", sub: "Water through the whole run - no blockages, no leaks.", ms: 6400, C: FlowTestChapter },
  { key: "after", group: "How we clean", title: "And photograph it again", sub: "After photos, to match the before.", ms: 5600, C: AfterPhotosChapter },
  { key: "report", group: "Your report", title: "Your report, straight to your inbox", sub: "Before and after photos, and what we found.", ms: 6600, C: ReportChapter },
  { key: "end", group: null, title: "", sub: "", ms: 3800, C: EndChapter },
] as const;

type Group = NonNullable<(typeof chapters)[number]["group"]>;
const groups = chapters.reduce<Group[]>((list, c) => (c.group && !list.includes(c.group) ? [...list, c.group] : list), []);

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
  // Progress through the current group: the fill runs from where this
  // chapter starts in its group to where it ends.
  const inGroup = chapters.filter((c) => c.group === ch.group);
  const groupMs = inGroup.reduce((t, c) => t + c.ms, 0);
  const before = inGroup.slice(0, inGroup.findIndex((c) => c.key === ch.key)).reduce((t, c) => t + c.ms, 0);
  const fillFrom = `${(before / groupMs) * 100}%`;
  const fillTo = `${((before + ch.ms) / groupMs) * 100}%`;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-5 sm:px-6">
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
            <svg viewBox="0 0 960 540" className="absolute inset-0 h-full w-full" role="img" aria-label={`Animation, ${ch.group ?? "Cleano"}: ${ch.title || "Cleano, www.cleano.services, 020 3370 4040"}`}>
              <AnimatePresence mode="wait">
                <motion.g key={`${ch.key}-${take}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <Chapter />
                </motion.g>
              </AnimatePresence>
            </svg>
          </div>

          {/* chapters, progress, pause */}
          <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:px-5">
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
            {groups.map((group) => {
              const current = group === ch.group;
              const first = chapters.findIndex((c) => c.group === group);
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => jump(first)}
                  aria-current={current}
                  className={`relative shrink-0 overflow-hidden rounded-full px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:text-sm ${current ? "bg-brand/15 text-brand-dark" : "bg-muted-bg text-foreground/55 hover:text-foreground"}`}
                >
                  {current && active && !reduced && (
                    <motion.span
                      key={`${ch.key}-${take}`}
                      className="absolute inset-y-0 left-0 bg-brand/20"
                      initial={{ width: fillFrom }}
                      animate={{ width: fillTo }}
                      transition={{ duration: ch.ms / 1000, ease: "linear" }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{group}</span>
                </button>
              );
            })}
          </div>
        </div>
      </MotionConfig>

    </section>
  );
}
