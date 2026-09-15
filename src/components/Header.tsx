"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mainNav, siteConfig, whatsappHref } from "@/lib/siteConfig";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          {/* The source PNG is trimmed to the artwork itself (it used to
              carry ~4% transparent padding on every edge, which made the
              mark render smaller than the space it took). Breathing room
              now comes from the header's own padding, where it can be
              tuned, rather than from empty pixels in the file. */}
          <Image
            src="/brand/cleano-logo.png"
            alt={`${siteConfig.name} - ${siteConfig.tagline}`}
            width={4491}
            height={1162}
            priority
            className="h-[2.7rem] w-auto min-[380px]:h-[2.95rem] sm:h-[3.4rem] lg:h-[3.75rem]"
          />
        </Link>

        {/* Service links stay neutral so Contact - the one link that is an
            action rather than a destination - carries the brand colour and
            reads as the thing to click. */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {mainNav.map((item) => {
            const isContact = item.href === "/contact";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full ${
                  isContact
                    ? "font-semibold text-brand hover:text-brand-dark"
                    : "font-medium text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* The phone number and the Get a Free Quote button used to live
            here; both were dropped to unclutter the bar now that /contact
            carries every way to reach Cleano. WhatsApp stays as the one
            one-tap action. Each page still ends on its own quote CTA, and
            phones keep the sticky Call / WhatsApp / Quote bar. */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappHref("Hi Cleano, I'd like a quote for...")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] transition-colors hover:bg-[#25D366]/10"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={`${siteConfig.opsAppUrl}/login`}
            className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap text-foreground/80 transition-colors hover:border-brand hover:text-brand-dark"
          >
            <SignInIcon />
            Sign In
          </a>
        </div>

        {/* Mobile: Sign In sits in the bar itself, not only inside the
            drawer - customers who never open the menu still need to find
            the app login. The sticky bottom bar is Call / WhatsApp / Quote
            only, so this is the one place it's always visible on a phone. */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`${siteConfig.opsAppUrl}/login`}
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle px-3 text-sm font-semibold whitespace-nowrap text-foreground/80"
            aria-label="Sign in to the Cleano app"
          >
            <SignInIcon />
            Sign In
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-border-subtle bg-background px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base hover:bg-muted-bg ${
                    item.href === "/contact"
                      ? "font-semibold text-brand"
                      : "font-medium text-foreground/85"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <a
              href={`${siteConfig.opsAppUrl}/login`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border-subtle px-5 py-3 text-center text-sm font-semibold text-foreground/80"
            >
              <SignInIcon />
              Sign In
            </a>
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get a Free Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.5 3.9 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function SignInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}
