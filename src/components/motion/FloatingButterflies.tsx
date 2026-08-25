"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Butterfly = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  xDrift: number[];
  yDrift: number[];
  rotate: number[];
  opacity?: number;
};

// Fixed (not random) flight paths so server/client render match exactly -
// each butterfly loops a loose, organic drift + wing-tilt wobble forever.
//
// Kept to the very top/bottom corners on purpose: on mobile a section's
// text spans close to the full width, so any mid-height position risks
// drifting across a headline or paragraph. The top/bottom padding bands
// (before the first line of text, after the last) stay clear regardless
// of how tall the section's copy runs.
const DEFAULT_FLOCK: Butterfly[] = [
  { top: "1%", left: "3%", size: 22, duration: 9, delay: 0, xDrift: [0, 10, -4, 0], yDrift: [0, -6, 4, 0], rotate: [-8, 10, -4, -8] },
  { top: "2%", left: "91%", size: 18, duration: 10, delay: 0.6, xDrift: [0, -8, 4, 0], yDrift: [0, 6, -4, 0], rotate: [10, -6, 8, 10] },
  { top: "95%", left: "6%", size: 16, duration: 11, delay: 1.2, xDrift: [0, 8, -4, 0], yDrift: [0, -6, 4, 0], rotate: [6, -10, 12, 6], opacity: 0.6 },
  { top: "96%", left: "90%", size: 18, duration: 8, delay: 2, xDrift: [0, -8, 6, 0], yDrift: [0, -6, 4, 0], rotate: [-6, 12, -10, -6], opacity: 0.55 },
];

// Global multipliers applied to every flock (rather than hand-tuning every
// individual flock definition across the site) so butterflies read as
// bigger, slower and more languid everywhere at once - bump these instead
// of touching per-page numbers.
const SIZE_SCALE = 1.6;
const DURATION_SCALE = 1.9;
const DRIFT_SCALE = 1.5;

/** Decorative flying-butterfly accents using the real logo icon, looping a
 * gentle organic flight path forever. Purely decorative - aria-hidden. */
export default function FloatingButterflies({
  flock = DEFAULT_FLOCK,
  className = "",
}: {
  flock?: Butterfly[];
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {flock.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: b.top, left: b.left, opacity: b.opacity ?? 0.85 }}
          animate={{
            x: b.xDrift.map((v) => v * DRIFT_SCALE),
            y: b.yDrift.map((v) => v * DRIFT_SCALE),
            rotate: b.rotate,
          }}
          transition={{ duration: b.duration * DURATION_SCALE, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand/cleano-icon.png"
            alt=""
            width={b.size * SIZE_SCALE}
            height={b.size * SIZE_SCALE}
            className="drop-shadow-sm"
          />
        </motion.div>
      ))}
    </div>
  );
}
