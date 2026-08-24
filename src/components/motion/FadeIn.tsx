"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Scroll-reveal wrapper: fades/slides content in once as it enters the
// viewport. `once: true` so it doesn't re-trigger on every scroll pass.
export default function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
