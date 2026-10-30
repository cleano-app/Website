import type { Metadata } from "next";
import { LibraryGrid } from "../LibraryGrid";
import { COMING_SOON_YOMIM_TOVIM, YOMIM_TOVIM } from "@/parsha/lib/content";
import { T } from "@/parsha/i18n";

export const metadata: Metadata = { title: "יום טוב · Yom Tov" };

export default function YomimTovim() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="יום טוב" en="Yom Tov" />
      </h1>
      <p className="mt-1 text-p-muted">
        <T yi="שיטס פאר יעדן יום טוב" en="Sheets for every Yom Tov" />
      </p>
      <LibraryGrid items={YOMIM_TOVIM} comingSoon={COMING_SOON_YOMIM_TOVIM} />
    </div>
  );
}
