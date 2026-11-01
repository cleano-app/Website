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
  { yi: "קראפטס מיט די קינדער'ס נעמען און בילדער", en: "Crafts with the children's names and photos" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Confetti dots, like a playgroup wall. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <span className="absolute top-8 right-[8%] h-16 w-16 rounded-full bg-p-yellow/40" />
        <span className="absolute top-40 left-[6%] h-10 w-10 rounded-full bg-p-pink/30" />
        <span className="absolute bottom-24 right-[40%] h-12 w-12 rounded-full bg-p-sky/30" />
        <span className="absolute bottom-10 left-[30%] h-8 w-8 rounded-full bg-p-green/30" />
        <span className="absolute top-24 left-[38%] h-6 w-6 rounded-full bg-p-purple/30" />
      </div>
    <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1fr_22rem]">
      <section className="min-w-0">
        <p className="mb-4 flex items-center gap-3 font-p-heading text-2xl font-bold text-p-brand">
          <LogoMark size={48} />
          <T {...BRAND} />
        </p>
        <h1 className="text-4xl leading-tight font-bold md:text-5xl">
          <T yi="פרשה שיטס יעדע וואך" en="Weekly parsha sheets" />
          <br />
          <span className="text-p-pink">
            <T yi="פאר אייער פלעיגרופ און חדר" en="for your playgroup and cheder" />
          </span>
        </h1>
        <p className="mt-4 max-w-prose text-lg text-p-muted">
          <T
            yi="קאלירן, מעיז, פארבינד די פינטלאך, ציילן, און א בריוו פאר די עלטערן. קלייבט אויס די פרשה, דעם עלטער און די עקטיוויטיס, און פרינט עס אויס אין א מינוט."
            en="Colouring, a maze, dot-to-dot, counting and a note for parents. Pick the parsha, the age and the activities, and print it in a minute. The sheets are in heimish Yiddish."
          />
        </p>
        <ul className="mt-6 space-y-2">
          {POINTS.map((p, i) => (
            <li key={p.en} className="flex items-center gap-2">
              <span className={`h-3 w-3 shrink-0 rounded-full ${["bg-p-pink", "bg-p-sky", "bg-p-yellow", "bg-p-green"][i % 4]}`} />
              <T {...p} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/parsha/builder"
            className="inline-flex min-h-12 items-center rounded-xl bg-p-brand px-6 font-p-heading text-lg font-semibold text-p-brand-ink"
          >
            <T yi="מאכט אייער שיט" en="Make your sheet" />
          </Link>
          <Link
            href="/parsha/signup"
            className="inline-flex min-h-12 items-center rounded-xl bg-p-pink px-6 font-p-heading text-lg font-semibold text-white"
          >
            <T yi="מאכט אן אקאונט" en="Sign up" />
          </Link>
        </div>
        <Link href="/parsha/builder?demo=testy" className="mt-3 block min-h-11 py-2 text-sm underline">
          <T yi="זעט א ביישפיל מיט א לאגא (טעסטי פלעיגרופ)" en="See an example with a real logo (Testy Playgroup)" />
        </Link>
      </section>
      <div aria-hidden className="min-w-0">
        <SheetStack
          parsha={getParsha("vayeishev")!}
          settings={{ ...DEFAULT_SETTINGS, institution: "פלעיגרופ", teacherName: "" }}
          pages={[{ kind: "coloring", withNote: true }]}
        />
      </div>
    </div>
    </div>
  );
}
