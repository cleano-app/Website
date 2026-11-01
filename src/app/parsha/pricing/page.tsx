import type { Metadata } from "next";
import Link from "next/link";
import { PlanBadge, PLAN_NAMES } from "@/parsha/components/PlanBadge";
import { PLAN_FEATURES } from "@/parsha/components/SignUp";
import { CONTACT_EMAIL } from "@/parsha/config";
import { T } from "@/parsha/i18n";
import type { Plan } from "@/parsha/lib/settings";

export const metadata: Metadata = { title: "פרייזן · Pricing" };

// Rough prices; the owner still has to set the real ones (and payment isn't
// connected yet).
const PLANS: { plan: Plan; price: string; per: { yi: string; en: string }; edge: string }[] = [
  { plan: "free", price: "£0", per: { yi: "פאר אייביג", en: "forever" }, edge: "border-t-p-green" },
  { plan: "basic", price: "£4–6", per: { yi: "א מאנאט", en: "a month" }, edge: "border-t-p-sky" },
  { plan: "premium", price: "£15–25", per: { yi: "א מאנאט, ביליגער פאר א גאנץ יאר", en: "a month, less by the year" }, edge: "border-t-p-purple" },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="פרייזן" en="Pricing" />
      </h1>
      <p className="mt-2 text-p-muted">
        <T
          yi="די פרייזן זענען בערך און נאך נישט פיינאל. באצאלן קומט באלד; דערווייל איז אלעס אפן צום פרובירן."
          en="Prices are rough and not final. Payment is coming soon; for now everything is open to try."
        />
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {PLANS.map(({ plan, price, per, edge }) => (
          <li key={plan} className={`rounded-2xl border-2 border-t-8 border-[#e6e8f5] bg-white p-5 ${edge}`}>
            <p className="flex items-center gap-2 font-p-heading text-xl font-semibold">
              <T {...PLAN_NAMES[plan]} /> <PlanBadge plan={plan} />
            </p>
            <p className="mt-3 font-p-heading text-3xl text-p-brand">
              <span dir="ltr">{price}</span>
            </p>
            <p className="text-sm text-p-muted">
              <T {...per} />
            </p>
            <p className="mt-3">
              <T {...PLAN_FEATURES[plan]} />
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/parsha/signup"
        className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-p-pink font-p-heading text-lg text-white"
      >
        <T yi="מאכט אן אקאונט" en="Sign up" />
      </Link>
      <section className="mt-8 rounded-2xl border-2 border-dashed border-[#dfe2f2] p-4">
        <h2 className="text-xl font-semibold">
          <T yi="פראגעס?" en="Questions?" />
        </h2>
        <p dir="ltr" className="mt-1 text-start font-semibold">
          {CONTACT_EMAIL}
        </p>
      </section>
    </div>
  );
}
