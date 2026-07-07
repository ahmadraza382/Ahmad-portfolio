import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

// Lightweight edge gate: if there's no session cookie at all, bounce to login.
// Full cryptographic verification happens in the admin server layout
// (Node runtime), so a forged/expired cookie still can't access anything.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (!isLogin && !hasCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
