import Link from "next/link";
import { priorityAreas, regionName } from "@/lib/content/areas";

export default function AreasWeCoverSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand px-6 py-14 text-center text-white sm:px-12">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/5" />

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
