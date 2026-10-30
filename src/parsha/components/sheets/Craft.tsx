import { Icon } from "@/parsha/components/art/Icon";
import type { Craft } from "@/parsha/lib/content";

const CUT = { stroke: "#111", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const FOLD = { ...CUT, strokeWidth: 3, strokeDasharray: "12 10" } as const;
const GLUE = "#d4d4d4";

/** One side of the tent: a triangle with its door and a glue tab. */
function Side({ turn }: { turn: number }) {
  return (
    <g transform={`rotate(${turn} 350 350)`}>
      <path d="M470,230 L474.7,193.9 L383.5,34.3 L350,20 Z" fill={GLUE} {...CUT} />
      <path d="M230,230 L350,20 L470,230 Z" fill="#fff" stroke="none" />
      <path d="M230,230 L350,20" fill="none" {...CUT} />
      <path d="M350,20 L470,230 M470,230 L230,230" fill="none" {...FOLD} />
      <path d="M315,222 L315,172 A35,35 0 0 1 385,172 L385,222 Z" fill="#fff" {...CUT} />
    </g>
  );
}

/** The fold-up tent net, 700×700, per the brief's geometry. */
export function TentNet({ craft }: { craft: Craft }) {
  return (
    <svg viewBox="0 0 700 700" className="h-full w-full" aria-hidden>
      <rect x={230} y={230} width={240} height={240} fill="#fff" />
      {[0, 90, 180, 270].map((t) => (
        <Side key={t} turn={t} />
      ))}
      <text x={350} y={335} textAnchor="middle" fontSize={30} fontFamily="var(--font-fredoka)" fontWeight={600}>
        {craft.baseLabel}
      </text>
      <text x={350} y={378} textAnchor="middle" fontSize={22} fontFamily="var(--font-varela)" fill="#444">
        {craft.baseItems}
      </text>
    </svg>
  );
}

export function Legend({ craft }: { craft: Craft }) {
  const item = (sample: React.ReactNode, label: string) => (
    <span className="flex items-center gap-[2mm]">
      <svg viewBox="0 0 60 20" className="h-[5mm] w-[15mm]" aria-hidden>
        {sample}
      </svg>
      {label}
    </span>
  );
  return (
    <div className="flex justify-center gap-[8mm] text-[12pt]">
      {item(<path d="M4,10 L56,10" {...CUT} />, craft.legend.cut)}
      {item(<path d="M4,10 L56,10" {...FOLD} strokeDasharray="8 6" />, craft.legend.fold)}
      {item(<rect x={4} y={3} width={52} height={14} rx={3} fill={GLUE} stroke="#111" strokeWidth={2} />, craft.legend.glue)}
    </div>
  );
}

export function Pieces({ craft }: { craft: Craft }) {
  return (
    <div className="grid grid-cols-4 gap-[4mm]">
      {craft.pieces.map((p) => (
        <div key={p.label} className="flex flex-col items-center gap-[1.5mm]">
          <div className="flex h-[30mm] w-full items-center justify-center rounded-[4mm] border-[0.8mm] border-black">
            <svg viewBox="0 0 70 60" className="h-[22mm] w-[26mm]" aria-hidden>
              {p.icon === "footprints" ? (
                <>
                  <Icon name="footprints" x={0} y={0} size={26} />
                  <Icon name="footprints" x={22} y={18} size={26} />
                  <Icon name="footprints" x={44} y={34} size={26} />
                </>
              ) : (
                <Icon name={p.icon} x={5} y={0} size={60} />
              )}
            </svg>
          </div>
          <span className="text-center text-[11pt] leading-tight">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
