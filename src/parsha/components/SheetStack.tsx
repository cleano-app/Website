"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet } from "@/parsha/components/sheets/Sheet";
import type { Parsha } from "@/parsha/lib/content";
import type { SheetPage } from "@/parsha/lib/pages";
import type { Settings } from "@/parsha/lib/settings";

/** 210mm at 96 CSS px per inch. */
const A4_W = 793.7;
const A4_H = 1122.5;

/**
 * Real A4 sheets scaled down to fit the column. Print CSS takes the scaling
 * off again, so what prints is the full-size page.
 */
export function SheetStack({
  parsha,
  settings,
  pages,
}: {
  parsha: Parsha;
  settings: Settings;
  pages: SheetPage[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / A4_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="sheet-stack flex flex-col items-center gap-4">
      {pages.map((page, i) => (
        <div
          key={`${page.kind}-${i}`}
          className="sheet-wrap relative overflow-hidden shadow-lg ring-1 ring-black/10"
          style={{ width: A4_W * scale, height: A4_H * scale }}
        >
          <div className="sheet-wrap absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
            <Sheet parsha={parsha} settings={settings} page={page} />
          </div>
        </div>
      ))}
    </div>
  );
}
