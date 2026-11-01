"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { T } from "@/parsha/i18n";
import { shrinkLogo } from "@/parsha/lib/logo";
import { deletePhoto, loadPhotos, savePhoto } from "@/parsha/lib/photos";
import { newStudentId } from "@/parsha/lib/settings";
import { useSettings } from "@/parsha/lib/useSettings";
import { input, Section } from "./Builder";

/** The class list: names, and a photo for each child (kept on this device only). */
export function ClassEditor() {
  const { settings, update, ready } = useSettings();
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  // Photos uploaded together, waiting to be matched to a child.
  const [loose, setLoose] = useState<string[]>([]);

  useEffect(() => {
    loadPhotos().then(setPhotos);
  }, []);

  const add = () => {
    const names = draft
      .split(/[\n,]/)
      .map((n) => n.trim())
      .filter(Boolean);
    if (!names.length) return;
    update({ students: [...settings.students, ...names.map((name) => ({ id: newStudentId(), name }))].slice(0, 60) });
    setDraft("");
  };

  const setPhoto = async (id: string, dataUrl: string) => {
    if (await savePhoto(id, dataUrl)) setPhotos((p) => ({ ...p, [id]: dataUrl }));
  };

  const remove = async (id: string) => {
    update({
      students: settings.students.filter((s) => s.id !== id),
      menorahIds: settings.menorahIds.filter((m) => m !== id),
    });
    await deletePhoto(id);
    setPhotos(({ [id]: _gone, ...rest }) => rest);
  };

  const shrink = (f: File) => shrinkLogo(f, 500);

  if (!ready) return null;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="מיין קלאס" en="My class" />
      </h1>
      <p className="rounded-xl bg-[#e9f8ef] px-3 py-2 text-sm">
        <T
          yi="די בילדער פון די קינדער ווערן נישט ארויפגעשיקט: זיי בלייבן נאר אויף דעם טעלעפאן אדער קאמפיוטער."
          en="The children's photos are never uploaded: they stay on this phone or computer only."
        />
      </p>

      <Section title={{ yi: "צולייגן קינדער", en: "Add children" }} edge={0}>
        <textarea
          className={`${input} min-h-24 py-2`}
          dir="auto"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="חיה, שרה, רבקה..."
        />
        <p className="text-sm text-p-muted">
          <T yi="איין נאמען א שורה, אדער מיט קאמעס." en="One name per line, or separated by commas." />
        </p>
        <button type="button" onClick={add} className="min-h-12 w-full rounded-xl bg-p-brand font-p-heading text-lg text-white">
          <T yi="צולייגן" en="Add" />
        </button>
      </Section>

      <Section title={{ yi: "בילדער אויף איינמאל", en: "Many photos at once" }} edge={1}>
        <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-p-sky font-p-heading">
          <T yi="קלייבט בילדער" en="Choose photos" />
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={async (e) => {
              const files = [...(e.target.files ?? [])];
              e.target.value = "";
              const urls = await Promise.all(files.map((f) => shrink(f).catch(() => null)));
              setLoose((l) => [...l, ...urls.filter((u): u is string => !!u)]);
            }}
          />
        </label>
        {loose.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {loose.map((url, i) => (
              <li key={i} className="space-y-1 rounded-xl border-2 border-[#e6e8f5] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL */}
                <img src={url} alt="" className="aspect-square w-full rounded-lg object-cover" />
                <select
                  className={input}
                  defaultValue=""
                  onChange={async (e) => {
                    if (!e.target.value) return;
                    await setPhoto(e.target.value, url);
                    setLoose((l) => l.filter((_, j) => j !== i));
                  }}
                >
                  <option value="">—</option>
                  {settings.students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={{ yi: `די קלאס (${settings.students.length})`, en: `The class (${settings.students.length})` }} edge={3}>
        {!settings.students.length && (
          <p className="text-p-muted">
            <T yi="נאך קיין קינדער." en="No children yet." />
          </p>
        )}
        <ul className="divide-y divide-[#eef0f8]">
          {settings.students.map((s) => (
            <li key={s.id} className="flex items-center gap-3 py-2">
              {photos[s.id] ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data: URL
                <img src={photos[s.id]} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-p-soft text-xl">🙂</span>
              )}
              <input
                className={`${input} flex-1`}
                dir="auto"
                value={s.name}
                maxLength={40}
                onChange={(e) =>
                  update({ students: settings.students.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x)) })
                }
              />
              <label className="flex min-h-11 cursor-pointer items-center rounded-xl border-2 border-[#dfe2f2] px-2 text-sm">
                <T yi="בילד" en="Photo" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) await setPhoto(s.id, await shrink(f));
                  }}
                />
              </label>
              <button type="button" onClick={() => remove(s.id)} className="min-h-11 px-2 text-sm underline">
                <T yi="אוועק" en="Remove" />
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Link href="/parsha/builder" className="flex min-h-12 items-center justify-center rounded-xl bg-p-pink font-p-heading text-lg text-white">
        <T yi="צוריק צו די שיטס" en="Back to the sheets" />
      </Link>
    </div>
  );
}
