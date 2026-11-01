import { Icon } from "@/parsha/components/art/Icon";
import { Scene } from "@/parsha/components/art/Scene";
import { titleOf, type IconName, type Parsha } from "@/parsha/lib/content";
import type { Student } from "@/parsha/lib/settings";
import { ICON_WORDS } from "@/parsha/lib/strings";

// The crafts that carry the children's names and photos. Names are drawn
// as hollow letters, so each child can colour in their own name.

const FONT = "var(--font-fredoka), var(--font-varela), sans-serif";

/** A word in hollow letters, sized to fit its box. */
export function HollowWord({
  text,
  width = 600,
  height = 120,
  dashed = false,
  color = "#111",
}: {
  text: string;
  width?: number;
  height?: number;
  dashed?: boolean;
  color?: string;
}) {
  const fs = Math.min(height * 0.82, (width * 1.55) / Math.max(text.length, 1));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-label={text}>
      <text
        x={width / 2}
        y={height * 0.72}
        textAnchor="middle"
        direction="rtl"
        fontFamily={FONT}
        fontWeight={700}
        fontSize={fs}
        fill="#fff"
        stroke={color}
        strokeWidth={dashed ? 2.2 : 3}
        strokeDasharray={dashed ? "5 5" : undefined}
        strokeLinejoin="round"
      >
        {text}
      </text>
    </svg>
  );
}

/** Up to three pictures of the week, for borders and the tracing words. */
export function unitIcons(unit: Parsha): IconName[] {
  const pick = [unit.counting.icon, unit.maze.end, unit.maze.start].filter((i) => i !== "footprints");
  return [...new Set(pick)].slice(0, 3);
}

export function MyColouring({ unit, student, ls }: { unit: Parsha; student: Student | null; ls: number }) {
  return (
    <>
      <div className="h-[30mm] shrink-0">
        {student ? (
          <HollowWord text={student.name} height={110} />
        ) : (
          <div className="mx-auto mt-[12mm] w-[120mm] border-b-[0.8mm] border-dashed border-black" />
        )}
      </div>
      <p className="text-center font-p-heading text-[16pt] font-semibold">{unit.caption}</p>
      <div className="flex min-h-0 flex-1 items-center justify-center rounded-[5mm] border-[0.9mm] border-[#222] p-[4mm]">
        <Scene name={unit.scene} lineScale={ls} className="h-full max-h-full w-full" />
      </div>
    </>
  );
}

function CrownStrip({ unit, student }: { unit: Parsha; student: Student | null }) {
  const [a, b] = unitIcons(unit);
  return (
    <svg viewBox="0 0 760 330" className="h-full w-full">
      <path
        d="M20,300 L20,120 L120,200 L200,60 L290,180 L380,30 L470,180 L560,60 L640,200 L740,120 L740,300 Z"
        fill="#fff"
        stroke="#111"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path d="M740,160 L775,170 L775,290 L740,300" fill="#d4d4d4" stroke="#111" strokeWidth={3} />
      {[200, 380, 560].map((x) => (
        <circle key={x} cx={x} cy={x === 380 ? 70 : 100} r={18} fill="#fff" stroke="#111" strokeWidth={4} />
      ))}
      {a && <Icon name={a} x={50} y={200} size={80} />}
      {b && <Icon name={b} x={630} y={200} size={80} />}
      <foreignObject x={150} y={190} width={460} height={100}>
        <div style={{ width: "100%", height: "100%" }}>
          {student ? (
            <HollowWord text={student.name} width={460} height={100} />
          ) : (
            <div style={{ borderBottom: "3px dashed #111", margin: "70px 20px 0" }} />
          )}
        </div>
      </foreignObject>
    </svg>
  );
}

export function Crowns({ unit, students }: { unit: Parsha; students: (Student | null)[] }) {
  return (
    <>
      <p className="text-center text-[12pt]">
        {"שניידט אויס, קאלירט אן, און קלעפט צו צו א פאפירענעם פאס, אז די קרוין זאל פאסן אויפ'ן קאפ."}
      </p>
      {students.map((s, i) => (
        <div key={s?.id ?? i} className="min-h-0 flex-1 border-b-[0.5mm] border-dashed border-[#999] last:border-0">
          <CrownStrip unit={unit} student={s} />
        </div>
      ))}
    </>
  );
}

export function Trace({ unit }: { unit: Parsha }) {
  const words = unitIcons(unit)
    .map((icon) => ({ icon, word: ICON_WORDS[icon] }))
    .filter((w): w is { icon: IconName; word: string } => !!w.word);
  return (
    <>
      <p className="text-center font-p-heading text-[15pt] font-semibold">
        גייט נאך די פינטלאך, און שרייבט נאכאמאל אליין
      </p>
      {words.map(({ icon, word }) => (
        <div key={icon} className="flex min-h-0 flex-1 items-center gap-[4mm] rounded-[5mm] border-[0.9mm] border-[#222] p-[3mm]">
          <svg viewBox="0 0 60 60" className="h-[34mm] w-[34mm] shrink-0">
            <Icon name={icon} size={60} />
          </svg>
          <div className="flex h-full min-w-0 flex-1 flex-col justify-around">
            <div className="h-[26mm]">
              <HollowWord text={word} width={520} height={110} dashed color="#777" />
            </div>
            <div className="mx-[6mm] border-b-[0.6mm] border-black" />
          </div>
        </div>
      ))}
    </>
  );
}

export function PhotoFrame({ unit, student, photo }: { unit: Parsha; student: Student | null; photo?: string }) {
  const icons = unitIcons(unit);
  const ring = Array.from({ length: 10 }, (_, i) => icons[i % icons.length]);
  const spots: [number, number][] = [
    [30, 30], [255, 10], [480, 30], [520, 260], [520, 490], [480, 700], [255, 720], [30, 700], [-10, 490], [-10, 260],
  ];
  return (
    <>
      <div className="relative min-h-0 flex-1">
        <svg viewBox="-20 0 640 800" className="absolute inset-0 h-full w-full">
          <rect x={60} y={90} width={480} height={600} rx={50} fill="#fff" stroke="#111" strokeWidth={6} />
          <rect x={90} y={120} width={420} height={540} rx={34} fill="#fff" stroke="#111" strokeWidth={3} strokeDasharray={photo ? undefined : "10 8"} />
          {photo ? (
            <>
              <defs>
                <clipPath id="frame-photo">
                  <rect x={90} y={120} width={420} height={540} rx={34} />
                </clipPath>
              </defs>
              <image href={photo} x={90} y={120} width={420} height={540} preserveAspectRatio="xMidYMid slice" clipPath="url(#frame-photo)" />
            </>
          ) : (
            <text x={300} y={400} textAnchor="middle" fontFamily={FONT} fontSize={30} fill="#888" direction="rtl">
              קלעפט דא אריין א בילד
            </text>
          )}
          {ring.map((icon, i) => (
            <Icon key={i} name={icon} x={spots[i][0]} y={spots[i][1]} size={80} />
          ))}
        </svg>
      </div>
      <div className="h-[24mm] shrink-0">
        {student ? <HollowWord text={student.name} height={100} /> : <div className="mx-auto mt-[14mm] w-[110mm] border-b-[0.8mm] border-dashed border-black" />}
      </div>
      <p className="text-center font-p-heading text-[16pt] font-semibold">
        {unit.kind === "parsha" ? `איך לערן ${titleOf(unit)}!` : `א פרייליכן ${unit.name}!`}
      </p>
    </>
  );
}

export function PhotoMenorah({ students, photos }: { students: Student[]; photos: Record<string, string> }) {
  // Right to left, the way the lights stand: the first child on the right.
  const xs = [700, 620, 540, 460, 300, 220, 140, 60];
  return (
    <>
      <p className="text-center font-p-heading text-[18pt] font-semibold">{"אונזער קלאס'ס חנוכה ליכט"}</p>
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 760 760" className="absolute inset-0 h-full w-full">
          <g fill="#fff" stroke="#111" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round">
            <path d="M300,740 L460,740 L430,690 L330,690 Z" />
            <path d="M380,690 L380,430 M40,430 L720,430" fill="none" />
            {xs.map((x) => (
              <path key={x} d={`M${x},430 L${x},300 M${x - 22},300 L${x + 22},300 L${x + 18},284 L${x - 18},284 Z`} />
            ))}
            <path d="M380,430 L380,200 M358,200 L402,200 L398,184 L362,184 Z" />
          </g>
          <defs>
            {xs.map((x, i) => (
              <clipPath key={i} id={`flame-${i}`}>
                <circle cx={x} cy={236} r={34} />
              </clipPath>
            ))}
          </defs>
          {xs.map((x, i) => {
            const s = students[i];
            const photo = s && photos[s.id];
            return (
              <g key={x}>
                {photo ? (
                  <image href={photo} x={x - 34} y={202} width={68} height={68} preserveAspectRatio="xMidYMid slice" clipPath={`url(#flame-${i})`} />
                ) : null}
                <circle cx={x} cy={236} r={34} fill={photo ? "none" : "#fff"} stroke="#111" strokeWidth={4} strokeDasharray={photo ? undefined : "6 6"} />
                <text x={x} y={350} textAnchor="middle" fontFamily={FONT} fontSize={20} direction="rtl">
                  {s?.name ?? ""}
                </text>
              </g>
            );
          })}
          <path d="M380,176 Q362,150 380,112 Q398,150 380,176 Z" fill="#fff" stroke="#111" strokeWidth={4} />
        </svg>
      </div>
    </>
  );
}
