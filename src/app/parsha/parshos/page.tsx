import type { Metadata } from "next";
import { LibraryGrid } from "../LibraryGrid";
import { COMING_SOON, PARSHOS } from "@/parsha/lib/content";
import { T } from "@/parsha/i18n";

export const metadata: Metadata = { title: "פרשיות · Parshiyos" };

export default function Library() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="פרשיות" en="Parshiyos" />
      </h1>
      <p className="mt-1 text-p-muted">
        <T yi="נייע יעדע וואך" en="New every week" />
      </p>
      <LibraryGrid items={PARSHOS} comingSoon={COMING_SOON} />
    </div>
  );
}
