import type { LogoDesign, LogoPalette, LogoStyle } from "@/parsha/lib/settings";

// Five ready-made logo styles. The name is set in the site's own font, and
// the logo is drawn live (not saved as a picture), so it prints sharp.

export const PALETTES: Record<LogoPalette, { bg: string; a: string; b: string; c: string }> = {
  rainbow: { bg: "#4757e6", a: "#f0508f", b: "#ffc83d", c: "#2bb673" },
  pink: { bg: "#e0457b", a: "#ffd166", b: "#ffffff", c: "#7bd389" },
  green: { bg: "#1f9d6b", a: "#ffd166", b: "#ff8fab", c: "#ffffff" },
  sky: { bg: "#1e90d6", a: "#ffd166", b: "#ff8fab", c: "#9be564" },
  purple: { bg: "#7344d9", a: "#ffd166", b: "#5ee0c0", c: "#ff8fab" },
};

/** One or two lines, so a longer name still fits. */
function lines(name: string): string[] {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2 || name.length <= 10) return [name.trim() || "?"];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

function Name({ name, y, color, size = 30 }: { name: string; y: number; color: string; size?: number }) {
  const ls = lines(name);
  const fs = Math.min(size, 300 / Math.max(...ls.map((l) => l.length), 1));
  return (
    <text
      x={100}
      y={y - (ls.length - 1) * fs * 0.55}
      textAnchor="middle"
      fontFamily="var(--font-fredoka), var(--font-varela), sans-serif"
      fontWeight={700}
      fontSize={fs}
      fill={color}
      direction="rtl"
    >
      {ls.map((l, i) => (
        <tspan key={i} x={100} dy={i ? fs * 1.1 : 0}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

function Sun({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const t = (i * Math.PI) / 4;
    return `M${x + Math.cos(t) * (r + 5)},${y + Math.sin(t) * (r + 5)} L${x + Math.cos(t) * (r + 12)},${y + Math.sin(t) * (r + 12)}`;
  }).join(" ");
  return (
    <>
      <path d={rays} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <circle cx={x} cy={y} r={r} fill={color} />
    </>
  );
}

function Star({ x, y, r, color }: { x: number; y: number; r: number; color: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const t = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${x + Math.cos(t) * rr},${y + Math.sin(t) * rr}`;
  });
  return <path d={`M${pts.join(" L")} Z`} fill={color} />;
}

const STYLES: Record<LogoStyle, (d: LogoDesign) => React.ReactNode> = {
  badge: ({ name, palette }) => {
    const p = PALETTES[palette];
    return (
      <>
        <circle cx={100} cy={100} r={98} fill={p.bg} />
        <circle cx={100} cy={100} r={88} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="1 8" strokeLinecap="round" />
        <Sun x={100} y={56} r={16} color={p.b} />
        <Name name={name} y={128} color="#fff" />
        <Star x={52} y={150} r={8} color={p.a} />
        <Star x={148} y={150} r={8} color={p.c} />
      </>
    );
  },
  blocks: ({ name, palette }) => {
    const p = PALETTES[palette];
    const letters = ["ג", "ב", "א"];
    return (
      <>
        <rect x={4} y={4} width={192} height={192} rx={36} fill="#fff" stroke={p.bg} strokeWidth={8} />
        {[p.a, p.b, p.c].map((c, i) => (
          <g key={i}>
            <rect x={37 + i * 44} y={34} width={40} height={40} rx={8} fill={c} />
            <text
              x={57 + i * 44}
              y={64}
              textAnchor="middle"
              fontSize={28}
              fontWeight={700}
              fill="#1f2340"
              fontFamily="var(--font-fredoka), sans-serif"
            >
              {letters[i]}
            </text>
          </g>
        ))}
        <Name name={name} y={128} color={p.bg} />
      </>
    );
  },
  rainbow: ({ name, palette }) => {
    const p = PALETTES[palette];
    const arcs = [p.bg, p.a, p.b, p.c];
    return (
      <>
        <circle cx={100} cy={100} r={98} fill="#fff" stroke={p.bg} strokeWidth={6} />
        {arcs.map((c, i) => (
          <path
            key={i}
            d={`M${40 + i * 9},96 A${60 - i * 9},${60 - i * 9} 0 0 1 ${160 - i * 9},96`}
            fill="none"
            stroke={c}
            strokeWidth={9}
            strokeLinecap="round"
          />
        ))}
        <Name name={name} y={138} color="#1f2340" size={28} />
      </>
    );
  },
  sefer: ({ name, palette }) => {
    const p = PALETTES[palette];
    return (
      <>
        <rect x={4} y={4} width={192} height={192} rx={96} fill={p.bg} />
        <path d="M100,58 Q74,44 46,50 L46,96 Q74,90 100,104 Z" fill="#fff" />
        <path d="M100,58 Q126,44 154,50 L154,96 Q126,90 100,104 Z" fill="#fff" />
        <path d="M56,64 Q74,60 90,66 M56,76 Q74,72 90,78 M110,66 Q126,60 144,64 M110,78 Q126,72 144,76" stroke={p.a} strokeWidth={3} fill="none" strokeLinecap="round" />
        <Star x={100} y={36} r={11} color={p.b} />
        <Name name={name} y={142} color="#fff" size={28} />
      </>
    );
  },
  star: ({ name, palette }) => {
    const p = PALETTES[palette];
    return (
      <>
        <rect x={4} y={4} width={192} height={192} rx={40} fill={p.bg} />
        <Star x={100} y={100} r={92} color={p.b} />
        <circle cx={100} cy={104} r={52} fill="#fff" />
        <Name name={name} y={112} color={p.bg} size={24} />
        <circle cx={30} cy={30} r={7} fill={p.a} />
        <circle cx={170} cy={170} r={7} fill={p.c} />
      </>
    );
  },
};

export function GeneratedLogo({ design, className }: { design: LogoDesign; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={design.name}>
      {STYLES[design.style](design)}
    </svg>
  );
}
