import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/parsha/config";
import { T } from "@/parsha/i18n";

export const metadata: Metadata = { title: "פרייזן · Pricing" };

// Planned prices from the brief; the owner still has to confirm them.
const PLANS = [
  {
    name: { yi: "פלעיגרופ סובסקריפשן", en: "Playgroup subscription" },
    price: "£15–25",
    per: { yi: "א מאנאט, אדער ביליגער פאר א גאנץ יאר", en: "a month, or less by the year" },
  },
  {
    name: { yi: "א יאר פאר א מורה", en: "Teacher's year bundle" },
    price: "£40–60",
    per: { yi: "אלע יום טוב פעקלעך", en: "all Yom Tov packs" },
  },
  {
    name: { yi: "קלאס לייסענס", en: "Class licence" },
    price: "£10–15",
    per: { yi: "איין יום טוב פעקל", en: "one Yom Tov pack" },
  },
  {
    name: { yi: "פאמיליע פעקל", en: "Family pack" },
    price: "£4–5",
    per: { yi: "איין יום טוב פעקל", en: "one Yom Tov pack" },
  },
  {
    name: { yi: "פליי סקים פעקל", en: "Play scheme pack" },
    price: "£30–60",
    per: { yi: "פאר א סקים", en: "per scheme" },
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        <T yi="פרייזן" en="Pricing" />
      </h1>
      <p className="mt-1 inline-block rounded-full bg-p-soft px-3 py-1 font-p-heading">
        <T yi="קומט באלד" en="Coming soon" />
      </p>
      <p className="mt-4 text-p-muted">
        <T
          yi="יעצט איז עס אומזיסט. די פרייזן אונטן זענען בערך, נאך נישט פיינאל."
          en="It's free for now. The prices below are rough and not final."
        />
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.name.en} className="rounded-2xl border-2 border-p-line/25 bg-p-surface p-4">
            <p className="font-p-heading text-lg font-semibold">
              <T {...p.name} />
            </p>
            <p className="mt-2 font-p-heading text-2xl text-p-brand">
              <T yi="בערך" en="about" /> <span dir="ltr">{p.price}</span>
            </p>
            <p className="text-sm text-p-muted">
              <T {...p.per} />
            </p>
          </li>
        ))}
      </ul>
      <section className="mt-8 rounded-2xl border-2 border-dashed border-p-line/30 p-4">
        <h2 className="text-xl font-semibold">
          <T yi="אינטערעסירט?" en="Interested?" />
        </h2>
        <p>
          <T
            yi="שרייבט אונז און מיר וועלן אייך לאזן וויסן ווען עס עפנט זיך:"
            en="Email us and we'll let you know when it opens:"
          />
        </p>
        <p dir="ltr" className="mt-1 text-start font-semibold">
          {CONTACT_EMAIL}
        </p>
      </section>
    </div>
  );
}
