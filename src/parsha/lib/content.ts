import vayeira from "@/parsha/content/parshos/vayeira.json";
import chayeiSarah from "@/parsha/content/parshos/chayei-sarah.json";
import toldos from "@/parsha/content/parshos/toldos.json";
import vayeitzei from "@/parsha/content/parshos/vayeitzei.json";
import vayeishev from "@/parsha/content/parshos/vayeishev.json";
import mikeitz from "@/parsha/content/parshos/mikeitz.json";
import vayigash from "@/parsha/content/parshos/vayigash.json";
import chanukah from "@/parsha/content/yomim-tovim/chanukah.json";

export type IconName =
  | "bread"
  | "jug"
  | "bowl"
  | "stone"
  | "tent"
  | "well"
  | "pot"
  | "footprints"
  | "table"
  | "sheaf"
  | "sheep"
  | "cow"
  | "sack"
  | "wagon"
  | "flask"
  | "menorah"
  | "dreidel";

export type SceneName =
  | "vayeira"
  | "chayei-sarah"
  | "toldos"
  | "vayeitzei"
  | "vayeishev"
  | "mikeitz"
  | "vayigash"
  | "chanukah";

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

/** A parsha or a yom tov: everything one set of sheets needs. */
export type Parsha = {
  id: string;
  kind: "parsha" | "yomtov";
  order: number;
  /** Hebcal's name for it ("Vayera", "Chanukah"), used to find this week's. */
  hebcal: string;
  /** Without "פרשת" - "וירא", "חנוכה". */
  name: string;
  /** Footer wish; parshos say "א גוט שבת!". */
  greeting?: string;
  /** The line before the parents' questions, when it isn't the Shabbos table. */
  parentsAsk?: string;
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

const byOrder = (a: Parsha, b: Parsha) => a.order - b.order;

export const PARSHOS: Parsha[] = (
  [vayeira, chayeiSarah, toldos, vayeitzei, vayeishev, mikeitz, vayigash] as Parsha[]
).sort(byOrder);

export const YOMIM_TOVIM: Parsha[] = ([chanukah] as Parsha[]).sort(byOrder);

export const ALL: Parsha[] = [...PARSHOS, ...YOMIM_TOVIM];

export function getParsha(id: string): Parsha | undefined {
  return ALL.find((p) => p.id === id);
}

/** "פרשת וירא", or just "חנוכה" for a yom tov. */
export function titleOf(p: Parsha): string {
  return p.kind === "parsha" ? `פרשת ${p.name}` : p.name;
}

/** Shown as "coming soon" in the library. */
export const COMING_SOON = ["ויחי", "שמות", "וארא", "בא"];
export const COMING_SOON_YOMIM_TOVIM = ["פורים", "פסח", "שבועות"];
