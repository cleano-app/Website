"use client";

import { useEffect, useRef, useState } from "react";

// The owner's free-inspection video (48s, 9:16), in a phone-shaped frame.
// It plays muted on its own while on screen and pauses when scrolled away;
// "Tap for sound" turns the sound on. With reduced motion it doesn't
// autoplay - the poster shows, with the player's own controls.
export default function OfferVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => setReduced(still));
    if (still) return () => cancelAnimationFrame(frame);
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    seen.observe(video);
    return () => {
      cancelAnimationFrame(frame);
      seen.disconnect();
    };
  }, []);

  return (
    <div className={`relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-[#dbe7ee] shadow-2xl shadow-brand/30 ring-[6px] ring-white ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster="/video/drone-inspection-offer-poster.jpg"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label="Video: Cleano's free drone gutter inspection - the drone checks a home's gutters, every problem is photographed into a report, and what blocked gutters cause"
      >
        {/* MP4 first (smaller; Chrome, Safari, Edge, Firefox); WebM for
            browsers without H.264. */}
        <source src="/video/drone-inspection-offer.mp4" type="video/mp4" />
        <source src="/video/drone-inspection-offer.webm" type="video/webm" />
      </video>
      {!reduced && (
        <button
          type="button"
          onClick={() => {
            const video = ref.current;
            if (!video) return;
            const next = !muted;
            video.muted = next;
            setMuted(next);
            if (!next) video.play().catch(() => {});
          }}
          className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-xs font-bold text-white backdrop-blur"
        >
          {muted ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
              Tap for sound
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
              </svg>
              Sound on
            </>
          )}
        </button>
      )}
    </div>
  );
}
