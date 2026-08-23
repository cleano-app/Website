import Link from "next/link";
import { priorityAreas, regionName } from "@/lib/content/areas";

export default function AreasWeCoverSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-brand-dark px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">Areas We Cover</h2>
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
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-white/90"
        >
          View All Areas
        </Link>
      </div>
    </section>
  );
}
