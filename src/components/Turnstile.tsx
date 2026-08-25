"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

// Cloudflare Turnstile bot-check widget - only rendered by QuoteForm when
// NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the form works fine without it
// (just less bot-resistant) until that env var is added. Get a site key
// from the Cloudflare dashboard -> Turnstile (same account already used
// for this domain's DNS).
export default function Turnstile({ siteKey, onVerify }: { siteKey: string; onVerify: (token: string) => void }) {
  const containerId = `turnstile-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    function render() {
      if (!window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(`#${containerId}`, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": () => onVerify(""),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      // The script may still be loading (see the <Script> below) - poll
      // briefly rather than relying on a load event that already fired.
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          render();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, siteKey]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <div id={containerId} />
    </>
  );
}
