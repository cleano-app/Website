import { AGES, type Age } from "./age";

export type Activity = "coloring" | "maze" | "dots" | "counting" | "story" | "parents" | "craft";

export const ACTIVITIES: Activity[] = ["coloring", "maze", "dots", "counting", "story", "parents", "craft"];

export const TEACHER_TITLES = ["מורה", "מלמד", "טאנטע"] as const;
export type TeacherTitle = (typeof TEACHER_TITLES)[number];

/** Who the sheets are for: little ones in playgroup, a girls' school, a cheder. */
export type Audience = "playgroup" | "girls" | "boys";
export const AUDIENCES: Audience[] = ["playgroup", "girls", "boys"];

/** What a craft needs: free for everyone, a small fee, or the full plan. */
export type Plan = "free" | "basic" | "premium";
export const PLAN_RANK: Record<Plan, number> = { free: 0, basic: 1, premium: 2 };

// Sheet heading colours: bright, but dark enough to read and to print.
export const ACCENTS = [
  { id: "blue", value: "#3446d6" },
  { id: "pink", value: "#d6336c" },
  { id: "green", value: "#1f9d55" },
  { id: "purple", value: "#7344d9" },
  { id: "black", value: "#1a1a1a" },
] as const;

export const LOGO_STYLES = ["badge", "blocks", "rainbow", "sefer", "star"] as const;
export type LogoStyle = (typeof LOGO_STYLES)[number];
export const LOGO_PALETTES = ["rainbow", "pink", "green", "sky", "purple"] as const;
export type LogoPalette = (typeof LOGO_PALETTES)[number];

/** A logo made on the site: drawn live from these, so it prints sharp. */
export type LogoDesign = { style: LogoStyle; palette: LogoPalette; name: string };

/**
 * Who is signed in. For now an account lives on this device only; online
 * accounts and payments come with the account database.
 */
export type Account = {
  kind: "demo" | "device";
  name: string;
  email: string;
  audience: Audience;
  plan: Plan;
  /** When they agreed not to pass the sheets on (the rabbonim's ruling). */
  agreedAt: string;
};

export type Student = { id: string; name: string };

export type Settings = {
  institution: string;
  teacherTitle: TeacherTitle;
  teacherName: string;
  /** An uploaded logo: a data: URL, at most 400px on the long side. */
  logo: string | null;
  /** A logo made on the site; used when there is no uploaded one. */
  logoDesign: LogoDesign | null;
  /** Null means "this week's parsha". */
  parshaId: string | null;
  audience: Audience;
  age: Age;
  craftId: string;
  activities: Activity[];
  accent: string;
  account: Account | null;
  /** The class. Photos are kept separately, on this device only (photos.ts). */
  students: Student[];
  /** Which students go on the photo menorah, in order. */
  menorahIds: string[];
};

export const DEFAULT_SETTINGS: Settings = {
  institution: "",
  teacherTitle: "מורה",
  teacherName: "",
  logo: null,
  logoDesign: null,
  parshaId: null,
  audience: "playgroup",
  age: "4",
  craftId: "sheets",
  activities: [...ACTIVITIES],
  accent: ACCENTS[0].value,
  account: null,
  students: [],
  menorahIds: [],
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

const str = (v: unknown, max = 80) => (typeof v === "string" ? v.slice(0, max) : "");
const oneOf = <T extends string>(v: unknown, list: readonly T[], fallback: T): T =>
  list.includes(v as T) ? (v as T) : fallback;

function sanitizeAccount(v: unknown): Account | null {
  if (!v || typeof v !== "object") return null;
  const a = v as Partial<Account>;
  if (a.kind !== "demo" && a.kind !== "device") return null;
  return {
    kind: a.kind,
    name: str(a.name),
    email: str(a.email, 120),
    audience: oneOf(a.audience, AUDIENCES, "playgroup"),
    plan: oneOf(a.plan, ["free", "basic", "premium"] as const, "free"),
    agreedAt: str(a.agreedAt, 40),
  };
}

export function sanitize(input: unknown): Settings {
  const s = (input ?? {}) as Partial<Settings>;
  const design = s.logoDesign as Partial<LogoDesign> | null | undefined;
  const students = Array.isArray(s.students)
    ? s.students
        .filter((x): x is Student => !!x && typeof x.id === "string" && typeof x.name === "string")
        .slice(0, 60)
        .map((x) => ({ id: x.id.slice(0, 40), name: x.name.slice(0, 40) }))
    : [];
  return {
    institution: str(s.institution),
    teacherTitle: oneOf(s.teacherTitle, TEACHER_TITLES, DEFAULT_SETTINGS.teacherTitle),
    teacherName: str(s.teacherName),
    logo: typeof s.logo === "string" && s.logo.startsWith("data:image/") ? s.logo : null,
    logoDesign:
      design && typeof design === "object"
        ? {
            style: oneOf(design.style, LOGO_STYLES, "badge"),
            palette: oneOf(design.palette, LOGO_PALETTES, "rainbow"),
            name: str(design.name, 40),
          }
        : null,
    parshaId: typeof s.parshaId === "string" ? s.parshaId : null,
    audience: oneOf(s.audience, AUDIENCES, DEFAULT_SETTINGS.audience),
    age: AGES.includes(s.age as Age) ? (s.age as Age) : DEFAULT_SETTINGS.age,
    craftId: str(s.craftId, 40) || DEFAULT_SETTINGS.craftId,
    activities: Array.isArray(s.activities)
      ? ACTIVITIES.filter((a) => s.activities!.includes(a))
      : DEFAULT_SETTINGS.activities,
    accent: ACCENTS.some((a) => a.value === s.accent) ? s.accent! : DEFAULT_SETTINGS.accent,
    account: sanitizeAccount(s.account),
    students,
    menorahIds: Array.isArray(s.menorahIds)
      ? s.menorahIds.filter((id) => students.some((x) => x.id === id)).slice(0, 8)
      : [],
  };
}

export function canUse(account: Account | null, needs: Plan): boolean {
  return PLAN_RANK[account?.plan ?? "free"] >= PLAN_RANK[needs];
}

export function newStudentId(): string {
  return Math.random().toString(36).slice(2, 10);
}
