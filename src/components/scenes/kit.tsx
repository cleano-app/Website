"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";

// The site's animation language, from the free inspection page's drone
// scene: a small story on a loop. The problem is flagged in red the moment
// it's found, the work happens, and it ends on a green tick. Every timed
// part of a scene runs on one LOOP-second clock, with times given as a
// share of the loop (0-1), so cues always land together.
//
// Under reduced motion each scene is a single still at STILL_T: the work
// half done, the tool mid-sweep, flags only on what's still to clear.

export const LOOP = 9;

/** The moment a scene freezes on under reduced motion: mid-sweep. */
export const STILL_T = 0.47;

/** A track's value at time t (linear between keyframes). */
export function valueAt(tr: { values: number[]; times: number[] }, t: number): number {
  const { values, times } = tr;
  for (let i = 1; i < times.length; i++) {
    if (t <= times[i]) {
      const span = times[i] - times[i - 1] || 1;
      return values[i - 1] + ((values[i] - values[i - 1]) * (t - times[i - 1])) / span;
    }
  }
  return values[values.length - 1];
}

/** Whether something shown from `from` to `to` is there at the still moment. */
export const shownWhenStill = (from: number, to: number, t: number = STILL_T) => from <= t && t <= to;

const StillContext = createContext(false);
const LoopContext = createContext(LOOP);

/**
 * How a scene looks. "soft" flags (the homepage): a light orange ring and
 * a pale label instead of strong red. labels=false drops the text pills
 * altogether, for scenes shown small. stillAt is the moment a still
 * frame shows - mid-job by default, or the dirty start for a scene that
 * is waiting to play.
 */
type Look = { tone: "bold" | "soft"; labels: boolean; stillAt: number };
const LookContext = createContext<Look>({ tone: "bold", labels: true, stillAt: STILL_T });

function useLook() {
  return useContext(LookContext);
}

/** The moment this scene's still frame shows. */
export function useStillAt() {
  return useContext(LookContext).stillAt;
}

/** This scene's loop length in seconds (LOOP unless the Scene sets one). */
export function useLoopSeconds() {
  return useContext(LoopContext);
}

/** onLoop, on this scene's own clock. */
function useOnLoop() {
  const seconds = useContext(LoopContext);
  return (times: number[], ease: "linear" | "easeInOut" | "easeOut" = "linear") => ({ duration: seconds, repeat: Infinity, ease, times });
}

/** True when the visitor asked for reduced motion - render a still. */
export function useStill() {
  return useContext(StillContext);
}

/** A keyframe track from [time, value] pairs, padded out to 0 and 1. */
export function track<T>(pairs: [number, T][]): { values: T[]; times: number[] } {
  const p = [...pairs];
  if (p[0][0] !== 0) p.unshift([0, p[0][1]]);
  if (p[p.length - 1][0] !== 1) p.push([1, p[p.length - 1][1]]);
  return { values: p.map((x) => x[1]), times: p.map((x) => x[0]) };
}

/** A transition for one property, on the shared loop clock. */
export function onLoop(times: number[], ease: "linear" | "easeInOut" | "easeOut" = "linear") {
  return { duration: LOOP, repeat: Infinity, ease, times };
}

/** A stable, SVG-safe id for gradients and clip paths. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

const RED = "#e53935";
const SOFT_RING = "#fb923c";
const GREEN = "#16a34a";

/**
 * The frame every scene sits in: a rounded mint "sky", soft colour and a
 * strip of ground. Children draw in a 600 x 400 space.
 */
export function Scene({
  label,
  children,
  className = "",
  startAfter = 0,
  loop = LOOP,
  tone = "bold",
  labels = true,
  play = true,
  stillAt = STILL_T,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  /** Milliseconds to hold a still before the loop starts - staggers scenes
   * shown side by side, so a grid of them doesn't move in lockstep. */
  startAfter?: number;
  /** Loop length in seconds - longer for a scene with more to show. */
  loop?: number;
  tone?: "bold" | "soft";
  labels?: boolean;
  /** false holds the still frame until the parent says go. */
  play?: boolean;
  stillAt?: number;
}) {
  // Read after mount, not during render: the server can't know the
  // visitor's setting, so the first client render must match its HTML.
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
  const [started, setStarted] = useState(startAfter === 0);
  useEffect(() => {
    if (startAfter === 0) return;
    const timer = setTimeout(() => setStarted(true), startAfter);
    return () => clearTimeout(timer);
  }, [startAfter]);
  const still = reduced || !started || !play;
  // With reduced motion, always the mid-job still; otherwise the parent's.
  const look = { tone, labels, stillAt: reduced ? STILL_T : stillAt };
  const clip = useSvgId("frame");
  const sky = useSvgId("sky");
  return (
    <LoopContext.Provider value={loop}>
    <LookContext.Provider value={look}>
    <StillContext.Provider value={still}>
      <svg viewBox="0 0 600 400" className={className} role="img" aria-label={label}>
        <defs>
          <clipPath id={clip}>
            <rect width="600" height="400" rx="28" />
          </clipPath>
          <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${clip})`}>
          <rect width="600" height="400" fill={`url(#${sky})`} />
          <circle cx="520" cy="60" r="70" fill="var(--color-brand-light)" opacity="0.25" />
          <circle cx="70" cy="330" r="90" fill="var(--color-brand)" opacity="0.08" />
          <rect y="370" width="600" height="30" fill="var(--color-brand)" opacity="0.18" />
          {children}
        </g>
      </svg>
    </StillContext.Provider>
    </LookContext.Provider>
    </LoopContext.Provider>
  );
}

/** Appears at `from`, holds, and leaves at `to` (shares of the loop). */
export function Cue({ from, to = 0.96, children, rise = 0 }: { from: number; to?: number; children: ReactNode; rise?: number }) {
  const onLoop = useOnLoop();
  const still = useStill();
  const stillAt = useStillAt();
  if (still) return shownWhenStill(from, to, stillAt) ? <g>{children}</g> : null;
  const o = track<number>([[from, 0], [from + 0.03, 1], [to, 1], [Math.min(to + 0.03, 1), 0]]);
  const y = track<number>([[from, rise], [from + 0.03, 0], [to, 0], [Math.min(to + 0.03, 1), rise]]);
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: o.values, y: y.values }} transition={{ opacity: onLoop(o.times), y: onLoop(y.times) }}>
      {children}
    </motion.g>
  );
}

export function Pill({
  x,
  y,
  text,
  fill,
  anchor = "middle",
  icon,
  textFill = "white",
  stroke,
}: {
  x: number;
  y: number;
  text: string;
  fill: string;
  anchor?: "start" | "middle" | "end";
  icon?: ReactNode;
  textFill?: string;
  stroke?: string;
}) {
  const w = text.length * 8.4 + (icon ? 40 : 22);
  const left = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g>
      <rect x={left} y={y} width={w} height={26} rx={8} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.5 : 0} />
      {icon && <g transform={`translate(${left + 9} ${y + 5})`}>{icon}</g>}
      <text
        x={icon ? left + 31 : left + w / 2}
        y={y + 18}
        textAnchor={icon ? "start" : "middle"}
        fontSize="14"
        fontWeight="700"
        fill={textFill}
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {text}
      </text>
    </g>
  );
}

/**
 * A problem, flagged: a white burst, a red ring drawing itself round the
 * spot, and a red label. Shown from `at` until `until` - usually the
 * moment the work reaches it.
 */
export function Flag({
  x,
  y,
  label,
  at,
  until = 0.96,
  r = 24,
  labelY,
  anchor = "middle",
  labelX,
}: {
  x: number;
  y: number;
  label: string;
  at: number;
  until?: number;
  r?: number;
  labelY?: number;
  anchor?: "start" | "middle" | "end";
  labelX?: number;
}) {
  const onLoop = useOnLoop();
  const still = useStill();
  const { tone, labels, stillAt } = useLook();
  if (still && !shownWhenStill(at, until, stillAt)) return null;
  const soft = tone === "soft";
  const ly = labelY ?? y + r + 8;
  const ring = track<number>([[at, 0], [at + 0.06, 1], [until, 1], [Math.min(until + 0.03, 1), 0]]);
  const burstO = track<number>([[at, 0], [at + 0.01, 0.9], [at + 0.09, 0]]);
  const burstS = track<number>([[at, 0.4], [at + 0.01, 0.6], [at + 0.09, 2.4]]);
  return (
    <g>
      {!still && !soft && (
        <motion.circle
          cx={x}
          cy={y}
          r={r * 0.6}
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: burstO.values, scale: burstS.values }}
          transition={{ opacity: onLoop(burstO.times), scale: onLoop(burstS.times) }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      )}
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={soft ? SOFT_RING : RED}
        strokeWidth={soft ? 2.5 : 3.5}
        initial={{ pathLength: still ? 1 : 0, opacity: still ? 1 : 0 }}
        animate={still ? {} : { pathLength: ring.values, opacity: ring.values.map((v) => (v > 0 ? 1 : 0)) }}
        transition={still ? { duration: 0 } : { pathLength: onLoop(ring.times), opacity: onLoop(ring.times) }}
      />
      {labels && (
        <Cue from={at + 0.02} to={until} rise={6}>
          {soft ? (
            <Pill x={labelX ?? x} y={ly} text={label} fill="#fff7ed" stroke="#fdba74" textFill="#c2410c" anchor={anchor} />
          ) : (
            <Pill x={labelX ?? x} y={ly} text={label} fill={RED} anchor={anchor} />
          )}
        </Cue>
      )}
    </g>
  );
}

/** The green tick the story ends on. */
export function Done({ x, y, label, at, anchor = "middle" }: { x: number; y: number; label: string; at: number; anchor?: "start" | "middle" | "end" }) {
  const onLoop = useOnLoop();
  const still = useStill();
  const { tone, labels, stillAt } = useLook();
  const s = track<number>([[at, 0.6], [at + 0.025, 1.08], [at + 0.045, 1], [0.96, 1], [0.99, 0.6]]);
  if (still && !shownWhenStill(at, 0.96, stillAt)) return null;
  const soft = tone === "soft";
  const o = track<number>([[at, 0], [at + 0.02, 1], [0.96, 1], [0.99, 0]]);
  const tick = (
    <g>
      <circle cx="8" cy="8" r="8" fill={soft ? GREEN : "white"} />
      <path d="M4.5 8.3l2.4 2.4 4.7-5" fill="none" stroke={soft ? "white" : GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  return (
    <motion.g
      initial={{ opacity: still ? 1 : 0 }}
      animate={still ? {} : { opacity: o.values, scale: s.values }}
      transition={still ? { duration: 0 } : { opacity: onLoop(o.times), scale: onLoop(s.times) }}
      style={{ transformOrigin: `${x}px ${y + 13}px` }}
    >
      {!labels ? (
        <g transform={`translate(${anchor === "middle" ? x - 13 : anchor === "end" ? x - 26 : x} ${y}) scale(1.6)`}>{tick}</g>
      ) : soft ? (
        <Pill x={x} y={y} text={label} fill="white" stroke="#86efac" textFill="#15803d" anchor={anchor} icon={tick} />
      ) : (
        <Pill x={x} y={y} text={label} fill={GREEN} anchor={anchor} icon={tick} />
      )}
    </motion.g>
  );
}

/** A four-point glint that pops around `at`. */
export function Sparkle({ x, y, at, size = 12 }: { x: number; y: number; at: number; size?: number }) {
  const onLoop = useOnLoop();
  const still = useStill();
  if (still) return null;
  const s = track<number>([[at, 0], [at + 0.03, 1], [at + 0.07, 0]]);
  const d = `M0 ${-size} L${size * 0.25} ${-size * 0.25} L${size} 0 L${size * 0.25} ${size * 0.25} L0 ${size} L${-size * 0.25} ${size * 0.25} L${-size} 0 L${-size * 0.25} ${-size * 0.25} Z`;
  return (
    <motion.path
      d={d}
      transform={`translate(${x} ${y})`}
      fill="white"
      stroke="var(--color-brand-light)"
      strokeWidth={1.5}
      initial={{ scale: 0 }}
      animate={{ scale: s.values, rotate: [0, 45] }}
      transition={{ scale: onLoop(s.times), rotate: { ...onLoop([0, 1]), times: undefined } }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

/**
 * Dirt that the work clears: fades in at the start of the loop, is wiped
 * away left-to-right (or top-to-bottom) as the tool's edge passes between
 * `from` and `to`, stays clean, and resets unseen at the end.
 */
export function Wipe({
  from,
  to,
  start,
  end,
  vertical = false,
  children,
}: {
  from: number;
  to: number;
  /** Where the clean edge begins and ends, in scene units, along the sweep. */
  start: number;
  end: number;
  vertical?: boolean;
  children: ReactNode;
}) {
  const onLoop = useOnLoop();
  const stillAt = useStillAt();
  const still = useStill();
  const id = useSvgId("wipe");
  const edge = track<number>([[from, start], [to, end], [0.97, end], [0.99, start]]);
  const o = track<number>([[0, 0], [0.04, 1], [0.96, 1], [0.97, 0]]);
  const mid = valueAt(edge, stillAt);
  const rect = vertical
    ? { x: 0, width: 600, height: 400 }
    : { y: 0, height: 400, width: 600 };
  return (
    <>
      <defs>
        <clipPath id={id}>
          {vertical ? (
            <motion.rect {...rect} initial={{ y: still ? mid : start }} animate={still ? {} : { y: edge.values }} transition={onLoop(edge.times)} />
          ) : (
            <motion.rect {...rect} initial={{ x: still ? mid : start }} animate={still ? {} : { x: edge.values }} transition={onLoop(edge.times)} />
          )}
        </clipPath>
      </defs>
      <motion.g
        clipPath={`url(#${id})`}
        initial={{ opacity: still ? 1 : 0 }}
        animate={still ? {} : { opacity: o.values }}
        transition={still ? { duration: 0 } : onLoop(o.times)}
      >
        {children}
      </motion.g>
    </>
  );
}

/** Moves its children along [time, x, y] waypoints on the loop clock. */
// A sweep's clean edge (Wipe) moves linearly between its waypoints; give
// the tool doing it ease="linear" too, so the edge stays under the tool.
export function Path({
  points,
  children,
  ease = "easeInOut",
}: {
  points: [number, number, number][];
  children: ReactNode;
  /** "linear" for a steady sweep, so whatever it passes changes on cue. */
  ease?: "linear" | "easeInOut";
}) {
  const onLoop = useOnLoop();
  const stillAt = useStillAt();
  const still = useStill();
  const x = track<number>(points.map(([t, px]) => [t, px] as [number, number]));
  const y = track<number>(points.map(([t, , py]) => [t, py] as [number, number]));
  const stillX = valueAt(x, stillAt);
  const stillY = valueAt(y, stillAt);
  return (
    <motion.g
      initial={{ x: still ? stillX : points[0][1], y: still ? stillY : points[0][2] }}
      animate={still ? {} : { x: x.values, y: y.values }}
      transition={still ? { duration: 0 } : { x: onLoop(x.times, ease), y: onLoop(y.times, ease) }}
    >
      {children}
    </motion.g>
  );
}

/** A spray or jet that runs only while the work is happening. */
export function While({ from, to, children }: { from: number; to: number; children: ReactNode }) {
  const onLoop = useOnLoop();
  const stillAt = useStillAt();
  const still = useStill();
  if (still) return shownWhenStill(from, to, stillAt) ? <g>{children}</g> : null;
  const o = track<number>([[from - 0.01, 0], [from, 1], [to, 1], [to + 0.01, 0]]);
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: o.values }} transition={onLoop(o.times)}>
      <motion.g animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 0.35, repeat: Infinity }}>
        {children}
      </motion.g>
    </motion.g>
  );
}

/** Water drops that fall from (x, y) down `fall` units, on repeat. */
export function Drips({ x, y, fall, from = 0, to = 1, colour = "#38bdf8" }: { x: number; y: number; fall: number; from?: number; to?: number; colour?: string }) {
  const still = useStill();
  return (
    <While from={from} to={to}>
      {[0, 0.4, 0.8].map((delay) => (
        <motion.circle
          key={delay}
          cx={x}
          r={3.2}
          fill={colour}
          initial={{ cy: still ? y + fall / 2 : y, opacity: still ? 0.8 : 0 }}
          animate={still ? {} : { cy: [y, y + fall], opacity: [0, 0.9, 0] }}
          transition={still ? { duration: 0 } : { duration: 1.2, repeat: Infinity, ease: "easeIn", delay }}
        />
      ))}
    </While>
  );
}

const LEAF = ["#a16207", "#854d0e", "#ca8a04", "#78350f"];

/** A clump of fallen leaves centred on (x, y). */
export function Leaves({ x, y, n = 5 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const lx = x - (n - 1) * 3 + i * 6;
        const ly = y - (i % 2) * 3;
        return <ellipse key={i} cx={lx} cy={ly} rx={5.5} ry={3} fill={LEAF[i % LEAF.length]} transform={`rotate(${((i * 37) % 60) - 30} ${lx} ${ly})`} />;
      })}
    </g>
  );
}

export const DARK = "var(--color-brand-dark)";
export const WATER = "#38bdf8";
