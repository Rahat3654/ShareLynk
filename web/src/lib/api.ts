// API client for the ShareLynk FastAPI backend.
//
// The backend returns plain JSON (arrays/objects), and errors as { detail }.
// In the browser we call same-origin "/api/*" (proxied to the backend by
// next.config rewrites). On the server we call the backend directly for
// SSR/ISR of the public download catalog.

const SERVER_BASE = process.env.API_INTERNAL_URL || "http://localhost:8000";

function baseUrl() {
  if (typeof window === "undefined") return `${SERVER_BASE}/api`;
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
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    // Revalidate the public catalog periodically for freshness.
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(await parseError(res));
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
