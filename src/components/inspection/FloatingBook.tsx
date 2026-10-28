"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { inspectionBookingUrl } from "@/lib/siteConfig";

// On a computer, a Book button that floats in the corner once the visitor
// has scrolled past the hero, so booking is always one click away. Phones
// already have the sticky bar's "Book Free" button.
export default function FloatingBook() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={inspectionBookingUrl()}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed right-6 bottom-6 z-30 hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-dark to-[#16a34a] py-3 pr-4 pl-5 font-extrabold text-white shadow-2xl shadow-brand-dark/40 ring-4 ring-white lg:flex"
        >
          Book free inspection
          <span className="rounded-full bg-[#ffd84d] px-2 py-0.5 text-[11px] font-black text-brand-dark">FREE</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
