import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/parsha/config";

export const metadata: Metadata = { title: "פרייזן" };

// Planned prices from the brief; the owner still has to confirm them.
const PLANS = [
  { name: "פלעיגרופ אבאנעמענט", price: "£15–25", per: "א מאנאט, אדער ביליגער פאר א גאנץ יאר" },
  { name: "א יאר פאר א מורה", price: "£40–60", per: "אלע יום טוב פעקלעך" },
  { name: "קלאס ליסענס", price: "£10–15", per: "איין יום טוב פעקל" },
  { name: "פאמיליע פעקל", price: "£4–5", per: "איין יום טוב פעקל" },
  { name: "פליי סקים פעקל", price: "£30–60", per: "פאר א סקים" },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-p-heading text-3xl font-bold">פרייזן</h1>
      <p className="mt-1 inline-block rounded-full bg-p-soft px-3 py-1 font-p-heading">באלד</p>
      <p className="mt-4 text-p-muted">יעצט איז עס אומזיסט. די פרייזן אונטן זענען בערך, נאך נישט ענדגילטיג.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.name} className="rounded-2xl border-2 border-p-line/25 bg-p-surface p-4">
            <p className="font-p-heading text-lg font-semibold">{p.name}</p>
            <p className="mt-2 font-p-heading text-2xl text-p-brand">
              בערך <span dir="ltr">{p.price}</span>
            </p>
            <p className="text-sm text-p-muted">{p.per}</p>
          </li>
        ))}
      </ul>
      <section className="mt-8 rounded-2xl border-2 border-dashed border-p-line/30 p-4">
        <h2 className="font-p-heading text-xl font-semibold">אינטערעסירט?</h2>
        <p>שרייבט אונז און מיר וועלן אייך לאזן וויסן ווען עס עפנט זיך:</p>
        <p dir="ltr" className="mt-1 text-start font-semibold">
          {CONTACT_EMAIL}
        </p>
      </section>
    </div>
  );
}
