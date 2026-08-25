import type { NextConfig } from "next";

// Content-Security-Policy: everything defaults to same-origin.
//
// script-src includes 'unsafe-inline': Next.js injects its own inline
// bootstrap/hydration scripts on every page, and a nonce-based CSP (tried
// first, via middleware) did not get applied to those framework-managed
// script chunks on this Next.js/Turbopack version - shipping that blind
// would have silently broken every page's JavaScript. 'unsafe-inline' is an
// acceptable trade-off specifically because this app has no XSS injection
// point to exploit it through: no user input is ever rendered as raw HTML
// anywhere in the codebase (the one dangerouslySetInnerHTML, in layout.tsx,
// is static JSON-LD built only from siteConfig constants).
//
// Other allowances:
//  - 'unsafe-inline' on style-src: Next.js/Tailwind inject some inline
//    styles; again no user input in any of them.
//  - *.supabase.co on connect-src: direct-from-browser photo upload to
//    Supabase Storage (anon key, insert-only - see lib/supabase/client.ts).
//  - challenges.cloudflare.com: the optional Turnstile bot-check widget
//    (only loads at all if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography lives locally under /public/images for now.
    // Add real remote hosts here (e.g. Supabase Storage) once photos are uploaded there.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
