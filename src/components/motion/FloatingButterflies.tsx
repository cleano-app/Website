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
const DEFAULT_FLOCK: Butterfly[] = [
  { top: "12%", left: "6%", size: 28, duration: 9, delay: 0, xDrift: [0, 14, -6, 0], yDrift: [0, -16, -4, 0], rotate: [-8, 10, -4, -8] },
  { top: "62%", left: "10%", size: 20, duration: 11, delay: 1.2, xDrift: [0, -12, 8, 0], yDrift: [0, 14, -10, 0], rotate: [6, -10, 12, 6], opacity: 0.7 },
  { top: "20%", left: "88%", size: 24, duration: 10, delay: 0.6, xDrift: [0, -16, 6, 0], yDrift: [0, 12, -14, 0], rotate: [10, -6, 8, 10] },
  { top: "75%", left: "84%", size: 18, duration: 8, delay: 2, xDrift: [0, 10, -14, 0], yDrift: [0, -10, 8, 0], rotate: [-6, 12, -10, -6], opacity: 0.6 },
  { top: "42%", left: "48%", size: 16, duration: 12, delay: 0.4, xDrift: [0, 18, -8, 0], yDrift: [0, -8, 10, 0], rotate: [8, -12, 6, 8], opacity: 0.5 },
];

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
          animate={{ x: b.xDrift, y: b.yDrift, rotate: b.rotate }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand/cleano-icon.png"
            alt=""
            width={b.size}
            height={b.size}
            className="drop-shadow-sm"
          />
        </motion.div>
      ))}
    </div>
  );
}
