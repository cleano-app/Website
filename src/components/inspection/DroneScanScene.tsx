"use client";

import { motion, useReducedMotion } from "framer-motion";

// The free gutter inspection, as a loop: a drone flies along the front
// gutter, its camera beam sweeping the run, and each problem is flagged
// the moment it passes over - the way the report flags them. One cycle is
// LOOP seconds; every timed part below runs on that same clock, so the
// flags always land as the drone reaches them. With reduced motion it is a
// still: drone mid-run, every flag shown.

const LOOP = 9;
const START = -70; // drone x at the start of a run (off the left edge)
const END = 670; //   ...and at the end (off the right edge)
const FLY = 0.85; //  share of the loop spent crossing; the rest is a pause

/** When, as a share of the loop, the drone is over x. */
const over = (x: number) => (FLY * (x - START)) / (END - START);

// labelY: the outlet's label sits a row lower, or it would run into
// "Overflowing" at narrow label widths.
const flags = [
  { x: 172, label: "Leaves", anchor: "middle" as const, labelY: 220 },
  { x: 330, label: "Overflowing", anchor: "middle" as const, labelY: 220 },
  { x: 480, label: "Outlet blocked", anchor: "end" as const, labelY: 306 },
];

const leafColours = ["#a16207", "#854d0e", "#ca8a04", "#78350f"];

function LeafClump({ x, n = 5 }: { x: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <ellipse
          key={i}
          cx={x - 12 + i * 6}
          cy={186 - (i % 2) * 3}
          rx={5.5}
          ry={3}
          fill={leafColours[i % leafColours.length]}
          transform={`rotate(${(i * 37) % 60 - 30} ${x - 12 + i * 6} ${186 - (i % 2) * 3})`}
        />
      ))}
    </g>
  );
}

export default function DroneScanScene({ className = "" }: { className?: string }) {
  const still = useReducedMotion() ?? false;
  const loop = { duration: LOOP, repeat: Infinity, ease: "linear" as const };

  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      role="img"
      aria-label="Animation: a drone flies along a house's gutter, scanning it, and flags leaves, an overflowing section and a blocked outlet"
    >
      <defs>
        <clipPath id="dss-frame">
          <rect width="600" height="400" rx="28" />
        </clipPath>
        <linearGradient id="dss-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="dss-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-brand-light)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g clipPath="url(#dss-frame)">
        <rect width="600" height="400" fill="url(#dss-sky)" />
        <circle cx="520" cy="60" r="70" fill="var(--color-brand-light)" opacity="0.25" />
        <circle cx="70" cy="330" r="90" fill="var(--color-brand)" opacity="0.08" />
        <rect y="370" width="600" height="30" fill="var(--color-brand)" opacity="0.18" />

        {/* house */}
        <path d="M84 194 L300 78 L516 194 Z" fill="var(--color-brand-dark)" />
        {[120, 150, 176].map((y) => (
          <path key={y} d={`M${300 - (y - 78) * 1.86} ${y} H${300 + (y - 78) * 1.86}`} stroke="white" strokeOpacity="0.12" strokeWidth="2" />
        ))}
        <rect x="112" y="196" width="376" height="176" fill="white" stroke="var(--color-brand-dark)" strokeWidth="3" />
        <rect x="150" y="240" width="70" height="56" rx="4" fill="#bfe8f5" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <path d="M185 240v56M150 268h70" stroke="var(--color-brand-dark)" strokeWidth="2" />
        <rect x="380" y="240" width="70" height="56" rx="4" fill="#bfe8f5" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <path d="M415 240v56M380 268h70" stroke="var(--color-brand-dark)" strokeWidth="2" />
        <rect x="270" y="286" width="60" height="86" rx="4" fill="var(--color-brand)" stroke="var(--color-brand-dark)" strokeWidth="2.5" />

        {/* downpipe */}
        <rect x="474" y="198" width="12" height="164" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <path d="M474 362 h22 v10 h-22 z" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" />

        {/* gutter, and what's in it */}
        <rect x="80" y="188" width="420" height="13" rx="4" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <LeafClump x={172} />
        <LeafClump x={330} n={7} />
        <LeafClump x={482} n={4} />

        {/* overflow, dripping down the wall where the gutter is full */}
        {[0, 0.45, 0.9].map((delay) => (
          <motion.circle
            key={delay}
            cx={330}
            r={3.2}
            fill="#38bdf8"
            initial={{ cy: 204, opacity: 0 }}
            animate={still ? { cy: 230, opacity: 0.8 } : { cy: [204, 300], opacity: [0, 0.9, 0] }}
            transition={still ? { duration: 0 } : { duration: 1.35, repeat: Infinity, ease: "easeIn", delay }}
          />
        ))}

        {/* flags: ring, burst and label, each on cue as the drone passes */}
        {flags.map((flag) => {
          const t = over(flag.x);
          const times = [0, t, t + 0.04, 0.95, 1];
          const labelW = flag.label.length * 8.6 + 22;
          const labelX = flag.anchor === "end" ? flag.x + 14 - labelW : flag.x - labelW / 2;
          return (
            <g key={flag.x}>
              <motion.circle
                cx={flag.x}
                cy={190}
                r={14}
                fill="white"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={still ? { opacity: 0 } : { opacity: [0, 0, 0.9, 0, 0], scale: [0.4, 0.4, 0.6, 2.6, 2.6] }}
                transition={still ? { duration: 0 } : { ...loop, times: [0, t, t + 0.01, t + 0.09, 1] }}
                style={{ transformOrigin: `${flag.x}px 190px` }}
              />
              <motion.circle
                cx={flag.x}
                cy={190}
                r={24}
                fill="none"
                stroke="#e53935"
                strokeWidth={3.5}
                initial={{ pathLength: still ? 1 : 0, opacity: still ? 1 : 0 }}
                animate={still ? {} : { pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                transition={still ? { duration: 0 } : { ...loop, times: [0, t, t + 0.06, 0.95, 1] }}
              />
              <motion.g
                initial={{ opacity: still ? 1 : 0, y: still ? 0 : 6 }}
                animate={still ? {} : { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] }}
                transition={still ? { duration: 0 } : { ...loop, times }}
              >
                {flag.labelY > 250 && <path d={`M${flag.x - 18} 212 V${flag.labelY}`} stroke="#e53935" strokeWidth={2.5} />}
                <rect x={labelX} y={flag.labelY} width={labelW} height={26} rx={8} fill="#e53935" />
                <text x={labelX + labelW / 2} y={flag.labelY + 18} textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="var(--font-sans), system-ui, sans-serif">
                  {flag.label}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* the drone */}
        <motion.g
          initial={{ x: still ? 330 : START }}
          animate={still ? {} : { x: [START, END, END] }}
          transition={still ? { duration: 0 } : { ...loop, times: [0, FLY, 1] }}
        >
          <motion.g
            animate={still ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <g transform="translate(0 118)">
              {/* camera beam onto the gutter */}
              <motion.path
                d="M-7 14 L7 14 L30 66 L-30 66 Z"
                fill="url(#dss-beam)"
                animate={still ? {} : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
              <path d="M-30 -2 H30" stroke="var(--color-brand-dark)" strokeWidth="4" strokeLinecap="round" />
              {[-30, 30].map((rx) => (
                <g key={rx}>
                  <path d={`M${rx} -2 v-6`} stroke="var(--color-brand-dark)" strokeWidth="3" />
                  <motion.ellipse
                    cx={rx}
                    cy={-9}
                    rx={15}
                    ry={2.6}
                    fill="var(--color-brand-dark)"
                    fillOpacity={0.55}
                    animate={still ? {} : { scaleX: [1, 0.25, 1] }}
                    transition={{ duration: 0.14, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${rx}px -9px` }}
                  />
                </g>
              ))}
              <rect x="-16" y="-8" width="32" height="16" rx="7" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
              <circle cx="0" cy="12" r="5" fill="var(--color-brand-dark)" />
              <circle cx="0" cy="12" r="2" fill="var(--color-brand-light)" />
            </g>
          </motion.g>
        </motion.g>
      </g>
    </svg>
  );
}
