import type { Metadata } from "next";
import { Fredoka, Varela_Round } from "next/font/google";
import Link from "next/link";
import { LogoMark } from "@/parsha/components/Logo";
import { BRAND } from "@/parsha/config";
import { LANG_SCRIPT, LangToggle, T } from "@/parsha/i18n";

const fredoka = Fredoka({ subsets: ["hebrew", "latin"], variable: "--font-fredoka" });
const varela = Varela_Round({ subsets: ["hebrew", "latin"], weight: "400", variable: "--font-varela" });

export const metadata: Metadata = {
  title: { default: `${BRAND.en} · ${BRAND.yi}`, template: `%s · ${BRAND.en}` },
  description: "Weekly parsha and Yom Tov sheets in heimish Yiddish, with your own logo and name. וואכנדיגע פרשה שיטס אויף אידיש.",
  alternates: { canonical: "/parsha" },
  openGraph: { title: BRAND.en, url: "/parsha", type: "website" },
};

// The last two only show from tablet width up; on a phone they're in the footer,
// so the menu stays on one line.
const NAV = [
  { href: "/parsha/builder", yi: "מאכט א שיט", en: "Make a sheet", always: true },
  { href: "/parsha/parshos", yi: "פרשיות", en: "Parshiyos", always: true },
  { href: "/parsha/yomim-tovim", yi: "יום טוב", en: "Yom Tov", always: true },
  { href: "/parsha/pricing", yi: "פרייזן", en: "Pricing", always: false },
  { href: "/parsha/about", yi: "וועגן אונז", en: "About", always: false },
];

// The cleaning site's header, promo and footer are left out on these pages
// (see SiteChrome), so Parsha Line brings its own. Yiddish by default; the
// script puts back English for someone who picked it.
export default function ParshaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="yi"
      dir="rtl"
      suppressHydrationWarning
      className={`parsha ${fredoka.variable} ${varela.variable} min-h-dvh antialiased`}
    >
      <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      <header className="border-b-2 border-p-line/20 print:hidden">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-0.5 gap-y-1 px-3 py-2 sm:gap-x-1 sm:px-4">
          <Link href="/parsha" className="me-auto flex min-h-11 items-center gap-2" aria-label={BRAND.en}>
            <LogoMark size={36} />
            <span className="hidden font-p-heading text-xl font-bold text-p-brand sm:inline">
              <T {...BRAND} />
            </span>
          </Link>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`${n.always ? "flex" : "hidden sm:flex"} min-h-11 items-center rounded-full px-2 text-[15px] font-p-heading font-medium hover:bg-p-soft sm:px-2.5 sm:text-base`}
            >
              <T yi={n.yi} en={n.en} />
            </Link>
          ))}
          <LangToggle />
        </nav>
      </header>
      {children}
      <footer className="mx-auto max-w-6xl space-y-2 px-4 py-8 text-sm text-p-muted print:hidden">
        <p className="flex gap-4">
          <Link href="/parsha/pricing" className="underline">
            <T yi="פרייזן" en="Pricing" />
          </Link>
          <Link href="/parsha/about" className="underline">
            <T yi="וועגן אונז" en="About" />
          </Link>
        </p>
        <p className="flex flex-wrap items-center gap-2">
          <LogoMark size={20} />
          {BRAND.en} · {BRAND.yi} · <span dir="ltr">cleano.services/parsha</span>
        </p>
      </footer>
    </div>
  );
}
