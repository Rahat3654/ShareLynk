// API client for the ShareLynk FastAPI backend.
//
// The backend returns plain JSON (arrays/objects), and errors as { detail }.
// In the browser we call same-origin "/api/*", proxied at runtime by the route
// handler in src/app/api/[...path]/route.ts. On the server we call the backend
// directly.

/**
 * Origin of the FastAPI backend, e.g. https://sharelynk-api.onrender.com
 * (no trailing slash and no /api suffix — callers add the /api prefix).
 *
 * Read on every call rather than once at module scope. Module initialisation
 * runs when a Worker isolate boots, which is not a reliable moment to read
 * process.env under the OpenNext adapter, and a per-call read means changing
 * the value in the Cloudflare dashboard applies without a rebuild.
 *
 * There is deliberately no localhost default: silently falling back to
 * http://localhost:8000 in production is what made a misconfigured deployment
 * look like a healthy one serving stale data.
 */
export function backendBase(): string {
  const raw = process.env.API_INTERNAL_URL || process.env.API_PROXY_TARGET;
  if (!raw) {
    throw new Error(
      "API_INTERNAL_URL is not set — the site cannot reach the ShareLynk backend."
    );
  }
  return raw.replace(/\/+$/, "");
}

function baseUrl() {
  if (typeof window === "undefined") return `${backendBase()}/api`;
  return "/api";
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    // FastAPI error shape is { detail: string | [{msg}] }
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) return body.detail.map((d: any) => d.msg).join(", ");
    return `Request failed: ${res.status}`;
  } catch {
    return `Request failed: ${res.status}`;
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    // The catalog changes whenever an admin publishes a release, and no
    // incremental cache is configured on Workers, so a `revalidate` hint would
    // be a silent no-op. Always fetch fresh.
    cache: "no-store",
    // Render's free tier sleeps after 15 minutes idle and a cold start can take
    // ~50s. Allow for that, but never hang a page render indefinitely.
    signal: init?.signal ?? AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`GET ${url} -> ${await parseError(res)}`);
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as T;
}
