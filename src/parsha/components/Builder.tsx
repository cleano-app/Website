"use client";

import { useEffect, useState } from "react";
import { SheetStack } from "@/parsha/components/SheetStack";
import { SITE_URL } from "@/parsha/config";
import { AGES } from "@/parsha/lib/age";
import { getParsha, PARSHOS, titleOf, YOMIM_TOVIM, type Parsha } from "@/parsha/lib/content";
import { shrinkLogo } from "@/parsha/lib/logo";
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

const ACCENT_NAMES: Record<string, string> = {
  orange: "אראנזש",
  teal: "גרין-בלוי",
  blue: "בלוי",
  black: "שווארץ",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border-2 border-p-line/25 bg-p-surface p-4">
      <legend className="px-2 font-p-heading text-lg font-semibold">{title}</legend>
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
  const [notice, setNotice] = useState<string | null>(null);
  const [pdfTip, setPdfTip] = useState(false);

  // Storage and today's date only exist in the browser, so read them after mount.
  useEffect(() => {
    const saved = loadSettings();
    const fromLink = new URLSearchParams(window.location.search).get("p");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of browser-only state
    setSettings(fromLink && getParsha(fromLink) ? { ...saved, parshaId: fromLink } : saved);
    setWeekId(defaultParsha().id);
    setYomTov(yomTovThisWeek());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reports whether the browser kept the save
    setNotice(saveSettings(settings) ? null : "דער בראוזער האט נישט אויפגעהאלטן די סעטינגס; זיי וועלן פארלוירן גיין ביים איבערלאדן.");
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
      setNotice("די לאגא האט נישט געקענט ארויפלאדן. פרובירט א PNG אדער JPG.");
    }
  };

  const printNow = () => window.print();

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[22rem_1fr] print:block print:max-w-none print:p-0">
      <div className="space-y-4 print:hidden">
        <Section title="פראפיל">
          <label className="block">
            <span className="mb-1 block text-sm text-p-muted">נאמען פון פלעיגרופ / חדר</span>
            <input
              className={input}
              value={settings.institution}
              maxLength={80}
              onChange={(e) => update({ institution: e.target.value })}
            />
          </label>
          <div className="grid grid-cols-[7rem_1fr] gap-2">
            <label className="block">
              <span className="mb-1 block text-sm text-p-muted">טיטל</span>
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
              <span className="mb-1 block text-sm text-p-muted">נאמען</span>
              <input
                className={input}
                value={settings.teacherName}
                maxLength={80}
                onChange={(e) => update({ teacherName: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex min-h-11 cursor-pointer items-center rounded-xl border-2 border-p-line/30 px-4 font-p-heading hover:bg-p-soft">
              לאגא ארויפלאדן
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
                  אראפנעמען
                </button>
              </>
            )}
          </div>
        </Section>

        <Section title="פרשה / יום טוב">
          <select
            className={input}
            value={parsha.id}
            onChange={(e) => update({ parshaId: e.target.value === weekId ? null : e.target.value })}
          >
            <optgroup label="פרשיות">
              {PARSHOS.map((p) => (
                <option key={p.id} value={p.id}>
                  {titleOf(p)}
                  {p.id === weekId ? " (די וואך)" : ""}
                </option>
              ))}
            </optgroup>
            <optgroup label="יום טוב">
              {YOMIM_TOVIM.map((p) => (
                <option key={p.id} value={p.id}>
                  {titleOf(p)}
                  {p.id === yomTov?.id ? " (די וואך)" : ""}
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
              די וואך איז {yomTov.name}! מאכט {yomTov.name} בלעטער
            </button>
          )}
        </Section>

        <Section title="עלטער">
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
                <span dir="ltr">{AGE_LABELS[a]}</span>&nbsp;יאר
              </label>
            ))}
          </div>
        </Section>

        <Section title="אקטיוויטעטן">
          {ACTIVITIES.filter((a) => a !== "craft" || parsha.craft).map((a) => (
            <label key={a} className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[var(--p-brand)]"
                checked={settings.activities.includes(a)}
                onChange={() => toggle(a)}
              />
              {ACTIVITY_LABELS[a]}
            </label>
          ))}
        </Section>

        <Section title="קאליר">
          <div className="flex gap-3">
            {ACCENTS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={ACCENT_NAMES[c.id]}
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

        <div className="sticky bottom-0 -mx-4 space-y-2 bg-p-bg/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:bg-transparent md:p-0">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={printNow}
              disabled={!pages.length}
              className="min-h-12 flex-1 rounded-xl bg-p-brand font-p-heading text-lg font-semibold text-p-brand-ink disabled:opacity-50"
            >
              דרוקן
            </button>
            <button
              type="button"
              onClick={() => {
                setPdfTip(true);
                setTimeout(printNow, 50);
              }}
              disabled={!pages.length}
              className="min-h-12 flex-1 rounded-xl border-2 border-p-brand font-p-heading text-lg font-semibold text-p-brand disabled:opacity-50"
            >
              PDF
            </button>
          </div>
          {pdfTip && <p className="text-sm text-p-muted">קלייבט &apos;Save as PDF&apos; אין די פרינטער ליסטע</p>}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${SITE_URL}/builder`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center text-sm underline"
          >
            שיקט אויף וואטסעפ
          </a>
          {notice && (
            <p role="status" className="text-sm text-p-brand">
              {notice}
            </p>
          )}
        </div>
      </div>

      <div className="min-w-0">
        {!parsha.melamedChecked && (
          <p className="mb-3 rounded-xl bg-p-soft px-3 py-2 text-sm print:hidden">
            דער טעקסט פון די פרשה איז נאך נישט דורכגעקוקט דורך א מלמד.
          </p>
        )}
        {!pages.length ? (
          <p className="rounded-2xl border-2 border-dashed border-p-line/30 p-8 text-center text-p-muted print:hidden">
            קלייבט כאטש איין אקטיוויטעט.
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
