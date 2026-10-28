"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Appear, BRAND, DARK, Debris, Drone, Flash, Mark, Rain, SANS, Tag, Tiles, WATER } from "./parts";

// The chapters of the gutter story, each drawn in a 960 x 540 frame. Every
// chapter is one-shot: it mounts, plays on its delays, and is replaced.

/* ------------------------------------------------------------------ */
/* Close-ups the drone photographs - each drawn in 600 x 492           */

const SHOT_W = 600;
const SHOT_H = 492;

function Wall({ y, h }: { y: number; h: number }) {
  return (
    <g>
      <rect y={y} width={SHOT_W} height={h} fill="#e7e5e4" />
      {[60, 200, 340, 480].map((x) => (
        <rect key={x} x={x} y={y} width="50" height={h} fill="#f5f5f4" opacity="0.7" />
      ))}
    </g>
  );
}

function FrontGutterShot() {
  return (
    <g>
      <rect width={SHOT_W} height={SHOT_H} fill="#dfe8ec" />
      <Tiles x={0} y={0} w={SHOT_W} h={250} />
      {[[90, 200], [250, 226], [430, 210], [530, 232]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="34" ry="11" fill="#4d7c0f" opacity="0.85" />
      ))}
      <Wall y={296} h={196} />
      <rect y="248" width={SHOT_W} height="50" rx="6" fill="#111827" />
      <rect y="248" width={SHOT_W} height="8" fill="#374151" />
      <Debris x0={10} x1={590} y={262} density={1.3} />
    </g>
  );
}

function DownpipeShot() {
  return (
    <g>
      <rect width={SHOT_W} height={SHOT_H} fill="#e7e5e4" />
      <Wall y={0} h={SHOT_H} />
      <Tiles x={0} y={0} w={SHOT_W} h={40} />
      <rect y="38" width={SHOT_W} height="44" rx="6" fill="#111827" />
      <Debris x0={20} x1={580} y={50} density={1} />
      <rect x="268" y="80" width="64" height="412" fill="#1f2937" />
      <rect x="268" y="196" width="64" height="168" fill="#374151" stroke="#111827" strokeWidth="3" strokeDasharray="8 6" />
      <g fill="none" stroke="#92400e" strokeWidth="5" strokeLinecap="round">
        <path d="M282 200 C300 240 270 260 296 300 S282 340 300 360" />
        <path d="M318 204 C296 236 324 262 302 296 S322 330 306 358" />
        <path d="M290 230 q16 10 26 -4 M286 280 q20 6 30 -8 M296 320 q12 10 22 0" />
      </g>
      <Debris x0={276} x1={326} y={214} density={2} size={0.7} />
    </g>
  );
}

function SagShot() {
  return (
    <g>
      <rect width={SHOT_W} height={SHOT_H} fill="#dfe8ec" />
      <Tiles x={0} y={0} w={SHOT_W} h={190} />
      <Wall y={250} h={242} />
      <path d="M0 214 Q300 312 600 214" fill="none" stroke="#111827" strokeWidth="46" />
      <path d="M150 240 Q300 296 450 240 Q300 266 150 240 Z" fill={WATER} opacity="0.75" />
      <Debris x0={40} x1={150} y={222} density={0.8} />
      <Debris x0={450} x1={560} y={222} density={0.8} />
      {[0, 0.5].map((d) => (
        <motion.circle key={d} cx="300" r="5" fill={WATER} initial={{ cy: 300, opacity: 0 }} animate={{ cy: [300, 470], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: d, ease: "easeIn" }} />
      ))}
    </g>
  );
}

function OutletShot() {
  return (
    <g>
      <rect width={SHOT_W} height={SHOT_H} fill="#a3a3a3" />
      <Tiles x={0} y={0} w={SHOT_W} h={130} tile={46} row={30} />
      <rect y="132" width={SHOT_W} height="220" fill="#111827" />
      <rect y="150" width={SHOT_W} height="184" fill="#334155" />
      <rect y="168" width={SHOT_W} height="148" fill={WATER} opacity="0.45" />
      <circle cx="300" cy="242" r="36" fill="#0b0f19" />
      <Debris x0={250} x1={350} y={246} density={3} size={1.1} />
      <Debris x0={250} x1={350} y={232} density={2.4} size={0.9} />
      {[[80, 200], [160, 280], [440, 210], [520, 286], [380, 300], [120, 240]].map(([x, y], i) => (
        <ellipse key={x} cx={x} cy={y} rx="12" ry="6" fill={["#65a30d", "#a16207", "#4d7c0f"][i % 3]} transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
      <rect y="352" width={SHOT_W} height="140" fill="#d6d3d1" />
      {[60, 180, 300, 420, 540].map((x) => (
        <path key={x} d={`M${x} 352 V492`} stroke="#a8a29e" strokeWidth="3" />
      ))}
    </g>
  );
}

const shots = [
  { Shot: FrontGutterShot, tag: "FRONT GUTTER", spot: [300, 262], r: 40, label: "Moss build-up", drone: [380, 110], beam: 120 },
  { Shot: DownpipeShot, tag: "SIDE VIEW · DOWNPIPE", spot: [300, 282], r: 56, label: "Roots blocking downpipe", drone: [420, 130], beam: 120 },
  { Shot: SagShot, tag: "REAR GUTTER", spot: [300, 262], r: 50, label: "Standing water · sagging", drone: [400, 110], beam: 130 },
  { Shot: OutletShot, tag: "OUTLET · TOP VIEW", spot: [300, 242], r: 56, label: "Outlet blocked", drone: [420, 90], beam: 120 },
];

/* ------------------------------------------------------------------ */
/* 1. The drone arrives                                                 */

function Cloud({ x, y, s = 1, drift = 30 }: { x: number; y: number; s?: number; drift?: number }) {
  return (
    <motion.g initial={{ x: 0 }} animate={{ x: drift }} transition={{ duration: 6, ease: "linear" }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill="white" opacity="0.95">
        <ellipse cx="0" cy="0" rx="46" ry="22" />
        <ellipse cx="34" cy="-12" rx="34" ry="24" />
        <ellipse cx="70" cy="2" rx="40" ry="20" />
      </g>
    </motion.g>
  );
}

function Tree({ x }: { x: number }) {
  return (
    <g stroke="#78716c" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d={`M${x} 470 V330`} strokeWidth="9" />
      <path d={`M${x} 390 l-40 -46 M${x} 370 l38 -50 M${x} 350 l-26 -54 M${x - 40} 344 l-14 -24 M${x + 38} 320 l12 -26`} />
    </g>
  );
}

export function IntroChapter() {
  return (
    <g>
      <defs>
        <linearGradient id="gs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe3f3" />
          <stop offset="100%" stopColor="#eef6fb" />
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="url(#gs-sky)" />
      <Cloud x={110} y={90} />
      <Cloud x={650} y={70} s={1.2} drift={-24} />
      <Cloud x={420} y={120} s={0.8} drift={18} />
      <rect y="462" width="960" height="78" fill="#8fbf6a" />
      <Tree x={170} />
      <Tree x={800} />
      <rect x="350" y="262" width="260" height="200" fill="#f5efe6" stroke="#374151" strokeWidth="3" />
      <path d="M320 266 L480 150 L640 266 Z" fill="#b45309" stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
      <rect x="560" y="168" width="30" height="62" fill="#92400e" />
      <rect x="318" y="258" width="324" height="14" rx="4" fill="#1f2937" />
      <rect x="606" y="270" width="12" height="192" fill="#1f2937" />
      <Debris x0={330} x1={630} y={262} density={0.7} size={0.6} />
      <rect x="378" y="300" width="64" height="60" rx="3" fill="#bfdbfe" stroke="#374151" strokeWidth="3" />
      <rect x="518" y="300" width="64" height="60" rx="3" fill="#bfdbfe" stroke="#374151" strokeWidth="3" />
      <rect x="454" y="378" width="52" height="84" rx="3" fill={BRAND} stroke="#374151" strokeWidth="3" />
      <motion.g
        initial={{ x: -90, y: 430 }}
        animate={{ x: [-90, 150, 380, 470], y: [430, 170, 150, 196] }}
        transition={{ duration: 3, times: [0, 0.35, 0.75, 1], ease: "easeInOut" }}
      >
        <Drone />
      </motion.g>
      <Appear at={3.1} rise={0}>
        <motion.path d="M462 210 L478 210 L506 256 L434 256 Z" fill="#fde68a" animate={{ opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 1.2, repeat: Infinity }} />
      </Appear>
      <Tag x={480} y={92} text="Drone gutter inspection" at={3.4} fill={DARK} ink="white" size={20} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Every problem, photographed                                       */

const VF = { x: 24, y: 24 };
const SLOTS = [
  [664, 96],
  [800, 96],
  [664, 214],
  [800, 214],
];
const THUMB = 0.2; // 600 x 492 -> 120 x 98
const SHOT_MS = 3700;

function Brackets() {
  const c = 34;
  return (
    <g stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9">
      <path d={`M18 ${18 + c} V18 H${18 + c}`} />
      <path d={`M${SHOT_W - 18 - c} 18 H${SHOT_W - 18} V${18 + c}`} />
      <path d={`M18 ${SHOT_H - 18 - c} V${SHOT_H - 18} H${18 + c}`} />
      <path d={`M${SHOT_W - 18 - c} ${SHOT_H - 18} H${SHOT_W - 18} V${SHOT_H - 18 - c}`} />
    </g>
  );
}

export function InspectChapter() {
  const [i, setI] = useState(0);
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const fill = setTimeout(() => setFilled(i + 1), 2900);
    const next = i < shots.length - 1 ? setTimeout(() => setI(i + 1), SHOT_MS) : undefined;
    return () => {
      clearTimeout(fill);
      if (next) clearTimeout(next);
    };
  }, [i]);
  const s = shots[i];
  const [sx, sy] = SLOTS[i];

  return (
    <g>
      <rect width="960" height="540" fill="#e8eef2" />
      <defs>
        <clipPath id="gs-vf">
          <rect width={SHOT_W} height={SHOT_H} rx="18" />
        </clipPath>
      </defs>

      {/* the viewfinder */}
      <g transform={`translate(${VF.x} ${VF.y})`}>
        <g clipPath="url(#gs-vf)">
          <AnimatePresence mode="popLayout">
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <s.Shot />
              <motion.g initial={{ x: s.drone[0] - 220, y: s.drone[1] }} animate={{ x: s.drone[0], y: s.drone[1] }} transition={{ duration: 1, ease: "easeOut" }}>
                <Drone beam={s.beam} scale={0.9} />
              </motion.g>
              <Mark x={s.spot[0]} y={s.spot[1]} r={s.r} label={s.label} at={1.1} />
              <Flash w={SHOT_W} h={SHOT_H} at={2.05} />
            </motion.g>
          </AnimatePresence>
          <Brackets />
        </g>
        <rect x="26" y="28" width={s.tag.length * 10.5 + 26} height="30" rx="15" fill="#111827" opacity="0.8" />
        <text x="39" y="49" fontSize="15" fontWeight="800" fill="white" letterSpacing="1" fontFamily={SANS}>
          {s.tag}
        </text>
      </g>

      {/* the report filling up */}
      <rect x="648" y="24" width="288" height="492" rx="18" fill="white" />
      <text x="668" y="66" fontSize="20" fontWeight="800" fill="#111827" fontFamily={SANS}>
        Your report
      </text>
      <text x="916" y="66" textAnchor="end" fontSize="15" fontWeight="700" fill={BRAND} fontFamily={SANS}>
        {filled} {filled === 1 ? "photo" : "photos"}
      </text>
      {SLOTS.map(([x, y], k) => (
        <g key={k}>
          <rect x={x} y={y} width="120" height="98" rx="10" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
          {k < filled && (
            <g transform={`translate(${x} ${y}) scale(${THUMB})`}>
              <svg width={SHOT_W} height={SHOT_H} viewBox={`0 0 ${SHOT_W} ${SHOT_H}`}>
                <rect width={SHOT_W} height={SHOT_H} rx="50" fill="white" />
                {(() => {
                  const T = shots[k].Shot;
                  return <T />;
                })()}
              </svg>
            </g>
          )}
        </g>
      ))}
      <text x="792" y="350" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569" fontFamily={SANS}>
        Every photo goes
      </text>
      <text x="792" y="374" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569" fontFamily={SANS}>
        into your report
      </text>
      {[0, 1, 2, 3].map((k) => (
        <g key={k} transform={`translate(${672 + k * 62} 410)`}>
          <circle r="14" cx="14" cy="14" fill={k < filled ? BRAND : "#e2e8f0"} />
          {k < filled && <path d="M8 14.5l4 4 8-9" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}

      {/* the photo flying from the viewfinder into its slot */}
      <motion.g
        key={`fly-${i}`}
        initial={{ x: VF.x, y: VF.y, scale: 1, opacity: 0 }}
        animate={{ x: [VF.x, VF.x, sx], y: [VF.y, VF.y, sy], scale: [1, 1, THUMB], opacity: [0, 0.95, 0.95, 0] }}
        transition={{ delay: 2.15, duration: 0.8, times: [0, 0.05, 1], opacity: { delay: 2.15, duration: 0.85, times: [0, 0.05, 0.9, 1] } }}
        style={{ originX: 0, originY: 0 }}
      >
        <svg width={SHOT_W} height={SHOT_H} viewBox={`0 0 ${SHOT_W} ${SHOT_H}`} overflow="hidden">
          <rect width={SHOT_W} height={SHOT_H} rx="18" fill="white" />
          <s.Shot />
        </svg>
      </motion.g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 3. What blocked gutters cause                                        */

export function CausesChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#94a3b8" />
      <Tiles x={0} y={0} w={960} h={92} colour="#6b5b50" line="#4a3d35" />
      <rect y="88" width="960" height="44" fill="#d6c3a5" />
      {/* rot spreading in the fascia */}
      <Appear at={7.8} rise={0} dur={1.2}>
        {[[140, 106, 50], [300, 112, 34], [520, 104, 44], [760, 110, 38]].map(([x, y, rx]) => (
          <ellipse key={x} cx={x} cy={y} rx={rx} ry="12" fill="#57534e" opacity="0.75" />
        ))}
      </Appear>
      <rect y="150" width="960" height="390" fill="#f1ece4" />
      <rect x="620" y="250" width="180" height="170" rx="4" fill="#bfdbfe" stroke="white" strokeWidth="8" />
      <path d="M710 250 V420 M620 335 H800" stroke="white" strokeWidth="6" />

      {/* the gutter: the right half sags later */}
      <rect x="40" y="114" width="560" height="38" rx="8" fill="#111827" />
      <Debris x0={60} x1={590} y={122} density={0.9} size={0.8} />
      <motion.g initial={{ rotate: 0 }} animate={{ rotate: 7 }} transition={{ delay: 6.2, duration: 0.9, type: "spring", stiffness: 80, damping: 9 }} style={{ originX: 0, originY: 0.5 }}>
        <rect x="596" y="114" width="330" height="38" rx="8" fill="#111827" />
        <Debris x0={610} x1={910} y={122} density={0.9} size={0.8} />
      </motion.g>
      {/* water backing up in it */}
      <motion.rect x="48" y="122" width="540" height="26" fill={WATER} opacity="0.7" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1, duration: 1 }} style={{ originY: 1 }} />

      <Rain w={960} h={540} from={0.2} />

      {/* overflow, down the wall */}
      <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 2.1, duration: 1.4, ease: "easeIn" }} style={{ originY: 0 }}>
        <rect x="300" y="150" width="120" height="390" fill={WATER} opacity="0.55" />
        <path d="M320 150 V540 M352 150 V540 M392 150 V540" stroke="white" strokeWidth="3" opacity="0.6" />
      </motion.g>
      <Tag x={360} y={262} text="Overflow down your walls" at={2.9} />

      {/* damp and mould */}
      <motion.ellipse cx="360" cy="390" rx="150" ry="100" fill="#78716c" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.32 }} transition={{ delay: 4.2, duration: 1.4 }} style={{ originX: 0.5, originY: 0.5 }} />
      {[[628, 262], [640, 280], [790, 262], [780, 404], [632, 408], [656, 252], [794, 290]].map(([x, y], k) => (
        <motion.circle key={k} cx={x} cy={y} r={7 + (k % 3) * 3} fill="#1c1917" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 4.6 + k * 0.12, type: "spring", stiffness: 300 }} style={{ originX: 0.5, originY: 0.5 }} />
      ))}
      <Tag x={710} y={448} text="Damp & mould" at={5.1} />
      <Tag x={790} y={190} text="Gutters bend & break" at={6.8} />
      <Tag x={170} y={172} text="Rotten fascia boards" at={8.3} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Then we clear it                                                  */

export function ClearChapter() {
  const [from, dur] = [0.8, 3];
  return (
    <g>
      <defs>
        <clipPath id="gs-dirt">
          <motion.rect y="0" width="960" height="540" initial={{ x: 0 }} animate={{ x: 870 }} transition={{ delay: from, duration: dur, ease: "linear" }} />
        </clipPath>
      </defs>
      <rect width="960" height="540" fill="#e0f2fe" />
      <Tiles x={0} y={0} w={960} h={262} />
      <rect y="320" width="960" height="220" fill="#f1ece4" />
      <rect y="258" width="880" height="62" rx="8" fill="#111827" />
      <rect x="860" y="258" width="62" height="282" fill="#111827" />
      <g clipPath="url(#gs-dirt)">
        <Debris x0={20} x1={860} y={272} density={1.3} />
        {[[120, 230], [380, 238], [640, 226]].map(([x, y]) => (
          <ellipse key={x} cx={x} cy={y} rx="40" ry="12" fill="#4d7c0f" opacity="0.85" />
        ))}
      </g>
      {/* gutter vac nozzle on its pole */}
      <motion.g initial={{ x: 0, opacity: 0 }} animate={{ x: [0, 0, 870], opacity: [0, 1, 1] }} transition={{ delay: from - 0.4, duration: dur + 0.4, times: [0, 0.12, 1], ease: "linear" }}>
        <path d="M0 270 L-110 560" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
        <rect x="-26" y="254" width="52" height="30" rx="9" fill="white" stroke={DARK} strokeWidth="4" />
        {[0, 1, 2].map((k) => (
          <motion.circle key={k} cx={-6 + k * 8} r="4" fill="#a16207" animate={{ cy: [262, 238], opacity: [1, 0] }} transition={{ duration: 0.4, repeat: Infinity, delay: k * 0.13 }} />
        ))}
      </motion.g>
      {/* and the water runs */}
      <Appear at={from + dur + 0.2} rise={0}>
        <motion.path d="M30 288 H880" stroke={WATER} strokeWidth="10" strokeLinecap="round" strokeDasharray="26 22" animate={{ strokeDashoffset: [0, -96] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M891 300 V540" stroke={WATER} strokeWidth="12" strokeLinecap="round" strokeDasharray="26 22" animate={{ strokeDashoffset: [0, -96] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} />
      </Appear>
      <Tag x={440} y={390} text="Flowing freely" at={from + dur + 0.6} fill="#16a34a" ink="white" size={26} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Your report, straight to your inbox                               */

const rows: [string, "YES" | "NO"][] = [
  ["Moss & plant growth", "YES"],
  ["Downpipes clear?", "NO"],
  ["Gutter bending / damage", "YES"],
  ["Standing water", "YES"],
];

export function ReportChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#e8eef2" />
      <motion.g initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <rect x="250" y="18" width="460" height="504" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
        <text x="276" y="58" fontSize="24" fontWeight="800" fill={DARK} fontFamily={SANS}>
          Cleano
        </text>
        <text x="684" y="50" textAnchor="end" fontSize="11" fontWeight="700" fill="#94a3b8" letterSpacing="1" fontFamily={SANS}>
          INSPECTION REPORT
        </text>
        <text x="684" y="66" textAnchor="end" fontSize="13" fontWeight="700" fill="#334155" fontFamily={SANS}>
          Drone gutter survey
        </text>
        <rect x="642" y="6" width="64" height="22" rx="6" fill="#facc15" transform="rotate(6 674 17)" />
        <text x="674" y="22" textAnchor="middle" fontSize="12" fontWeight="800" fill="#713f12" fontFamily={SANS} transform="rotate(6 674 17)">
          SAMPLE
        </text>
        <rect x="270" y="86" width="420" height="28" rx="6" fill={DARK} />
        <text x="284" y="105" fontSize="13" fontWeight="800" fill="white" letterSpacing="1" fontFamily={SANS}>
          GUTTERS, DOWNPIPES &amp; ROOF
        </text>
      </motion.g>

      {rows.map(([label, answer], k) => {
        const y = 140 + k * 34;
        return (
          <Appear key={label} at={0.5 + k * 0.3} rise={6}>
            <text x="276" y={y + 5} fontSize="15" fontWeight="600" fill="#334155" fontFamily={SANS}>
              {label}
            </text>
            {(["YES", "NO"] as const).map((v, n) => (
              <g key={v}>
                <rect x={612 + n * 40} y={y - 11} width="36" height="22" rx="6" fill={v === answer ? "#f97316" : "#f1f5f9"} />
                <text x={630 + n * 40} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={v === answer ? "white" : "#94a3b8"} fontFamily={SANS}>
                  {v}
                </text>
              </g>
            ))}
          </Appear>
        );
      })}

      <Appear at={1.8} rise={6}>
        <rect x="270" y="282" width="420" height="28" rx="6" fill={DARK} />
        <text x="284" y="301" fontSize="13" fontWeight="800" fill="white" letterSpacing="1" fontFamily={SANS}>
          INSPECTION PHOTOS
        </text>
      </Appear>
      {shots.map(({ Shot }, k) => (
        <motion.g key={k} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.1 + k * 0.22, type: "spring", stiffness: 260, damping: 18 }} style={{ originX: 0.5, originY: 0.5 }}>
          <g transform={`translate(${270 + k * 106} 322) scale(${100 / SHOT_W})`}>
            <svg width={SHOT_W} height={SHOT_H} viewBox={`0 0 ${SHOT_W} ${SHOT_H}`}>
              <Shot />
            </svg>
          </g>
        </motion.g>
      ))}
      <Appear at={3.2} rise={6}>
        <rect x="270" y="430" width="420" height="40" rx="10" fill="#ecfdf5" stroke="#86efac" strokeWidth="2" />
        <circle cx="294" cy="450" r="10" fill="#16a34a" />
        <path d="M289 450.5l3.6 3.6 6.4-7" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="314" y="456" fontSize="16" fontWeight="700" fill={DARK} fontFamily={SANS}>
          Emailed straight to you
        </text>
      </Appear>

      {/* the notification */}
      <motion.g initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 3.9, type: "spring", stiffness: 140, damping: 16 }}>
        <rect x="560" y="452" width="380" height="72" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
        <rect x="576" y="466" width="44" height="44" rx="11" fill={DARK} />
        <path d="M588 480 h20 v16 h-20 z M588 480 l10 8 10 -8" fill="none" stroke="#33e6a6" strokeWidth="2.6" strokeLinejoin="round" />
        <text x="634" y="484" fontSize="16" fontWeight="800" fill="#111827" fontFamily={SANS}>
          Cleano · Your report is ready
        </text>
        <text x="634" y="506" fontSize="14" fill="#64748b" fontFamily={SANS}>
          4 issues found · photos attached
        </text>
      </motion.g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 6. End card                                                          */

export function EndChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="white" />
      <motion.g initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ originX: 0.5, originY: 0.5 }}>
        <image href="/brand/cleano-logo.png" x="250" y="160" width="460" height={(460 * 1162) / 4491} />
      </motion.g>
      <Appear at={0.5}>
        <text x="480" y="372" textAnchor="middle" fontSize="34" fontWeight="800" fill={DARK} fontFamily={SANS}>
          www.cleano.services
        </text>
        <text x="480" y="414" textAnchor="middle" fontSize="24" fontWeight="600" fill="#64748b" fontFamily={SANS}>
          020 3370 4040
        </text>
      </Appear>
    </g>
  );
}
