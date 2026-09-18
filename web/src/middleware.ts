import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";
import {
  OWNER_ACCESS_COOKIE,
  OWNER_REFRESH_COOKIE,
  applySession,
  clearSession,
  needsRefresh,
} from "@/lib/owner/session";
import type { TokenResponse } from "@/lib/owner/types";

const LOCALE_COOKIE = "sharelynk-locale";

/** Reachable without a session; everything else under /owner is gated. */
const OWNER_PUBLIC = ["/owner/login", "/owner/register", "/owner/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The owner portal is an authenticated app, not localised marketing content:
  // it is deliberately outside /[locale] (the Flutter owner portal is English
  // too), so it must be handled before the locale redirect below would rewrite
  // /owner/login to /bn/owner/login.
  if (pathname === "/owner" || pathname.startsWith("/owner/")) {
    return ownerMiddleware(request);
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

/**
 * Gate and session-refresh for /owner.
 *
 * Refreshing here rather than inside the pages is what keeps the portal from
 * polling: the access token lives 30 minutes, so this exchanges a refresh
 * token at most once per half hour of actual navigation, and never on a timer.
 */
async function ownerMiddleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const access = request.cookies.get(OWNER_ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(OWNER_REFRESH_COOKIE)?.value;
  const isPublic = OWNER_PUBLIC.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  let session: TokenResponse | null = null;
  let signedIn = Boolean(access) && !needsRefresh(access);

  // Access token missing or about to expire, but the 7-day refresh token is
  // still here — trade it in rather than bouncing a working session to login.
  if (!signedIn && refresh) {
    session = await exchangeRefresh(refresh);
    signedIn = session !== null;
  }

  if (pathname === "/owner") {
    return finish(request, redirect(request, signedIn ? "/owner/dashboard" : "/owner/login"), session);
  }

  if (isPublic) {
    // Already signed in — no reason to show the login form again.
    if (signedIn) return finish(request, redirect(request, "/owner/dashboard"), session);
    return finish(request, NextResponse.next(), session);
  }

  if (!signedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/owner/login";
    url.search = "";
    // Send them back where they were aiming once they authenticate. Only the
    // path is carried, and it is validated on the way out (see login page), so
    // this cannot be used as an open redirect.
    if (pathname !== "/owner/dashboard") url.searchParams.set("next", pathname);
    const res = NextResponse.redirect(url);
    // The refresh token was rejected or gone; do not leave a dead cookie that
    // makes every later request attempt another doomed exchange.
    if (refresh) clearSession(res);
    return noStore(res);
  }

  return finish(request, NextResponse.next(), session);
}

/** Apply a newly minted session (if we refreshed) and mark the response private. */
function finish(
  _request: NextRequest,
  res: NextResponse,
  session: TokenResponse | null,
): NextResponse {
  if (session) applySession(res, session);
  return noStore(res);
}

/**
 * Owner pages carry another person's money. Beyond normal caching, this is
 * what stops the browser's back button from re-painting a dashboard after
 * logout from its bfcache copy.
 */
function noStore(res: NextResponse): NextResponse {
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return res;
}

function redirect(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

/**
 * POST /api/owners/auth/refresh-token.
 *
 * Deliberately tolerant: any failure (expired token, backend cold-start
 * timeout, network blip) resolves to null and the caller sends the owner to
 * login rather than rendering a half-broken dashboard.
 */
async function exchangeRefresh(refreshToken: string): Promise<TokenResponse | null> {
  const origin = process.env.API_INTERNAL_URL || process.env.API_PROXY_TARGET;
  if (!origin) return null;
  try {
    const res = await fetch(`${origin.replace(/\/+$/, "")}/api/owners/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<TokenResponse>;
    if (!body?.access_token || !body?.refresh_token) return null;
    return body as TokenResponse;
  } catch {
    return null;
  }
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
