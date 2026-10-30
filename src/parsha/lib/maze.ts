import { seeded } from "./rng";

export type Maze = {
  size: number;
  /** h[r][c]: wall along the top of row r (r = size is the bottom edge). */
  h: boolean[][];
  /** v[r][c]: wall along the left of column c (c = size is the right edge). */
  v: boolean[][];
};

/** A line in cell units: [x1, y1, x2, y2]. */
export type Segment = [number, number, number, number];

/**
 * Recursive backtracker on an N×N grid. The way in is the right wall of the
 * top-right cell (Yiddish reads from the right) and the way out is the left
 * wall of the bottom-left cell.
 */
export function makeMaze(size: number, ...seed: string[]): Maze {
  const rand = seeded(...seed);
  const h = Array.from({ length: size + 1 }, () => Array(size).fill(true));
  const v = Array.from({ length: size }, () => Array(size + 1).fill(true));
  const seen = Array.from({ length: size }, () => Array(size).fill(false));

  const stack: [number, number][] = [[0, size - 1]];
  seen[0][size - 1] = true;
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const next = (
      [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ] as [number, number][]
    ).filter(([nr, nc]) => nr >= 0 && nr < size && nc >= 0 && nc < size && !seen[nr][nc]);
    if (!next.length) {
      stack.pop();
      continue;
    }
    const [nr, nc] = next[Math.floor(rand() * next.length)];
    if (nr !== r) h[Math.max(r, nr)][c] = false;
    else v[r][Math.max(c, nc)] = false;
    seen[nr][nc] = true;
    stack.push([nr, nc]);
  }

  v[0][size] = false;
  v[size - 1][0] = false;
  return { size, h, v };
}

/** The walls as lines, with runs along one edge joined into one line. */
export function mazeSegments({ size, h, v }: Maze): Segment[] {
  const out: Segment[] = [];
  for (let r = 0; r <= size; r++) {
    let start = -1;
    for (let c = 0; c <= size; c++) {
      const on = c < size && h[r][c];
      if (on && start < 0) start = c;
      if (!on && start >= 0) {
        out.push([start, r, c, r]);
        start = -1;
      }
    }
  }
  for (let c = 0; c <= size; c++) {
    let start = -1;
    for (let r = 0; r <= size; r++) {
      const on = r < size && v[r][c];
      if (on && start < 0) start = r;
      if (!on && start >= 0) {
        out.push([c, start, c, r]);
        start = -1;
      }
    }
  }
  return out;
}

/** Cells reachable from the entrance cell, for tests. */
export function reachable({ size, h, v }: Maze): number {
  const seen = new Set<string>();
  const q: [number, number][] = [[0, size - 1]];
  seen.add(`0,${size - 1}`);
  while (q.length) {
    const [r, c] = q.shift()!;
    const moves: [number, number, boolean][] = [
      [r - 1, c, r > 0 && !h[r][c]],
      [r + 1, c, r < size - 1 && !h[r + 1][c]],
      [r, c - 1, c > 0 && !v[r][c]],
      [r, c + 1, c < size - 1 && !v[r][c + 1]],
    ];
    for (const [nr, nc, open] of moves) {
      const k = `${nr},${nc}`;
      if (open && !seen.has(k)) {
        seen.add(k);
        q.push([nr, nc]);
      }
    }
  }
  return seen.size;
}
