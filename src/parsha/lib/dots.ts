export type Dot = {
  x: number;
  y: number;
  n: number;
  /** Where the number goes: just outside the shape, away from its middle. */
  lx: number;
  ly: number;
};

/**
 * Every corner stays a dot; extra dots go along the edges in proportion to
 * edge length until there are `target` dots. Coordinates stay in the unit
 * square. `labelGap` is how far the number sits from its dot.
 */
export function makeDots(corners: [number, number][], target: number | null, labelGap = 0.06): Dot[] {
  const n = corners.length;
  const extra = Math.max(0, (target ?? n) - n);
  const lengths = corners.map(([x, y], i) => {
    const [x2, y2] = corners[(i + 1) % n];
    return Math.hypot(x2 - x, y2 - y);
  });
  const total = lengths.reduce((a, b) => a + b, 0);

  // Largest-remainder share of the extra dots per edge.
  const raw = lengths.map((l) => (l / total) * extra);
  const share = raw.map(Math.floor);
  let left = extra - share.reduce((a, b) => a + b, 0);
  raw
    .map((r, i) => [r - Math.floor(r), i] as const)
    .sort((a, b) => b[0] - a[0] || a[1] - b[1])
    .forEach(([, i]) => {
      if (left > 0) {
        share[i]++;
        left--;
      }
    });

  const pts: [number, number][] = [];
  corners.forEach(([x, y], i) => {
    const [x2, y2] = corners[(i + 1) % n];
    pts.push([x, y]);
    for (let k = 1; k <= share[i]; k++) {
      const t = k / (share[i] + 1);
      pts.push([x + (x2 - x) * t, y + (y2 - y) * t]);
    }
  });

  const cx = corners.reduce((a, [x]) => a + x, 0) / n;
  const cy = corners.reduce((a, [, y]) => a + y, 0) / n;
  return pts.map(([x, y], i) => {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.hypot(dx, dy) || 1;
    return { x, y, n: i + 1, lx: x + (dx / d) * labelGap, ly: y + (dy / d) * labelGap };
  });
}
