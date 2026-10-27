"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// A real job photo with the problems marked on it the way a report marks
// them - drawn live as it scrolls into view, rather than baked into the
// image. Ring coordinates are in the photo's own pixels (the overlay uses
// the photo's viewBox), so they stay on the fault at any width; labels are
// HTML at a readable size, placed in percentages.

export interface Ring {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Degrees, about the ring's own centre. */
  rotate?: number;
}

export interface Label {
  text: string;
  /** Percent from the top, and from the left - or from the right, for a
   * label near the right edge, so it can't run off a narrow photo. */
  top: number;
  left?: number;
  right?: number;
}

export default function MarkedPhoto({
  src,
  alt,
  width,
  height,
  rings,
  labels,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  rings: Ring[];
  labels: Label[];
  sizes?: string;
  className?: string;
}) {
  const still = useReducedMotion() ?? false;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {rings.map((ring, i) => (
          <motion.ellipse
            key={i}
            cx={ring.cx}
            cy={ring.cy}
            rx={ring.rx}
            ry={ring.ry}
            transform={ring.rotate ? `rotate(${ring.rotate} ${ring.cx} ${ring.cy})` : undefined}
            fill="none"
            stroke="#e53935"
            strokeWidth={3.5}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: still ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: still ? 0 : 0.9, delay: still ? 0 : 0.3 + i * 0.6, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {labels.map((label, i) => (
        <motion.span
          key={label.text}
          className="absolute rounded-md bg-[#e53935] px-2 py-1 text-[11px] font-bold whitespace-nowrap text-white shadow-md sm:px-2.5 sm:text-sm"
          style={{ top: `${label.top}%`, ...(label.right !== undefined ? { right: `${label.right}%` } : { left: `${label.left ?? 0}%` }) }}
          initial={still ? false : { opacity: 0, y: 8, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: still ? 0 : 1 + i * 0.6 }}
        >
          {label.text}
        </motion.span>
      ))}
    </div>
  );
}
