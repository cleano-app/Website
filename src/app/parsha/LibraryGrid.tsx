import Link from "next/link";
import { Scene } from "@/parsha/components/art/Scene";
import { titleOf, type Parsha } from "@/parsha/lib/content";

/** Cards for what's ready, then "coming soon" cards. */
export function LibraryGrid({ items, comingSoon }: { items: Parsha[]; comingSoon: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((p) => (
        <li key={p.id}>
          <Link
            href={`/parsha/builder?p=${p.id}`}
            className="block overflow-hidden rounded-2xl border-2 border-p-line/25 bg-p-surface hover:border-p-brand"
          >
            <div className="bg-white p-2">
              <Scene name={p.scene} className="aspect-[4/3] w-full" />
            </div>
            <p className="p-3 font-p-heading text-lg font-semibold">{titleOf(p)}</p>
          </Link>
        </li>
      ))}
      {comingSoon.map((name) => (
        <li
          key={name}
          className="flex min-h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-p-line/30 p-3 text-center"
        >
          <p className="font-p-heading text-lg font-semibold">{name}</p>
          <p className="text-sm text-p-muted">באלד</p>
        </li>
      ))}
    </ul>
  );
}
