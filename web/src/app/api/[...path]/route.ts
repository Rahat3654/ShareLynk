import { NextRequest, NextResponse } from "next/server";
import { backendBase } from "@/lib/api";

// Runtime proxy for /api/* -> FastAPI backend.
//
// This replaces the `rewrites()` entry that used to live in next.config.mjs.
// `rewrites()` is evaluated at BUILD time, so the destination host was baked
// into the bundle: with API_PROXY_TARGET unset during the build it compiled to
// http://localhost:8000 permanently, and every browser call to /api/* returned
// 500 in production. Setting the variable at runtime could not fix it.
//
// A route handler reads the environment on every request, so changing the
// backend URL in the Cloudflare dashboard takes effect without a rebuild.
export const dynamic = "force-dynamic";

// Hop-by-hop and host-specific headers must not be forwarded.
const STRIP = new Set([
  "host",
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "proxy-authorization",
  "proxy-authenticate",
  "te",
  "trailer",
  "content-length",
]);

function forwardHeaders(src: Headers): Headers {
  const out = new Headers();
  src.forEach((value, key) => {
    if (!STRIP.has(key.toLowerCase())) out.set(key, value);
  });
  return out;
}

async function proxy(req: NextRequest, path: string[]) {
  let base: string;
  try {
    base = backendBase();
  } catch (err) {
    // Misconfiguration, not a backend outage — say so explicitly rather than
    // letting it surface as an opaque 500.
    console.error("[api-proxy] misconfigured:", err);
    return NextResponse.json(
      { detail: "API backend URL is not configured on this deployment." },
      { status: 503 }
    );
  }

  const search = new URL(req.url).search;
  const target = `${base}/api/${path.join("/")}${search}`;

  const init: RequestInit = {
    method: req.method,
    headers: forwardHeaders(req.headers),
    redirect: "manual",
    // Render's free tier sleeps; allow for a cold start but do not hang forever.
    signal: AbortSignal.timeout(30_000),
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  try {
    const res = await fetch(target, init);
    const headers = forwardHeaders(res.headers);
    // Release data changes whenever an admin publishes; never let a proxied
    // response get cached by the CDN or the browser.
    headers.set("Cache-Control", "no-store");
    return new NextResponse(res.body, { status: res.status, headers });
  } catch (err) {
    console.error(`[api-proxy] ${req.method} ${target} failed:`, err);
    return NextResponse.json(
      { detail: "Upstream ShareLynk API is unreachable." },
      { status: 502 }
    );
  }
}

type Ctx = { params: { path: string[] } };

export const GET = (req: NextRequest, { params }: Ctx) => proxy(req, params.path);
export const POST = (req: NextRequest, { params }: Ctx) => proxy(req, params.path);
export const PUT = (req: NextRequest, { params }: Ctx) => proxy(req, params.path);
export const PATCH = (req: NextRequest, { params }: Ctx) => proxy(req, params.path);
export const DELETE = (req: NextRequest, { params }: Ctx) => proxy(req, params.path);
