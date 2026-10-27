import { NextResponse, type NextRequest } from "next/server";

// /inspection in any other capitalisation - "cleano.services/Inspection"
// typed into WhatsApp, or a phone keyboard capitalising the first letter -
// goes to the real page instead of a 404. Page routes are case-sensitive;
// the matcher below lets in only this one path, in any capitalisation, so
// nothing else on the site runs through here.
export function proxy(request: NextRequest) {
  // The matcher also lets the correct spelling through - never redirect
  // that to itself.
  if (request.nextUrl.pathname === "/inspection") return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = "/inspection";
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    "/:p([Ii][Nn][Ss][Pp][Ee][Cc][Tt][Ii][Oo][Nn])",
  ],
};
