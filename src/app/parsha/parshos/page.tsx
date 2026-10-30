import type { Metadata } from "next";
import Link from "next/link";
import { Scene } from "@/parsha/components/art/Scene";
import { COMING_SOON, PARSHOS } from "@/parsha/lib/content";

export const metadata: Metadata = { title: "פרשיות" };

export default function Library() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-p-heading text-3xl font-bold">פרשיות</h1>
      <p className="mt-1 text-p-muted">נייע יעדע וואך</p>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PARSHOS.map((p) => (
          <li key={p.id}>
            <Link
              href={`/parsha/builder?p=${p.id}`}
              className="block overflow-hidden rounded-2xl border-2 border-p-line/25 bg-p-surface hover:border-p-brand"
            >
              <div className="bg-white p-2">
                <Scene name={p.scene} className="aspect-[4/3] w-full" />
              </div>
              <p className="p-3 font-p-heading text-lg font-semibold">פרשת {p.name}</p>
            </Link>
          </li>
        ))}
        {COMING_SOON.map((name) => (
          <li
            key={name}
            className="flex min-h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-p-line/30 p-3 text-center"
          >
            <p className="font-p-heading text-lg font-semibold">פרשת {name}</p>
            <p className="text-sm text-p-muted">באלד</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
