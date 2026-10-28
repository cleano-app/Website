import { NextResponse, type NextRequest } from "next/server";

// The links people type by hand - /inspection, and the gutter page's short
// link /gutters (or /gutter) - in any other capitalisation, such as
// "cleano.services/Inspection" typed into WhatsApp, or a phone keyboard
// capitalising the first letter, go to the real page instead of a 404.
// Page routes are case-sensitive; the matcher below lets in only these
// paths, in any capitalisation, so nothing else on the site runs through
// here.
const destinations: Record<string, string> = {
  "/inspection": "/inspection",
  "/gutters": "/gutter-cleaning",
  "/gutter": "/gutter-cleaning",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const destination = destinations[pathname.toLowerCase()];
  // The matcher also lets the correct spelling through - never redirect
  // that to itself.
  if (!destination || pathname === destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  // The offer ends, so its redirect isn't cached; the short link is for good.
  return NextResponse.redirect(url, destination === "/inspection" ? 307 : 308);
}

export const config = {
  matcher: [
    "/:p([Ii][Nn][Ss][Pp][Ee][Cc][Tt][Ii][Oo][Nn])",
    "/:p([Gg][Uu][Tt][Tt][Ee][Rr][Ss]?)",
  ],
};
