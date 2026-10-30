import type { Parsha } from "./content";
import type { Activity } from "./settings";

export type SheetPage =
  | { kind: "coloring"; withNote: boolean }
  | { kind: "note" }
  | { kind: "activities"; maze: boolean; dots: boolean; counting: boolean }
  | { kind: "morah" }
  | { kind: "craft-cut" }
  | { kind: "craft-steps" };

/** Which A4 pages to print, in order, for the ticked activities. */
export function planPages(parsha: Parsha, activities: Activity[]): SheetPage[] {
  const on = (a: Activity) => activities.includes(a);
  const pages: SheetPage[] = [];
  if (on("coloring")) pages.push({ kind: "coloring", withNote: on("parents") });
  else if (on("parents")) pages.push({ kind: "note" });
  if (on("maze") || on("dots") || on("counting"))
    pages.push({ kind: "activities", maze: on("maze"), dots: on("dots"), counting: on("counting") });
  if (on("story")) pages.push({ kind: "morah" });
  if (on("craft") && parsha.craft) pages.push({ kind: "craft-cut" }, { kind: "craft-steps" });
  return pages;
}
