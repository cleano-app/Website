import type { Age } from "./age";
import type { Parsha } from "./content";
import type { Audience, Plan } from "./settings";

// Each week offers several crafts. They're built from the week's content
// (picture, icons, story), so every parsha and yom tov gets all of them;
// a few only exist for one week (the tent, the photo menorah).

export type CraftId = "sheets" | "my-colouring" | "name-crown" | "trace" | "photo-frame" | "tent" | "photo-menorah";

export type CraftDef = {
  id: CraftId;
  name: { yi: string; en: string };
  about: { yi: string; en: string };
  plan: Plan;
  audiences: Audience[];
  ages: Age[];
  /** Uses the class list: one page per child. */
  perChild?: boolean;
  /** Uses the children's photos. */
  photos?: boolean;
  only?: (unit: Parsha) => boolean;
};

const ALL_AGES: Age[] = ["3", "4", "5", "6-7"];
const EVERYONE: Audience[] = ["playgroup", "girls", "boys"];

export const CRAFTS: CraftDef[] = [
  {
    id: "sheets",
    name: { yi: "די וואך'ס שיטס", en: "This week's sheets" },
    about: {
      yi: "קאלירן, מעיז, פינטלאך, ציילן, א מעשה'לע און א בריוו פאר די עלטערן",
      en: "Colouring, maze, dot-to-dot, counting, a story and a note for parents",
    },
    plan: "free",
    audiences: EVERYONE,
    ages: ALL_AGES,
  },
  {
    id: "my-colouring",
    name: { yi: "מיין קאליר-בלאט", en: "My colouring page" },
    about: { yi: "א קאליר-בלאט מיט יעדן קינד'ס נאמען", en: "A colouring page with each child's name" },
    plan: "free",
    audiences: EVERYONE,
    ages: ALL_AGES,
    perChild: true,
  },
  {
    id: "name-crown",
    name: { yi: "א קרוין מיט מיין נאמען", en: "Name crown" },
    about: { yi: "שניידט אויס, קאלירט אן און קלעפט צוזאם", en: "Cut out, colour in and glue into a crown" },
    plan: "basic",
    audiences: ["playgroup", "girls"],
    ages: ["3", "4", "5"],
    perChild: true,
  },
  {
    id: "trace",
    name: { yi: "שרייבט נאך די ווערטער", en: "Trace the words" },
    about: { yi: "דריי ווערטער פון די וואך, מיט בילדלאך", en: "Three words from the week, with pictures" },
    plan: "basic",
    audiences: ["girls", "boys"],
    ages: ["5", "6-7"],
  },
  {
    id: "photo-frame",
    name: { yi: "מיין בילד-ראם", en: "Photo frame" },
    about: { yi: "יעדן קינד'ס בילד אין א ראם פון די וואך", en: "Each child's photo in a frame for the week" },
    plan: "premium",
    audiences: EVERYONE,
    ages: ALL_AGES,
    perChild: true,
    photos: true,
  },
  {
    id: "tent",
    name: { yi: "אברהם אבינו'ס געצעלט", en: "Avraham's tent" },
    about: { yi: "א געצעלט צום אויפשטעלן, מיט אלע פיר טירן", en: "A fold-up tent with all four doors open" },
    plan: "premium",
    audiences: EVERYONE,
    ages: ALL_AGES,
    only: (u) => !!u.craft,
  },
  {
    id: "photo-menorah",
    name: { yi: "די קלאס מנורה", en: "Class menorah" },
    about: {
      yi: "א מנורה מיט אכט קינדער'ס בילדער אין די פלאמען",
      en: "A menorah with eight children's photos in the flames",
    },
    plan: "premium",
    audiences: EVERYONE,
    ages: ALL_AGES,
    perChild: true,
    photos: true,
    only: (u) => u.id === "chanukah",
  },
];

export function getCraft(id: string): CraftDef {
  return CRAFTS.find((c) => c.id === id) ?? CRAFTS[0];
}

/** The crafts on offer for this week, audience and age. */
export function craftsFor(unit: Parsha, audience: Audience, age: Age): CraftDef[] {
  return CRAFTS.filter(
    (c) => c.audiences.includes(audience) && c.ages.includes(age) && (!c.only || c.only(unit)),
  );
}
