import Link from "next/link";
import { Scene } from "@/parsha/components/art/Scene";
import { titleOf, type Parsha } from "@/parsha/lib/content";
import { T, type Text } from "@/parsha/i18n";

/** Cards for what's ready, then "coming soon" cards. */
export function LibraryGrid({ items, comingSoon }: { items: Parsha[]; comingSoon: Text[] }) {
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
            <div className="p-3">
              <p className="font-p-heading text-lg font-semibold" lang="yi" dir="rtl">
                {titleOf(p)}
              </p>
              <p className="text-sm text-p-muted" lang="en" dir="ltr">
                {p.nameEn}
              </p>
            </div>
          </Link>
        </li>
      ))}
      {comingSoon.map((c) => (
        <li
          key={c.en}
          className="flex min-h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-p-line/30 p-3 text-center"
        >
          <p className="font-p-heading text-lg font-semibold">
            <T {...c} />
          </p>
          <p className="text-sm text-p-muted">
            <T yi="קומט באלד" en="Coming soon" />
          </p>
        </li>
      ))}
    </ul>
  );
}
