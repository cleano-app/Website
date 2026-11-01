"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { T } from "@/parsha/i18n";
import { LOGO_PALETTES, LOGO_STYLES, type LogoDesign } from "@/parsha/lib/settings";
import { useSettings } from "@/parsha/lib/useSettings";
import { input, Section } from "./Builder";
import { GeneratedLogo, PALETTES } from "./GeneratedLogo";

/** Make a logo from five styles: type the name, pick a style and colours. */
export function LogoMaker() {
  const { settings, update, ready } = useSettings();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [palette, setPalette] = useState<LogoDesign["palette"]>("rainbow");
  const [picked, setPicked] = useState<LogoDesign["style"] | null>(null);
  if (!ready) return null;
  const shown = name ?? (settings.logoDesign?.name || settings.institution || "");
  const save = (style: LogoDesign["style"]) => {
    update({ logoDesign: { style, palette, name: shown }, logo: null });
    router.push("/parsha/builder");
  };
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="מאכט א לאגא" en="Make a logo" />
      </h1>
      <Section title={{ yi: "נאמען און קאלירן", en: "Name and colours" }} edge={0}>
        <input
          className={input}
          dir="auto"
          value={shown}
          maxLength={40}
          onChange={(e) => setName(e.target.value)}
          placeholder="טעסטי פלעיגרופ"
        />
        <div className="flex flex-wrap gap-3">
          {LOGO_PALETTES.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={palette === p}
              aria-label={p}
              onClick={() => setPalette(p)}
              className={`flex h-12 items-center gap-1 rounded-full border-4 px-2 ${palette === p ? "border-p-ink" : "border-[#eef0f8]"}`}
            >
              {Object.values(PALETTES[p]).map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border border-black/10" style={{ background: c }} />
              ))}
            </button>
          ))}
        </div>
      </Section>
      <Section title={{ yi: "קלייבט א סטייל", en: "Pick a style" }} edge={1}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {LOGO_STYLES.map((style) => (
            <li key={style}>
              <button
                type="button"
                onClick={() => setPicked(style)}
                className={`w-full rounded-2xl border-4 bg-white p-3 ${picked === style ? "border-p-brand" : "border-[#eef0f8] hover:border-p-sky"}`}
              >
                <GeneratedLogo design={{ style, palette, name: shown || "?" }} className="mx-auto aspect-square w-full" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={!picked || !shown.trim()}
          onClick={() => picked && save(picked)}
          className="min-h-12 w-full rounded-xl bg-p-brand font-p-heading text-lg text-white disabled:opacity-40"
        >
          <T yi="נוצן די לאגא" en="Use this logo" />
        </button>
        <p className="text-sm text-p-muted">
          <T yi="נאך סטיילס קומען באלד." en="More styles are coming." />
        </p>
      </Section>
    </div>
  );
}
