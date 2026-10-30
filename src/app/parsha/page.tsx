import Link from "next/link";
import { LogoMark } from "@/parsha/components/Logo";
import { SheetStack } from "@/parsha/components/SheetStack";
import { BRAND } from "@/parsha/config";
import { T } from "@/parsha/i18n";
import { getParsha } from "@/parsha/lib/content";
import { DEFAULT_SETTINGS } from "@/parsha/lib/settings";

const POINTS = [
  { yi: "אייער לאגא און נאמען אויף יעדע שיט", en: "Your logo and name on every sheet" },
  { yi: "פאסיג פאר 3, 4, 5 און 6–7 יאר", en: "For ages 3, 4, 5 and 6–7" },
  { yi: "א נייע פרשה יעדע וואך, און שיטס פאר יום טוב", en: "A new parsha every week, plus Yom Tov sheets" },
  { yi: "פרינט עס אדער סעיוו עס אלס PDF", en: "Print it or save it as a PDF" },
];

export default function Home() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1fr_22rem]">
      <section>
        <p className="mb-4 flex items-center gap-3 font-p-heading text-2xl font-bold text-p-brand">
          <LogoMark size={48} />
          <T {...BRAND} />
        </p>
        <h1 className="text-4xl leading-tight font-bold md:text-5xl">
          <T yi="פרשה שיטס יעדע וואך" en="Weekly parsha sheets" />
          <br />
          <span className="text-p-brand">
            <T yi="פאר אייער פלעיגרופ און חדר" en="for your playgroup and cheder" />
          </span>
        </h1>
        <p className="mt-4 max-w-prose text-lg text-p-muted">
          <T
            yi="קאלירן, מעיז, פארבינד די פינטלעך, ציילן, און א בריוו פאר די עלטערן. קלייבט אויס די פרשה, דעם עלטער און די עקטיוויטיס, און פרינט עס אויס אין א מינוט."
            en="Colouring, a maze, dot-to-dot, counting and a note for parents. Pick the parsha, the age and the activities, and print it in a minute. The sheets are in heimish Yiddish."
          />
        </p>
        <ul className="mt-6 space-y-2">
          {POINTS.map((p) => (
            <li key={p.en} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-p-brand" />
              <T {...p} />
            </li>
          ))}
        </ul>
        <Link
          href="/parsha/builder"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-p-brand px-6 font-p-heading text-lg font-semibold text-p-brand-ink"
        >
          <T yi="מאכט אייער שיט" en="Make your sheet" />
        </Link>
      </section>
      <div aria-hidden>
        <SheetStack
          parsha={getParsha("vayeishev")!}
          settings={{ ...DEFAULT_SETTINGS, institution: "פלעיגרופ", teacherName: "" }}
          pages={[{ kind: "coloring", withNote: true }]}
        />
      </div>
    </div>
  );
}
