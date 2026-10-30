import type { IconName } from "@/parsha/lib/content";

// Simple outline icons on a 60×60 grid: thick lines, white fill, no text.
// Drawn as <g> so they can sit inside a maze, a counting grid or a scene.
const SHAPES: Record<IconName, React.ReactNode> = {
  bread: (
    <>
      <path d="M8,38 C8,24 19,18 30,18 C41,18 52,24 52,38 L52,44 Q52,47 49,47 L11,47 Q8,47 8,44 Z" />
      <path d="M19,27 L23,35 M28,25 L32,33 M37,27 L41,35" />
    </>
  ),
  jug: (
    <>
      <path d="M43,22 Q54,23 52,33 Q50,40 44,40" fill="none" />
      <path d="M22,12 L38,12 L38,17 Q48,25 46,38 Q44,52 30,52 Q16,52 14,38 Q12,25 22,17 Z" />
      <path d="M19,10 L41,10" />
    </>
  ),
  bowl: (
    <>
      <path d="M22,47 L38,47 L36,53 L24,53 Z" />
      <path d="M12,28 Q20,20 30,22 Q40,20 48,28" />
      <path d="M7,28 L53,28 Q51,46 30,48 Q9,46 7,28 Z" />
    </>
  ),
  stone: (
    <>
      <path d="M10,42 Q7,30 18,24 Q28,16 40,22 Q53,26 50,38 Q48,48 32,48 Q14,50 10,42 Z" />
      <path d="M26,30 Q30,33 34,31" fill="none" />
    </>
  ),
  tent: (
    <>
      <path d="M30,10 L30,3 L39,6 L30,9" />
      <path d="M5,52 L30,10 L55,52 Z" />
      <path d="M23,52 L30,33 L37,52" fill="none" />
    </>
  ),
  well: (
    <>
      <path d="M16,30 L16,13 M44,30 L44,13" />
      <path d="M9,15 L30,4 L51,15 Z" />
      <path d="M30,13 L30,21" />
      <path d="M26,21 L34,21 L33,27 L27,27 Z" />
      <path d="M12,30 L48,30 L48,53 L12,53 Z" />
      <path d="M12,38 L48,38 M12,46 L48,46 M24,30 L24,38 M36,30 L36,38 M18,38 L18,46 M30,38 L30,46 M42,38 L42,46 M24,46 L24,53 M36,46 L36,53" />
    </>
  ),
  pot: (
    <>
      <path d="M22,17 Q19,12 23,7 M30,17 Q27,12 31,6 M38,17 Q35,12 39,7" fill="none" />
      <path d="M11,30 Q4,30 5,26 Q6,23 11,25 M49,30 Q56,30 55,26 Q54,23 49,25" fill="none" />
      <path d="M10,22 L50,22 L48,44 Q46,51 39,51 L21,51 Q14,51 12,44 Z" />
      <path d="M7,22 L53,22" />
    </>
  ),
  footprints: (
    <>
      <ellipse cx="20" cy="38" rx="7" ry="11" />
      <circle cx="15" cy="23" r="2.2" />
      <circle cx="20" cy="22" r="2.4" />
      <circle cx="25" cy="23" r="2.2" />
      <ellipse cx="40" cy="28" rx="7" ry="11" />
      <circle cx="35" cy="13" r="2.2" />
      <circle cx="40" cy="12" r="2.4" />
      <circle cx="45" cy="13" r="2.2" />
    </>
  ),
  table: (
    <>
      <path d="M13,30 L13,52 M47,30 L47,52" />
      <path d="M7,24 L53,24 L53,30 L7,30 Z" />
    </>
  ),
};

export function Icon({
  name,
  x = 0,
  y = 0,
  size = 60,
  sw,
}: {
  name: IconName;
  x?: number;
  y?: number;
  size?: number;
  /** Stroke width in the icon's own 60-unit grid; left out, it inherits. */
  sw?: number;
}) {
  return (
    <g
      transform={`translate(${x},${y}) scale(${size / 60})`}
      fill="#fff"
      stroke="#111"
      strokeWidth={sw ?? (60 / size) * 4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SHAPES[name]}
    </g>
  );
}
