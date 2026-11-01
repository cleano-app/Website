import { Scene } from "@/parsha/components/art/Scene";
import { BRAND } from "@/parsha/config";
import { AGE_RULES } from "@/parsha/lib/age";
import { titleOf, type Parsha } from "@/parsha/lib/content";
import type { SheetPage } from "@/parsha/lib/pages";
import type { Settings } from "@/parsha/lib/settings";
import { SHEET, SUBTITLES } from "@/parsha/lib/strings";
import { GeneratedLogo } from "@/parsha/components/GeneratedLogo";
import { NO_FORWARDING } from "@/parsha/lib/strings";
import { CountingArt, DotsArt, MazeArt } from "./Activities";
import { Legend, Pieces, TentNet } from "./Craft";
import { Crowns, MyColouring, PhotoFrame, PhotoMenorah, Trace } from "./Personal";

type Props = {
  parsha: Parsha;
  settings: Settings;
  page: SheetPage;
  /** Children's photos by student id (kept on this device). */
  photos?: Record<string, string>;
  /** The first page of a print: it carries the rabbonim's notice. */
  first?: boolean;
};

/** The school's logo: an uploaded one, else one made on the site. */
export function SchoolLogo({ settings, className }: { settings: Settings; className?: string }) {
  if (settings.logo)
    // eslint-disable-next-line @next/next/no-img-element -- a local data: URL, nothing for next/image to optimise
    return <img src={settings.logo} alt="" className={`object-contain ${className ?? ""}`} />;
  if (settings.logoDesign) return <GeneratedLogo design={settings.logoDesign} className={className} />;
  return null;
}

/** The school's mark across the page, faint, so a sheet can't pass for anyone else's. */
function Watermark({ settings }: { settings: Settings }) {
  const hasLogo = settings.logo || settings.logoDesign;
  if (!hasLogo && !settings.institution) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      {hasLogo ? (
        <div className="h-[120mm] w-[120mm] -rotate-12 opacity-[0.06]">
          <SchoolLogo settings={settings} className="h-full w-full" />
        </div>
      ) : (
        <p className="-rotate-30 font-p-heading text-[44pt] font-bold whitespace-nowrap opacity-[0.07]">
          {settings.institution}
        </p>
      )}
    </div>
  );
}

/** A rounded box with a heading, the building block of every sheet. */
function Box({
  title,
  accent,
  className = "",
  children,
}: {
  title?: string;
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`flex min-h-0 flex-col rounded-[5mm] border-[0.9mm] border-[#222] p-[4mm] ${className}`}>
      {title && (
        <h3 className="mb-[2mm] font-p-heading text-[17pt] leading-tight font-bold" style={{ color: accent }}>
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}

function Header({
  parsha,
  settings,
  subtitle,
  childName,
}: {
  parsha: Parsha;
  settings: Settings;
  subtitle: string;
  childName?: string;
}) {
  const { accent } = settings;
  return (
    <header
      className="flex items-center justify-between gap-[4mm] rounded-[5mm] border-[0.9mm] border-[#222] px-[5mm] py-[3mm]"
      style={{ background: `color-mix(in srgb, ${accent} 9%, white)` }}
    >
      <div>
        <h1 className="font-p-heading text-[30pt] leading-none font-bold" style={{ color: accent }}>
          {titleOf(parsha)}
        </h1>
        <p className="mt-[1.5mm] text-[13pt]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-[3mm]">
        <div className="text-[11pt] leading-snug">
          {settings.institution && <p className="font-p-heading text-[13pt] font-semibold">{settings.institution}</p>}
          <p>
            {settings.teacherTitle}: {settings.teacherName || <span className="inline-block w-[28mm] border-b border-black" />}
          </p>
          <p>
            {SHEET.childName}{" "}
            {childName ? <b>{childName}</b> : <span className="inline-block w-[34mm] border-b border-black" />}
          </p>
        </div>
        {settings.logo || settings.logoDesign ? (
          <SchoolLogo
            settings={settings}
            className="h-[22mm] w-[22mm] shrink-0 rounded-full border-[0.6mm] border-[#222] bg-white p-[1mm]"
          />
        ) : (
          <div className="flex h-[22mm] w-[22mm] shrink-0 items-center justify-center rounded-full border-[0.6mm] border-dashed border-[#888] bg-white text-[10pt] text-[#777] print:invisible">
            {SHEET.logoPlaceholder}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer({ parsha, settings }: { parsha: Parsha; settings: Settings }) {
  return (
    <footer className="flex justify-between border-t-[0.5mm] border-[#222] pt-[2mm] text-[11pt]">
      <span>{SHEET.footer(titleOf(parsha), parsha.greeting)}</span>
      <span>{settings.institution || BRAND.yi}</span>
    </footer>
  );
}

function ParentsNote({ parsha, accent, large }: { parsha: Parsha; accent: string; large?: boolean }) {
  return (
    <Box title={SHEET.parentsTitle} accent={accent} className={large ? "flex-1" : ""}>
      <p className="mb-[2mm]">{parsha.parents.intro}</p>
      <p className="mb-[1.5mm] font-p-heading font-semibold">{parsha.parentsAsk ?? SHEET.parentsAsk}</p>
      <ol className={`list-decimal ps-[7mm] ${large ? "space-y-[5mm]" : "space-y-[1mm]"}`}>
        {parsha.parents.questions.map((q) => (
          <li key={q.q}>
            {q.q} <span className="text-[#777]">({q.a})</span>
          </li>
        ))}
      </ol>
    </Box>
  );
}

function Body({ parsha, settings, page, photos = {} }: Props) {
  const { accent, age } = settings;
  const ls = AGE_RULES[age].lineScale;
  switch (page.kind) {
    case "coloring":
      return (
        <>
          <p className="text-center font-p-heading text-[16pt] font-semibold">{parsha.caption}</p>
          <Box title={SHEET.coloringTitle} accent={accent} className="flex-1">
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <Scene name={parsha.scene} lineScale={ls} className="h-full max-h-full w-full" />
            </div>
          </Box>
          {page.withNote && <ParentsNote parsha={parsha} accent={accent} />}
        </>
      );
    case "note":
      return <ParentsNote parsha={parsha} accent={accent} large />;
    case "activities": {
      const boxes = [
        page.dots && (
          <Box key="dots" title={`${SHEET.dotsPrefix} ${parsha.dots.caption}`} accent={accent} className="flex-1">
            <div className="min-h-0 flex-1">
              <DotsArt parsha={parsha} age={age} accent={accent} />
            </div>
          </Box>
        ),
        page.counting && (
          <Box key="counting" title={SHEET.counting(parsha.counting.word)} accent={accent} className="flex-1">
            <div className="min-h-0 flex-1">
              <CountingArt parsha={parsha} age={age} accent={accent} />
            </div>
          </Box>
        ),
      ].filter(Boolean);
      return (
        <>
          {page.maze && (
            <Box title={parsha.maze.instruction} accent={accent} className={boxes.length ? "h-[45%]" : "flex-1"}>
              <div className="min-h-0 flex-1">
                <MazeArt parsha={parsha} age={age} />
              </div>
            </Box>
          )}
          {boxes.length > 0 && (
            <div className={`flex min-h-0 flex-1 gap-[4mm] ${page.maze ? "flex-row" : "flex-col"}`}>{boxes}</div>
          )}
        </>
      );
    }
    case "morah":
      return (
        <>
          <Box title={SHEET.storyTitle} accent={accent}>
            <div className="space-y-[3mm] text-[15pt] leading-relaxed">
              {parsha.story.split("\n").map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Box>
          <Box title={SHEET.questionsTitle} accent={accent}>
            <ol className="list-decimal space-y-[3mm] ps-[7mm] text-[14pt]">
              {parsha.parents.questions.map((q) => (
                <li key={q.q}>
                  {q.q} <span className="text-[#777]">({q.a})</span>
                </li>
              ))}
            </ol>
          </Box>
        </>
      );
    case "my-colouring":
      return <MyColouring unit={parsha} student={page.student} ls={ls} />;
    case "crown":
      return <Crowns unit={parsha} students={page.students} />;
    case "trace":
      return <Trace unit={parsha} />;
    case "photo-frame":
      return <PhotoFrame unit={parsha} student={page.student} photo={page.student ? photos[page.student.id] : undefined} />;
    case "photo-menorah":
      return <PhotoMenorah students={page.students} photos={photos} />;
    case "craft-cut": {
      const craft = parsha.craft!;
      return (
        <>
          <Legend craft={craft} />
          <div className="min-h-0 flex-1">
            <TentNet craft={craft} />
          </div>
          <Box title={craft.piecesTitle} accent={accent}>
            <Pieces craft={craft} />
          </Box>
        </>
      );
    }
    case "craft-steps": {
      const craft = parsha.craft!;
      return (
        <>
          <Box title={craft.needTitle} accent={accent}>
            <ul className="list-disc space-y-[1mm] ps-[7mm]">
              {craft.need.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Box>
          <Box accent={accent}>
            <ul className="space-y-[1.5mm]">
              {craft.byAge.map((a) => (
                <li key={a.age}>
                  <b className="font-p-heading" dir="ltr">
                    {a.age}
                  </b>
                  : {a.text}
                </li>
              ))}
            </ul>
          </Box>
          <Box title={craft.instructionsTitle} accent={accent} className="flex-1">
            <ol className="space-y-[4mm]">
              {craft.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-[3mm]">
                  <span
                    className="flex h-[10mm] w-[10mm] shrink-0 items-center justify-center rounded-full border-[0.7mm] font-p-heading text-[15pt] font-bold"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[14pt]">{s}</span>
                </li>
              ))}
            </ol>
          </Box>
        </>
      );
    }
  }
}

function subtitleFor(parsha: Parsha, page: SheetPage): string {
  switch (page.kind) {
    case "coloring":
      return SUBTITLES.coloring;
    case "note":
      return SUBTITLES.note;
    case "activities":
      return SUBTITLES.activities;
    case "morah":
      return SUBTITLES.morah;
    case "craft-cut":
      return parsha.craft!.title;
    case "craft-steps":
      return parsha.craft!.instructionsTitle;
    case "my-colouring":
      return "מיין קאליר-בלאט";
    case "crown":
      return "א קרוין מיט מיין נאמען";
    case "trace":
      return "שרייבט נאך די ווערטער";
    case "photo-frame":
      return "מיין בילד-ראם";
    case "photo-menorah":
      return "די קלאס מנורה";
  }
}

/** One A4 page, exactly as it prints. */
export function Sheet({ parsha, settings, page, photos, first }: Props) {
  const child = "student" in page ? page.student?.name : undefined;
  return (
    <article
      className="sheet relative flex flex-col gap-[4mm] bg-white p-[10mm] text-[#111]"
      lang="yi"
      dir="rtl"
      style={{ fontSize: `${AGE_RULES[settings.age].bodyPt}pt` }}
    >
      <Header parsha={parsha} settings={settings} subtitle={subtitleFor(parsha, page)} childName={child} />
      <div className="flex min-h-0 flex-1 flex-col gap-[4mm]">
        <Body parsha={parsha} settings={settings} page={page} photos={photos} />
      </div>
      {first && (
        <p className="rounded-[2mm] border-[0.3mm] border-[#999] px-[3mm] py-[1.5mm] text-center text-[9pt] text-[#555]">
          {NO_FORWARDING.yi}
        </p>
      )}
      <Footer parsha={parsha} settings={settings} />
      <Watermark settings={settings} />
    </article>
  );
}
