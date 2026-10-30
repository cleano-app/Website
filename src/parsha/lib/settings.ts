import { AGES, type Age } from "./age";

export type Activity = "coloring" | "maze" | "dots" | "counting" | "story" | "parents" | "craft";

export const ACTIVITIES: Activity[] = ["coloring", "maze", "dots", "counting", "story", "parents", "craft"];

export const TEACHER_TITLES = ["מורה", "מלמד", "טאנטע"] as const;
export type TeacherTitle = (typeof TEACHER_TITLES)[number];

export const ACCENTS = [
  { id: "orange", value: "#c2491c" },
  { id: "teal", value: "#1f5f6b" },
  { id: "blue", value: "#2b3f8f" },
  { id: "black", value: "#1a1a1a" },
] as const;

export type Settings = {
  institution: string;
  teacherTitle: TeacherTitle;
  teacherName: string;
  /** A data: URL, at most 400px on the long side. */
  logo: string | null;
  /** Null means "this week's parsha". */
  parshaId: string | null;
  age: Age;
  activities: Activity[];
  accent: string;
  /** The demo playgroup's id while "signed in" as it; null otherwise. */
  account: "testy" | null;
};

export const DEFAULT_SETTINGS: Settings = {
  institution: "",
  teacherTitle: "מורה",
  teacherName: "",
  logo: null,
  parshaId: null,
  age: "4",
  activities: [...ACTIVITIES],
  accent: ACCENTS[0].value,
  account: null,
};

const KEY = "parsha-sheets:settings:v1";

/** Never throws: a private window or blocked storage just gives the defaults. */
export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return sanitize(JSON.parse(raw));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Returns false when the browser would not store it (e.g. a logo too big for the quota). */
export function saveSettings(s: Settings): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}

export function sanitize(input: unknown): Settings {
  const s = (input ?? {}) as Partial<Settings>;
  const str = (v: unknown, max = 80) => (typeof v === "string" ? v.slice(0, max) : "");
  return {
    institution: str(s.institution),
    teacherTitle: TEACHER_TITLES.includes(s.teacherTitle as TeacherTitle)
      ? (s.teacherTitle as TeacherTitle)
      : DEFAULT_SETTINGS.teacherTitle,
    teacherName: str(s.teacherName),
    logo: typeof s.logo === "string" && s.logo.startsWith("data:image/") ? s.logo : null,
    parshaId: typeof s.parshaId === "string" ? s.parshaId : null,
    age: AGES.includes(s.age as Age) ? (s.age as Age) : DEFAULT_SETTINGS.age,
    activities: Array.isArray(s.activities)
      ? ACTIVITIES.filter((a) => s.activities!.includes(a))
      : DEFAULT_SETTINGS.activities,
    accent: ACCENTS.some((a) => a.value === s.accent) ? s.accent! : DEFAULT_SETTINGS.accent,
    account: s.account === "testy" ? "testy" : null,
  };
}
