"use client";

import { motion } from "framer-motion";

// Hand-built line-art icons for each service, used instead of stock/AI
// photography (no image-gen or open internet access in this environment).
// Each renders inside a bolder gradient badge, tinted differently per
// service for variety, with a slow continuous "breathing" idle animation
// and a real wake-up wiggle on hover AND tap - CSS :hover barely fires on
// touchscreens, so whileTap is what makes this feel alive on mobile.

type ServiceIconType =
  | "gutter"
  | "bin"
  | "window"
  | "pressure"
  | "graffiti"
  | "rooftop";

const paths: Record<ServiceIconType, React.ReactNode> = {
  gutter: (
    <>
      <path d="M6 14h20" />
      <path d="M9 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
      <path d="M13 19v3M19 19v3" />
      <path d="M16 8l0 4" />
      <path d="M13 10l3-3 3 3" />
    </>
  ),
  bin: (
    <>
      <path d="M9 10v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10" />
      <path d="M7 10h18" />
      <path d="M13 7h6l1 3H12l1-3Z" />
      <path d="M13.5 14.5v5M16 14.5v5M18.5 14.5v5" />
    </>
  ),
  window: (
    <>
      <rect x="7" y="6" width="18" height="20" rx="1.5" />
      <path d="M16 6v20M7 16h18" />
      <path d="M4 9l3-3M4 23l3 3M29 9l-3-3M29 23l-3 3" />
    </>
  ),
  pressure: (
    <>
      <path d="M9 22h9l4-9H9l-2 5" />
      <path d="M11 13V8a2 2 0 0 1 2-2h2" />
      <path d="M22 13l5 -1" />
      <path d="M9 22l-2 5M14 22l-1 5M19 22l-1 5" />
    </>
  ),
  graffiti: (
    <>
      <rect x="11" y="12" width="10" height="15" rx="2" />
      <path d="M13 12V8a3 3 0 0 1 6 0v4" />
      <circle cx="16" cy="7" r="1" fill="currentColor" stroke="none" />
      <path d="M22 15l3-1M23 19h3M22 23l3 1" />
    </>
  ),
  rooftop: (
    <>
      <path d="M5 17L16 6l11 11" />
      <path d="M8 17v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" />
      <path d="M20 11V7h3v4" />
      <path d="M11 21h4M17 21h4" />
    </>
  ),
};

// Distinct gradient tint per service - all in the brand green family, but
// varied enough that the five badges read as colourful rather than
// identical pale boxes.
const tintByType: Record<ServiceIconType, string> = {
  gutter: "from-brand-light/50 to-brand/25",
  bin: "from-brand/45 to-brand-dark/25",
  window: "from-brand-light/55 via-brand/30 to-brand-light/20",
  pressure: "from-brand/50 to-brand-dark/35",
  graffiti: "from-brand-dark/35 to-brand/30",
  rooftop: "from-brand-dark/30 via-brand-light/40 to-brand/25",
};

export default function ServiceIcon({
  type,
  className = "",
  idle = false,
}: {
  type: ServiceIconType;
  className?: string;
  /** Continuous slow bob, independent of hover - use sparingly (hero/large icons). */
  idle?: boolean;
}) {
  const gradId = `service-icon-grad-${type}`;

  return (
    <motion.div
      animate={idle ? { y: [0, -6, 0], rotate: [0, 2, -2, 0] } : undefined}
      transition={idle ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
      whileHover={{ scale: 1.15, rotate: -10, transition: { duration: 0.3, ease: "easeOut" } }}
      whileTap={{ scale: 1.28, rotate: 14, transition: { type: "spring", stiffness: 400, damping: 8 } }}
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${tintByType[type]} ${className}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-brand-dark)" />
          </linearGradient>
        </defs>
        {paths[type]}
      </svg>
    </motion.div>
  );
}
