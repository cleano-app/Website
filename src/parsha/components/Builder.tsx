"use client";

import { useEffect, useState } from "react";
import { SheetStack } from "@/parsha/components/SheetStack";
import { SITE_URL } from "@/parsha/config";
import { AGES } from "@/parsha/lib/age";
import { getParsha, PARSHOS, titleOf, YOMIM_TOVIM, type Parsha } from "@/parsha/lib/content";
import { shrinkLogo } from "@/parsha/lib/logo";
import { DEMO_ACCOUNT, demoSettings } from "@/parsha/lib/demo";
import { planPages } from "@/parsha/lib/pages";
import {
  ACCENTS,
  ACTIVITIES,
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
import { T, useLang, type Text } from "@/parsha/i18n";

const ACCENT_NAMES: Record<string, Text> = {
  orange: { yi: "אראנזש", en: "Orange" },
  teal: { yi: "גרין-בלוי", en: "Teal" },
  blue: { yi: "בלוי", en: "Blue" },
  black: { yi: "שווארץ", en: "Black" },
};

const NOTICES = {
  notSaved: {
    yi: "דער בראוזער האט נישט געסעיווט די סעטינגס, זיי וועלן פארלוירן גיין ווען איר מאכט ריפרעש.",
    en: "This browser didn't save your settings; they'll be lost when you refresh.",
  },
  badLogo: { yi: "די לאגא האט זיך נישט אפגעלאודט. פרובירט א PNG אדער JPG.", en: "That logo didn't upload. Try a PNG or JPG." },
} satisfies Record<string, Text>;

function Section({ title, children }: { title: Text; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border-2 border-p-line/25 bg-p-surface p-4">
      <legend className="px-2 font-p-heading text-lg font-semibold">
        <T {...title} />
      </legend>
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
}

const input =
  "min-h-11 w-full rounded-xl border-2 border-p-line/30 bg-p-bg px-3 text-p-ink focus:border-p-brand focus:outline-none";

export function Builder() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [weekId, setWeekId] = useState(PARSHOS[0].id);
  const [yomTov, setYomTov] = useState<Parsha | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<Text | null>(null);
  const lang = useLang();
  const [pdfTip, setPdfTip] = useState(false);

  // Storage and today's date only exist in the browser, so read them after mount.
  useEffect(() => {
    const saved = loadSettings();
    const params = new URLSearchParams(window.location.search);
    const fromLink = params.get("p");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only state
    setSettings(fromLink && getParsha(fromLink) ? { ...saved, parshaId: fromLink } : saved);
    setWeekId(defaultParsha().id);
    setYomTov(yomTovThisWeek());
    setReady(true);
    // A "see it with a real logo" link signs straight in as the demo playgroup.
    if (params.get("demo") === DEMO_ACCOUNT.id && saved.account !== DEMO_ACCOUNT.id) {
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
  const pages = planPages(parsha, settings.activities);

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

  const printNow = () => window.print();
  const printPdf = () => {
    setPdfTip(true);
    setTimeout(printNow, 50);
  };

  const signIn = async () => {
    try {
      update(await demoSettings());
    } catch {
      setNotice(NOTICES.badLogo);
    }
  };
  const signOut = () => update({ institution: "", teacherName: "", logo: null, account: null });

  const seeSheets = () => document.getElementById("sheets")?.scrollIntoView({ behavior: "smooth" });

  const printButtons = (
    <>
      <button
        type="button"
        onClick={printNow}
        disabled={!pages.length}
        className="min-h-12 flex-1 rounded-xl bg-p-brand px-4 font-p-heading text-lg font-semibold text-p-brand-ink disabled:opacity-50"
      >
        <T yi="פרינט" en="Print" />
      </button>
      <button
        type="button"
        onClick={printPdf}
        disabled={!pages.length}
        className="min-h-12 flex-1 rounded-xl border-2 border-p-brand px-4 font-p-heading text-lg font-semibold text-p-brand disabled:opacity-50"
      >
        PDF
      </button>
    </>
  );

  const optionText = (p: Parsha, thisWeek: boolean) =>
    lang === "en"
      ? `${p.nameEn} · ${titleOf(p)}${thisWeek ? " (this week)" : ""}`
      : `${titleOf(p)}${thisWeek ? " (די וואך)" : ""}`;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[22rem_1fr] print:block print:max-w-none print:p-0">
      <div className="space-y-4 print:hidden">
        {settings.account === DEMO_ACCOUNT.id ? (
          <div className="flex items-center gap-3 rounded-2xl border-2 border-p-brand/50 bg-p-surface p-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL */}
            {settings.logo && <img src={settings.logo} alt="" className="h-12 w-12 shrink-0 rounded-full" />}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-p-muted">
                <T yi="איינגעשריבן אלס" en="Signed in as" />
              </p>
              <p className="font-p-heading font-semibold">
                <T {...DEMO_ACCOUNT.name} /> <span className="text-sm font-normal text-p-muted">(<T yi="דעמא" en="demo" />)</span>
              </p>
            </div>
            <button type="button" onClick={signOut} className="min-h-11 shrink-0 rounded-xl px-3 text-sm underline">
              <T yi="ארויסשרייבן" en="Sign out" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={signIn}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-p-line/40 px-3 font-p-heading hover:bg-p-soft"
          >
            <T yi="אריינשרייבן אלס טעסטי פלעיגרופ (דעמא)" en="Sign in as Testy Playgroup (demo)" />
          </button>
        )}
        <Section title={{ yi: "פראפיל", en: "Profile" }}>
          <label className="block">
            <span className="mb-1 block text-sm text-p-muted">
              <T yi="נאמען פון פלעיגרופ / חדר" en="Playgroup / cheder name" />
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
            <label className="flex min-h-11 cursor-pointer items-center rounded-xl border-2 border-p-line/30 px-4 font-p-heading hover:bg-p-soft">
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
            {settings.logo && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL */}
                <img src={settings.logo} alt="" className="h-11 w-11 rounded-full border bg-white object-contain" />
                <button
                  type="button"
                  className="min-h-11 rounded-xl px-3 text-sm underline"
                  onClick={() => update({ logo: null })}
                >
                  <T yi="אוועקנעמען" en="Remove" />
                </button>
              </>
            )}
          </div>
        </Section>

        <Section title={{ yi: "פרשה / יום טוב", en: "Parsha / Yom Tov" }}>
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
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-p-soft px-3 font-p-heading"
            >
              <T
                yi={`די וואך איז ${yomTov.name}! מאכט ${yomTov.name} שיטס`}
                en={`It's ${yomTov.nameEn} this week! Make ${yomTov.nameEn} sheets`}
              />
            </button>
          )}
        </Section>

        <Section title={{ yi: "עלטער", en: "Age" }}>
          <div className="grid grid-cols-4 gap-2" role="radiogroup">
            {AGES.map((a) => (
              <label
                key={a}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border-2 font-p-heading has-focus-visible:ring-2 ${
                  settings.age === a ? "border-p-brand bg-p-brand text-p-brand-ink" : "border-p-line/30 hover:bg-p-soft"
                }`}
              >
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

        <Section title={{ yi: "עקטיוויטיס", en: "Activities" }}>
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

        <Section title={{ yi: "קאליר", en: "Colour" }}>
          <div className="flex gap-3">
            {ACCENTS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={ACCENT_NAMES[c.id][lang]}
                aria-pressed={settings.accent === c.value}
                onClick={() => update({ accent: c.value })}
                className={`h-11 w-11 rounded-full border-4 ${
                  settings.accent === c.value ? "border-p-ink" : "border-transparent"
                }`}
                style={{ background: c.value }}
              />
            ))}
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
        <div className="sticky bottom-0 z-10 -mx-4 space-y-2 border-t border-p-line/15 bg-p-bg/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex gap-2">
            {printButtons}
            <button
              type="button"
              onClick={seeSheets}
              className="min-h-12 rounded-xl border-2 border-p-line/30 px-3 text-sm font-semibold"
            >
              <T yi="זעט די שיטס ↓" en="See sheets ↓" />
            </button>
          </div>
          {pdfTip && (
            <p className="text-sm text-p-muted">
              <T yi="קלייבט 'Save as PDF' ביי די פרינטער" en="Choose 'Save as PDF' as the printer" />
            </p>
          )}
          {notice && (
            <p role="status" className="text-sm text-p-brand">
              <T {...notice} />
            </p>
          )}
        </div>
      </div>

      <div id="sheets" className="min-w-0 scroll-mt-4">
        <div className="sticky top-0 z-10 -mx-2 mb-3 hidden items-center gap-2 bg-p-bg/95 px-2 py-2 backdrop-blur md:flex print:hidden">
          <p className="me-auto font-p-heading text-lg font-semibold">
            <span lang="yi" dir="rtl">
              {titleOf(parsha)}
            </span>{" "}
            <span className="text-sm font-normal text-p-muted">
              · <T yi={`${pages.length} שיטס`} en={`${pages.length} pages`} />
            </span>
          </p>
          <div className="flex w-72 gap-2">{printButtons}</div>
        </div>
        {(pdfTip || notice) && (
          <div className="mb-3 hidden space-y-1 md:block print:hidden">
            {pdfTip && (
              <p className="text-sm text-p-muted">
                <T yi="קלייבט 'Save as PDF' ביי די פרינטער" en="Choose 'Save as PDF' as the printer" />
              </p>
            )}
            {notice && (
              <p role="status" className="text-sm text-p-brand">
                <T {...notice} />
              </p>
            )}
          </div>
        )}
        {!parsha.melamedChecked && (
          <p className="mb-3 rounded-xl bg-p-soft px-3 py-2 text-sm print:hidden">
            <T
              yi="די טעקסט אויף די שיטס איז נאך נישט דורכגעקוקט דורך א מלמד."
              en="The text on these sheets hasn't been checked by a melamed yet."
            />
          </p>
        )}
        {!pages.length ? (
          <p className="rounded-2xl border-2 border-dashed border-p-line/30 p-8 text-center text-p-muted print:hidden">
            <T yi="קלייבט כאטש איין עקטיוויטי." en="Pick at least one activity." />
          </p>
        ) : (
          <div className={ready ? "" : "invisible"}>
            <SheetStack parsha={parsha} settings={settings} pages={pages} />
          </div>
        )}
      </div>
    </div>
  );
}
