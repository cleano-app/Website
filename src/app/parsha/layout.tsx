import type { Metadata } from "next";
import { Fredoka, Varela_Round } from "next/font/google";
import Link from "next/link";
import { BRAND } from "@/parsha/config";

const fredoka = Fredoka({ subsets: ["hebrew", "latin"], variable: "--font-fredoka" });
const varela = Varela_Round({ subsets: ["hebrew", "latin"], weight: "400", variable: "--font-varela" });

export const metadata: Metadata = {
  title: { default: BRAND, template: `%s · ${BRAND}` },
  description: "Weekly parsha activity sheets in heimish Yiddish, with your logo and name.",
  alternates: { canonical: "/parsha" },
  openGraph: { title: BRAND, url: "/parsha", type: "website" },
};

const NAV = [
  { href: "/parsha/builder", label: "מאכט א בלאט" },
  { href: "/parsha/parshos", label: "פרשיות" },
  { href: "/parsha/pricing", label: "פרייזן" },
  { href: "/parsha/about", label: "וועגן אונז" },
];

// The cleaning site's header, promo and footer are left out on these pages
// (see SiteChrome), so this section brings its own: right to left, in Yiddish.
export default function ParshaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="yi" dir="rtl" className={`parsha ${fredoka.variable} ${varela.variable} min-h-dvh antialiased`}>
      <header className="border-b-2 border-p-line/20 print:hidden">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-1 px-4 py-2">
          <Link href="/parsha" className="me-auto flex min-h-11 items-center font-p-heading text-xl font-bold text-p-brand">
            {BRAND}
          </Link>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex min-h-11 items-center rounded-full px-3 font-p-heading font-medium hover:bg-p-soft"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-p-muted print:hidden">
        <p>
          {BRAND} · <span dir="ltr">cleano.services/parsha</span>
        </p>
      </footer>
    </div>
  );
}
