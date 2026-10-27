"use client";

import { motion, useReducedMotion } from "framer-motion";

// Small loops for the three things the inspection checks. Each shows the
// fault happening, not the fix: leaves landing in the gutter, an outlet
// choking so the water backs up, a downpipe blocked so the water never
// comes out at the bottom.

type Kind = "gutter" | "outlet" | "downpipe";

const DARK = "var(--color-brand-dark)";
const WATER = "#38bdf8";
const LEAF = ["#a16207", "#854d0e", "#ca8a04"];

export default function CheckScene({ kind, className = "" }: { kind: Kind; className?: string }) {
  const still = useReducedMotion() ?? false;
  const loop = (duration: number, delay = 0) =>
    still ? { duration: 0 } : { duration, delay, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden="true">
      <rect width="160" height="110" rx="16" fill="#ecfdf5" />

      {kind === "gutter" && (
        <>
          {/* gutter in section, filling with leaves */}
          <path d="M30 58 v20 a12 12 0 0 0 12 12 h76 a12 12 0 0 0 12 -12 v-20" fill="white" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
          <path d="M40 84 h80" stroke="#78350f" strokeOpacity="0.35" strokeWidth="8" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx={56 + i * 24}
              rx={8}
              ry={4}
              fill={LEAF[i]}
              initial={{ cy: still ? 78 : 6, rotate: 0, opacity: 1 }}
              animate={still ? {} : { cy: [6, 78, 78], rotate: [0, 160, 200], opacity: [0, 1, 0] }}
              transition={still ? { duration: 0 } : { ...loop(2.6, i * 0.8), times: [0, 0.6, 1] }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </>
      )}

      {kind === "outlet" && (
        <>
          {/* gutter from above: water running to an outlet that's choked */}
          <rect x="14" y="40" width="132" height="30" rx="8" fill="white" stroke={DARK} strokeWidth="4" />
          <motion.rect
            x="20"
            y="46"
            height="18"
            rx="5"
            fill={WATER}
            fillOpacity="0.55"
            initial={{ width: still ? 98 : 30 }}
            animate={still ? {} : { width: [30, 98, 98, 30] }}
            transition={still ? { duration: 0 } : { ...loop(4), times: [0, 0.55, 0.85, 1] }}
          />
          <circle cx="126" cy="55" r="11" fill={DARK} />
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={119 + (i % 2) * 12} cy={50 + Math.floor(i / 2) * 10} rx="7" ry="3.5" fill={LEAF[i % 3]} transform={`rotate(${i * 45} ${119 + (i % 2) * 12} ${50 + Math.floor(i / 2) * 10})`} />
          ))}
          <motion.circle
            cx="126"
            cy="55"
            r="17"
            fill="none"
            stroke="#e53935"
            strokeWidth="3"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={still ? {} : { pathLength: [0, 0, 1, 1, 0] }}
            transition={still ? { duration: 0 } : { ...loop(4), times: [0, 0.5, 0.62, 0.9, 1] }}
          />
          <motion.text
            x="80"
            y="96"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#e53935"
            initial={{ opacity: still ? 1 : 0 }}
            animate={still ? {} : { opacity: [0, 0, 1, 1, 0] }}
            transition={still ? { duration: 0 } : { ...loop(4), times: [0, 0.55, 0.65, 0.9, 1] }}
          >
            Water can&apos;t drain
          </motion.text>
        </>
      )}

      {kind === "downpipe" && (
        <>
          {/* a downpipe blocked part-way: drops stop at the clog */}
          <path d="M40 16 h52" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
          <rect x="58" y="16" width="20" height="78" fill="white" stroke={DARK} strokeWidth="4" />
          <path d="M58 94 h30" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={63 + i * 5} cy={56 + (i % 2) * 4} rx="6" ry="3.5" fill={LEAF[i]} transform={`rotate(${i * 50} ${63 + i * 5} ${56 + (i % 2) * 4})`} />
          ))}
          {[0, 0.6, 1.2].map((delay) => (
            <motion.circle
              key={delay}
              cx="68"
              r="3"
              fill={WATER}
              initial={{ cy: still ? 40 : 20, opacity: 0.9 }}
              animate={still ? {} : { cy: [20, 48, 48], opacity: [0.9, 0.9, 0] }}
              transition={still ? { duration: 0 } : { ...loop(1.8, delay), times: [0, 0.7, 1], ease: "easeIn" }}
            />
          ))}
          <motion.circle
            cx="68"
            cy="58"
            r="15"
            fill="none"
            stroke="#e53935"
            strokeWidth="3"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={still ? {} : { pathLength: [0, 1, 1, 0] }}
            transition={still ? { duration: 0 } : { ...loop(3.6), times: [0, 0.25, 0.85, 1] }}
          />
          <text x="98" y="98" fontSize="11" fontWeight="700" fill={DARK} opacity="0.55">
            nothing out
          </text>
        </>
      )}
    </svg>
  );
}
