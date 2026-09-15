// Owner session storage.
//
// Both tokens live in httpOnly cookies, so page JavaScript can never read them
// and an XSS bug on the marketing site cannot exfiltrate an owner session. The
// browser therefore never calls the backend directly for owner data: server
// components and route handlers read the cookie and call the backend
// server-side. That is also what lets middleware bounce an unauthenticated
// visitor before a single byte of owner HTML is generated.
//
// Lifetimes mirror the backend (app/core/config.py):
//   ACCESS_TOKEN_EXPIRE_MINUTES = 30
//   REFRESH_TOKEN_EXPIRE_DAYS   = 7

import type { NextResponse } from "next/server";
import type { TokenResponse } from "./types";

export const OWNER_ACCESS_COOKIE = "sl_owner_at";
export const OWNER_REFRESH_COOKIE = "sl_owner_rt";

const ACCESS_MAX_AGE = 30 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

/**
 * `secure` is disabled on plain-HTTP localhost only. In production the site is
 * HTTPS-only anyway (`.app` is HSTS-preloaded), so the cookie is always Secure
 * there. SameSite=Lax keeps the session on top-level navigations back to the
 * portal while refusing to ride along on cross-site POSTs.
 */
function base(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/** Write a fresh token pair onto a response. */
export function applySession(res: NextResponse, tokens: TokenResponse): NextResponse {
  res.cookies.set(OWNER_ACCESS_COOKIE, tokens.access_token, base(ACCESS_MAX_AGE));
  res.cookies.set(OWNER_REFRESH_COOKIE, tokens.refresh_token, base(REFRESH_MAX_AGE));
  return res;
}

/**
 * Remove both cookies. maxAge 0 rather than `delete` so the expiry is written
 * with the same path/secure attributes the cookies were set with — a `delete`
 * with mismatched attributes silently leaves the cookie in place.
 */
export function clearSession(res: NextResponse): NextResponse {
  res.cookies.set(OWNER_ACCESS_COOKIE, "", base(0));
  res.cookies.set(OWNER_REFRESH_COOKIE, "", base(0));
  return res;
}

/**
 * Seconds remaining on a JWT, or null when the token is unreadable.
 *
 * This only reads the `exp` claim to decide when to refresh — it is NOT a
 * signature check and grants nothing. The backend verifies every token on
 * every request; a forged cookie gets a 401 there regardless of what this
 * function returns.
 */
export function secondsUntilExpiry(token: string | undefined): number | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const claims = JSON.parse(atob(padded)) as { exp?: number };
    if (typeof claims.exp !== "number") return null;
    return claims.exp - Math.floor(Date.now() / 1000);
  } catch {
    return null;
  }
}

/** True when the access token is gone, unreadable, or within `skew` of expiry. */
export function needsRefresh(token: string | undefined, skew = 60): boolean {
  const remaining = secondsUntilExpiry(token);
  return remaining === null || remaining <= skew;
}
