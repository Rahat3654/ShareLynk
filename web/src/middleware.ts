import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const LOCALE_COOKIE = "sharelynk-locale";

/**
 * Every page lives under /[locale]. This redirects unprefixed paths to a locale,
 * preferring a previously chosen one (cookie), then Accept-Language, then bn.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function preferredLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  // Naive Accept-Language parse: good enough to pick between two locales.
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase().split("-")[0])
    .find((tag) => tag && (locales as readonly string[]).includes(tag));

  return preferred ?? defaultLocale;
}

export const config = {
  // Skip the API proxy, Next internals, and anything with a file extension —
  // notably the Google Search Console verification file at the site root, which
  // must stay reachable at its exact unprefixed path.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
