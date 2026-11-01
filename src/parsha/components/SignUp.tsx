"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { T } from "@/parsha/i18n";
import { AUDIENCES, type Audience, type Plan } from "@/parsha/lib/settings";
import { NO_FORWARDING } from "@/parsha/lib/strings";
import { useSettings } from "@/parsha/lib/useSettings";
import { chip, input, Section } from "./Builder";
import { AUDIENCE_NAMES, PLAN_NAMES, PlanBadge } from "./PlanBadge";

export const PLAN_FEATURES: Record<Plan, { yi: string; en: string }> = {
  free: { yi: "די וואך'ס שיטס און א קאליר-בלאט מיט יעדן קינד'ס נאמען", en: "This week's sheets and a colouring page with each child's name" },
  basic: { yi: "דערצו: קרוינען מיט נעמען, נאכשרייבן ווערטער", en: "Plus: name crowns, word tracing" },
  premium: { yi: "אלעס: בילד-ראמען, די קלאס מנורה, קראפטס צום אויפשטעלן", en: "Everything: photo frames, the class menorah, fold-up crafts" },
};

/** Sign up. For now the account is kept on this device; online accounts come next. */
export function SignUp() {
  const { settings, update, ready } = useSettings();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<Audience>("playgroup");
  const [plan, setPlan] = useState<Plan>("free");
  const [agreed, setAgreed] = useState(false);
  if (!ready) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !name.trim()) return;
    update({
      institution: settings.institution || name.trim(),
      audience,
      account: { kind: "device", name: name.trim(), email: email.trim(), audience, plan, agreedAt: new Date().toISOString() },
    });
    router.push(settings.logo || settings.logoDesign ? "/parsha/builder" : "/parsha/logo");
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="מאכט אן אקאונט" en="Sign up" />
      </h1>
      <Section title={{ yi: "וועגן אייך", en: "About you" }} edge={0}>
        <label className="block">
          <span className="mb-1 block text-sm text-p-muted">
            <T yi="נאמען פון פלעיגרופ / שולע / חדר" en="Playgroup / school / cheder name" />
          </span>
          <input className={input} dir="auto" required value={name} maxLength={80} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-p-muted">
            <T yi="אימעיל" en="Email" />
          </span>
          <input className={input} dir="ltr" type="email" value={email} maxLength={120} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <div className="grid grid-cols-3 gap-2" role="radiogroup">
          {AUDIENCES.map((a) => (
            <label key={a} className={chip(audience === a)}>
              <input type="radio" name="audience" className="sr-only" checked={audience === a} onChange={() => setAudience(a)} />
              <T {...AUDIENCE_NAMES[a]} />
            </label>
          ))}
        </div>
      </Section>
      <Section title={{ yi: "קלייבט א פלאן", en: "Choose a plan" }} edge={1}>
        {(["free", "basic", "premium"] as Plan[]).map((p) => (
          <label
            key={p}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 ${plan === p ? "border-p-brand bg-p-soft" : "border-[#e6e8f5]"}`}
          >
            <input type="radio" name="plan" className="mt-1 h-5 w-5 accent-[var(--p-brand)]" checked={plan === p} onChange={() => setPlan(p)} />
            <span>
              <span className="flex items-center gap-2 font-p-heading font-semibold">
                <T {...PLAN_NAMES[p]} /> <PlanBadge plan={p} />
              </span>
              <span className="block text-sm text-p-muted">
                <T {...PLAN_FEATURES[p]} />
              </span>
            </span>
          </label>
        ))}
        <p className="rounded-xl bg-[#fff6d6] px-3 py-2 text-sm">
          <T
            yi="באצאלן און אנליין אקאונטס קומען באלד. דערווייל ווערט דער אקאונט געהאלטן אויף דעם דעווייס, און אלע פלענער זענען אפן צום פרובירן."
            en="Payment and online accounts are coming soon. For now the account is kept on this device, and every plan is open to try."
          />
        </p>
      </Section>
      <Section title={{ yi: "הסכמה", en: "Agreement" }} edge={2}>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" required className="mt-1 h-5 w-5 accent-[var(--p-brand)]" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            <span className="block font-semibold" lang="yi" dir="rtl">
              {NO_FORWARDING.yi}
            </span>
            <span className="block text-sm text-p-muted" lang="en" dir="ltr">
              {NO_FORWARDING.en}
            </span>
          </span>
        </label>
      </Section>
      <button
        type="submit"
        disabled={!agreed || !name.trim()}
        className="min-h-12 w-full rounded-xl bg-p-pink font-p-heading text-lg text-white disabled:opacity-40"
      >
        <T yi="מאכט דעם אקאונט" en="Create account" />
      </button>
    </form>
  );
}
