import Link from "next/link";
import { priorityAreas, regionName } from "@/lib/content/areas";
import FloatingButterflies from "./motion/FloatingButterflies";

export default function AreasWeCoverSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="bg-grain relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand to-brand-dark px-6 py-14 text-center text-white sm:px-12">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-light/15" />
        <FloatingButterflies
          flock={[
            { top: "18%", left: "10%", size: 20, duration: 9, delay: 0.3, xDrift: [0, 12, -6, 0], yDrift: [0, -12, 6, 0], rotate: [-8, 10, -4, -8], opacity: 0.45 },
            { top: "65%", left: "90%", size: 18, duration: 10, delay: 1.1, xDrift: [0, -10, 8, 0], yDrift: [0, 10, -8, 0], rotate: [8, -10, 6, 8], opacity: 0.4 },
          ]}
        />

        <div className="relative">
          <PinIcon />
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Areas We Cover</h2>
          <p className="mt-2 text-white/80">Exterior cleaning across {regionName}</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm font-medium">
            {priorityAreas.map((area, i) => (
              <li key={area.name} className="flex items-center gap-3">
                {area.name}
                {i < priorityAreas.length - 1 && <span className="text-white/40">·</span>}
              </li>
            ))}
          </ul>
          <Link
            href="/areas-we-cover"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark shadow-lg transition-colors hover:bg-white/90"
          >
            View All Areas
          </Link>
        </div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
