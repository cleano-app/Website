import type { Parsha } from "./content";
import type { CraftId } from "./crafts";
import type { Activity, Student } from "./settings";

export type SheetPage =
  | { kind: "coloring"; withNote: boolean }
  | { kind: "note" }
  | { kind: "activities"; maze: boolean; dots: boolean; counting: boolean }
  | { kind: "morah" }
  | { kind: "craft-cut" }
  | { kind: "craft-steps" }
  | { kind: "my-colouring"; student: Student | null }
  | { kind: "crown"; students: (Student | null)[] }
  | { kind: "trace" }
  | { kind: "photo-frame"; student: Student | null }
  | { kind: "photo-menorah"; students: Student[] };

/** Which A4 pages to print for the week's sheets, for the ticked activities. */
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

/** One page per child, or one with a blank name line when there's no class list yet. */
const perChild = (students: Student[]) => (students.length ? students : [null]);

/** The pages for a craft. */
export function planCraft(
  craft: CraftId,
  parsha: Parsha,
  activities: Activity[],
  students: Student[],
  menorahIds: string[],
): SheetPage[] {
  switch (craft) {
    case "sheets":
      return planPages(parsha, activities);
    case "my-colouring":
      return perChild(students).map((student) => ({ kind: "my-colouring", student }));
    case "name-crown": {
      const kids = perChild(students);
      const pages: SheetPage[] = [];
      for (let i = 0; i < kids.length; i += 2) pages.push({ kind: "crown", students: kids.slice(i, i + 2) });
      return pages;
    }
    case "trace":
      return [{ kind: "trace" }];
    case "photo-frame":
      return perChild(students).map((student) => ({ kind: "photo-frame", student }));
    case "tent":
      return parsha.craft ? [{ kind: "craft-cut" }, { kind: "craft-steps" }] : [];
    case "photo-menorah": {
      const picked = menorahIds.map((id) => students.find((s) => s.id === id)).filter((s): s is Student => !!s);
      return [{ kind: "photo-menorah", students: (picked.length ? picked : students).slice(0, 8) }];
    }
  }
}
