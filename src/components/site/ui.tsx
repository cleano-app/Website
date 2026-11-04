import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { accreditations } from "@/lib/siteConfig";

// The building blocks of the site's look since the redesign: white pages,
// real photographs, dark green for action and a light grey for alternate
// sections - professional first, friendly in the wording. Every page uses
// these, so a change here changes the whole site.

/** Button classes. `onDark` variants sit on a photo or the dark green band. */
export const btn = {
  solid:
    "inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-dark px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#0b4a37]",
  line: "inline-flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-[#cdd6d1] bg-white px-5 py-3 text-[15px] font-bold text-foreground transition-colors hover:border-brand-dark",
  solidOnDark:
    "inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#1f9a6e]",
  lineOnDark:
    "inline-flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-white/60 bg-white/5 px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white/15",
  whiteOnDark:
    "inline-flex items-center justify-center gap-2 rounded-[10px] bg-white px-5 py-3 text-[15px] font-bold text-brand-dark transition-colors hover:bg-white/90",
};

/** The small uppercase label above a section heading. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[13px] font-bold tracking-[0.06em] text-brand-dark uppercase ${className}`}>{children}</p>;
}

/** A section heading with its eyebrow and an optional line under it. */
export function SectionHeading({ eyebrow, title, sub, className = "" }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-1.5 text-[25px] leading-tight font-bold text-foreground sm:text-[32px]">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-base leading-relaxed text-foreground/65">{sub}</p>}
    </div>
  );
}

/** A green tick in a circle. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-white ${className}`} aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/** A list with a green tick on every line. */
export function TickList({ items, columns = 1, className = "" }: { items: ReactNode[]; columns?: 1 | 2; className?: string }) {
  return (
    <ul className={`grid gap-2.5 ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-7" : ""} ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug text-foreground/85">
          <Tick className="mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Cleano's own badge for the drone registration: a white drone on dark
 * green. Deliberately not the CAA's logo or anything like it (its colours,
 * crescent or lettering): the CAA only allows its logo with an approval
 * number, and Cleano holds an Operator ID (open category), not an approval.
 */
export function DroneBadge({ size = 34 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[8px] bg-brand-dark text-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9h16" />
        <path d="M2 6h5M17 6h5M4.5 6v3M19.5 6v3" />
        <rect x="8.5" y="8" width="7" height="5" rx="2" />
        <circle cx="12" cy="16.5" r="1.8" />
        <path d="M12 13v1.7" />
      </svg>
    </span>
  );
}

/** CHAS, CAA, insured, VAT - straight under every page header. */
export function TrustRow() {
  const { chas } = accreditations;
  return (
    <div className="border-b border-border-subtle bg-white">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-4 text-[13px] font-semibold text-foreground sm:px-6 sm:text-sm">
        <li className="flex items-center gap-2">
          {chas.logo ? (
            <Image src={chas.logo.src} alt="" width={chas.logo.width} height={chas.logo.height} className="h-[34px] w-auto" />
          ) : (
            <Tick />
          )}
          CHAS accredited
        </li>
        <li className="flex items-center gap-2">
          <DroneBadge />
          CAA-registered drone operator
        </li>
        <li className="flex items-center gap-2">
          <Tick />
          Fully insured
        </li>
        <li className="flex items-center gap-2">
          <Tick />
          VAT registered
        </li>
      </ul>
    </div>
  );
}

function Crumb({ label, onDark }: { label: string; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${onDark ? "text-[#b9d8cc]" : "text-foreground/55"}`}>
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {" / "}
      <span className={`font-semibold ${onDark ? "text-white" : "text-foreground"}`} aria-current="page">
        {label}
      </span>
    </nav>
  );
}

/**
 * A page header on a photograph: breadcrumb, headline, a line under it and
 * the page's buttons, on a dark green shade that keeps the text readable on
 * any photo. On a phone the shade runs up from the bottom instead.
 */
export function PageHero({
  image,
  imageAlt,
  position = "50% 50%",
  crumb,
  title,
  lead,
  children,
}: {
  image: string;
  imageAlt: string;
  /** object-position for the photo, so its subject stays in view. */
  position?: string;
  crumb: string;
  title: ReactNode;
  lead: ReactNode;
  /** The buttons. */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0b2a20] text-white">
      <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,32,24,.94)_0%,rgba(8,32,24,.8)_55%,rgba(8,32,24,.35)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,32,24,.9)_0%,rgba(8,32,24,.68)_50%,rgba(8,32,24,.2)_85%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-8 sm:px-6 sm:pt-11 sm:pb-12">
        <Crumb label={crumb} onDark />
        <h1 className="mt-3.5 max-w-2xl text-[30px] leading-[1.08] font-bold sm:text-[44px]">{title}</h1>
        <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-[#e2efe9] sm:text-[17px]">{lead}</p>
        {children && <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>}
      </div>
    </section>
  );
}

/** A plain white page header: breadcrumb, headline and a line under it. */
export function PlainHero({ crumb, title, lead }: { crumb: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="border-b border-border-subtle bg-white">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        <Crumb label={crumb} />
        <h1 className="mt-3 text-[30px] leading-tight font-bold text-foreground sm:text-[42px]">{title}</h1>
        {lead && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/65 sm:text-[17px]">{lead}</p>}
      </div>
    </section>
  );
}

/** A framed picture or animation, with a soft shadow. */
export function Framed({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-[14px] border border-border-subtle bg-white shadow-[0_24px_50px_-28px_rgba(15,40,30,.35)] ${className}`}>{children}</div>;
}

export function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
