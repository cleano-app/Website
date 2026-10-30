import { Icon } from "@/parsha/components/art/Icon";
import type { Parsha } from "@/parsha/lib/content";
import { AGE_RULES, type Age } from "@/parsha/lib/age";
import { makeDots } from "@/parsha/lib/dots";
import { makeMaze, mazeSegments } from "@/parsha/lib/maze";
import { seeded } from "@/parsha/lib/rng";

const INK = "#111";

export function MazeArt({ parsha, age }: { parsha: Parsha; age: Age }) {
  const n = AGE_RULES[age].mazeSize;
  const maze = makeMaze(n, parsha.id, age, "maze");
  const W = 520;
  const cell = W / n;
  const pad = 110;
  const icon = Math.min(100, cell);
  const sw = Math.max(4, Math.min(9, cell * 0.09));
  return (
    <svg viewBox={`0 0 ${W + pad * 2} ${W + 20}`} className="h-full w-full" aria-hidden>
      <g stroke={INK} strokeWidth={sw} strokeLinecap="round">
        {mazeSegments(maze).map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={pad + x1 * cell} y1={10 + y1 * cell} x2={pad + x2 * cell} y2={10 + y2 * cell} />
        ))}
      </g>
      <Icon name={parsha.maze.start} x={pad + W + 6} y={10 + cell / 2 - icon / 2} size={icon} />
      <Icon name={parsha.maze.end} x={pad - 6 - icon} y={10 + W - cell / 2 - icon / 2} size={icon} />
    </svg>
  );
}

export function DotsArt({ parsha, age, accent }: { parsha: Parsha; age: Age; accent: string }) {
  const rules = AGE_RULES[age];
  const S = 340;
  const pad = 34;
  const inner = S - pad * 2;
  const dots = makeDots(parsha.dots.corners, rules.dotCount, (rules.dotNumberPx * 0.9) / inner);
  const at = (v: number) => pad + v * inner;
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="h-full w-full" aria-hidden>
      {rules.dotHelper && (
        <polygon
          points={parsha.dots.corners.map(([x, y]) => `${at(x)},${at(y)}`).join(" ")}
          fill="none"
          stroke="#bbb"
          strokeWidth={2}
          strokeDasharray="6 7"
          strokeLinejoin="round"
        />
      )}
      {dots.map((d) => (
        <g key={d.n}>
          <circle cx={at(d.x)} cy={at(d.y)} r={d.n === 1 ? 7 : 4.5} fill={d.n === 1 ? accent : INK} />
          <text
            x={at(d.lx)}
            y={at(d.ly)}
            fontSize={rules.dotNumberPx}
            textAnchor="middle"
            dominantBaseline="central"
            direction="ltr"
            fill={INK}
            fontFamily="var(--font-varela)"
          >
            {d.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** The right answer and its two neighbours, in a fixed shuffled order. */
export function countingOptions(parsha: Parsha, age: Age): number[] {
  const rand = seeded(parsha.id, age, "counting");
  const opts = [...AGE_RULES[age].countOptions];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

export function CountingArt({ parsha, age, accent }: { parsha: Parsha; age: Age; accent: string }) {
  const n = AGE_RULES[age].countItems;
  const perRow = Math.min(4, n);
  const rows = Math.ceil(n / perRow);
  const size = 70;
  const gap = 18;
  const W = perRow * size + (perRow - 1) * gap;
  const H = rows * size + (rows - 1) * gap;
  const bubbles = 110;
  return (
    <svg viewBox={`-10 -10 ${Math.max(W, 330) + 20} ${H + bubbles + 40}`} className="h-full w-full" aria-hidden>
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / perRow);
        const inRow = Math.min(perRow, n - r * perRow);
        const offset = (Math.max(W, 330) - (inRow * size + (inRow - 1) * gap)) / 2;
        const c = i % perRow;
        return <Icon key={i} name={parsha.counting.icon} x={offset + c * (size + gap)} y={r * (size + gap)} size={size} />;
      })}
      {countingOptions(parsha, age).map((v, i) => {
        const cx = Math.max(W, 330) / 2 + (i - 1) * 105;
        const cy = H + 30 + bubbles / 2;
        return (
          <g key={v}>
            <circle cx={cx} cy={cy} r={40} fill="#fff" stroke={accent} strokeWidth={5} />
            <text
              x={cx}
              y={cy}
              fontSize={44}
              textAnchor="middle"
              dominantBaseline="central"
              fill={INK}
              fontFamily="var(--font-fredoka)"
              fontWeight={600}
            >
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
