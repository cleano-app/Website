"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SchoolLogo } from "@/parsha/components/sheets/Sheet";
import { SheetStack } from "@/parsha/components/SheetStack";
import { SITE_URL } from "@/parsha/config";
import { T, useLang, type Text } from "@/parsha/i18n";
import { AGES } from "@/parsha/lib/age";
import { getParsha, PARSHOS, titleOf, YOMIM_TOVIM, type Parsha } from "@/parsha/lib/content";
import { craftsFor, getCraft, type CraftDef } from "@/parsha/lib/crafts";
import { DEMO_ACCOUNT, demoSettings } from "@/parsha/lib/demo";
import { shrinkLogo } from "@/parsha/lib/logo";
import { planCraft } from "@/parsha/lib/pages";
import { loadPhotos } from "@/parsha/lib/photos";
import {
  ACCENTS,
  ACTIVITIES,
  AUDIENCES,
  canUse,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  TEACHER_TITLES,
  type Activity,
  type Settings,
  type TeacherTitle,
} from "@/parsha/lib/settings";
import { ACTIVITY_LABELS, AGE_LABELS } from "@/parsha/lib/strings";
import { defaultParsha, yomTovThisWeek } from "@/parsha/lib/thisWeek";
import { AUDIENCE_NAMES, PLAN_NAMES, PlanBadge } from "./PlanBadge";

const ACCENT_NAMES: Record<string, Text> = {
  blue: { yi: "בלוי", en: "Blue" },
  pink: { yi: "ראזע", en: "Pink" },
  green: { yi: "גרין", en: "Green" },
  purple: { yi: "לילא", en: "Purple" },
  black: { yi: "שווארץ", en: "Black" },
};

const NOTICES = {
  notSaved: {
    yi: "דער בראוזער האט נישט געסעיווט די סעטינגס, זיי וועלן פארלוירן גיין ווען איר מאכט ריפרעש.",
    en: "This browser didn't save your settings; they'll be lost when you refresh.",
  },
  badLogo: { yi: "די לאגא האט זיך נישט אפגעלאודט. פרובירט א PNG אדער JPG.", en: "That logo didn't upload. Try a PNG or JPG." },
} satisfies Record<string, Text>;

// Each section gets its own bright edge colour, like a playgroup wall.
const EDGES = ["border-t-p-pink", "border-t-p-sky", "border-t-p-yellow", "border-t-p-green", "border-t-p-purple"];

export function Section({ title, edge = 0, children }: { title: Text; edge?: number; children: React.ReactNode }) {
  return (
    <section className={`rounded-2xl border-2 border-t-8 border-[#e6e8f5] bg-p-surface p-4 ${EDGES[edge % EDGES.length]}`}>
      <h2 className="mb-3 font-p-heading text-lg font-semibold">
        <T {...title} />
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export const input =
  "min-h-11 w-full rounded-xl border-2 border-[#dfe2f2] bg-white px-3 text-p-ink focus:border-p-brand focus:outline-none";

export const chip = (on: boolean) =>
  `flex min-h-11 cursor-pointer items-center justify-center rounded-xl border-2 px-2 text-center font-p-heading has-focus-visible:ring-2 ${
    on ? "border-p-brand bg-p-brand text-p-brand-ink" : "border-[#dfe2f2] bg-white hover:bg-p-soft"
  }`;

export function Builder() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [weekId, setWeekId] = useState(PARSHOS[0].id);
  const [yomTov, setYomTov] = useState<Parsha | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<Text | null>(null);
  const [pdfTip, setPdfTip] = useState(false);
  const lang = useLang();

  // Storage and today's date only exist in the browser, so read them after mount.
  useEffect(() => {
    const saved = loadSettings();
    const params = new URLSearchParams(window.location.search);
    const fromLink = params.get("p");
    const craftLink = params.get("craft");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only state
    setSettings({
      ...saved,
      ...(fromLink && getParsha(fromLink) ? { parshaId: fromLink } : {}),
      ...(craftLink ? { craftId: craftLink } : {}),
    });
    setWeekId(defaultParsha().id);
    setYomTov(yomTovThisWeek());
    setReady(true);
    loadPhotos().then(setPhotos);
    // A "see it with a real logo" link signs straight in as the demo playgroup.
    if (params.get("demo") === DEMO_ACCOUNT.id && saved.account?.kind !== "demo") {
      demoSettings()
        .then((patch) => setSettings((s) => ({ ...s, ...patch })))
        .catch(() => setNotice(NOTICES.badLogo));
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reports whether the browser kept the save
    setNotice(saveSettings(settings) ? null : NOTICES.notSaved);
  }, [settings, ready]);

  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));

  const parsha = getParsha(settings.parshaId ?? weekId) ?? PARSHOS[0];
  const offered = craftsFor(parsha, settings.audience, settings.age);
  const craft: CraftDef = offered.find((c) => c.id === settings.craftId) ?? offered[0] ?? getCraft("sheets");
  const allowed = canUse(settings.account, craft.plan);
  const pages = planCraft(craft.id, parsha, settings.activities, settings.students, settings.menorahIds);
  const withPhotos = settings.students.filter((s) => photos[s.id]).length;

  const toggle = (a: Activity) =>
    update({
      activities: settings.activities.includes(a)
        ? settings.activities.filter((x) => x !== a)
        : ACTIVITIES.filter((x) => x === a || settings.activities.includes(x)),
    });

  const onLogo = async (file: File | undefined) => {
    if (!file) return;
    try {
      update({ logo: await shrinkLogo(file) });
    } catch {
      setNotice(NOTICES.badLogo);
    }
  };

  const signInDemo = async () => {
    try {
      update(await demoSettings());
    } catch {
      setNotice(NOTICES.badLogo);
    }
  };
  const signOut = () =>
    update(
      settings.account?.kind === "demo"
        ? { institution: "", teacherName: "", logo: null, account: null }
        : { account: null },
    );

  const printNow = () => window.print();
  const printPdf = () => {
    setPdfTip(true);
    setTimeout(printNow, 50);
  };
  const seeSheets = () => document.getElementById("sheets")?.scrollIntoView({ behavior: "smooth" });

  const optionText = (p: Parsha, thisWeek: boolean) =>
    lang === "en"
      ? `${p.nameEn} · ${titleOf(p)}${thisWeek ? " (this week)" : ""}`
      : `${titleOf(p)}${thisWeek ? " (די וואך)" : ""}`;

  const canPrint = pages.length > 0 && allowed;
  const printButtons = (
    <>
      <button
        type="button"
        onClick={printNow}
        disabled={!canPrint}
        className="min-h-12 flex-1 rounded-xl bg-p-brand px-4 font-p-heading text-lg font-semibold text-p-brand-ink disabled:opacity-40"
      >
        <T yi="פרינט" en="Print" />
      </button>
      <button
        type="button"
        onClick={printPdf}
        disabled={!canPrint}
        className="min-h-12 flex-1 rounded-xl border-2 border-p-brand bg-white px-4 font-p-heading text-lg font-semibold text-p-brand disabled:opacity-40"
      >
        PDF
      </button>
    </>
  );
  const messages = (
    <>
      {!allowed && (
        <p className="rounded-xl bg-[#f3edff] px-3 py-2 text-sm">
          <T
            yi={`דער קראפט איז פאר ${PLAN_NAMES[craft.plan].yi}. מען קען אים זען, אבער צו פרינטן דארף מען `}
            en={`This craft is in the ${PLAN_NAMES[craft.plan].en} plan. You can look at it; to print it, `}
          />
          <Link href="/parsha/pricing" className="font-semibold underline">
            <T yi="פארבעסערן דעם פלאן" en="upgrade your plan" />
          </Link>
          .
        </p>
      )}
      {pdfTip && (
        <p className="text-sm text-p-muted">
          <T yi="קלייבט 'Save as PDF' ביי די פרינטער" en="Choose 'Save as PDF' as the printer" />
        </p>
      )}
      {notice && (
        <p role="status" className="text-sm text-p-pink">
          <T {...notice} />
        </p>
      )}
    </>
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[23rem_1fr] print:block print:max-w-none print:p-0">
      <div className="space-y-4 print:hidden">
        {settings.account ? (
          <div className="flex items-center gap-3 rounded-2xl border-2 border-p-brand/40 bg-p-soft p-3">
            <SchoolLogo settings={settings} className="h-12 w-12 shrink-0 rounded-full bg-white" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-p-muted">
                <T yi="איינגעשריבן אלס" en="Signed in as" />
              </p>
              <p className="flex flex-wrap items-center gap-2 font-p-heading font-semibold">
                <span dir="auto">{settings.account.name || settings.institution}</span>
                <PlanBadge plan={settings.account.plan} />
                {settings.account.kind === "demo" && (
                  <span className="text-sm font-normal text-p-muted">
                    (<T yi="דעמא" en="demo" />)
                  </span>
                )}
              </p>
            </div>
            <button type="button" onClick={signOut} className="min-h-11 shrink-0 rounded-xl px-2 text-sm underline">
              <T yi="ארויסשרייבן" en="Sign out" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/parsha/signup"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-p-pink px-3 text-center font-p-heading font-semibold text-white"
            >
              <T yi="מאכט אן אקאונט" en="Sign up" />
            </Link>
            <button
              type="button"
              onClick={signInDemo}
              className="flex min-h-12 items-center justify-center rounded-2xl border-2 border-dashed border-p-brand/50 bg-white px-3 text-center text-sm font-semibold"
            >
              <T yi="פרובירט: טעסטי פלעיגרופ" en="Try: Testy Playgroup" />
            </button>
          </div>
        )}

        <Section title={{ yi: "וועלכע וואך?", en: "Which week?" }} edge={0}>
          <select
            className={input}
            value={parsha.id}
            onChange={(e) => update({ parshaId: e.target.value === weekId ? null : e.target.value })}
          >
            <optgroup label={lang === "en" ? "Parshiyos" : "פרשיות"}>
              {PARSHOS.map((p) => (
                <option key={p.id} value={p.id}>
                  {optionText(p, p.id === weekId)}
                </option>
              ))}
            </optgroup>
            <optgroup label={lang === "en" ? "Yom Tov" : "יום טוב"}>
              {YOMIM_TOVIM.map((p) => (
                <option key={p.id} value={p.id}>
                  {optionText(p, p.id === yomTov?.id)}
                </option>
              ))}
            </optgroup>
          </select>
          {yomTov && parsha.id !== yomTov.id && (
            <button
              type="button"
              onClick={() => update({ parshaId: yomTov.id })}
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#fff6d6] px-3 font-p-heading"
            >
              <T
                yi={`די וואך איז ${yomTov.name}! מאכט ${yomTov.name} שיטס`}
                en={`It's ${yomTov.nameEn} this week! Make ${yomTov.nameEn} sheets`}
              />
            </button>
          )}
        </Section>

        <Section title={{ yi: "פאר וועמען?", en: "Who is it for?" }} edge={1}>
          <div className="grid grid-cols-3 gap-2" role="radiogroup">
            {AUDIENCES.map((a) => (
              <label key={a} className={chip(settings.audience === a)}>
                <input
                  type="radio"
                  name="audience"
                  className="sr-only"
                  checked={settings.audience === a}
                  onChange={() => update({ audience: a })}
                />
                <T {...AUDIENCE_NAMES[a]} />
              </label>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2" role="radiogroup">
            {AGES.map((a) => (
              <label key={a} className={chip(settings.age === a)}>
                <input
                  type="radio"
                  name="age"
                  className="sr-only"
                  checked={settings.age === a}
                  onChange={() => update({ age: a })}
                />
                <T yi={`${AGE_LABELS[a]} יאר`} en={`Age ${AGE_LABELS[a]}`} />
              </label>
            ))}
          </div>
        </Section>

        <Section title={{ yi: "קלייבט א קראפט", en: "Pick a craft" }} edge={2}>
          <div className="space-y-2" role="radiogroup">
            {offered.map((c) => {
              const on = c.id === craft.id;
              const locked = !canUse(settings.account, c.plan);
              return (
                <label
                  key={c.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 has-focus-visible:ring-2 ${
                    on ? "border-p-brand bg-p-soft" : "border-[#e6e8f5] bg-white hover:bg-p-soft"
                  }`}
                >
                  <input
                    type="radio"
                    name="craft"
                    className="mt-1 h-5 w-5 accent-[var(--p-brand)]"
                    checked={on}
                    onChange={() => update({ craftId: c.id })}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 font-p-heading font-semibold">
                      <T {...c.name} />
                      <PlanBadge plan={c.plan} />
                      {locked && <span aria-label="locked">🔒</span>}
                    </span>
                    <span className="block text-sm text-p-muted">
                      <T {...c.about} />
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </Section>

        {craft.id === "sheets" && (
          <Section title={{ yi: "וואס זאל זיין אויף די שיטס", en: "What goes on the sheets" }} edge={3}>
            {ACTIVITIES.filter((a) => a !== "craft" || parsha.craft).map((a) => (
              <label key={a} className="flex min-h-11 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[var(--p-brand)]"
                  checked={settings.activities.includes(a)}
                  onChange={() => toggle(a)}
                />
                <T {...ACTIVITY_LABELS[a]} />
              </label>
            ))}
          </Section>
        )}

        {craft.perChild && (
          <Section title={{ yi: "מיין קלאס", en: "My class" }} edge={3}>
            <p>
              <T
                yi={`${settings.students.length} קינדער אין קלאס${craft.photos ? `, ${withPhotos} מיט א בילד` : ""}`}
                en={`${settings.students.length} children in the class${craft.photos ? `, ${withPhotos} with a photo` : ""}`}
              />
            </p>
            {craft.id === "photo-menorah" && settings.students.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm text-p-muted">
                  <T yi="קלייבט ביז אכט קינדער פאר די מנורה:" en="Pick up to eight children for the menorah:" />
                </p>
                {settings.students.map((s) => {
                  const picked = settings.menorahIds.includes(s.id);
                  return (
                    <label key={s.id} className="flex min-h-10 cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-[var(--p-brand)]"
                        checked={picked}
                        disabled={!picked && settings.menorahIds.length >= 8}
                        onChange={() =>
                          update({
                            menorahIds: picked
                              ? settings.menorahIds.filter((id) => id !== s.id)
                              : [...settings.menorahIds, s.id],
                          })
                        }
                      />
                      <span dir="auto">{s.name}</span>
                      {photos[s.id] && (
                        // eslint-disable-next-line @next/next/no-img-element -- local data: URL
                        <img src={photos[s.id]} alt="" className="h-8 w-8 rounded-full object-cover" />
                      )}
                    </label>
                  );
                })}
              </div>
            )}
            <Link
              href="/parsha/class"
              className="flex min-h-11 items-center justify-center rounded-xl border-2 border-[#dfe2f2] font-p-heading hover:bg-p-soft"
            >
              <T yi="צולייגן נעמען און בילדער" en="Add names and photos" />
            </Link>
          </Section>
        )}

        <Section title={{ yi: "פראפיל און לאגא", en: "Profile and logo" }} edge={4}>
          <label className="block">
            <span className="mb-1 block text-sm text-p-muted">
              <T yi="נאמען פון פלעיגרופ / שולע / חדר" en="Playgroup / school / cheder name" />
            </span>
            <input
              className={input}
              dir="auto"
              value={settings.institution}
              maxLength={80}
              onChange={(e) => update({ institution: e.target.value })}
            />
          </label>
          <div className="grid grid-cols-[7rem_1fr] gap-2">
            <label className="block">
              <span className="mb-1 block text-sm text-p-muted">
                <T yi="טיטל" en="Title" />
              </span>
              <select
                className={input}
                value={settings.teacherTitle}
                onChange={(e) => update({ teacherTitle: e.target.value as TeacherTitle })}
              >
                {TEACHER_TITLES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-p-muted">
                <T yi="נאמען" en="Name" />
              </span>
              <input
                className={input}
                dir="auto"
                value={settings.teacherName}
                maxLength={80}
                onChange={(e) => update({ teacherName: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex min-h-11 cursor-pointer items-center rounded-xl border-2 border-[#dfe2f2] bg-white px-3 font-p-heading hover:bg-p-soft">
              <T yi="אפלאודט א לאגא" en="Upload logo" />
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={(e) => {
                  onLogo(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
            <Link
              href="/parsha/logo"
              className="flex min-h-11 items-center rounded-xl bg-p-yellow px-3 font-p-heading text-p-ink"
            >
              <T yi="מאכט א לאגא" en="Make a logo" />
            </Link>
            {(settings.logo || settings.logoDesign) && (
              <>
                <SchoolLogo settings={settings} className="h-11 w-11 rounded-full border bg-white" />
                <button
                  type="button"
                  className="min-h-11 rounded-xl px-2 text-sm underline"
                  onClick={() => update({ logo: null, logoDesign: null })}
                >
                  <T yi="אוועקנעמען" en="Remove" />
                </button>
              </>
            )}
          </div>
          <div>
            <p className="mb-2 text-sm text-p-muted">
              <T yi="קאליר אויף די שיטס" en="Colour on the sheets" />
            </p>
            <div className="flex gap-3">
              {ACCENTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={ACCENT_NAMES[c.id][lang]}
                  aria-pressed={settings.accent === c.value}
                  onClick={() => update({ accent: c.value })}
                  className={`h-11 w-11 rounded-full border-4 ${
                    settings.accent === c.value ? "border-p-ink" : "border-white shadow"
                  }`}
                  style={{ background: c.value }}
                />
              ))}
            </div>
          </div>
        </Section>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${SITE_URL}/builder`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center text-sm underline"
        >
          <T yi="שיקט אויף וואטסאפ" en="Share on WhatsApp" />
        </a>

        {/* On a phone the sheets are far below, so the buttons ride along at the bottom. */}
        <div className="sticky bottom-0 z-10 -mx-4 space-y-2 border-t border-[#e6e8f5] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex gap-2">
            {printButtons}
            <button
              type="button"
              onClick={seeSheets}
              className="min-h-12 rounded-xl border-2 border-[#dfe2f2] bg-white px-3 text-sm font-semibold"
            >
              <T yi="זעט די שיטס ↓" en="See sheets ↓" />
            </button>
          </div>
          {messages}
        </div>
      </div>

      <div id="sheets" className="min-w-0 scroll-mt-4">
        <div className="sticky top-0 z-10 -mx-2 mb-3 hidden items-center gap-2 bg-white/95 px-2 py-2 backdrop-blur md:flex print:hidden">
          <p className="me-auto font-p-heading text-lg font-semibold">
            <span lang="yi" dir="rtl">
              {titleOf(parsha)}
            </span>{" "}
            <span className="text-sm font-normal text-p-muted">
              · <T {...craft.name} /> · <T yi={`${pages.length} שיטס`} en={`${pages.length} pages`} />
            </span>
          </p>
          <div className="flex w-72 gap-2">{printButtons}</div>
        </div>
        <div className="mb-3 hidden space-y-1 md:block print:hidden">{messages}</div>
        {!parsha.melamedChecked && (
          <p className="mb-3 rounded-xl bg-[#fff6d6] px-3 py-2 text-sm print:hidden">
            <T
              yi="די טעקסט אויף די שיטס איז נאך נישט דורכגעקוקט דורך א מלמד."
              en="The text on these sheets hasn't been checked by a melamed yet."
            />
          </p>
        )}
        {!pages.length ? (
          <p className="rounded-2xl border-2 border-dashed border-[#dfe2f2] p-8 text-center text-p-muted print:hidden">
            <T yi="קלייבט כאטש איין זאך." en="Pick at least one thing." />
          </p>
        ) : (
          <div className={`${ready ? "" : "invisible"} ${allowed ? "" : "print:hidden"}`}>
            <SheetStack parsha={parsha} settings={settings} pages={pages} photos={photos} />
          </div>
        )}
      </div>
    </div>
  );
}
