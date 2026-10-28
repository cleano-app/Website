"use client";

import { Cue, DARK, Done, Flag, Leaves, Path, Pill, Scene, Sparkle, While } from "./kit";

// The Portfolio Gutter Care Scheme as a story: a drone checks a row of four
// properties one by one. Two are clear - they get a tick and a free report,
// and nobody cleans them. Two are blocked - flagged, then cleared with the
// gutter vacuum. It ends on a report for every property.

export const PORTFOLIO_LOOP = 14;

// Property centres, and which ones are blocked.
const homes = [
  { x: 75, blocked: true, wall: "#fef3c7", roof: "#b45309" },
  { x: 225, blocked: false, wall: "#e0f2fe", roof: "#475569" },
  { x: 375, blocked: true, wall: "#fce7f3", roof: "#7c2d12" },
  { x: 525, blocked: false, wall: "#ecfccb", roof: "#334155" },
];
// The drone reaches each one at arrive[i] and stays until arrive[i] + HOLD.
const arrive = [0.08, 0.2, 0.32, 0.44];
const HOLD = 0.06;
const CLEAN_FROM = 0.6;
const CLEAN_TO = 0.7;
const DRONE_Y = 84;
const GUTTER_Y = 258;

function Home({ x, wall, roof }: { x: number; wall: string; roof: string }) {
  return (
    <g>
      <path d={`M${x - 60} ${GUTTER_Y} L${x} 212 L${x + 60} ${GUTTER_Y} Z`} fill={roof} stroke={DARK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x={x - 50} y={GUTTER_Y + 6} width="100" height={370 - GUTTER_Y - 6} fill={wall} stroke={DARK} strokeWidth="2.5" />
      <rect x={x - 38} y={286} width="26" height="24" rx="2" fill="#bfe8f5" stroke={DARK} strokeWidth="2" />
      <rect x={x + 12} y={286} width="26" height="24" rx="2" fill="#bfe8f5" stroke={DARK} strokeWidth="2" />
      <rect x={x - 12} y={326} width="24" height="44" rx="2" fill="var(--color-brand)" stroke={DARK} strokeWidth="2" />
      {/* the gutter, and its downpipe */}
      <rect x={x - 58} y={GUTTER_Y - 2} width="116" height="9" rx="3" fill="white" stroke={DARK} strokeWidth="2" />
      <rect x={x + 46} y={GUTTER_Y + 6} width="7" height={370 - GUTTER_Y - 6} fill="white" stroke={DARK} strokeWidth="1.5" />
    </g>
  );
}

function Drone() {
  return (
    <g>
      <path d="M-30 0 H30" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="-30" cy="-7" rx="15" ry="3" fill="#1f2937" opacity="0.55" />
      <ellipse cx="30" cy="-7" rx="15" ry="3" fill="#1f2937" opacity="0.55" />
      <path d="M-30 0 v-6 M30 0 v-6" stroke="#1f2937" strokeWidth="3" />
      <rect x="-16" y="-8" width="32" height="16" rx="7" fill="#1f2937" />
      <path d="M-6 -3 q3 -4 6 0 q3 -4 6 0 l-3 6 q-3 2 -6 0 Z" fill="#33e6a6" />
      <circle cx="0" cy="11" r="4.5" fill="#111827" />
      <circle cx="0" cy="11" r="1.8" fill="#33e6a6" />
    </g>
  );
}

export default function PortfolioScene({ className = "", tone = "soft" }: { className?: string; tone?: "bold" | "soft" }) {
  // Into the frame, a stop over each property, then away to the right.
  const points: [number, number, number][] = [[0.02, -60, DRONE_Y]];
  homes.forEach((home, i) => {
    points.push([arrive[i], home.x, DRONE_Y], [arrive[i] + HOLD, home.x, DRONE_Y]);
  });
  points.push([0.56, 680, DRONE_Y]);

  return (
    <Scene
      className={className}
      tone={tone}
      loop={PORTFOLIO_LOOP}
      label="Animation: a drone inspects four properties in turn. Two have clear gutters and get a free report; two are blocked and are cleaned. Every property gets a report."
    >
      {homes.map((home) => (
        <Home key={home.x} {...home} />
      ))}

      {/* leaves in the blocked gutters, until the clean */}
      {homes.map((home) =>
        home.blocked ? (
          <Cue key={home.x} from={0} to={CLEAN_TO - 0.02}>
            <Leaves x={home.x - 22} y={GUTTER_Y - 2} n={6} />
            <Leaves x={home.x + 18} y={GUTTER_Y - 3} n={5} />
          </Cue>
        ) : null,
      )}

      {/* the camera beam while the drone is over each one */}
      {homes.map((home, i) => (
        <While key={home.x} from={arrive[i]} to={arrive[i] + HOLD}>
          <path d={`M${home.x - 5} ${DRONE_Y + 14} L${home.x + 5} ${DRONE_Y + 14} L${home.x + 62} ${GUTTER_Y} L${home.x - 62} ${GUTTER_Y} Z`} fill="#fde68a" opacity="0.35" />
        </While>
      ))}

      <Path points={points} ease="easeInOut">
        <Drone />
      </Path>

      {/* what the drone found */}
      {homes.map((home, i) =>
        home.blocked ? (
          <Flag key={home.x} x={home.x} y={GUTTER_Y} r={30} label="Blocked" at={arrive[i] + 0.03} until={CLEAN_TO - 0.02} labelY={166} />
        ) : (
          <g key={home.x}>
            <Done x={home.x} y={166} label="Clear" at={arrive[i] + 0.03} />
            <Cue from={arrive[i] + 0.05} rise={6}>
              <Pill x={home.x} y={134} text="Free report" fill="white" stroke="#86efac" textFill="#15803d" />
            </Cue>
          </g>
        ),
      )}

      {/* the gutter vacuum, only where it's needed */}
      {homes.map((home) =>
        home.blocked ? (
          <Cue key={home.x} from={CLEAN_FROM} to={CLEAN_TO + 0.02} rise={20}>
            <path d={`M${home.x - 80} 372 L${home.x - 14} ${GUTTER_Y - 4}`} stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <rect x={home.x - 20} y={GUTTER_Y - 10} width="14" height="9" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="1.5" />
          </Cue>
        ) : null,
      )}
      {homes.map((home) =>
        home.blocked ? (
          <g key={home.x}>
            <Sparkle x={home.x - 20} y={GUTTER_Y - 6} at={CLEAN_TO - 0.01} />
            <Sparkle x={home.x + 24} y={GUTTER_Y - 10} at={CLEAN_TO + 0.01} size={9} />
            <Done x={home.x} y={166} label="Cleaned" at={CLEAN_TO} />
          </g>
        ) : null,
      )}

      {/* the headline for each part of the story */}
      <Cue from={0.02} to={0.56} rise={6}>
        <Pill x={300} y={22} text="Every property inspected" fill={DARK} />
      </Cue>
      <Cue from={0.58} to={0.74} rise={6}>
        <Pill x={300} y={22} text="Cleaned only where needed" fill={DARK} />
      </Cue>
      <Cue from={0.76} rise={6}>
        <Pill x={300} y={22} text="A photo report for every property" fill="#16a34a" />
      </Cue>
    </Scene>
  );
}
