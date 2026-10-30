// Wording on the sheets is the seed text from the brief (section 10), word
// for word. Website wording is ours; keep it heimish (no YIVO spelling).
import type { Activity } from "./settings";
import type { Age } from "./age";

export const SHEET = {
  coloringTitle: "קאלירט אן דאס בילד",
  parentsTitle: "טייערע עלטערן,",
  parentsAsk: "פרעגט אייער קינד ביים שבת'דיגן טיש:",
  counting: (word: string) => `וויפיל ${word} זענען דא? מאכט א רינגל ארום דעם ריכטיגן נומער`,
  dotsPrefix: "פארבינד די פינטלעך:",
  storyTitle: "דערציילט פאר די קינדער",
  questionsTitle: "פרעגט די קינדער:",
  footer: (title: string, greeting = "א גוט שבת!") => `${title} · ${greeting}`,
  childName: "נאמען:",
  logoPlaceholder: "[לאגא]",
};

export const ACTIVITY_LABELS: Record<Activity, { yi: string; en: string }> = {
  coloring: { yi: "קאלירן", en: "Colouring" },
  maze: { yi: "מעיז", en: "Maze" },
  dots: { yi: "פארבינד די פינטלעך", en: "Dot-to-dot" },
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
