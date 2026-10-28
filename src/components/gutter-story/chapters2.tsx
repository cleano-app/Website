"use client";

import { motion } from "framer-motion";
import { Appear, DARK, Debris, Drone, Flash, Rain, SANS, Tag, Tiles, WATER } from "./parts";
import { FrontGutterShot, SHOT_H, SHOT_W } from "./chapters";

// The longer story's added chapters: five on the damage blocked gutters
// do, four on how the clean is done. All 960 x 540, one-shot.

const GREEN_TICK = "#16a34a";

function Grow({ at, dur = 1, from = "top", children }: { at: number; dur?: number; from?: "top" | "bottom" | "centre" | "left"; children: React.ReactNode }) {
  const style =
    from === "top" ? { originY: 0 } : from === "bottom" ? { originY: 1 } : from === "left" ? { originX: 0 } : { originX: 0.5, originY: 0.5 };
  const initial = from === "centre" ? { scale: 0, opacity: 0 } : from === "left" ? { scaleX: 0 } : { scaleY: 0 };
  const animate = from === "centre" ? { scale: 1, opacity: 1 } : from === "left" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <motion.g initial={initial} animate={animate} transition={{ delay: at, duration: dur, ease: "easeOut" }} style={style}>
      {children}
    </motion.g>
  );
}

function Pop({ at, children }: { at: number; children: React.ReactNode }) {
  return (
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: at, type: "spring", stiffness: 320, damping: 15 }} style={{ originX: 0.5, originY: 0.5 }}>
      {children}
    </motion.g>
  );
}

function Tick({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <Pop at={at}>
      <circle cx={x} cy={y} r="16" fill={GREEN_TICK} />
      <path d={`M${x - 7} ${y + 0.5}l5 5 9-10`} fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </Pop>
  );
}

function Render({ y, h, colour = "#efe7da" }: { y: number; h: number; colour?: string }) {
  return <rect y={y} width="960" height={h} fill={colour} />;
}

/* ------------------------------------------------------------------ */
/* The damage                                                           */

export function WallsChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#94a3b8" />
      <Tiles x={0} y={0} w={960} h={92} colour="#6b5b50" line="#4a3d35" />
      <rect y="88" width="960" height="44" fill="#d6c3a5" />
      <Render y={150} h={390} />
      <rect x="610" y="250" width="160" height="150" rx="4" fill="#bfdbfe" stroke="white" strokeWidth="8" />
      <rect x="30" y="114" width="900" height="38" rx="8" fill="#111827" />
      <Debris x0={50} x1={910} y={122} density={1} size={0.8} />
      <motion.rect x="38" y="122" width="884" height="26" fill={WATER} opacity="0.7" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.7, duration: 0.9 }} style={{ originY: 1 }} />
      <Rain w={960} h={540} from={0.1} />
      {[250, 820].map((x) => (
        <Grow key={x} at={1.5} dur={1.3}>
          <rect x={x} y="150" width="90" height="390" fill={WATER} opacity="0.5" />
          <path d={`M${x + 18} 150 V540 M${x + 48} 150 V540 M${x + 74} 150 V540`} stroke="white" strokeWidth="3" opacity="0.6" />
        </Grow>
      ))}
      {/* the staining it leaves behind */}
      <Appear at={3.4} rise={0} dur={1.4}>
        {[240, 262, 330, 344, 812, 840, 902].map((x, i) => (
          <path key={x} d={`M${x} 160 q${i % 2 ? 8 : -8} 120 0 ${220 + (i % 3) * 60}`} stroke={i % 2 ? "#4d7c0f" : "#57534e"} strokeWidth={10 + (i % 3) * 4} strokeLinecap="round" opacity="0.45" fill="none" />
        ))}
        <ellipse cx="295" cy="520" rx="110" ry="30" fill="#4d7c0f" opacity="0.4" />
        <ellipse cx="865" cy="520" rx="90" ry="26" fill="#4d7c0f" opacity="0.4" />
      </Appear>
      <Tag x={295} y={230} text="Overflow down your walls" at={2.3} />
      <Tag x={620} y={450} text="Green algae & staining" at={4.2} />
      <Tag x={480} y={300} text="Walls stay wet" at={5.6} />
    </g>
  );
}

export function DampChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#f3ede4" />
      <rect width="960" height="88" fill="#fafaf9" />
      <path d="M0 88 H960" stroke="#d6d3d1" strokeWidth="6" />
      <rect y="458" width="960" height="14" fill="white" />
      <rect y="472" width="960" height="68" fill="#c8a27a" />
      {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${i * 130} 472 V540`} stroke="#a47e58" strokeWidth="3" />)}
      <rect x="600" y="150" width="210" height="230" rx="4" fill="#dbeafe" stroke="white" strokeWidth="12" />
      <path d="M705 150 V380" stroke="white" strokeWidth="8" />
      <Appear at={0.8} rise={0} dur={1}>
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={616 + ((i * 47) % 178)} cy={170 + ((i * 71) % 196)} r={3 + (i % 3)} fill="#93c5fd" opacity="0.8" />
        ))}
      </Appear>
      {/* damp spreading in from the corner */}
      <Grow at={1} dur={1.8} from="centre">
        <path d="M0 88 H380 C340 150 360 220 290 260 C220 300 150 330 0 340 Z" fill="#a8a29e" opacity="0.45" />
        <path d="M380 88 C340 150 360 220 290 260 C220 300 150 330 0 340" fill="none" stroke="#78716c" strokeWidth="5" opacity="0.6" />
      </Grow>
      {/* paint bubbling and peeling */}
      {[[220, 220], [300, 180], [150, 280]].map(([x, y], i) => (
        <Pop key={x} at={3 + i * 0.25}>
          <path d={`M${x} ${y} q18 -14 30 4 q-10 4 -16 18 q-8 -10 -14 -22 Z`} fill="#fafaf9" stroke="#a8a29e" strokeWidth="2" />
        </Pop>
      ))}
      {/* black mould in the corners */}
      {[[30, 100], [60, 110], [100, 96], [40, 140], [140, 104], [80, 132], [610, 160], [626, 180], [796, 162], [612, 366], [640, 372], [794, 368]].map(([x, y], i) => (
        <Pop key={i} at={3.8 + i * 0.1}>
          <circle cx={x} cy={y} r={6 + (i % 3) * 3} fill={i % 4 === 0 ? "#14532d" : "#1c1917"} opacity="0.85" />
        </Pop>
      ))}
      <Tag x={280} y={370} text="Damp spreads in from outside" at={1.8} />
      <Tag x={300} y={290} text="Peeling paint" at={3.3} fill="#e7e5e4" ink="#44403c" />
      <Tag x={705} y={410} text="Black mould" at={4.6} />
    </g>
  );
}

export function FasciaChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#cbd5e1" />
      <Tiles x={0} y={0} w={960} h={150} colour="#6b5b50" line="#4a3d35" />
      <rect y="148" width="960" height="104" fill="#d6c3a5" />
      {[170, 196, 222].map((y) => <path key={y} d={`M0 ${y} H960`} stroke="#c0a985" strokeWidth="2" />)}
      <Render y={290} h={250} />
      {/* rot spreading through the board */}
      {[[150, 200, 90], [430, 196, 70], [690, 204, 110]].map(([x, y, rx], i) => (
        <Grow key={x} at={0.7 + i * 0.3} dur={1.4} from="centre">
          <ellipse cx={x} cy={y} rx={rx} ry="40" fill="#57534e" opacity="0.7" />
          <ellipse cx={x + 20} cy={y + 6} rx={rx * 0.5} ry="22" fill="#292524" opacity="0.6" />
        </Grow>
      ))}
      {/* crumbling bits falling */}
      {[[170, 0], [700, 0.3], [440, 0.6], [740, 0.9]].map(([x, d]) => (
        <motion.rect key={x} x={x} y="236" width="12" height="9" fill="#78716c" initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 0, 300], opacity: [0, 1, 0] }} transition={{ delay: 2.6 + d, duration: 1.2, times: [0, 0.1, 1], ease: "easeIn" }} />
      ))}
      {/* the gutter on its brackets - the right half gives way */}
      <rect x="0" y="232" width="560" height="56" rx="8" fill="#111827" />
      <Debris x0={20} x1={550} y={244} density={1} />
      {[180, 420].map((x) => <rect key={x} x={x} y="284" width="22" height="16" fill="#9ca3af" />)}
      <motion.g initial={{ rotate: 0 }} animate={{ rotate: 9 }} transition={{ delay: 4.4, type: "spring", stiffness: 70, damping: 8 }} style={{ originX: 0, originY: 0.5 }}>
        <rect x="556" y="232" width="404" height="56" rx="8" fill="#111827" />
        <Debris x0={570} x1={950} y={244} density={1} />
      </motion.g>
      <motion.rect x="760" y="284" width="22" height="16" fill="#9ca3af" initial={{ y: 0, rotate: 0 }} animate={{ y: 220, rotate: 70 }} transition={{ delay: 4, duration: 0.9, ease: "easeIn" }} style={{ originX: 0.5, originY: 0.5 }} />
      <Tag x={260} y={320} text="Fascia boards rot" at={1.5} />
      <Tag x={770} y={360} text="Brackets pull away" at={4} />
      <Tag x={600} y={440} text="Gutters sag & fall" at={5.1} />
    </g>
  );
}

export function FoundationsChapter() {
  return (
    <g>
      <Render y={0} h={330} />
      <rect x="640" y="0" width="44" height="300" fill="#1f2937" />
      <path d="M640 300 h60 v14 h-60 z" fill="#1f2937" />
      <rect y="330" width="960" height="210" fill="#8b6b4a" />
      <rect y="330" width="960" height="18" fill="#6b8f4e" />
      <rect x="0" y="330" width="600" height="140" fill="#a8a29e" />
      <path d="M0 470 H600" stroke="#78716c" strokeWidth="4" />
      {/* water pouring out at the bottom of the blocked pipe */}
      <motion.path d="M660 318 C670 324 690 324 700 318" stroke={WATER} strokeWidth="18" strokeLinecap="round" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      {[0, 0.3, 0.6].map((d) => (
        <motion.circle key={d} cx="690" r="7" fill={WATER} initial={{ cy: 318, opacity: 0 }} animate={{ cy: [318, 336], opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 + d }} />
      ))}
      <Grow at={0.8} dur={1.2} from="centre">
        <ellipse cx="690" cy="336" rx="160" ry="14" fill={WATER} opacity="0.75" />
      </Grow>
      {/* soaking down into the ground and under the foundations */}
      <Grow at={1.8} dur={2}>
        <path d="M540 340 C520 420 470 480 380 540 H900 C860 470 840 400 840 340 Z" fill={WATER} opacity="0.32" />
      </Grow>
      {[[600, 0], [720, 0.4], [800, 0.8], [520, 1.2]].map(([x, d]) => (
        <motion.circle key={x} cx={x} r="5" fill={WATER} initial={{ cy: 350, opacity: 0 }} animate={{ cy: [350, 520], opacity: [0, 0.9, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 2 + d, ease: "easeIn" }} />
      ))}
      {/* a crack running up the wall */}
      <motion.path d="M430 330 L410 290 L436 250 L414 206 L440 162 L424 120" fill="none" stroke="#44403c" strokeWidth="5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 4.2, duration: 1.4, ease: "easeInOut" }} />
      <motion.path d="M440 330 L452 380 L432 420" fill="none" stroke="#44403c" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 4.6, duration: 0.8 }} />
      <Tag x={760} y={262} text="Water pools at the base" at={1.1} />
      <Tag x={290} y={392} text="Soaks the foundations" at={2.8} fill="white" ink="#1f2937" />
      <Tag x={560} y={150} text="Cracks can appear" at={5} />
    </g>
  );
}

export function RoofLeakChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#cbd5e1" />
      {/* loft space under the roof */}
      <path d="M90 372 L660 70 H960 V410 H90 Z" fill="#e7dcc8" />
      {[300, 480, 660, 840].map((x) => <path key={x} d={`M${x} ${x < 660 ? 372 - ((x - 90) * 302) / 570 : 70} V410`} stroke="#a8875f" strokeWidth="12" />)}
      <rect x="90" y="404" width="870" height="16" fill="#a8875f" />
      <rect x="0" y="420" width="960" height="120" fill="#fafaf9" />
      {/* the roof slope, in tiles */}
      <path d="M20 360 L660 22 L700 40 L60 382 Z" fill="#6b5b50" />
      {Array.from({ length: 12 }, (_, i) => {
        const t = (i + 1) / 13;
        const [x1, y1] = [20 + 640 * t, 360 - 338 * t];
        return <path key={i} d={`M${x1} ${y1} l40 20`} stroke="#4a3d35" strokeWidth="3" />;
      })}
      {/* the blocked gutter at the eave */}
      <rect x="0" y="372" width="96" height="40" rx="8" fill="#111827" />
      <Debris x0={6} x1={90} y={380} density={1.6} size={0.8} />
      <Rain w={960} h={540} from={0.1} />
      {/* water forced back up under the tiles */}
      <motion.path d="M70 378 C110 364 150 352 210 318" fill="none" stroke={WATER} strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
      {/* drips inside the loft */}
      {[[220, 0], [300, 0.35], [250, 0.7]].map(([x, d]) => (
        <motion.circle key={x} cx={x} r="6" fill={WATER} initial={{ cy: x === 300 ? 270 : 310, opacity: 0 }} animate={{ cy: [x === 300 ? 270 : 310, 404], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 2 + d, ease: "easeIn" }} />
      ))}
      {/* the stain on the ceiling below, and drips into the room */}
      <Grow at={3.3} dur={1.4} from="centre">
        <ellipse cx="260" cy="432" rx="120" ry="18" fill="#a8a29e" opacity="0.7" />
        <ellipse cx="260" cy="432" rx="70" ry="10" fill="#78716c" opacity="0.6" />
      </Grow>
      {[0, 0.5].map((d) => (
        <motion.circle key={d} cx="262" r="6" fill={WATER} initial={{ cy: 440, opacity: 0 }} animate={{ cy: [440, 530], opacity: [0, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 4.4 + d, ease: "easeIn" }} />
      ))}
      <Tag x={430} y={250} text="Water backs up under the tiles" at={1.5} />
      <Tag x={600} y={350} text="Leaks into the loft" at={2.6} />
      <Tag x={520} y={470} text="Stains on your ceiling" at={4} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* How we clean                                                         */

export function OutletChapter() {
  return (
    <g>
      <Tiles x={0} y={0} w={960} h={150} tile={46} row={30} />
      <rect y="152" width="960" height="236" fill="#111827" />
      <rect y="170" width="960" height="200" fill="#334155" />
      <motion.rect y="190" width="960" height="160" fill={WATER} opacity="0.45" initial={{ opacity: 0.45 }} animate={{ opacity: 0 }} transition={{ delay: 2.6, duration: 1.2 }} />
      <circle cx="480" cy="270" r="44" fill="#0b0f19" />
      {/* the clog, lifted out by the vac */}
      <motion.g initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -60 }} transition={{ delay: 1.2, duration: 1.4, ease: "easeIn" }}>
        <Debris x0={420} x1={540} y={276} density={3.2} size={1.2} />
        <Debris x0={430} x1={530} y={260} density={2.6} size={1} />
      </motion.g>
      {/* water swirling away once it's clear */}
      <motion.circle cx="480" cy="270" r="30" fill="none" stroke={WATER} strokeWidth="6" strokeDasharray="30 18" initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: [0, 1, 0], rotate: 360 }} transition={{ delay: 2.6, duration: 1.6 }} style={{ originX: 0.5, originY: 0.5 }} />
      <rect y="388" width="960" height="152" fill="#d6d3d1" />
      <motion.g initial={{ y: -260 }} animate={{ y: [-260, 0, 0, -300] }} transition={{ delay: 0.3, duration: 3.6, times: [0, 0.22, 0.75, 1], ease: "easeInOut" }}>
        <path d="M480 200 L620 -60" stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
        <rect x="448" y="186" width="64" height="38" rx="12" fill="white" stroke={DARK} strokeWidth="4" />
        {[0, 1, 2].map((k) => (
          <motion.ellipse key={k} cx={470 + k * 10} rx="7" ry="4" fill={["#65a30d", "#a16207", "#4d7c0f"][k]} animate={{ cy: [250, 200], opacity: [1, 0] }} transition={{ duration: 0.45, repeat: 5, delay: 1.2 + k * 0.15 }} />
        ))}
      </motion.g>
      <Tag x={480} y={420} text="Outlets cleared" at={3.4} fill={GREEN_TICK} ink="white" />
    </g>
  );
}

export function DownpipeChapter() {
  return (
    <g>
      <Render y={0} h={540} colour="#ece6dc" />
      <rect x="430" y="0" width="100" height="510" fill="#1f2937" />
      <path d="M430 500 h130 v20 h-130 z" fill="#1f2937" />
      <rect x="442" y="120" width="76" height="300" fill="#475569" stroke="#111827" strokeWidth="3" strokeDasharray="10 8" />
      {/* water from the top, pushing the clog down and out */}
      <Grow at={0.5} dur={1.2}>
        <rect x="446" y="120" width="68" height="130" fill={WATER} opacity="0.75" />
      </Grow>
      <motion.g initial={{ y: 0 }} animate={{ y: [0, 0, 300], opacity: [1, 1, 0] }} transition={{ delay: 1.4, duration: 1.8, times: [0, 0.15, 1], ease: "easeIn" }}>
        <g fill="none" stroke="#92400e" strokeWidth="5" strokeLinecap="round">
          <path d="M452 250 C470 270 450 290 470 310 M506 252 C490 276 510 292 492 312" />
        </g>
        <Debris x0={450} x1={510} y={264} density={2.4} size={0.8} />
      </motion.g>
      <Grow at={2.2} dur={1.1}>
        <rect x="446" y="250" width="68" height="250" fill={WATER} opacity="0.75" />
      </Grow>
      {[0, 0.25, 0.5].map((d) => (
        <motion.circle key={d} cx="568" r="7" fill={WATER} initial={{ cy: 510, opacity: 0 }} animate={{ cy: [510, 540], cx: [568, 600], opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 3.2 + d }} />
      ))}
      <motion.path d="M480 -10 V110" stroke={WATER} strokeWidth="12" strokeLinecap="round" strokeDasharray="20 16" initial={{ opacity: 0 }} animate={{ opacity: 1, strokeDashoffset: [0, -72] }} transition={{ opacity: { delay: 0.3 }, strokeDashoffset: { duration: 0.6, repeat: Infinity, ease: "linear" } }} />
      <Tag x={720} y={260} text="Roots & silt flushed out" at={2.4} />
      <Tag x={720} y={420} text="Downpipes running clear" at={3.6} fill={GREEN_TICK} ink="white" />
    </g>
  );
}

export function FlowTestChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#e0f2fe" />
      <Tiles x={0} y={0} w={960} h={232} />
      <Render y={290} h={250} />
      <rect x="20" y="230" width="880" height="60" rx="8" fill="#111827" />
      <rect x="860" y="268" width="56" height="272" fill="#111827" />
      {[300, 580].map((x) => <rect key={x} x={x} y="230" width="10" height="60" fill="#374151" />)}
      {/* the hose at the far end */}
      <path d="M40 120 C60 150 70 170 80 200" stroke="#16a34a" strokeWidth="12" fill="none" strokeLinecap="round" />
      <motion.path d="M80 200 V252" stroke={WATER} strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
      <Appear at={0.8} rise={0}>
        <motion.path d="M90 258 H880" stroke={WATER} strokeWidth="12" strokeLinecap="round" strokeDasharray="28 20" animate={{ strokeDashoffset: [0, -96] }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
      </Appear>
      <Appear at={1.8} rise={0}>
        <motion.path d="M888 270 V540" stroke={WATER} strokeWidth="14" strokeLinecap="round" strokeDasharray="28 20" animate={{ strokeDashoffset: [0, -96] }} transition={{ duration: 0.55, repeat: Infinity, ease: "linear" }} />
      </Appear>
      <Tick x={305} y={322} at={2.8} />
      <Tick x={585} y={322} at={3.2} />
      <Tag x={445} y={346} text="No leaks at the joints" at={3.5} fill="white" ink="#14532d" />
      <Tag x={460} y={440} text="Water test: flowing freely" at={4.3} fill={GREEN_TICK} ink="white" size={28} />
    </g>
  );
}

export function AfterPhotosChapter() {
  return (
    <g>
      <rect width="960" height="540" fill="#e8eef2" />
      <defs>
        <clipPath id="gs-after-vf">
          <rect width={SHOT_W} height={SHOT_H} rx="18" />
        </clipPath>
      </defs>
      <g transform="translate(24 24)">
        <g clipPath="url(#gs-after-vf)">
          <FrontGutterShot clean />
          <motion.g initial={{ x: 160, y: 110 }} animate={{ x: 380, y: 110 }} transition={{ duration: 1, ease: "easeOut" }}>
            <Drone beam={120} scale={0.9} />
          </motion.g>
          <motion.circle cx="300" cy="262" r="46" fill="none" stroke={GREEN_TICK} strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.6 }} />
          <Flash w={SHOT_W} h={SHOT_H} at={2} />
        </g>
        <rect x="26" y="28" width="150" height="30" rx="15" fill="#111827" opacity="0.8" />
        <text x="39" y="49" fontSize="15" fontWeight="800" fill="white" letterSpacing="1" fontFamily={SANS}>
          AFTER PHOTO
        </text>
      </g>
      <rect x="648" y="24" width="288" height="492" rx="18" fill="white" />
      <text x="668" y="66" fontSize="20" fontWeight="800" fill="#111827" fontFamily={SANS}>
        Before &amp; after
      </text>
      {[
        { clean: false, y: 90, label: "Before", at: 0.3 },
        { clean: true, y: 268, label: "After", at: 2.4 },
      ].map((p) => (
        <Appear key={p.label} at={p.at} rise={12}>
          <g transform={`translate(668 ${p.y}) scale(${248 / SHOT_W})`}>
            <svg width={SHOT_W} height={SHOT_H} viewBox={`0 0 ${SHOT_W} ${SHOT_H}`}>
              <FrontGutterShot clean={p.clean} />
            </svg>
          </g>
          <rect x="676" y={p.y + 8} width={p.clean ? 62 : 70} height="24" rx="12" fill={p.clean ? GREEN_TICK : "#44403c"} />
          <text x={p.clean ? 707 : 711} y={p.y + 25} textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily={SANS}>
            {p.label}
          </text>
        </Appear>
      ))}
      <Tag x={324} y={346} text="All clear" at={1.4} fill={GREEN_TICK} ink="white" />
    </g>
  );
}
