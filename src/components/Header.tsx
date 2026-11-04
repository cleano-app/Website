"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mainNav, siteConfig, telHref } from "@/lib/siteConfig";
import { PhoneIcon } from "./site/ui";

// A thin dark green bar with who we are and what we're accredited for,
// then a white bar with the menu, the phone number and the quote button -
// the things a customer checks before trusting a contractor, visible
// before they scroll. Phones get the logo, a call button and the menu;
// the sticky bottom bar carries Call / WhatsApp / Get Quote.

// Contact is reached from the phone number and the quote button here, so
// the desktop menu leaves it out; the phone menu keeps it.
const desktopNav = mainNav.filter((item) => item.href !== "/contact");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_var(--border-subtle)]">
      <div className="hidden bg-brand-dark text-[13px] text-[#d7f5e8] sm:block">
        <div className="mx-auto flex h-[34px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <span>Exterior cleaning · London &amp; surrounding areas</span>
          <span className="flex items-center gap-4">
            <span className="hidden md:inline">CHAS accredited · Fully insured · VAT registered</span>
            <a href={`${siteConfig.opsAppUrl}/login`} className="font-semibold text-white hover:underline">
              Customer sign in
            </a>
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-5 px-4 sm:h-[72px] sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/brand/cleano-logo.png"
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={4491}
            height={1162}
            preload
            className="h-[38px] w-auto sm:h-[46px]"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {desktopNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/65 transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={telHref()} className="flex items-center gap-1.5 text-sm font-bold whitespace-nowrap text-foreground hover:text-brand-dark">
            <PhoneIcon />
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/quote" className="rounded-[10px] bg-brand-dark px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-[#0b4a37]">
            Get a Free Quote
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref()}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border-subtle text-foreground"
            aria-label={`Call ${siteConfig.phoneDisplay}`}
          >
            <PhoneIcon size={18} />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border-subtle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border-subtle bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground/85 hover:bg-muted-bg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <a
              href={`${siteConfig.opsAppUrl}/login`}
              className="flex flex-1 items-center justify-center rounded-[10px] border-[1.5px] border-[#cdd6d1] px-4 py-3 text-sm font-bold text-foreground"
            >
              Customer sign in
            </a>
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="flex flex-1 items-center justify-center rounded-[10px] bg-brand-dark px-4 py-3 text-sm font-bold text-white"
            >
              Get a Free Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
