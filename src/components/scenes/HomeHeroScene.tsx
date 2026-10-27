"use client";

import { motion } from "framer-motion";
import { HouseFront } from "./ServiceScenes";
import { Cue, DARK, Done, Drips, Flag, LOOP, Leaves, Path, Scene, Sparkle, Wipe, While, shownWhenStill, useStill } from "./kit";

// The homepage hero: one house, three jobs in a row - gutters, windows,
// the bin - each flagged, cleared and ticked off a checklist, then the
// Photo Report arrives. The whole company in one loop.

// Each job's sweep, as shares of the loop.
const GUTTER = { from: 0.1, to: 0.3, start: 90, end: 490 };
const WINDOWS = { from: 0.36, to: 0.54, start: 150, end: 450 };
const BIN = { from: 0.58, to: 0.7, start: 296, end: 368 };
const REPORT = 0.76;

type Job = typeof GUTTER;
const pass = (job: Job, at: number) => job.from + ((job.to - job.from) * (at - job.start)) / (job.end - job.start);

function Vanish({ at, children }: { at: number; children: React.ReactNode }) {
  const still = useStill();
  if (still) return shownWhenStill(0, at) ? <g>{children}</g> : null;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0, 0] }}
      transition={{ duration: LOOP, repeat: Infinity, ease: "linear", times: [0, 0.03, at, at + 0.02, 1] }}
    >
      {children}
    </motion.g>
  );
}

function Tool({ job, points, children }: { job: Job; points: [number, number, number][]; children: React.ReactNode }) {
  return (
    <Cue from={job.from - 0.04} to={job.to + 0.02}>
      <Path points={points} ease="linear">
        {children}
      </Path>
    </Cue>
  );
}

const along = (job: Job, at: number, vertical = false): [number, number, number][] => {
  const p = (a: number) => (vertical ? [at, a] : [a, at]) as [number, number];
  return [[0, ...p(job.start)], [job.from, ...p(job.start)], [job.to, ...p(job.end)], [1, ...p(job.end)]];
};

export default function HomeHeroScene({ className = "" }: { className?: string }) {
  return (
    <Scene
      className={className}
      label="Animation: a house's blocked gutter, dirty windows and grimy bin are each flagged, cleaned and ticked off, then a Cleano Photo Report arrives"
    >
      <HouseFront />

      {/* the bin, beside the house */}
      <path d="M520 304 H578 L573 366 H525 Z" fill="#334155" stroke={DARK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="514" y="294" width="70" height="12" rx="4" fill="#1e293b" stroke={DARK} strokeWidth="2.5" />
      <circle cx="532" cy="368" r="6" fill="#0f172a" />
      <circle cx="566" cy="368" r="6" fill="#0f172a" />

      {/* 1. gutters */}
      {[150, 260, 370, 476].map((x) => (
        <Vanish key={x} at={pass(GUTTER, x)}>
          <Leaves x={x} y={186} n={x === 260 ? 7 : 5} />
        </Vanish>
      ))}
      <Flag x={260} y={190} label="Leaves in gutter" at={0.03} until={pass(GUTTER, 260)} labelY={220} />
      <Tool job={GUTTER} points={along(GUTTER, 184)}>
        <path d="M0 4 L-70 230" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <rect x="-12" y="-8" width="24" height="14" rx="5" fill="white" stroke={DARK} strokeWidth="2.5" />
      </Tool>

      {/* 2. windows */}
      <Wipe from={WINDOWS.from} to={WINDOWS.to} start={WINDOWS.start} end={WINDOWS.end}>
        {[150, 380].map((x) => (
          <g key={x}>
            <rect x={x + 2} y={242} width={66} height={52} fill="#a8a29e" opacity="0.7" />
            <ellipse cx={x + 24} cy={262} rx={14} ry={7} fill="#78716c" opacity="0.5" />
            <path d={`M${x + 46} 268 v20`} stroke="#78716c" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </g>
        ))}
      </Wipe>
      <Flag x={185} y={268} label="Dirty windows" at={0.05} until={pass(WINDOWS, 185)} r={32} labelY={306} />
      <Tool job={WINDOWS} points={along(WINDOWS, 0)}>
        <rect x="-4" y="238" width="8" height="60" rx="3" fill={DARK} />
        <path d="M4 268 L50 340" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      </Tool>

      {/* 3. the bin */}
      <Wipe from={BIN.from} to={BIN.to} start={BIN.start} end={BIN.end} vertical>
        <g>
          <ellipse cx="538" cy="324" rx="6" ry="16" fill="#a16207" opacity="0.65" />
          <ellipse cx="562" cy="340" rx="7" ry="14" fill="#a16207" opacity="0.6" />
          <path d="M522 306 H576 V312 H522 Z" fill="#78350f" opacity="0.6" />
        </g>
      </Wipe>
      <Flag x={549} y={330} label="Grimy bin" at={0.07} until={BIN.from} r={28} labelY={262} anchor="end" labelX={584} />
      <Tool job={BIN} points={along(BIN, 596, true)}>
        <While from={BIN.from} to={BIN.to}>
          <path d="M-4 0 L-20 -8 L-20 8 Z" fill="white" opacity="0.85" />
        </While>
        <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
      </Tool>

      {/* the checklist, ticking itself off */}
      <Done x={22} y={18} label="Gutters" at={GUTTER.to + 0.01} anchor="start" />
      <Done x={22} y={50} label="Windows" at={WINDOWS.to + 0.01} anchor="start" />
      <Done x={22} y={82} label="Bin" at={BIN.to + 0.01} anchor="start" />
      <Drips x={494} y={368} fall={22} from={GUTTER.to} to={0.95} />
      <Sparkle x={185} y={262} at={WINDOWS.to + 0.01} />
      <Sparkle x={415} y={262} at={WINDOWS.to + 0.03} />
      <Sparkle x={549} y={330} at={BIN.to + 0.01} />

      {/* and the Photo Report arrives */}
      <Cue from={REPORT} rise={-14}>
        {/* nudged clear of the roof's slope */}
        <g transform="translate(6 -6)">
          <rect x="398" y="16" width="184" height="118" rx="14" fill="white" stroke={DARK} strokeWidth="2.5" />
          <rect x="398" y="16" width="184" height="28" rx="14" fill="var(--color-brand)" />
          <rect x="398" y="30" width="184" height="14" fill="var(--color-brand)" />
          <text x="412" y="35" fontSize="13" fontWeight="700" fill="white" fontFamily="var(--font-sans), system-ui, sans-serif">
            Photo Report
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={410 + i * 56} y={54} width={48} height={36} rx={5} fill="#bfe8f5" stroke={DARK} strokeWidth="1.5" />
              <path d={`M${414 + i * 56} 84 l12 -12 9 8 8 -7 10 11`} fill="none" stroke={DARK} strokeWidth="1.5" strokeLinejoin="round" />
            </g>
          ))}
          <circle cx="420" cy="112" r="9" fill="#16a34a" />
          <path d="M415.5 112.3l3 3 5.5-6" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="436" y="117" fontSize="13" fontWeight="700" fill={DARK} fontFamily="var(--font-sans), system-ui, sans-serif">
            Sent to your email
          </text>
        </g>
      </Cue>
    </Scene>
  );
}
