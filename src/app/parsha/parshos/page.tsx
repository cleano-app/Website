import type { Metadata } from "next";
import { LibraryGrid } from "../LibraryGrid";
import { COMING_SOON, PARSHOS } from "@/parsha/lib/content";

export const metadata: Metadata = { title: "פרשיות" };

export default function Library() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">פרשיות</h1>
      <p className="mt-1 text-p-muted">נייע יעדע וואך</p>
      <LibraryGrid items={PARSHOS} comingSoon={COMING_SOON.map((n) => `פרשת ${n}`)} />
    </div>
  );
}
