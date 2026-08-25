"use client";

import { motion } from "framer-motion";
import DirtyCleanScene from "./DirtyCleanScene";
import ServiceIcon from "./ServiceIcon";

type SceneType = "gutter" | "bin" | "window" | "pressure" | "graffiti" | "rooftop";

// A small looping "cleaning in progress" animation for service hero panels,
// built from the same illustrated dirty/clean scenes used in
// BeforeAfterSlider - here the wipe is driven automatically instead of by a
// drag handle, with the service's own icon riding the wipe line like it's
// doing the work. No image-gen/video tooling is available in this
// environment, so this is the closest thing to a looping animated clip.
export default function HeroLoopScene({
  type,
  className = "",
}: {
  type: SceneType;
  className?: string;
}) {
  const wipe = ["0%", "100%", "0%"];

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-sm ${className}`}>
      <div className="relative aspect-[4/3] w-full">
        {/* Clean layer, full size underneath */}
        <div className="absolute inset-0">
          <DirtyCleanScene type={type} state="after" className="h-full w-full" />
        </div>

        {/* Dirty layer, clipped from the left so the clean layer is
            progressively revealed as the wipe travels left-to-right (and
            re-covered on the way back). */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: "inset(0 0 0 0%)" }}
          animate={{ clipPath: wipe.map((w) => `inset(0 0 0 ${w})`) }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
        >
          <DirtyCleanScene type={type} state="before" className="h-full w-full" />
        </motion.div>

        {/* Wipe line + the service icon riding along it, wiggling as it "works" */}
        <motion.div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.9)]"
          initial={{ left: "0%" }}
          animate={{ left: wipe }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: [0, -14, 14, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <ServiceIcon type={type} className="h-12 w-12 shadow-lg" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
