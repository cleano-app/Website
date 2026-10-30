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
  sheaf: (
    <>
      <path d="M30,52 L30,20 M24,52 L26,22 M36,52 L34,22 M17,50 L22,24 M43,50 L38,24" fill="none" />
      <ellipse cx="30" cy="13" rx="3.5" ry="7" />
      <ellipse cx="25" cy="17" rx="3.5" ry="7" transform="rotate(-12 25 17)" />
      <ellipse cx="35" cy="17" rx="3.5" ry="7" transform="rotate(12 35 17)" />
      <ellipse cx="20" cy="21" rx="3.5" ry="7" transform="rotate(-22 20 21)" />
      <ellipse cx="40" cy="21" rx="3.5" ry="7" transform="rotate(22 40 21)" />
      <path d="M21,35 L39,35 L39,40 L21,40 Z" />
    </>
  ),
  sheep: (
    <>
      <path d="M22,42 L22,53 M38,41 L38,53" />
      <path d="M15,30 Q12,22 20,21 Q23,14 31,16 Q37,12 42,18 Q50,18 49,26 Q54,32 48,37 Q47,44 39,42 Q33,47 26,43 Q18,45 17,38 Q10,36 15,30 Z" />
      <ellipse cx="11" cy="28" rx="6" ry="5" />
      <circle cx="10" cy="27" r="0.8" fill="#111" />
    </>
  ),
  cow: (
    <>
      <path d="M17,40 L17,53 M24,40 L24,53 M37,40 L37,53 M44,40 L44,53" />
      <path d="M12,22 Q6,26 8,34" fill="none" />
      <path d="M12,22 Q12,18 16,18 L44,18 Q48,18 48,22 L48,37 Q48,41 44,41 L16,41 Q12,41 12,37 Z" />
      <ellipse cx="25" cy="28" rx="5" ry="4" />
      <path d="M48,12 Q45,6 49,5 M56,12 Q59,6 55,5" fill="none" />
      <path d="M45,15 Q45,10 52,10 Q59,10 59,15 L58,25 Q57,30 52,30 Q47,30 46,25 Z" />
      <circle cx="50" cy="17" r="0.8" fill="#111" />
      <circle cx="55" cy="17" r="0.8" fill="#111" />
    </>
  ),
  sack: (
    <>
      <path d="M20,18 L16,9 M30,18 L30,8 M40,18 L44,9" fill="none" />
      <path d="M18,18 Q13,30 13,40 Q13,53 30,53 Q47,53 47,40 Q47,30 42,18 Z" />
      <path d="M18,20 Q30,25 42,20" fill="none" />
    </>
  ),
  wagon: (
    <>
      <path d="M44,30 L58,26" />
      <path d="M6,18 L46,18 L46,36 L6,36 Z" />
      <path d="M6,26 L46,26" />
      <circle cx="15" cy="43" r="8" />
      <circle cx="37" cy="43" r="8" />
      <path d="M15,35 L15,51 M7,43 L23,43 M37,35 L37,51 M29,43 L45,43" />
    </>
  ),
  flask: (
    <>
      <path d="M24,9 L36,9 L35,17 Q46,23 46,37 Q46,52 30,52 Q14,52 14,37 Q14,23 25,17 Z" />
      <path d="M22,7 L38,7" />
      <circle cx="30" cy="37" r="6" />
    </>
  ),
  menorah: (
    <>
      <path d="M30,34 L30,47 M6,34 L54,34 M30,34 L30,14" fill="none" />
      <path d="M7,34 L7,25 M13,34 L13,25 M19,34 L19,25 M25,34 L25,25 M35,34 L35,25 M41,34 L41,25 M47,34 L47,25 M53,34 L53,25" fill="none" />
      <path d="M20,54 L40,54 L36,47 L24,47 Z" />
      <path d="M7,24 Q4,20 7,16 Q10,20 7,24 Z M13,24 Q10,20 13,16 Q16,20 13,24 Z M19,24 Q16,20 19,16 Q22,20 19,24 Z M25,24 Q22,20 25,16 Q28,20 25,24 Z M35,24 Q32,20 35,16 Q38,20 35,24 Z M41,24 Q38,20 41,16 Q44,20 41,24 Z M47,24 Q44,20 47,16 Q50,20 47,24 Z M53,24 Q50,20 53,16 Q56,20 53,24 Z M30,13 Q27,9 30,5 Q33,9 30,13 Z" />
    </>
  ),
  dreidel: (
    <>
      <path d="M27,4 L33,4 L33,14 L48,14 L48,36 L30,56 L12,36 L12,14 L27,14 Z" />
      <path d="M12,24 L48,24" />
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
