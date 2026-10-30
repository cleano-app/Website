import vayeira from "@/parsha/content/parshos/vayeira.json";
import chayeiSarah from "@/parsha/content/parshos/chayei-sarah.json";
import toldos from "@/parsha/content/parshos/toldos.json";
import vayeitzei from "@/parsha/content/parshos/vayeitzei.json";

export type IconName =
  | "bread"
  | "jug"
  | "bowl"
  | "stone"
  | "tent"
  | "well"
  | "pot"
  | "footprints"
  | "table";

export type SceneName = "vayeira" | "chayei-sarah" | "toldos" | "vayeitzei";

export type Craft = {
  title: string;
  legend: { cut: string; fold: string; glue: string };
  baseLabel: string;
  baseItems: string;
  piecesTitle: string;
  pieces: { icon: IconName; label: string }[];
  instructionsTitle: string;
  needTitle: string;
  need: string[];
  byAge: { age: string; text: string }[];
  steps: string[];
};

export type Parsha = {
  id: string;
  order: number;
  /** Hebcal's transliteration, used to find this week's parsha. */
  hebcal: string;
  /** Without "פרשת" - "וירא". */
  name: string;
  /** False until a melamed or morah has checked every word. */
  melamedChecked: boolean;
  caption: string;
  scene: SceneName;
  maze: { start: IconName; end: IconName; instruction: string };
  dots: { caption: string; corners: [number, number][] };
  counting: { icon: IconName; word: string };
  parents: { intro: string; questions: { q: string; a: string }[] };
  story: string;
  craft: Craft | null;
};

export const PARSHOS: Parsha[] = ([vayeira, chayeiSarah, toldos, vayeitzei] as Parsha[]).sort(
  (a, b) => a.order - b.order,
);

export function getParsha(id: string): Parsha | undefined {
  return PARSHOS.find((p) => p.id === id);
}

/** The next parshos, shown as "coming soon" in the library. */
export const COMING_SOON = ["וישלח", "וישב", "מקץ", "ויגש"];
