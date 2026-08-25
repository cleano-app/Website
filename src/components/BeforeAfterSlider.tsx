"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import DirtyCleanScene from "./illustrations/DirtyCleanScene";

type ServiceIconType = "gutter" | "bin" | "window" | "pressure" | "graffiti" | "rooftop";

// A dependency-free before/after slider. By default the two panels are
// illustrated scenes (dirty vs. clean) - no image-gen or open internet
// access is available in this environment. Pass `photos` with real
// before/after image paths (as real job photography becomes available)
// to show actual photos instead of the illustration.
export default function BeforeAfterSlider({
  label,
  icon,
  photos,
}: {
  label: string;
  icon: ServiceIconType;
  photos?: { before: string; after: string };
}) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);

  function updateFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-white p-2.5 shadow-sm">
      <div
        ref={trackRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-ew-resize touch-none select-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          updateFromClientX(e.clientX);
        }}
      >
        {/* After layer (full size, underneath) */}
        <div className="absolute inset-0">
          {photos ? (
            <Image
              src={photos.after}
              alt={`${label} - after`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <DirtyCleanScene type={icon} state="after" className="h-full w-full" />
          )}
          <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            After
          </span>
        </div>

        {/* Before layer - full-size and fixed in place (like a real photo),
            with only the visible portion changing via clip-path, so content
            doesn't rescale as the slider moves. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {photos ? (
            <Image
              src={photos.before}
              alt={`${label} - before`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <DirtyCleanScene type={icon} state="before" className="h-full w-full" />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-stone-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-dark shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-x-0 bottom-2 mx-auto w-3/4 opacity-0 focus:opacity-100"
          aria-label={`Before/after slider for ${label}`}
        />
      </div>
      <p className="px-1.5 pt-3 pb-1 text-sm font-medium text-foreground/80">{label}</p>
    </div>
  );
}
