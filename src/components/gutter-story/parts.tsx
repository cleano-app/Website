"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Shared pieces for the gutter page's story animation. Everything here is
// one-shot: a chapter mounts, its parts play on their delays, and the next
// chapter replaces it. Coordinates are in each drawing's own viewBox.

export const DARK = "#0f5d46";
export const BRAND = "#26ad7d";
export const WATER = "#38bdf8";
export const SANS = "var(--font-sans), system-ui, sans-serif";
// Problems are marked in a warm yellow here - lighter than the red the
// service scenes use, as in the owner's reference video.
export const MARK = "#facc15";
export const MARK_INK = "#713f12";

export function Appear({ at, children, rise = 10, dur = 0.4 }: { at: number; children: ReactNode; rise?: number; dur?: number }) {
  return (
    <motion.g initial={{ opacity: 0, y: rise }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: dur, ease: "easeOut" }}>
      {children}
    </motion.g>
  );
}

/** A ring drawing itself round a problem, then its label popping in. */
export function Mark({ x, y, r = 34, label, at, labelY, size = 28 }: { x: number; y: number; r?: number; label: string; at: number; labelY?: number; size?: number }) {
  const w = label.length * size * 0.56 + 36;
  const ly = labelY ?? y + r + 14;
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={MARK}
        strokeWidth={5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: at, duration: 0.55, ease: "easeInOut" }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: at + 0.35, type: "spring", stiffness: 320, damping: 18 }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <rect x={x - w / 2} y={ly} width={w} height={size * 1.6} rx={size * 0.8} fill={MARK} />
        <text x={x} y={ly + size * 1.12} textAnchor="middle" fontSize={size} fontWeight="800" fill={MARK_INK} fontFamily={SANS}>
          {label}
        </text>
      </motion.g>
    </g>
  );
}

/** A plain label pill (no ring). */
export function Tag({ x, y, text, at, fill = MARK, ink = MARK_INK, size = 26, anchor = "middle" }: { x: number; y: number; text: string; at: number; fill?: string; ink?: string; size?: number; anchor?: "start" | "middle" }) {
  const w = text.length * size * 0.56 + 36;
  const left = anchor === "middle" ? x - w / 2 : x;
  return (
    <Appear at={at} rise={8}>
      <rect x={left} y={y} width={w} height={size * 1.6} rx={size * 0.8} fill={fill} />
      <text x={left + w / 2} y={y + size * 1.12} textAnchor="middle" fontSize={size} fontWeight="800" fill={ink} fontFamily={SANS}>
        {text}
      </text>
    </Appear>
  );
}

/** The Cleano drone: spinning rotors, a gentle bob, an optional camera beam. */
export function Drone({ beam = 0, scale = 1 }: { beam?: number; scale?: number }) {
  return (
    <g transform={`scale(${scale})`}>
      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
        {beam > 0 && (
          <motion.path
            d={`M-8 14 L8 14 L${beam * 0.45} ${beam} L${-beam * 0.45} ${beam} Z`}
            fill="#fde68a"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
        <path d="M-40 0 H40" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        {[-40, 40].map((x) => (
          <g key={x}>
            <path d={`M${x} 0 v-8`} stroke="#1f2937" strokeWidth="4" />
            <motion.ellipse cx={x} cy={-10} rx={20} ry={3.5} fill="#1f2937" opacity={0.55} animate={{ scaleX: [1, 0.2, 1] }} transition={{ duration: 0.14, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${x}px -10px` }} />
          </g>
        ))}
        <rect x="-22" y="-11" width="44" height="22" rx="10" fill="#1f2937" />
        <path d="M-9 -4 q4 -6 9 0 q5 -6 9 0 l-4 8 q-5 3 -10 0 Z" fill="#33e6a6" />
        <circle cx="0" cy="15" r="6" fill="#111827" />
        <circle cx="0" cy="15" r="2.4" fill="#33e6a6" />
      </motion.g>
    </g>
  );
}

const LEAF = ["#65a30d", "#4d7c0f", "#a16207", "#84cc16", "#78350f"];

/** Moss and leaf clumps along a run, seeded so it draws the same every time. */
export function Debris({ x0, x1, y, density = 1, size = 1 }: { x0: number; x1: number; y: number; density?: number; size?: number }) {
  const n = Math.round(((x1 - x0) / 22) * density);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + ((x1 - x0) * (i + 0.5)) / n + (((i * 37) % 13) - 6);
        const yy = y - ((i * 17) % 9);
        return <ellipse key={i} cx={x} cy={yy} rx={12 * size} ry={6 * size} fill={LEAF[i % LEAF.length]} transform={`rotate(${((i * 53) % 70) - 35} ${x} ${yy})`} />;
      })}
    </g>
  );
}

/** Roof tiles filling a rectangle. */
export function Tiles({ x, y, w, h, colour = "#7c6a5d", line = "#5b4b40", tile = 40, row = 26 }: { x: number; y: number; w: number; h: number; colour?: string; line?: string; tile?: number; row?: number }) {
  const rows = Math.ceil(h / row);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={colour} />
      {Array.from({ length: rows }, (_, r) => (
        <g key={r} stroke={line} strokeWidth="2">
          <path d={`M${x} ${y + r * row} H${x + w}`} />
          {Array.from({ length: Math.ceil(w / tile) + 1 }, (_, c) => {
            const cx = x + c * tile - (r % 2) * (tile / 2);
            return cx > x && cx < x + w ? <path key={c} d={`M${cx} ${y + r * row} v${row}`} strokeOpacity="0.7" /> : null;
          })}
        </g>
      ))}
    </g>
  );
}

/** A camera shutter flash over a w x h area at `at`. */
export function Flash({ w, h, at }: { w: number; h: number; at: number }) {
  return (
    <motion.rect width={w} height={h} fill="white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.85, 0] }} transition={{ delay: at, duration: 0.45, times: [0, 0.15, 1] }} />
  );
}

/** Falling rain over a w x h area, on repeat. */
export function Rain({ w, h, from = 0 }: { w: number; h: number; from?: number }) {
  const drops = Array.from({ length: 60 }, (_, i) => ({ x: (i * 97) % w, d: ((i * 13) % 10) / 10 }));
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: from, duration: 0.6 }}>
      {drops.map((drop, i) => (
        <motion.path
          key={i}
          d={`M${drop.x} 0 l-8 46`}
          stroke="#dbeafe"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ y: -40 }}
          animate={{ y: h + 40 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: from + drop.d * 0.9 }}
        />
      ))}
    </motion.g>
  );
}
