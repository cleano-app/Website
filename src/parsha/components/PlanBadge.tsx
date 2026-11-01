import { T, type Text } from "@/parsha/i18n";
import type { Audience, Plan } from "@/parsha/lib/settings";

export const AUDIENCE_NAMES: Record<Audience, Text> = {
  playgroup: { yi: "פלעיגרופ", en: "Playgroup" },
  girls: { yi: "מיידלאך שולע", en: "Girls' school" },
  boys: { yi: "חדר", en: "Cheder" },
};

export const PLAN_NAMES: Record<Plan, Text> = {
  free: { yi: "פריי", en: "Free" },
  basic: { yi: "בעיסיק", en: "Basic" },
  premium: { yi: "פרימיום", en: "Premium" },
};

const PLAN_COLOURS: Record<Plan, string> = {
  free: "bg-p-green text-white",
  basic: "bg-p-sky text-white",
  premium: "bg-p-purple text-white",
};

export function PlanBadge({ plan }: { plan: Plan }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold ${PLAN_COLOURS[plan]}`}>
      <T {...PLAN_NAMES[plan]} />
    </span>
  );
}
