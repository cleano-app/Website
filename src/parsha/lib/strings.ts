// Wording on the sheets is the seed text from the brief (section 10), word
// for word. Website wording is ours; keep it heimish (no YIVO spelling).
import type { Activity } from "./settings";
import type { Age } from "./age";
import type { IconName } from "./content";

export const SHEET = {
  coloringTitle: "קאלירט אן דאס בילד",
  parentsTitle: "טייערע עלטערן,",
  parentsAsk: "פרעגט אייער קינד ביים שבת'דיגן טיש:",
  counting: (word: string) => `וויפיל ${word} זענען דא? מאכט א רינגל ארום דעם ריכטיגן נומער`,
  dotsPrefix: "פארבינד די פינטלאך:",
  storyTitle: "דערציילט פאר די קינדער",
  questionsTitle: "פרעגט די קינדער:",
  footer: (title: string, greeting = "א גוט שבת!") => `${title} · ${greeting}`,
  childName: "נאמען:",
  logoPlaceholder: "[לאגא]",
};

export const ACTIVITY_LABELS: Record<Activity, { yi: string; en: string }> = {
  coloring: { yi: "קאלירן", en: "Colouring" },
  maze: { yi: "מעיז", en: "Maze" },
  dots: { yi: "פארבינד די פינטלאך", en: "Dot-to-dot" },
  counting: { yi: "ציילן", en: "Counting" },
  story: { yi: "מעשה'לע פאר די מורה", en: "Story for the morah" },
  parents: { yi: "בריוו פאר עלטערן", en: "Note for parents" },
  craft: { yi: "קראפט", en: "Craft" },
};

export const AGE_LABELS: Record<Age, string> = {
  "3": "3",
  "4": "4",
  "5": "5",
  "6-7": "6–7",
};

/** Sheet subtitles under the parsha name in the header. */
export const SUBTITLES = {
  coloring: "קאלירן",
  note: "בריוו פאר עלטערן",
  activities: "עקטיוויטיס",
  morah: "פאר די מורה",
};

/** Words for the "trace the words" craft, by picture. */
export const ICON_WORDS: Partial<Record<IconName, string>> = {
  bread: "ברויט",
  jug: "קריגל",
  bowl: "שיסל",
  stone: "שטיין",
  tent: "געצעלט",
  well: "ברונעם",
  pot: "טאפ",
  table: "טיש",
  sheaf: "אלומה",
  sheep: "שעפסל",
  cow: "קו",
  sack: "זאק",
  wagon: "וואגן",
  flask: "פך",
  menorah: "מנורה",
  dreidel: "דריידל",
  lion: "לייב",
  ship: "שיף",
  grapes: "טרויבן",
  bush: "סנה",
  brick: "ציגל",
  frog: "פרעשל",
  locust: "היישעריק",
  hamantash: "המן טאש",
  basket: "קערבל",
  house: "הויז",
  matzah: "מצה",
  mountain: "בארג",
  flower: "בלום",
  apple: "עפל",
  honey: "האניג",
  candle: "ליכט",
  shul: "שול",
  sukkah: "סוכה",
  esrog: "אתרוג",
  torah: "ספר תורה",
  candy: "צוקערל",
  fire: "פייער",
  bow: "בויגן",
  arrow: "פייל",
};

/** The rabbonim's ruling on passing sheets on: on the first page and at sign-up. */
export const NO_FORWARDING = {
  yi: "על פי דעת רבנים: די שיטס זענען נאר פאר אייער אייגענעם קלאס. ס'איז אסור זיי ווייטער צו שיקן, קאפירן אדער געבן פאר אנדערע.",
  en: "By ruling of rabbonim: these sheets are only for your own class. It is forbidden to forward, copy or give them to others.",
};
