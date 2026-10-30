import Link from "next/link";
import { SheetStack } from "@/parsha/components/SheetStack";
import { getParsha } from "@/parsha/lib/content";
import { DEFAULT_SETTINGS } from "@/parsha/lib/settings";

const POINTS = [
  "אייער לאגא און נאמען אויף יעדן בלאט",
  "פאסיג פאר 3, 4, 5 און 6–7 יאר",
  "פרשה בלעטער יעדע וואך, און בלעטער פאר יום טוב",
  "דרוקט אדער היט אפ אלס PDF",
];

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1fr_22rem]">
      <section>
        <h1 className="font-p-heading text-4xl leading-tight font-bold md:text-5xl">
          וואכנדיגע פרשה בלעטער
          <br />
          <span className="text-p-brand">פאר אייער פלעיגרופ און חדר</span>
        </h1>
        <p className="mt-4 max-w-prose text-lg text-p-muted">
          קאלירן, מעיז, פארבינד די פינטלעך, ציילן, און א בריוו פאר די עלטערן. קלייבט די פרשה, דעם עלטער און די
          אקטיוויטעטן, און דרוקט עס אויס אין א מינוט.
        </p>
        <ul className="mt-6 space-y-2">
          {POINTS.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-p-brand" />
              {p}
            </li>
          ))}
        </ul>
        <Link
          href="/parsha/builder"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-p-brand px-6 font-p-heading text-lg font-semibold text-p-brand-ink"
        >
          מאכט אייער בלאט
        </Link>
      </section>
      <div aria-label="א ביישפיל בלאט">
        <SheetStack
          parsha={getParsha("vayeishev")!}
          settings={{ ...DEFAULT_SETTINGS, institution: "פלעיגרופ", teacherName: "" }}
          pages={[{ kind: "coloring", withNote: true }]}
        />
      </div>
    </div>
  );
}
