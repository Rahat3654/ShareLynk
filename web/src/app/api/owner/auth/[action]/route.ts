// Owner authentication gateway.
//
// The browser never speaks to the ShareLynk backend for auth. It posts here;
// this handler calls the backend server-side and puts the resulting tokens in
// httpOnly cookies, so no access or refresh token is ever visible to page
// JavaScript.
//
// `action` is matched against an explicit allowlist. Without that, the dynamic
// segment would proxy arbitrary paths under /api/owners/auth/ — the Firebase
// exchange and legacy-migration endpoints included, which the website has no
// business calling.

import { NextRequest, NextResponse } from "next/server";
import { backendBase } from "@/lib/api";
import { applySession, clearSession, OWNER_REFRESH_COOKIE } from "@/lib/owner/session";
import type { TokenResponse } from "@/lib/owner/types";

export const dynamic = "force-dynamic";

/** Website action -> backend path under /api/owners/auth. */
const ACTIONS = {
  // Creates an UNVERIFIED account and emails a code; no session is issued
  // until verify-login-otp, which is also where the backend adopts any Wi-Fi
  // an agent registered under this email.
  register: "/register",
  login: "/login",
  "verify-login-otp": "/verify-login-otp",
  "resend-login-otp": "/resend-login-otp",
  "forgot-password": "/forgot-password",
  "verify-otp": "/verify-otp",
  "reset-password": "/reset-password",
  logout: "/logout",
} as const;

type Action = keyof typeof ACTIONS;

/** Actions whose successful response carries a token pair to store. */
const ISSUES_TOKENS = new Set<Action>(["login", "verify-login-otp"]);

const TIMEOUT_MS = 30_000;

function isAction(value: string): value is Action {
  return Object.prototype.hasOwnProperty.call(ACTIONS, value);
}

async function detailOf(res: Response): Promise<string> {
  try {
    const body = (await res.clone().json()) as { detail?: unknown };
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) {
      // FastAPI validation errors: [{ msg: "Value error, Password must …" }].
      // Pydantic prefixes custom validator messages with "Value error, ", which
      // means nothing to someone filling in a form.
      return body.detail
        .map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : String(d)))
        .map((m) => m.replace(/^Value error,\s*/i, ""))
        .join(". ");
    }
  } catch {
    /* fall through */
  }
  return "";
}

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {
  if (!isAction(params.action)) {
    return NextResponse.json({ error: "Unknown action." }, { status: 404 });
  }
  const action: Action = params.action;

  let payload: Record<string, unknown> = {};
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    if (action !== "logout") {
      return NextResponse.json({ error: "Malformed request." }, { status: 400 });
    }
  }

  // Logout revokes the refresh token server-side. The token comes from the
  // cookie, never from the request body, so one tab cannot revoke a session
  // it does not hold.
  if (action === "logout") {
    const refresh = req.cookies.get(OWNER_REFRESH_COOKIE)?.value;
    if (refresh) {
      try {
        await fetch(`${backendBase()}/api/owners/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refresh }),
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });
      } catch {
        // A failed revoke must not trap someone in a session they asked to
        // leave: the cookies are cleared either way, and the token expires.
      }
    }
    return clearSession(NextResponse.json({ ok: true }));
  }

  let res: Response;
  try {
    res = await fetch(`${backendBase()}${"/api/owners/auth"}${ACTIONS[action]}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The ShareLynk server took too long to respond. Please try again."
          : "Could not reach the ShareLynk server. Check your connection and try again.",
      },
      { status: 504 },
    );
  }

  if (!res.ok) {
    const detail = await detailOf(res);

    // An unverified account cannot log in with a password alone: the backend
    // emails a code and answers 400 "OTP_REQUIRED: …". That is a step in the
    // flow, not a failure, so it is reported as such rather than as an error.
    if (action === "login" && detail.startsWith("OTP_REQUIRED")) {
      return NextResponse.json({ otpRequired: true }, { status: 200 });
    }
    return NextResponse.json(
      { error: detail || "Request failed. Please try again." },
      { status: res.status },
    );
  }

  if (!ISSUES_TOKENS.has(action)) {
    return NextResponse.json({ ok: true });
  }

  const tokens = (await res.json()) as Partial<TokenResponse>;
  if (!tokens?.access_token || !tokens?.refresh_token) {
    return NextResponse.json({ error: "The server returned an unusable session." }, { status: 502 });
  }
  return applySession(NextResponse.json({ ok: true }), tokens as TokenResponse);
}
