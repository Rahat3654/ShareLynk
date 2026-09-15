// Readers for the analytics time series.
//
// GET /api/owners/analytics types `daily` and `monthly` as bare `List[dict]`,
// so no Pydantic model pins their keys. The backend currently emits
// (owner_router_repository.py:332):
//
//   daily   -> [{ "date":  "2026-09-15", "connections": 12 }, …]  last 7 days
//   monthly -> [{ "month": "2026-09",    "connections": 340 }, …] last 6 months
//
// Both series count CONNECTIONS, not money. There is no earnings-over-time
// endpoint anywhere in the backend — earnings exist only as the scalars on
// /api/owners/earnings. So the portal charts connections and states that in
// the chart label, rather than implying the curve is revenue.
//
// Keys are read defensively: a shape change should degrade to an empty chart,
// never throw in the middle of a server render.

export interface SeriesPoint {
  /** Raw bucket key from the backend: "2026-09-15" or "2026-09". */
  key: string;
  /** Short axis label derived from the key. */
  label: string;
  value: number;
}

function num(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function dayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" });
}

function monthLabel(key: string): string {
  const d = new Date(`${key}-01T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return key;
  return d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });
}

function read(
  rows: Record<string, unknown>[] | undefined,
  keyField: "date" | "month",
  toLabel: (key: string) => string,
): SeriesPoint[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) => {
    const raw = row?.[keyField];
    if (typeof raw !== "string") return [];
    return [{ key: raw, label: toLabel(raw), value: num(row?.connections) }];
  });
}

export function dailySeries(rows: Record<string, unknown>[] | undefined): SeriesPoint[] {
  return read(rows, "date", dayLabel);
}

export function monthlySeries(rows: Record<string, unknown>[] | undefined): SeriesPoint[] {
  return read(rows, "month", monthLabel);
}
