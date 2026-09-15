// Server-side authenticated access to the ShareLynk owner API.
//
// Only ever imported from server components, server actions and route
// handlers. The access token is read from an httpOnly cookie and attached
// here, so it stays on the server and is never serialised into the page.
//
// Every owner endpoint derives the owner from the token's `sub` claim
// (backend app/dependencies/auth.py:96) and rejects a token whose role is not
// "owner". No call in this file passes an owner id, and none should: that is
// what makes it impossible for one owner to request another's data.

import { cookies } from "next/headers";
import { backendBase } from "@/lib/api";
import { OWNER_ACCESS_COOKIE } from "./session";

export class OwnerApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string,
  ) {
    super(message);
    this.name = "OwnerApiError";
  }
  /** Session is gone or not an owner token — the caller should send them to login. */
  get isAuth() {
    return this.status === 401 || this.status === 403;
  }
}

/**
 * Render's free tier sleeps after 15 minutes idle and a cold start can take
 * ~50s. The Flutter client allows 25s; the server has a little more headroom
 * because it is not holding a phone's UI hostage, but it must still terminate
 * rather than hang a page render forever.
 */
const TIMEOUT_MS = 30_000;

export function ownerAccessToken(): string | undefined {
  return cookies().get(OWNER_ACCESS_COOKIE)?.value;
}

/** Cheap check for "is there a session at all" — does not validate it. */
export function hasOwnerSession(): boolean {
  return Boolean(ownerAccessToken());
}

async function readDetail(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { detail?: unknown };
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) {
      return body.detail
        .map((d) => (typeof d === "object" && d && "msg" in d ? String((d as { msg: unknown }).msg) : String(d)))
        .join(", ");
    }
  } catch {
    /* fall through to the generic message */
  }
  return `Request failed (${res.status})`;
}

async function call<T>(path: string, init: RequestInit, token?: string): Promise<T> {
  const url = `${backendBase()}/api/owners${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers || {}),
      },
      // Owner figures change whenever a session closes or an admin acts. A
      // cached response would show an owner stale money, so never cache.
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new OwnerApiError("The ShareLynk server took too long to respond.", 504, path);
    }
    throw new OwnerApiError("Could not reach the ShareLynk server.", 502, path);
  }

  if (!res.ok) throw new OwnerApiError(await readDetail(res), res.status, path);
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/** Authenticated GET against /api/owners{path}. */
export function ownerGet<T>(path: string): Promise<T> {
  const token = ownerAccessToken();
  if (!token) throw new OwnerApiError("Not signed in.", 401, path);
  return call<T>(path, { method: "GET" }, token);
}

/** Authenticated POST/PATCH against /api/owners{path}. */
export function ownerSend<T>(
  method: "POST" | "PATCH",
  path: string,
  body?: unknown,
): Promise<T> {
  const token = ownerAccessToken();
  if (!token) throw new OwnerApiError("Not signed in.", 401, path);
  return call<T>(path, { method, body: body === undefined ? undefined : JSON.stringify(body) }, token);
}

/** Unauthenticated call to /api/owners/auth{path} — login, OTP, password reset. */
export function ownerAuthCall<T>(path: string, body: unknown): Promise<T> {
  return call<T>(`/auth${path}`, { method: "POST", body: JSON.stringify(body) });
}

/**
 * Resolve several owner endpoints at once, keeping per-card failures isolated:
 * a 502 on earnings should not blank the networks list beside it.
 */
export async function settle<T>(promise: Promise<T>): Promise<{ data: T } | { error: string }> {
  try {
    return { data: await promise };
  } catch (err) {
    if (err instanceof OwnerApiError) return { error: err.message };
    return { error: "Something went wrong loading this section." };
  }
}
