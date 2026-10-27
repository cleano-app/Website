"use client";

import { motion } from "framer-motion";
import { HouseFront } from "./ServiceScenes";
import { Cue, DARK, Done, Flag, LOOP, Leaves, Path, Pill, Scene, Sparkle, Wipe, onLoop, shownWhenStill, track, useStill } from "./kit";

// The remaining scenes, in the same language: a home visit from arrival to
// report, a commercial building cleaned floor by floor on a schedule, and
// the Photo Report putting itself together.

const SANS = "var(--font-sans), system-ui, sans-serif";

function Vanish({ at, children }: { at: number; children: React.ReactNode }) {
  const still = useStill();
  if (still) return shownWhenStill(0, at) ? <g>{children}</g> : null;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0, 0] }}
      transition={{ duration: LOOP, repeat: Infinity, ease: "linear", times: [0, 0.03, at, at + 0.03, 1] }}
    >
      {children}
    </motion.g>
  );
}

/** A camera flash over the whole scene at `at`. */
function Flash({ at }: { at: number }) {
  const still = useStill();
  if (still) return null;
  const o = track<number>([[at, 0], [at + 0.006, 0.7], [at + 0.04, 0]]);
  return <motion.rect width="600" height="400" fill="white" initial={{ opacity: 0 }} animate={{ opacity: o.values }} transition={onLoop(o.times)} />;
}

function Van() {
  return (
    <g>
      <path d="M0 0 H130 L130 70 H0 Z" fill="var(--color-brand)" stroke={DARK} strokeWidth="3" />
      <path d="M130 18 H162 L186 44 V70 H130 Z" fill="var(--color-brand)" stroke={DARK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M136 24 H158 L176 44 H136 Z" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="16" y="34" fontSize="22" fontWeight="800" fill="white" fontFamily={SANS}>
        Cleano
      </text>
      <path d="M16 46 H100" stroke="var(--color-brand-light)" strokeWidth="4" strokeLinecap="round" />
      {[34, 150].map((x) => (
        <g key={x}>
          <circle cx={x} cy={72} r={15} fill="#0f172a" />
          <circle cx={x} cy={72} r={5} fill="#94a3b8" />
        </g>
      ))}
    </g>
  );
}

/** For Your Home: the visit, from the van pulling up to the report. */
export function HomeVisitScene({ className = "" }: { className?: string }) {
  return (
    <Scene className={className} label="Animation: the Cleano van pulls up at a house, takes before photos, cleans the gutter and windows, takes after photos, sends the report and drives off">
      <g transform="translate(225 140) scale(0.62)">
        <HouseFront />
        {[150, 260, 370, 476].map((x, i) => (
          <Vanish key={x} at={0.34 + i * 0.03}>
            <Leaves x={x} y={186} n={6} />
          </Vanish>
        ))}
        <Vanish at={0.48}>
          {[150, 380].map((x) => (
            <rect key={x} x={x + 2} y={242} width={66} height={52} fill="#a8a29e" opacity="0.75" />
          ))}
        </Vanish>
      </g>
      {[[340, 254], [450, 254], [394, 255]].map(([x, y], i) => (
        <Sparkle key={x} x={x} y={y} at={0.42 + i * 0.05} />
      ))}

      <Path points={[[0, -260, 290], [0.12, 30, 290], [0.86, 30, 290], [0.96, 700, 290], [1, 700, 290]]}>
        <Van />
      </Path>

      <Flash at={0.18} />
      <Cue from={0.18} to={0.32} rise={8}>
        <Pill x={300} y={18} text="Before photos" fill={DARK} />
      </Cue>
      <Flash at={0.58} />
      <Cue from={0.58} to={0.7} rise={8}>
        <Pill x={300} y={18} text="After photos" fill={DARK} />
      </Cue>
      <Done x={300} y={18} label="Report sent" at={0.72} />
    </Scene>
  );
}

/** For Your Business: a block cleaned floor by floor, on a schedule. */
export function BusinessScene({ className = "" }: { className?: string }) {
  const floors = [62, 138, 214, 290];
  const cols = [175, 243, 311, 379];
  const [from, to, start, end] = [0.18, 0.7, 50, 360];
  const pass = (y: number) => from + ((to - from) * (y - start)) / (end - start);
  return (
    <Scene className={className} label="Animation: dirty windows on a commercial building are flagged, a cleaning cradle works down it floor by floor, and it's marked on schedule">
      <rect x="150" y="40" width="300" height="332" fill="white" stroke={DARK} strokeWidth="3" />
      <rect x="140" y="30" width="320" height="14" rx="3" fill={DARK} />
      {floors.map((y, f) =>
        cols.map((x, c) =>
          f === 3 && (c === 1 || c === 2) ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="46" height="54" rx="3" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" />
          ),
        ),
      )}
      <rect x="247" y="290" width="106" height="82" rx="3" fill="var(--color-brand)" stroke={DARK} strokeWidth="2.5" />
      <path d="M300 290 V372" stroke={DARK} strokeWidth="2.5" />

      <Wipe from={from} to={to} start={start} end={end} vertical>
        <g>
          {floors.map((y, f) =>
            cols.map((x, c) =>
              f === 3 && (c === 1 || c === 2) ? null : (
                <g key={`${x}-${y}`}>
                  <rect x={x + 2} y={y + 2} width="42" height="50" fill="#a8a29e" opacity="0.7" />
                  <path d={`M${x + 12} ${y + 20} v18 M${x + 30} ${y + 14} v26`} stroke="#78716c" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                </g>
              ),
            ),
          )}
        </g>
      </Wipe>
      <Flag x={266} y={89} label="Dirty glass" at={0.05} until={pass(89)} r={34} labelY={128} />

      {/* the cradle, lowered floor by floor */}
      <Cue from={from - 0.04} to={to + 0.03}>
        <Path points={[[0, 150, start], [from, 150, start], [to, 150, end], [1, 150, end]]} ease="linear">
          <path d="M20 0 V-420 M280 0 V-420" stroke="#94a3b8" strokeWidth="2" />
          <rect x="6" y="0" width="288" height="12" rx="3" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
          <path d="M6 0 V-18 H294 V0" fill="none" stroke={DARK} strokeWidth="2" />
        </Path>
      </Cue>

      {floors.map((y, i) => (
        <Sparkle key={y} x={470} y={y + 27} at={pass(y + 54) + 0.01 + i * 0.002} size={10} />
      ))}
      <Done x={300} y={4} label="On schedule" at={0.74} />
      <Cue from={0.8} rise={8}>
        <Pill x={300} y={36} text="Next visit booked" fill={DARK} />
      </Cue>
    </Scene>
  );
}

/** The Photo Report, putting itself together and going out. */
export function ReportStoryScene({ className = "" }: { className?: string }) {
  return (
    <Scene className={className} label="Animation: a Cleano Photo Report fills in - a before photo with the problem circled, an after photo ticked, a checklist ticking off - and is sent">
      <rect x="140" y="22" width="320" height="356" rx="16" fill="white" stroke={DARK} strokeWidth="3" />
      <path d="M140 38 a16 16 0 0 1 16 -16 H444 a16 16 0 0 1 16 16 V62 H140 Z" fill="var(--color-brand)" />
      <text x="160" y="49" fontSize="17" fontWeight="800" fill="white" fontFamily={SANS}>
        Photo Report
      </text>

      {/* before: a gutter full of leaves */}
      <Cue from={0.06} rise={14}>
        <g>
          <rect x="160" y="78" width="132" height="98" rx="8" fill="#d1fae5" stroke={DARK} strokeWidth="2" />
          <rect x="172" y="128" width="108" height="12" rx="3" fill="white" stroke={DARK} strokeWidth="2" />
          <Leaves x={226} y={126} n={8} />
          <text x="168" y="96" fontSize="11" fontWeight="700" fill={DARK} fontFamily={SANS}>BEFORE</text>
        </g>
      </Cue>
      <Flag x={226} y={126} label="Blocked" at={0.18} until={0.96} r={22} labelY={146} />

      {/* after: clear */}
      <Cue from={0.34} rise={14}>
        <g>
          <rect x="308" y="78" width="132" height="98" rx="8" fill="#d1fae5" stroke={DARK} strokeWidth="2" />
          <rect x="320" y="128" width="108" height="12" rx="3" fill="white" stroke={DARK} strokeWidth="2" />
          <text x="316" y="96" fontSize="11" fontWeight="700" fill={DARK} fontFamily={SANS}>AFTER</text>
          <circle cx="420" cy="98" r="11" fill="#16a34a" />
          <path d="M414.5 98.3l3.6 3.6 6.4-7" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Cue>
      <Sparkle x={374} y={120} at={0.38} />

      {/* the checklist */}
      {["Gutters cleared", "Downpipes flowing", "Photos attached"].map((item, i) => {
        const y = 206 + i * 40;
        return (
          <g key={item}>
            <rect x="196" y={y - 5} width="200" height="10" rx="5" fill={DARK} opacity="0.1" />
            <Cue from={0.48 + i * 0.07}>
              <g>
                <circle cx="174" cy={y} r="11" fill="#16a34a" />
                <path d={`M168.5 ${y + 0.3}l3.6 3.6 6.4-7`} fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="196" y={y - 5} width="200" height="10" rx="5" fill="white" />
                <text x="196" y={y + 5} fontSize="14" fontWeight="600" fill="#1f2937" fontFamily={SANS}>
                  {item}
                </text>
              </g>
            </Cue>
          </g>
        );
      })}

      <Done x={300} y={336} label="Sent to your email" at={0.74} />
    </Scene>
  );
}
