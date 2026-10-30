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
  footer: (name: string) => `פרשת ${name} · א גוט שבת!`,
  childName: "נאמען:",
  logoPlaceholder: "[לאגא]",
};

export const ACTIVITY_LABELS: Record<Activity, string> = {
  coloring: "קאלירן",
  maze: "מעיז",
  dots: "פארבינד די פינטלעך",
  counting: "ציילן",
  story: "מעשה'לע פאר די מורה",
  parents: "בריוו פאר עלטערן",
  craft: "קראפט",
};

export const AGE_LABELS: Record<Age, string> = {
  "2-3": "2–3",
  "3-4": "3–4",
  "4-6": "4–6",
};

/** Sheet subtitles under the parsha name in the header. */
export const SUBTITLES = {
  coloring: "קאלירן",
  note: "בריוו פאר עלטערן",
  activities: "אקטיוויטעטן",
  morah: "פאר די מורה",
};
