"use client";

import { useSyncExternalStore } from "react";

// The site reads in Yiddish or English; the sheets are always Yiddish.
// Both languages are in the page, and CSS shows the one picked (see
// parsha.css), so static pages need no server work and nothing flashes.

export type Lang = "yi" | "en";
export type Text = { yi: string; en: string };

const KEY = "parsha-line:lang";
const EVENT = "parsha-line:lang";

/** Runs before first paint, from the layout: puts back the saved language. */
export const LANG_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(KEY)})==="en"){var e=document.currentScript.parentElement;e.dataset.lang="en";e.dir="ltr";e.lang="en"}}catch(e){}`;

/** A bit of text in both languages; only the current one shows. */
export function T({ yi, en }: Text) {
  return (
    <>
      <span className="l-yi" lang="yi">
        {yi}
      </span>
      <span className="l-en" lang="en">
        {en}
      </span>
    </>
  );
}

function root(): HTMLElement | null {
  return document.querySelector(".parsha");
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** For the few places a <T> can't go: option text, aria labels. */
export function useLang(): Lang {
  return useSyncExternalStore(
    subscribe,
    () => (root()?.dataset.lang === "en" ? "en" : "yi"),
    () => "yi",
  );
}

export function LangToggle() {
  const lang = useLang();
  const flip = () => {
    const next: Lang = lang === "en" ? "yi" : "en";
    const el = root();
    if (el) {
      el.dataset.lang = next;
      el.dir = next === "en" ? "ltr" : "rtl";
      el.lang = next;
    }
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private window: the switch still works for this visit.
    }
    window.dispatchEvent(new Event(EVENT));
  };
  return (
    <button
      type="button"
      onClick={flip}
      className="flex min-h-11 items-center rounded-full border-2 border-p-line/25 px-2.5 text-sm font-semibold hover:bg-p-soft"
    >
      <T yi="English" en="אידיש" />
    </button>
  );
}
