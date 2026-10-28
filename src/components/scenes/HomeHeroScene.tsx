"use client";

import { motion } from "framer-motion";
import { HouseFront } from "./ServiceScenes";
import { Cue, DARK, Done, Drips, Flag, Leaves, Path, Scene, Sparkle, Wipe, While, shownWhenStill, useLoopSeconds, useStill } from "./kit";

// The homepage hero: one property, all six services in a row - gutters,
// the roof, windows, the driveway, the bin and graffiti on the garden
// wall - each flagged, cleaned and ticked off, then the Photo Report
// arrives. The whole company in one loop.

// The house is drawn smaller than in the gutter scene, to leave room for
// the driveway, bin and wall: house units -> scene units.
const HOUSE = { x: 40, y: 60, k: 0.72 };
const sx = (x: number) => HOUSE.x + HOUSE.k * x;
const sy = (y: number) => HOUSE.y + HOUSE.k * y;

// Each job's sweep: when (shares of the loop) and where (along its line).
// GUTTER, ROOF and WINDOWS are in house units; the rest in scene units.
const GUTTER = { from: 0.06, to: 0.16, start: 90, end: 490 };
const ROOF = { from: 0.19, to: 0.29, start: 84, end: 516 };
const WINDOWS = { from: 0.32, to: 0.41, start: 150, end: 450 };
const DRIVE = { from: 0.44, to: 0.54, start: 0, end: 600 };
const BIN = { from: 0.57, to: 0.63, start: 268, end: 332 };
const GRAFFITI = { from: 0.66, to: 0.75, start: 425, end: 595 };
const REPORT = 0.8;

// Six jobs need far longer than a single-job scene's 9s - at 9s each one
// was over in about a second (the owner: "flying too quick"). At 26s each
// sweep takes ~2.5s, and the finished checklist and report hold ~4s.
const HERO_LOOP = 26;

type Job = typeof GUTTER;
const pass = (job: Job, at: number) => job.from + ((job.to - job.from) * (at - job.start)) / (job.end - job.start);
/** Each problem is flagged just before its job starts. */
const found = (job: Job) => Math.max(0.02, job.from - 0.05);

function Vanish({ at, children }: { at: number; children: React.ReactNode }) {
  const still = useStill();
  const seconds = useLoopSeconds();
  if (still) return shownWhenStill(0, at) ? <g>{children}</g> : null;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0, 0] }}
      transition={{ duration: seconds, repeat: Infinity, ease: "linear", times: [0, 0.03, at, at + 0.02, 1] }}
    >
      {children}
    </motion.g>
  );
}

function Tool({ job, points, children }: { job: Job; points: [number, number, number][]; children: React.ReactNode }) {
  return (
    <Cue from={job.from - 0.03} to={job.to + 0.015}>
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

const BRICK = ["#c2653f", "#b85b36", "#cc7048", "#b5532f"];

export default function HomeHeroScene({ className = "" }: { className?: string }) {
  return (
    <Scene
      className={className}
      loop={HERO_LOOP}
      label="Animation: on one property a blocked gutter, a mossy roof, dirty windows, a stained driveway, a grimy bin and graffiti on the garden wall are each flagged, cleaned and ticked off, then a Cleano Photo Report arrives"
    >
      {/* the driveway, the garden wall, the bin */}
      <rect x="0" y="328" width="600" height="72" fill="#e7dccb" />
      <g stroke="#cbbba3" strokeWidth="2.5">
        <path d="M0 352 H600" />
        {Array.from({ length: 10 }, (_, i) => i * 64 + 20).map((x, i) => (
          <path key={x} d={`M${x + (i % 2) * 18} 328 V400`} />
        ))}
      </g>
      <rect x="420" y="250" width="180" height="78" fill="#e9c7b2" />
      {Array.from({ length: 4 }, (_, r) => 250 + r * 19.5).map((y, r) => (
        <g key={y}>
          {Array.from({ length: 5 }, (_, c) => 420 + c * 40 - (r % 2) * 20).map((x, c) => (
            <rect key={x} x={Math.max(x, 420) + 1.5} y={y + 1.5} width={Math.min(37, x + 37 - 420)} height="16.5" rx="1.5" fill={BRICK[(r + c) % BRICK.length]} />
          ))}
        </g>
      ))}
      <rect x="416" y="244" width="188" height="8" rx="2" fill="#a8a29e" />
      <path d="M36 272 H90 L86 328 H40 Z" fill="#334155" stroke={DARK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="30" y="262" width="66" height="12" rx="4" fill="#1e293b" stroke={DARK} strokeWidth="2.5" />
      <circle cx="48" cy="330" r="6" fill="#0f172a" />
      <circle cx="78" cy="330" r="6" fill="#0f172a" />

      {/* the house, and its three jobs - in house units */}
      <g transform={`translate(${HOUSE.x} ${HOUSE.y}) scale(${HOUSE.k})`}>
        <HouseFront />

        {[150, 260, 370, 476].map((x) => (
          <Vanish key={x} at={pass(GUTTER, x)}>
            <Leaves x={x} y={186} n={x === 260 ? 7 : 5} />
          </Vanish>
        ))}
        <Tool job={GUTTER} points={along(GUTTER, 184)}>
          <path d="M0 4 L-70 230" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          <rect x="-13" y="-9" width="26" height="16" rx="5" fill="white" stroke={DARK} strokeWidth="3" />
        </Tool>

        <Wipe from={ROOF.from} to={ROOF.to} start={ROOF.start} end={ROOF.end}>
          {[[200, 168, 26, 9], [300, 122, 20, 8], [384, 166, 30, 10], [340, 150, 16, 6], [250, 150, 14, 6]].map(([x, y, rx, ry]) => (
            <g key={`${x}-${y}`}>
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#4d7c0f" />
              <ellipse cx={x - rx * 0.3} cy={y - ry * 0.3} rx={rx * 0.5} ry={ry * 0.5} fill="#84cc16" opacity="0.75" />
            </g>
          ))}
        </Wipe>
        <Tool job={ROOF} points={along(ROOF, 30)}>
          <While from={ROOF.from} to={ROOF.to}>
            <path d="M0 10 L-24 160 L24 160 Z" fill="#bae6fd" opacity="0.6" />
          </While>
          <path d="M0 0 L60 -60" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          <rect x="-8" y="-5" width="16" height="15" rx="3" fill="white" stroke={DARK} strokeWidth="3" />
        </Tool>

        <Wipe from={WINDOWS.from} to={WINDOWS.to} start={WINDOWS.start} end={WINDOWS.end}>
          {[150, 380].map((x) => (
            <g key={x}>
              <rect x={x + 2} y={242} width={66} height={52} fill="#a8a29e" opacity="0.75" />
              <ellipse cx={x + 24} cy={262} rx={14} ry={7} fill="#78716c" opacity="0.5" />
              <path d={`M${x + 46} 268 v20`} stroke="#78716c" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            </g>
          ))}
        </Wipe>
        <Tool job={WINDOWS} points={along(WINDOWS, 0)}>
          <rect x="-5" y="236" width="10" height="64" rx="3" fill={DARK} />
          <path d="M5 268 L56 360" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        </Tool>
      </g>
      <Drips x={sx(494)} y={sy(368)} fall={16} from={GUTTER.to} to={0.95} />

      {/* the driveway */}
      <Wipe from={DRIVE.from} to={DRIVE.to} start={DRIVE.start} end={DRIVE.end}>
        <g>
          <rect x="0" y="328" width="600" height="72" fill="#57534e" opacity="0.5" />
          {[[120, 360, 46, 12], [380, 376, 40, 10], [540, 350, 30, 9]].map(([x, y, rx, ry]) => (
            <ellipse key={x} cx={x} cy={y} rx={rx} ry={ry} fill="#4d7c0f" opacity="0.6" />
          ))}
          <ellipse cx="270" cy="370" rx="34" ry="11" fill="#1c1917" opacity="0.5" />
        </g>
      </Wipe>
      <Tool job={DRIVE} points={along(DRIVE, 318)}>
        <While from={DRIVE.from} to={DRIVE.to}>
          <path d="M0 4 L-12 70 L12 70 Z" fill="white" opacity="0.8" />
        </While>
        <path d="M0 0 L40 -80" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        <rect x="-4" y="-6" width="8" height="12" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
      </Tool>

      {/* the bin */}
      <Wipe from={BIN.from} to={BIN.to} start={BIN.start} end={BIN.end} vertical>
        <g>
          <ellipse cx="52" cy="294" rx="6" ry="14" fill="#a16207" opacity="0.65" />
          <ellipse cx="74" cy="306" rx="7" ry="13" fill="#a16207" opacity="0.6" />
          <path d="M38 274 H88 V280 H38 Z" fill="#78350f" opacity="0.6" />
        </g>
      </Wipe>
      <Tool job={BIN} points={along(BIN, 10, true)}>
        <While from={BIN.from} to={BIN.to}>
          <path d="M4 0 L26 -8 L26 8 Z" fill="white" opacity="0.85" />
        </While>
        <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
      </Tool>

      {/* graffiti on the garden wall */}
      <Wipe from={GRAFFITI.from} to={GRAFFITI.to} start={GRAFFITI.start} end={GRAFFITI.end}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M436 306 C444 266 466 262 474 288 S500 322 512 284 S540 256 552 292 S578 308 588 272" stroke="#111827" strokeWidth="14" />
          <path d="M436 306 C444 266 466 262 474 288 S500 322 512 284 S540 256 552 292 S578 308 588 272" stroke="#a855f7" strokeWidth="9" />
          <path d="M452 270 l14 -10 M530 266 l16 -10" stroke="#ec4899" strokeWidth="7" />
        </g>
      </Wipe>
      <Tool job={GRAFFITI} points={along(GRAFFITI, 226)}>
        <While from={GRAFFITI.from} to={GRAFFITI.to}>
          <path d="M0 8 L-18 100 L18 100 Z" fill="#bae6fd" opacity="0.6" />
        </While>
        <path d="M0 0 L46 -46" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        <rect x="-6" y="-4" width="12" height="12" rx="3" fill="white" stroke={DARK} strokeWidth="2.5" />
      </Tool>

      {/* each problem, flagged in turn as its job comes up */}
      <Flag x={sx(260)} y={sy(190)} label="Blocked gutter" at={found(GUTTER)} until={pass(GUTTER, 260)} r={20} labelY={sy(190) + 26} />
      <Flag x={sx(300)} y={sy(140)} label="Moss" at={found(ROOF)} until={pass(ROOF, 300)} r={22} labelX={sx(300) + 28} labelY={sy(140) - 13} anchor="start" />
      <Flag x={sx(185)} y={sy(268)} label="Dirty windows" at={found(WINDOWS)} until={pass(WINDOWS, 185)} r={26} />
      <Flag x={270} y={368} label="Stained driveway" at={found(DRIVE)} until={pass(DRIVE, 270)} r={22} labelY={334} labelX={300} anchor="start" />
      <Flag x={62} y={298} label="Grimy bin" at={found(BIN)} until={BIN.from + 0.01} r={30} labelY={226} labelX={14} anchor="start" />
      <Flag x={510} y={288} label="Graffiti" at={found(GRAFFITI)} until={pass(GRAFFITI, 510)} r={34} labelY={212} />

      {/* the checklist, ticking itself off */}
      <Done x={14} y={14} label="Gutters" at={GUTTER.to + 0.01} anchor="start" />
      <Done x={14} y={44} label="Roof" at={ROOF.to + 0.01} anchor="start" />
      <Done x={14} y={74} label="Windows" at={WINDOWS.to + 0.01} anchor="start" />
      <Done x={122} y={14} label="Driveway" at={DRIVE.to + 0.01} anchor="start" />
      <Done x={122} y={44} label="Bin" at={BIN.to + 0.01} anchor="start" />
      <Done x={122} y={74} label="Graffiti" at={GRAFFITI.to + 0.01} anchor="start" />

      <Sparkle x={sx(260)} y={sy(178)} at={GUTTER.to + 0.01} />
      <Sparkle x={sx(320)} y={sy(140)} at={ROOF.to + 0.01} />
      <Sparkle x={sx(185)} y={sy(262)} at={WINDOWS.to + 0.01} />
      <Sparkle x={sx(415)} y={sy(262)} at={WINDOWS.to + 0.02} />
      <Sparkle x={200} y={362} at={DRIVE.to + 0.01} />
      <Sparkle x={62} y={298} at={BIN.to + 0.01} />
      <Sparkle x={512} y={286} at={GRAFFITI.to + 0.01} />

      {/* and the Photo Report arrives */}
      <Cue from={REPORT} rise={-14}>
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
