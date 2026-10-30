import type { IconName, SceneName } from "@/parsha/lib/content";
import { Icon } from "./Icon";

// The colouring pictures. Outline only, thick lines, no shading, and no
// people: objects, places and footprints tell the story.

function Sun({ cx, cy, r = 34 }: { cx: number; cy: number; r?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return `M${cx + Math.cos(a) * (r + 12)},${cy + Math.sin(a) * (r + 12)} L${cx + Math.cos(a) * (r + 28)},${cy + Math.sin(a) * (r + 28)}`;
  }).join(" ");
  return (
    <>
      <path d={rays} />
      <circle cx={cx} cy={cy} r={r} />
    </>
  );
}

function Palm({ x, ground }: { x: number; ground: number }) {
  const top = ground - 190;
  return (
    <>
      <path d={`M${x - 12},${ground} Q${x - 18},${ground - 100} ${x - 4},${top} L${x + 8},${top} Q${x + 4},${ground - 100} ${x + 14},${ground} Z`} />
      <path
        d={[ground - 40, ground - 80, ground - 120, ground - 160]
          .map((y) => `M${x - 12},${y} Q${x},${y + 6} ${x + 10},${y}`)
          .join(" ")}
        fill="none"
      />
      <path
        d={[
          `M${x + 2},${top} Q${x - 40},${top - 20} ${x - 70},${top + 15}`,
          `M${x + 2},${top} Q${x - 30},${top - 45} ${x - 55},${top - 50}`,
          `M${x + 2},${top} Q${x + 30},${top - 45} ${x + 58},${top - 45}`,
          `M${x + 2},${top} Q${x + 40},${top - 15} ${x + 62},${top + 22}`,
          `M${x + 2},${top} Q${x + 4},${top - 40} ${x - 6},${top - 62}`,
        ].join(" ")}
        fill="none"
      />
      <circle cx={x - 6} cy={top + 14} r={6} />
      <circle cx={x + 6} cy={top + 16} r={6} />
      <circle cx={x} cy={top + 25} r={6} />
    </>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  });
  return <path d={`M${pts.join(" L")} Z`} />;
}

/** One pair of footprints, turned to walk toward the tent. */
function Steps({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <ellipse cx={-9} cy={4} rx={6} ry={10} />
      <ellipse cx={9} cy={-6} rx={6} ry={10} />
      <circle cx={-9} cy={-10} r={2.4} />
      <circle cx={9} cy={-20} r={2.4} />
    </g>
  );
}

function Vayeira({ ls }: { ls: number }) {
  const scallops = Array.from({ length: 10 }, () => "a14,14 0 0 0 28,0").join(" ");
  return (
    <>
      <Sun cx={90} cy={80} />
      <path d="M0,360 L600,360" />
      <Palm x={530} ground={360} />
      <path d="M230,184 L230,330 M370,184 L370,330" />
      <path d="M175,184 L175,360 M425,184 L425,360" />
      <path d="M300,80 L300,40 L336,50 L300,60" />
      <path d="M160,170 L300,80 L440,170 Z" />
      <path d={`M160,170 ${scallops}`} />
      <path d="M255,295 L255,340 M345,295 L345,340" />
      <path d="M245,285 L355,285 L355,295 L245,295 Z" />
      <Icon name="bread" x={252} y={238} size={52} sw={(60 / 52) * 4 * ls} />
      <Icon name="jug" x={300} y={230} size={56} sw={(60 / 56) * 4 * ls} />
      <Steps x={60} y={425} angle={55} />
      <Steps x={120} y={405} angle={58} />
      <Steps x={185} y={388} angle={62} />
    </>
  );
}

function ChayeiSarah({ ls }: { ls: number }) {
  const waves = "M85,345 Q97,338 109,345 T133,345 T157,345 T181,345 T195,345";
  return (
    <>
      <Sun cx={150} cy={70} r={30} />
      <path d="M0,380 L600,380" />
      <Palm x={40} ground={380} />
      <path d="M75,330 L205,330 L195,380 L85,380 Z" />
      <path d={waves} fill="none" />
      {/* the well */}
      <path d="M240,268 L240,170 M360,268 L360,170 M240,190 L360,190" />
      <path d="M220,175 L300,125 L380,175 Z" />
      <path d="M300,190 L300,232" />
      <path d="M288,232 Q300,220 312,232" fill="none" />
      <path d="M285,232 L315,232 L311,256 L289,256 Z" />
      <path d="M230,280 L370,280 L370,380 L230,380 Z" />
      <path d="M222,268 L378,268 L378,282 L222,282 Z" />
      <path d="M230,313 L370,313 M230,346 L370,346 M265,282 L265,313 M300,282 L300,313 M335,282 L335,313 M248,313 L248,346 M283,313 L283,346 M318,313 L318,346 M353,313 L353,346 M265,346 L265,380 M300,346 L300,380 M335,346 L335,380" />
      <Icon name="jug" x={385} y={326} size={56} sw={(60 / 56) * 4 * ls} />
      {/* one camel */}
      <path d="M472,305 L470,380 M488,305 L490,380 M535,305 L533,380 M550,305 L553,380" />
      <path d="M565,285 Q577,295 571,312" fill="none" />
      <path d="M458,298 Q456,262 490,256 Q510,214 536,254 Q562,256 566,290 Q566,306 550,308 L470,308 Q458,306 458,298 Z" />
      <path d="M466,280 Q444,256 450,226 L466,226 Q462,250 482,266" />
      <path d="M430,222 Q432,208 450,208 Q470,210 468,226 Q460,236 444,232 Q430,230 430,222 Z" />
      <circle cx={452} cy={217} r={1.5} fill="#111" />
    </>
  );
}

function Toldos({ ls }: { ls: number }) {
  return (
    <>
      <Sun cx={520} cy={75} r={30} />
      <path d="M0,300 Q120,225 250,290 Q380,215 600,290" fill="none" />
      <path d="M0,380 L600,380" />
      <path d="M130,220 L130,188 L160,198 L130,208" />
      <path d="M25,380 L130,220 L235,380 Z" />
      <path d="M108,380 L130,312 L152,380" fill="none" />
      {/* pot over a small fire on three stones */}
      <path d="M302,200 Q296,186 304,172 M330,198 Q324,182 332,166 M358,200 Q352,186 360,172" fill="none" />
      <path d="M306,368 Q296,340 314,328 Q312,345 324,338 Q320,318 334,302 Q342,324 348,334 Q360,328 356,346 Q366,352 354,368 Z" />
      <ellipse cx={288} cy={372} rx={22} ry={11} />
      <ellipse cx={372} cy={372} rx={22} ry={11} />
      <ellipse cx={330} cy={378} rx={20} ry={9} />
      <path d="M270,232 Q258,232 260,224 Q262,218 270,221 M390,232 Q402,232 400,224 Q398,218 390,221" fill="none" />
      <path d="M268,214 L392,214 L386,268 Q382,290 360,290 L300,290 Q278,290 274,268 Z" />
      <path d="M260,214 L400,214" />
      {/* table with a bowl and bread */}
      <path d="M450,310 L450,380 M570,310 L570,380" />
      <path d="M440,300 L580,300 L580,310 L440,310 Z" />
      <Icon name="bowl" x={446} y={250} size={56} sw={(60 / 56) * 4 * ls} />
      <Icon name="bread" x={515} y={252} size={56} sw={(60 / 56) * 4 * ls} />
    </>
  );
}

function Vayeitzei() {
  const rungs = Array.from({ length: 11 }, (_, i) => {
    const t = (i + 0.5) / 11;
    const y = 400 - t * 315;
    const xl = 255 + t * 33;
    const xr = 345 - t * 33;
    return `M${xl},${y} L${xr},${y}`;
  }).join(" ");
  const ring = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return { cx: 460 + Math.cos(a) * 72, cy: 392 + Math.sin(a) * 24 };
  });
  return (
    <>
      <path d="M100,42 A40,40 0 1 0 100,118 A31,31 0 1 1 100,42 Z" />
      <Star cx={180} cy={60} r={14} />
      <Star cx={460} cy={50} r={16} />
      <Star cx={540} cy={130} r={12} />
      <Star cx={420} cy={150} r={10} />
      <Star cx={160} cy={170} r={11} />
      <Star cx={60} cy={210} r={9} />
      <Star cx={560} cy={230} r={9} />
      <path d="M0,345 Q110,280 225,340 M375,340 Q490,275 600,335" fill="none" />
      <path d="M0,400 L600,400" />
      <path d={`M255,400 L288,85 M345,400 L312,85 ${rungs}`} />
      <path d="M240,88 Q214,88 220,64 Q226,42 252,47 Q262,20 295,26 Q320,8 346,30 Q376,24 381,52 Q406,58 396,80 Q390,92 368,88 Z" />
      {ring.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx={17} ry={10} />
      ))}
    </>
  );
}

/** An icon from the set, drawn into a scene with the scene's line width. */
function Put({
  name,
  x,
  y,
  size,
  ls,
  turn = 0,
}: {
  name: IconName;
  x: number;
  y: number;
  size: number;
  ls: number;
  turn?: number;
}) {
  return (
    <g transform={`rotate(${turn} ${x + size / 2} ${y + size})`}>
      <Icon name={name} x={x} y={y} size={size} sw={(60 / size) * 4 * ls} />
    </g>
  );
}

function Moon({ x, y, r = 34 }: { x: number; y: number; r?: number }) {
  return <path d={`M${x},${y - r} A${r},${r} 0 1 0 ${x},${y + r} A${r * 0.78},${r * 0.78} 0 1 1 ${x},${y - r} Z`} />;
}

function Vayeishev({ ls }: { ls: number }) {
  const stars: [number, number][] = [
    [200, 50], [250, 95], [300, 40], [350, 90], [400, 45], [170, 120],
    [440, 110], [215, 160], [385, 150], [280, 140], [330, 175],
  ];
  return (
    <>
      <Sun cx={80} cy={80} r={30} />
      <Moon x={530} y={80} r={32} />
      {stars.map(([cx, cy], i) => (
        <Star key={i} cx={cx} cy={cy} r={11} />
      ))}
      <path d="M0,390 L600,390" />
      <Put name="sheaf" x={30} y={300} size={90} ls={ls} turn={22} />
      <Put name="sheaf" x={130} y={290} size={100} ls={ls} turn={16} />
      <Put name="sheaf" x={235} y={215} size={175} ls={ls} />
      <Put name="sheaf" x={370} y={290} size={100} ls={ls} turn={-16} />
      <Put name="sheaf" x={480} y={300} size={90} ls={ls} turn={-22} />
    </>
  );
}

/** A thin cow from Pharaoh's dream: sunken belly, ribs showing. */
function ThinCow({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M16,22 L14,82 M26,24 L27,82 M74,22 L74,82 M84,20 L86,82" />
      <path d="M8,14 Q0,22 3,34" fill="none" />
      <path d="M8,10 Q50,0 90,8 L90,22 Q72,36 50,27 Q28,36 8,24 Z" />
      <path d="M36,10 Q39,18 36,26 M46,9 Q49,17 46,25 M56,9 Q59,17 56,25" fill="none" />
      <path d="M90,6 Q87,-4 93,-6 M106,6 Q109,-4 103,-6" fill="none" />
      <path d="M88,4 Q88,-2 98,-2 Q108,-2 108,4 L106,22 Q104,28 98,28 Q92,28 90,22 Z" />
      <circle cx={95} cy={8} r={1.5} fill="#111" />
      <circle cx={101} cy={8} r={1.5} fill="#111" />
    </g>
  );
}

function Mikeitz({ ls }: { ls: number }) {
  return (
    <>
      <Sun cx={520} cy={70} r={30} />
      <path d="M40,250 L130,130 L220,250 M95,180 L165,180 M75,215 L185,215" fill="none" />
      <path d="M0,300 L600,300" />
      <path d="M0,370 Q50,355 100,370 T200,370 T300,370 T400,370 T500,370 T600,370" fill="none" />
      <path d="M0,410 Q50,395 100,410 T200,410 T300,410 T400,410 T500,410 T600,410" fill="none" />
      <Put name="cow" x={20} y={190} size={120} ls={ls} />
      <Put name="cow" x={150} y={200} size={110} ls={ls} />
      <ThinCow x={330} y={218} />
      <ThinCow x={460} y={218} />
      <Put name="sheaf" x={265} y={225} size={70} ls={ls} />
    </>
  );
}

function Vayigash({ ls }: { ls: number }) {
  return (
    <>
      <Sun cx={80} cy={75} r={30} />
      <path d="M430,230 L490,150 L550,230 M450,205 L530,205" fill="none" />
      <path d="M0,230 L600,230" />
      <path d="M0,330 L600,330" />
      <Put name="sack" x={55} y={206} size={60} ls={ls} />
      <Put name="sack" x={105} y={210} size={55} ls={ls} />
      <Put name="wagon" x={20} y={185} size={170} ls={ls} />
      <Put name="sack" x={270} y={218} size={55} ls={ls} />
      <Put name="wagon" x={235} y={202} size={150} ls={ls} />
      <Put name="sheep" x={420} y={259} size={80} ls={ls} />
      <Put name="sheep" x={505} y={264} size={75} ls={ls} />
    </>
  );
}

function Chanukah({ ls }: { ls: number }) {
  return (
    <>
      <path d="M90,30 L510,30 L510,330 L90,330 Z M300,30 L300,330 M90,180 L510,180" fill="none" />
      <path d="M40,330 L560,330 L560,350 L40,350 Z" />
      <Put name="menorah" x={160} y={78} size={280} ls={ls} />
      <Put name="flask" x={60} y={250} size={80} ls={ls} />
      <Put name="dreidel" x={460} y={260} size={70} ls={ls} turn={12} />
      <path d="M40,350 L40,440 M560,350 L560,440" />
    </>
  );
}

const SCENES: Record<SceneName, (p: { ls: number }) => React.ReactNode> = {
  vayeira: Vayeira,
  "chayei-sarah": ChayeiSarah,
  toldos: Toldos,
  vayeitzei: Vayeitzei,
  vayeishev: Vayeishev,
  mikeitz: Mikeitz,
  vayigash: Vayigash,
  chanukah: Chanukah,
};

export function Scene({
  name,
  lineScale = 1,
  className,
}: {
  name: SceneName;
  lineScale?: number;
  className?: string;
}) {
  const Draw = SCENES[name];
  return (
    <svg viewBox="0 0 600 450" className={className} role="img" aria-hidden>
      <g
        fill="#fff"
        stroke="#111"
        strokeWidth={4 * lineScale}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Draw ls={lineScale} />
      </g>
    </svg>
  );
}
