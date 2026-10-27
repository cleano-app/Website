"use client";

import { motion } from "framer-motion";
import { Cue, DARK, Done, Drips, Flag, Leaves, LOOP, Path, Scene, Sparkle, Wipe, While, shownWhenStill, useStill, useSvgId } from "./kit";

// One story per service, in the inspection page's style: the problem is
// flagged, the work sweeps across and clears it exactly where it passes,
// and it ends on a green tick. All six share the sweep clock below.

export type ServiceSceneType = "gutter" | "rooftop" | "window" | "pressure" | "bin" | "graffiti";

const FROM = 0.22; // the sweep starts...
const TO = 0.72; //   ...and ends, as shares of the loop
const DONE = 0.76;

/** When the sweep's edge reaches `x`, for a sweep from `start` to `end`. */
const pass = (x: number, start: number, end: number) => FROM + ((TO - FROM) * (x - start)) / (end - start);

/** A tool's waypoints: waits at `start`, sweeps to `end`, stays there. */
function sweep(start: number, end: number, at: number, vertical = false): [number, number, number][] {
  const p = (a: number) => (vertical ? [at, a] : [a, at]) as [number, number];
  return [
    [0, ...p(start)],
    [FROM, ...p(start)],
    [TO, ...p(end)],
    [1, ...p(end)],
  ];
}

/** The tool doing the work: fades in at its start just before the sweep,
 * and out again once it's done - it never drifts in from off-scene. */
function Tool({ points, children }: { points: [number, number, number][]; children: React.ReactNode }) {
  return (
    <Cue from={FROM - 0.05} to={TO + 0.02}>
      <Path points={points} ease="linear">
        {children}
      </Path>
    </Cue>
  );
}

/** The house front the gutter scenes share (and the homepage builds on). */
export function HouseFront() {
  return (
    <g>
      <path d="M84 194 L300 78 L516 194 Z" fill={DARK} />
      {[120, 150, 176].map((y) => (
        <path key={y} d={`M${300 - (y - 78) * 1.86} ${y} H${300 + (y - 78) * 1.86}`} stroke="white" strokeOpacity="0.12" strokeWidth="2" />
      ))}
      <rect x="112" y="196" width="376" height="176" fill="white" stroke={DARK} strokeWidth="3" />
      <rect x="150" y="240" width="70" height="56" rx="4" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" />
      <path d="M185 240v56M150 268h70" stroke={DARK} strokeWidth="2" />
      <rect x="380" y="240" width="70" height="56" rx="4" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" />
      <path d="M415 240v56M380 268h70" stroke={DARK} strokeWidth="2" />
      <rect x="270" y="286" width="60" height="86" rx="4" fill="var(--color-brand)" stroke={DARK} strokeWidth="2.5" />
      <rect x="474" y="198" width="12" height="164" fill="white" stroke={DARK} strokeWidth="2.5" />
      <path d="M474 362 h22 v10 h-22 z" fill="white" stroke={DARK} strokeWidth="2.5" />
      <rect x="80" y="188" width="420" height="13" rx="4" fill="white" stroke={DARK} strokeWidth="2.5" />
    </g>
  );
}

function Vanish({ at, children }: { at: number; children: React.ReactNode }) {
  // Present from the start of the loop until the work reaches it.
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

function GutterScene() {
  const [s, e] = [90, 490];
  const clumps = [150, 260, 370, 476];
  return (
    <>
      <HouseFront />
      {clumps.map((x) => (
        <Vanish key={x} at={pass(x, s, e)}>
          <Leaves x={x} y={186} n={x === 260 ? 7 : 5} />
        </Vanish>
      ))}
      <Drips x={260} y={204} fall={90} from={0.03} to={pass(260, s, e)} />
      <Flag x={260} y={190} label="Blocked gutter" at={0.06} until={pass(260, s, e)} labelY={220} />
      <Flag x={476} y={190} label="Outlet blocked" at={0.12} until={pass(476, s, e)} labelY={306} anchor="end" labelX={494} />

      {/* gutter vac nozzle on its pole */}
      <Tool points={sweep(s, e, 184)}>
        <path d="M0 4 L-70 230" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <rect x="-12" y="-8" width="24" height="14" rx="5" fill="white" stroke={DARK} strokeWidth="2.5" />
        <While from={FROM} to={TO}>
          <circle cx="0" cy="-12" r="3" fill="#a16207" />
          <circle cx="7" cy="-18" r="2.5" fill="#ca8a04" />
          <circle cx="-6" cy="-22" r="2" fill="#854d0e" />
        </While>
      </Tool>

      {/* clear: water runs out at the bottom of the downpipe */}
      <Drips x={494} y={368} fall={24} from={DONE} to={0.95} />
      {[150, 260, 370].map((x, i) => (
        <Sparkle key={x} x={x} y={176} at={DONE + i * 0.03} />
      ))}
      <Done x={300} y={18} label="Flowing freely" at={DONE} />
    </>
  );
}

function RooftopScene() {
  const [s, e] = [40, 560];
  const moss: [number, number, number, number][] = [
    [200, 240, 42, 16], [320, 176, 30, 12], [405, 282, 48, 18], [150, 304, 34, 12], [290, 304, 30, 11], [360, 230, 24, 9], [250, 150, 20, 8],
  ];
  const lichen: [number, number][] = [[430, 262], [444, 250], [418, 248], [236, 198], [470, 300], [180, 270]];
  const roof = useSvgId("roof");
  return (
    <>
      <defs>
        <clipPath id={roof}>
          <path d="M30 340 L300 60 L570 340 Z" />
        </clipPath>
      </defs>
      <path d="M30 340 L300 60 L570 340 Z" fill="#64748b" />
      <g clipPath={`url(#${roof})`} stroke="#475569" strokeWidth="2">
        {Array.from({ length: 11 }, (_, r) => 84 + r * 24).map((y, r) => (
          <g key={y}>
            <path d={`M0 ${y} H600`} />
            {Array.from({ length: 14 }, (_, c) => 20 + c * 44 + (r % 2) * 22).map((x) => (
              <path key={x} d={`M${x} ${y} v24`} strokeOpacity="0.6" />
            ))}
          </g>
        ))}
      </g>
      <rect x="60" y="340" width="480" height="32" fill="white" stroke={DARK} strokeWidth="3" />
      <rect x="40" y="334" width="520" height="11" rx="4" fill="white" stroke={DARK} strokeWidth="2.5" />

      <Wipe from={FROM} to={TO} start={s} end={e}>
        <g clipPath={`url(#${roof})`}>
          {moss.map(([x, y, rx, ry]) => (
            <g key={`${x}-${y}`}>
              <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#4d7c0f" opacity="0.85" />
              <ellipse cx={x - rx * 0.3} cy={y - ry * 0.3} rx={rx * 0.5} ry={ry * 0.5} fill="#84cc16" opacity="0.7" />
            </g>
          ))}
          {lichen.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#ecfccb" opacity="0.9" />
          ))}
        </g>
      </Wipe>
      <Flag x={200} y={240} label="Moss" at={0.06} until={pass(200, s, e)} r={30} />
      <Flag x={432} y={258} label="Lichen" at={0.12} until={pass(432, s, e)} r={26} />

      {/* soft-wash lance spraying down the roof */}
      <Tool points={sweep(s, e, 40)}>
        <While from={FROM} to={TO}>
          <path d="M0 8 L-22 300 L22 300 Z" fill="#bae6fd" opacity="0.55" />
        </While>
        <path d="M0 0 L60 -60" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <rect x="-7" y="-4" width="14" height="14" rx="3" fill="white" stroke={DARK} strokeWidth="2.5" />
      </Tool>

      {[[200, 240], [320, 176], [405, 282]].map(([x, y], i) => (
        <Sparkle key={x} x={x} y={y} at={DONE + i * 0.03} />
      ))}
      <Done x={300} y={18} label="Roof clean" at={DONE} />
    </>
  );
}

function WindowScene() {
  const [s, e] = [152, 448];
  return (
    <>
      <rect x="90" y="42" width="420" height="330" fill="#fafaf9" stroke={DARK} strokeWidth="3" />
      <rect x="150" y="70" width="300" height="270" rx="6" fill="#bfe8f5" stroke={DARK} strokeWidth="6" />
      {/* reflections, on the clean glass underneath */}
      <path d="M180 120 l40 -40 M190 150 l70 -70 M330 230 l60 -60 M350 300 l80 -80" stroke="white" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      <path d="M300 70 V340 M150 205 H450" stroke={DARK} strokeWidth="6" />
      <rect x="140" y="336" width="320" height="14" rx="3" fill="white" stroke={DARK} strokeWidth="2.5" />

      <Wipe from={FROM} to={TO} start={s} end={e}>
        <g>
          <rect x="153" y="73" width="294" height="264" fill="#a8a29e" opacity="0.6" />
          {[[200, 130, 40, 18], [380, 270, 50, 22], [260, 290, 30, 12], [410, 120, 26, 12]].map(([x, y, rx, ry]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} fill="#78716c" opacity="0.45" />
          ))}
          {[180, 236, 330, 402].map((x) => (
            <path key={x} d={`M${x} 210 v${40 + (x % 30)}`} stroke="#78716c" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          ))}
          <circle cx="345" cy="110" r="7" fill="white" opacity="0.9" />
          <circle cx="352" cy="118" r="4" fill="white" opacity="0.9" />
        </g>
      </Wipe>
      <Tool points={sweep(s, e, 0)}>
        <rect x="-5" y="72" width="10" height="266" rx="3" fill={DARK} />
        <path d="M5 205 L70 330" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      </Tool>
      <Flag x={205} y={132} label="Grime" at={0.06} until={pass(205, s, e)} r={30} />
      <Flag x={385} y={268} label="Smears" at={0.12} until={pass(385, s, e)} r={30} labelY={232} />

      {[[200, 130], [380, 120], [250, 270], [400, 290]].map(([x, y], i) => (
        <Sparkle key={`${x}-${y}`} x={x} y={y} at={DONE + i * 0.025} size={14} />
      ))}
      <Done x={300} y={8} label="Streak-free" at={DONE} />
    </>
  );
}

function PressureScene() {
  const [s, e] = [20, 580];
  return (
    <>
      <rect x="0" y="30" width="600" height="130" fill="#fafaf9" stroke={DARK} strokeWidth="3" />
      <rect x="262" y="60" width="76" height="100" rx="4" fill="var(--color-brand)" stroke={DARK} strokeWidth="2.5" />
      <rect x="80" y="70" width="90" height="56" rx="4" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" />
      <rect x="430" y="70" width="90" height="56" rx="4" fill="#bfe8f5" stroke={DARK} strokeWidth="2.5" />
      <rect x="0" y="160" width="600" height="212" fill="#e7dccb" />
      <g stroke="#cbbba3" strokeWidth="3">
        {[212, 264, 316].map((y) => <path key={y} d={`M0 ${y} H600`} />)}
        {Array.from({ length: 9 }, (_, i) => i * 70 + 10).map((x, i) => (
          <path key={x} d={`M${x + (i % 2) * 20} 160 V372`} />
        ))}
      </g>

      <Wipe from={FROM} to={TO} start={s} end={e}>
        <g>
          <rect x="0" y="160" width="600" height="212" fill="#57534e" opacity="0.5" />
          {[[150, 230, 60, 20], [250, 330, 46, 14], [520, 220, 40, 14], [90, 320, 30, 10]].map(([x, y, rx, ry]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} fill="#4d7c0f" opacity="0.6" />
          ))}
          <ellipse cx="420" cy="300" rx="42" ry="20" fill="#1c1917" opacity="0.55" />
        </g>
      </Wipe>
      <Flag x={160} y={232} label="Algae" at={0.06} until={pass(160, s, e)} r={32} />
      <Flag x={420} y={300} label="Oil stain" at={0.12} until={pass(420, s, e)} r={30} labelY={252} />

      {/* pressure washer lance and jet */}
      <Tool points={sweep(s, e, 176)}>
        <While from={FROM} to={TO}>
          <path d="M0 6 L-16 196 L16 196 Z" fill="white" opacity="0.75" />
          <circle cx="-14" cy="190" r="4" fill="#bae6fd" />
          <circle cx="15" cy="185" r="3" fill="#bae6fd" />
        </While>
        <path d="M0 0 L50 -120" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        <rect x="-5" y="-6" width="10" height="14" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
      </Tool>

      {[[150, 230], [420, 300], [520, 220]].map(([x, y], i) => (
        <Sparkle key={x} x={x} y={y} at={DONE + i * 0.03} />
      ))}
      <Done x={300} y={4} label="Like new" at={DONE} />
    </>
  );
}

function BinScene() {
  const [s, e] = [100, 360];
  return (
    <>
      <path d="M225 122 H375 L363 346 H237 Z" fill="#334155" stroke={DARK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M240 150 V320 M300 150 V320 M360 150 V320" stroke="white" strokeOpacity="0.12" strokeWidth="6" />
      <rect x="212" y="104" width="176" height="22" rx="6" fill="#1e293b" stroke={DARK} strokeWidth="3" />
      <rect x="282" y="94" width="36" height="12" rx="4" fill="#1e293b" />
      {[248, 352].map((x) => (
        <g key={x}>
          <circle cx={x} cy={352} r="15" fill="#0f172a" />
          <circle cx={x} cy={352} r="5" fill="#94a3b8" />
        </g>
      ))}

      <Wipe from={FROM} to={TO} start={s} end={e} vertical>
        <g>
          {[[255, 180, 10, 40], [320, 230, 14, 50], [280, 290, 18, 22], [345, 170, 8, 30]].map(([x, y, rx, ry]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} fill="#a16207" opacity="0.6" />
          ))}
          <path d="M232 128 H370 V140 H232 Z" fill="#78350f" opacity="0.5" />
          {[262, 300, 338].map((x) => (
            <path key={x} d={`M${x} 140 v${18 + (x % 17)}`} stroke="#78350f" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          ))}
        </g>
      </Wipe>
      {/* the smell, and the flies, go as soon as the washing starts */}
      <Vanish at={FROM + 0.06}>
        {[262, 300, 338].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 92 c-8 -10 8 -18 0 -28 c-8 -10 8 -18 0 -28`}
            fill="none"
            stroke="#84cc16"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "300px 80px" }}>
          <circle cx="340" cy="80" r="3.5" fill="#0f172a" />
          <circle cx="262" cy="70" r="3" fill="#0f172a" />
        </motion.g>
      </Vanish>
      <Flag x={300} y={62} label="Smelly" at={0.06} until={FROM + 0.06} r={34} labelY={24} labelX={340} anchor="start" />
      <Flag x={318} y={232} label="Grime" at={0.12} until={pass(232, s, e)} r={30} labelX={250} labelY={268} />

      {/* jet wash from the side, working top to bottom */}
      <Tool points={sweep(s, e, 470, true)}>
        <While from={FROM} to={TO}>
          <path d="M-4 0 L-100 -14 L-100 14 Z" fill="white" opacity="0.8" />
        </While>
        <path d="M0 0 L120 40" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        <rect x="-8" y="-5" width="14" height="10" rx="2" fill="#f59e0b" stroke={DARK} strokeWidth="2" />
      </Tool>

      {[[270, 170], [330, 240], [290, 310]].map(([x, y], i) => (
        <Sparkle key={y} x={x} y={y} at={DONE + i * 0.03} />
      ))}
      <Done x={420} y={150} label="Sanitised" at={DONE} anchor="start" />
    </>
  );
}

const BRICK = ["#c2653f", "#b85b36", "#cc7048", "#b5532f"];

function GraffitiScene() {
  const [s, e] = [90, 520];
  return (
    <>
      <rect width="600" height="372" fill="#e9c7b2" />
      {Array.from({ length: 15 }, (_, r) => r * 25).map((y, r) => (
        <g key={y}>
          {Array.from({ length: 11 }, (_, c) => c * 62 - (r % 2) * 31).map((x, c) => (
            <rect key={x} x={x + 2} y={y + 2} width="58" height="21" rx="2" fill={BRICK[(r + c) % BRICK.length]} />
          ))}
        </g>
      ))}

      <Wipe from={FROM} to={TO} start={s} end={e}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 250 C120 150 170 140 180 210 S230 290 250 190 S300 120 320 220 S380 280 400 180 S470 150 490 240" stroke="#111827" strokeWidth="30" />
          <path d="M110 250 C120 150 170 140 180 210 S230 290 250 190 S300 120 320 220 S380 280 400 180 S470 150 490 240" stroke="#a855f7" strokeWidth="20" />
          <path d="M140 170 l30 -24 M300 140 l26 -20 M430 170 l34 -18" stroke="#ec4899" strokeWidth="14" />
          <path d="M160 270 v30 M260 220 v44 M350 252 v36 M470 260 v28" stroke="#a855f7" strokeWidth="6" />
          <path d="M200 120 q60 -30 120 0" stroke="#facc15" strokeWidth="10" />
        </g>
      </Wipe>
      <Flag x={200} y={200} label="Graffiti" at={0.06} until={pass(200, s, e)} r={40} />
      <Flag x={350} y={272} label="Paint drips" at={0.12} until={pass(350, s, e)} r={26} />

      {/* specialist remover, sprayed down the wall */}
      <Tool points={sweep(s, e, 60)}>
        <While from={FROM} to={TO}>
          <path d="M0 8 L-24 270 L24 270 Z" fill="#bae6fd" opacity="0.6" />
        </While>
        <path d="M0 0 L60 -70" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        <rect x="-7" y="-5" width="14" height="14" rx="3" fill="white" stroke={DARK} strokeWidth="2.5" />
      </Tool>

      {[[180, 210], [320, 200], [450, 210]].map(([x, y], i) => (
        <Sparkle key={x} x={x} y={y} at={DONE + i * 0.03} size={14} />
      ))}
      <Done x={300} y={330} label="Graffiti gone" at={DONE} />
    </>
  );
}

const scenes: Record<ServiceSceneType, { Story: () => React.ReactElement; label: string }> = {
  gutter: { Story: GutterScene, label: "Animation: a blocked gutter and outlet are flagged, a gutter vacuum clears the leaves along the run, and water flows out of the downpipe" },
  rooftop: { Story: RooftopScene, label: "Animation: moss and lichen on a tiled roof are flagged, then a soft-wash spray clears them across the roof" },
  window: { Story: WindowScene, label: "Animation: grime and smears on a window are flagged, then a squeegee wipes the glass clear and it sparkles" },
  pressure: { Story: PressureScene, label: "Animation: algae and an oil stain on a driveway are flagged, then a pressure washer jet clears the paving" },
  bin: { Story: BinScene, label: "Animation: a smelly, grimy wheelie bin is flagged, then a jet wash cleans it top to bottom and it's sanitised" },
  graffiti: { Story: GraffitiScene, label: "Animation: graffiti and paint drips on a brick wall are flagged, then a remover spray clears the wall" },
};

export default function ServiceScene({ type, className = "", startAfter = 0 }: { type: ServiceSceneType; className?: string; startAfter?: number }) {
  const { Story, label } = scenes[type];
  return (
    <Scene label={label} className={className} startAfter={startAfter}>
      <Story />
    </Scene>
  );
}
