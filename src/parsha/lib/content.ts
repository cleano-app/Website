import vayeira from "@/parsha/content/parshos/vayeira.json";
import chayeiSarah from "@/parsha/content/parshos/chayei-sarah.json";
import toldos from "@/parsha/content/parshos/toldos.json";
import vayeitzei from "@/parsha/content/parshos/vayeitzei.json";
import vayeishev from "@/parsha/content/parshos/vayeishev.json";
import mikeitz from "@/parsha/content/parshos/mikeitz.json";
import vayigash from "@/parsha/content/parshos/vayigash.json";
import vayechi from "@/parsha/content/parshos/vayechi.json";
import shemos from "@/parsha/content/parshos/shemos.json";
import vaeira from "@/parsha/content/parshos/vaeira.json";
import bo from "@/parsha/content/parshos/bo.json";
import chanukah from "@/parsha/content/yomim-tovim/chanukah.json";
import purim from "@/parsha/content/yomim-tovim/purim.json";
import pesach from "@/parsha/content/yomim-tovim/pesach.json";
import shavuos from "@/parsha/content/yomim-tovim/shavuos.json";

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
  | "dreidel"
  | "lion"
  | "ship"
  | "grapes"
  | "bush"
  | "brick"
  | "frog"
  | "pyramid"
  | "locust"
  | "hamantash"
  | "basket"
  | "house"
  | "matzah"
  | "mountain"
  | "flower";

export type SceneName =
  | "vayeira"
  | "chayei-sarah"
  | "toldos"
  | "vayeitzei"
  | "vayeishev"
  | "mikeitz"
  | "vayigash"
  | "vayechi"
  | "shemos"
  | "vaeira"
  | "bo"
  | "chanukah"
  | "purim"
  | "pesach"
  | "shavuos";

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
  /** For the English side of the site - "Vayeira". */
  nameEn: string;
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
  [vayeira, chayeiSarah, toldos, vayeitzei, vayeishev, mikeitz, vayigash, vayechi, shemos, vaeira, bo] as Parsha[]
).sort(byOrder);

export const YOMIM_TOVIM: Parsha[] = ([chanukah, purim, pesach, shavuos] as Parsha[]).sort(byOrder);

export const ALL: Parsha[] = [...PARSHOS, ...YOMIM_TOVIM];

export function getParsha(id: string): Parsha | undefined {
  return ALL.find((p) => p.id === id);
}

/** "פרשת וירא", or just "חנוכה" for a yom tov. */
export function titleOf(p: Parsha): string {
  return p.kind === "parsha" ? `פרשת ${p.name}` : p.name;
}

/** Shown as "coming soon" in the library. */
export const COMING_SOON = [
  { yi: "פרשת בשלח", en: "Beshalach" },
  { yi: "פרשת יתרו", en: "Yisro" },
  { yi: "פרשת משפטים", en: "Mishpatim" },
  { yi: "פרשת תרומה", en: "Terumah" },
];
export const COMING_SOON_YOMIM_TOVIM = [
  { yi: "ראש השנה", en: "Rosh Hashanah" },
  { yi: "סוכות", en: "Sukkos" },
];
