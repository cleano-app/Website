import { shrinkLogo } from "./logo";
import type { Settings } from "./settings";

// A made-up playgroup with a real logo, so the sheets can be seen the way a
// signed-in playgroup will see them. Not a real account: Phase 1 has none.
export const DEMO_ACCOUNT = {
  id: "testy",
  name: { yi: "טעסטי פלעיגרופ", en: "Testy Playgroup" },
  logoUrl: "/parsha/demo/testy-logo.png",
  profile: { institution: "טעסטי פלעיגרופ", teacherTitle: "מורה", teacherName: "חיה" },
} as const;

/** The demo profile, with its logo read in the same way an upload is. */
export async function demoSettings(): Promise<Partial<Settings>> {
  const blob = await (await fetch(DEMO_ACCOUNT.logoUrl)).blob();
  const logo = await shrinkLogo(new File([blob], "testy-logo.png", { type: blob.type }));
  return { ...DEMO_ACCOUNT.profile, logo, account: DEMO_ACCOUNT.id };
}
