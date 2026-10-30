import type { Metadata } from "next";
import { LibraryGrid } from "../LibraryGrid";
import { COMING_SOON_YOMIM_TOVIM, YOMIM_TOVIM } from "@/parsha/lib/content";

export const metadata: Metadata = { title: "יום טוב" };

export default function YomimTovim() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">יום טוב</h1>
      <p className="mt-1 text-p-muted">בלעטער פאר יעדן יום טוב</p>
      <LibraryGrid items={YOMIM_TOVIM} comingSoon={COMING_SOON_YOMIM_TOVIM} />
    </div>
  );
}
