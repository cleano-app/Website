import { Scene } from "@/parsha/components/art/Scene";
import { BRAND } from "@/parsha/config";
import { AGE_RULES } from "@/parsha/lib/age";
import { titleOf, type Parsha } from "@/parsha/lib/content";
import type { SheetPage } from "@/parsha/lib/pages";
import type { Settings } from "@/parsha/lib/settings";
import { SHEET, SUBTITLES } from "@/parsha/lib/strings";
import { CountingArt, DotsArt, MazeArt } from "./Activities";
import { Legend, Pieces, TentNet } from "./Craft";

type Props = { parsha: Parsha; settings: Settings; page: SheetPage };

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

function Header({ parsha, settings, subtitle }: { parsha: Parsha; settings: Settings; subtitle: string }) {
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
            {SHEET.childName} <span className="inline-block w-[34mm] border-b border-black" />
          </p>
        </div>
        {settings.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- a local data: URL, nothing for next/image to optimise
          <img
            src={settings.logo}
            alt=""
            className="h-[22mm] w-[22mm] shrink-0 rounded-full border-[0.6mm] border-[#222] bg-white object-contain p-[1.5mm]"
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

function Body({ parsha, settings, page }: Props) {
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
  }
}

/** One A4 page, exactly as it prints. */
export function Sheet({ parsha, settings, page }: Props) {
  return (
    <article
      className="sheet flex flex-col gap-[4mm] bg-white p-[10mm] text-[#111]"
      lang="yi"
      dir="rtl"
      style={{ fontSize: `${AGE_RULES[settings.age].bodyPt}pt` }}
    >
      <Header parsha={parsha} settings={settings} subtitle={subtitleFor(parsha, page)} />
      <div className="flex min-h-0 flex-1 flex-col gap-[4mm]">
        <Body parsha={parsha} settings={settings} page={page} />
      </div>
      <Footer parsha={parsha} settings={settings} />
    </article>
  );
}
