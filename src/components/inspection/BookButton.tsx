import { inspectionBookingUrl } from "@/lib/siteConfig";

// The free inspection's Book button - made to be the most visible thing on
// the page (the owner: "more visible and more attractive"): deep-to-bright
// green with white text, a yellow FREE tag, a band of light that keeps
// sweeping across it, and a soft pulse ring. The motion stops under
// reduced motion.
export default function BookButton({ size = "lg", className = "" }: { size?: "md" | "lg"; className?: string }) {
  const big = size === "lg";
  return (
    <a
      href={inspectionBookingUrl()}
      className={`group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-dark via-[#15803d] to-[#16a34a] font-extrabold text-white shadow-[0_14px_34px_-10px_rgba(21,128,61,0.75)] ring-4 ring-white transition-transform hover:-translate-y-0.5 hover:scale-[1.02] ${big ? "gap-2 py-3.5 pr-3.5 pl-3.5 text-base sm:gap-3 sm:py-5 sm:pr-5 sm:pl-4 sm:text-xl" : "py-3 pr-3 pl-3 text-base"} ${className}`}
    >
      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#16a34a]" aria-hidden="true" />
      <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
        <span className="animate-shine-loop absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      </span>
      <span className={`relative flex shrink-0 items-center justify-center rounded-full bg-white text-brand-dark ${big ? "h-10 w-10 sm:h-11 sm:w-11" : "h-8 w-8"}`}>
        <svg width={big ? 20 : 16} height={big ? 20 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
        </svg>
      </span>
      <span className="relative whitespace-nowrap">
        <span className="sm:hidden">Book free inspection</span>
        <span className="hidden sm:inline">Book my free inspection</span>
      </span>
      <span className="relative rounded-full bg-[#ffd84d] px-2.5 py-1 text-xs font-black tracking-wide text-brand-dark">FREE</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="relative mr-1 hidden transition-transform group-hover:translate-x-1 min-[380px]:block" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
