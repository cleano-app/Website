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
  lion: (
    <>
      <path d="M26,40 L26,52 M33,40 L33,52 M45,40 L45,52 M52,40 L52,52" />
      <path d="M55,28 Q61,24 58,16" fill="none" />
      <circle cx="58" cy="14" r="3" />
      <path d="M24,24 Q24,21 30,21 L50,21 Q56,21 56,27 L56,41 L24,41 Z" />
      <path d="M30.0,27.0 Q35.1,32.6 27.7,34.1 Q28.6,41.6 21.7,38.4 Q18.0,45.0 14.3,38.4 Q7.4,41.6 8.3,34.1 Q0.9,32.6 6.0,27.0 Q0.9,21.4 8.3,19.9 Q7.4,12.4 14.3,15.6 Q18.0,9.0 21.7,15.6 Q28.6,12.4 27.7,19.9 Q35.1,21.4 30.0,27.0 Z" />
      <circle cx="16" cy="28" r="8.5" />
      <circle cx="13" cy="26" r="1" fill="#111" />
      <path d="M8,30 L11,32" />
    </>
  ),
  ship: (
    <>
      <path d="M30,38 L30,7" />
      <path d="M30,7 L39,10 L30,13" />
      <path d="M32,14 L50,34 L32,34 Z" />
      <path d="M28,16 L13,34 L28,34 Z" />
      <path d="M5,38 L55,38 L46,50 L14,50 Z" />
      <path d="M3,55 Q9,52 15,55 T27,55 T39,55 T51,55 T58,55" fill="none" />
    </>
  ),
  grapes: (
    <>
      <path d="M30,15 L30,7" />
      <path d="M30,9 Q38,2 45,8 Q38,13 30,9 Z" />
      <circle cx="19" cy="21" r="6" />
      <circle cx="30" cy="21" r="6" />
      <circle cx="41" cy="21" r="6" />
      <circle cx="24.5" cy="31" r="6" />
      <circle cx="35.5" cy="31" r="6" />
      <circle cx="30" cy="41" r="6" />
      <circle cx="30" cy="51" r="5" />
    </>
  ),
  bush: (
    <>
      <path d="M20,30 Q14,20 21,10 Q23,18 27,16 Q29,24 26,30 Z M33,28 Q30,16 38,6 Q40,15 44,14 Q45,24 40,28 Z" />
      <path d="M10,52 Q5,42 13,37 Q11,27 22,28 Q26,20 34,24 Q43,20 47,30 Q55,32 51,42 Q57,48 50,52 Z" />
      <path d="M22,42 Q26,38 30,42 M34,38 Q38,34 42,38" fill="none" />
    </>
  ),
  brick: (
    <>
      <path d="M6,28 L14,20 L54,20 L46,28 Z" />
      <path d="M46,28 L54,20 L54,40 L46,48 Z" />
      <path d="M6,28 L46,28 L46,48 L6,48 Z" />
    </>
  ),
  frog: (
    <>
      <path d="M16,46 L9,53 M44,46 L51,53" />
      <ellipse cx="30" cy="38" rx="19" ry="13" />
      <circle cx="21" cy="24" r="7" />
      <circle cx="39" cy="24" r="7" />
      <circle cx="21" cy="24" r="2" fill="#111" />
      <circle cx="39" cy="24" r="2" fill="#111" />
      <path d="M23,37 Q30,43 37,37" fill="none" />
    </>
  ),
  pyramid: (
    <>
      <path d="M4,52 L30,10 L56,52 Z" />
      <path d="M17,31 L43,31 M10,42 L50,42" />
    </>
  ),
  locust: (
    <>
      <path d="M38,30 L49,14 L56,44" fill="none" />
      <path d="M24,37 L20,47 M31,38 L31,48" />
      <path d="M11,26 Q7,14 3,12 M14,25 Q13,13 10,8" fill="none" />
      <ellipse cx="32" cy="33" rx="19" ry="7" />
      <path d="M22,30 Q38,20 50,29" fill="none" />
      <circle cx="13" cy="30" r="6" />
      <circle cx="11" cy="29" r="1" fill="#111" />
    </>
  ),
  hamantash: (
    <>
      <path d="M30,6 Q34,6 36,10 L55,46 Q57,51 52,52 L8,52 Q3,51 5,46 L24,10 Q26,6 30,6 Z" />
      <path d="M30,24 L41,43 L19,43 Z" />
    </>
  ),
  basket: (
    <>
      <circle cx="22" cy="27" r="6" />
      <path d="M33,30 L38,19 L43,30 Z" />
      <path d="M14,30 Q30,2 46,30" fill="none" />
      <path d="M7,30 L53,30 L46,53 L14,53 Z" />
      <path d="M9,38 L51,38 M12,46 L48,46" />
    </>
  ),
  house: (
    <>
      <path d="M14,28 L46,28 L46,53 L14,53 Z" />
      <path d="M8,30 L30,9 L52,30" fill="none" />
      <path d="M26,38 L34,38 L34,53 L26,53 Z" />
      <path d="M17,33 L23,33 L23,39 L17,39 Z" />
    </>
  ),
  matzah: (
    <>
      <circle cx="30" cy="30" r="23" />
      <path d="M20,16 h0.1 M26,16 h0.1 M32,16 h0.1 M38,16 h0.1 M14,24 h0.1 M20,24 h0.1 M26,24 h0.1 M32,24 h0.1 M38,24 h0.1 M44,24 h0.1 M14,32 h0.1 M20,32 h0.1 M26,32 h0.1 M32,32 h0.1 M38,32 h0.1 M44,32 h0.1 M14,40 h0.1 M20,40 h0.1 M26,40 h0.1 M32,40 h0.1 M38,40 h0.1 M44,40 h0.1 M20,46 h0.1 M26,46 h0.1 M32,46 h0.1 M38,46 h0.1" strokeWidth="2.6" />
    </>
  ),
  mountain: (
    <>
      <path d="M3,53 L24,15 L32,27 L40,17 L57,53 Z" />
      <path d="M18,26 L24,21 L29,27" fill="none" />
    </>
  ),
  flower: (
    <>
      <path d="M30,30 L30,56" />
      <path d="M30,46 Q20,39 17,46 Q23,51 30,46 Z" />
      <circle cx="39.0" cy="20.0" r="7" />
      <circle cx="34.5" cy="27.8" r="7" />
      <circle cx="25.5" cy="27.8" r="7" />
      <circle cx="21.0" cy="20.0" r="7" />
      <circle cx="25.5" cy="12.2" r="7" />
      <circle cx="34.5" cy="12.2" r="7" />
      <circle cx="30" cy="20" r="5" />
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
