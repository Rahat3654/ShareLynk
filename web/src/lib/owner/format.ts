// Presentation helpers for owner figures.
//
// Money is Bangladeshi taka throughout the ShareLynk backend (`amount_bdt`,
// `MIN_WITHDRAWAL_BDT`), so the symbol is not configurable.

/** ৳12,450 — no decimals, which is how the Flutter owner portal renders it. */
export function bdt(amount: number | null | undefined): string {
  const n = typeof amount === "number" && Number.isFinite(amount) ? amount : 0;
  return `৳${Math.round(n).toLocaleString("en-US")}`;
}

/** ৳12,450.75 — for a single balance where the paisa matters. */
export function bdtExact(amount: number | null | undefined): string {
  const n = typeof amount === "number" && Number.isFinite(amount) ? amount : 0;
  return `৳${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function count(n: number | null | undefined): string {
  return typeof n === "number" && Number.isFinite(n) ? n.toLocaleString("en-US") : "0";
}

/** 1.5 -> "1h 30m"; under an hour drops to minutes; 1234.5 -> "1,234h 30m". */
export function hours(value: number | null | undefined): string {
  const n = typeof value === "number" && Number.isFinite(value) ? value : 0;
  if (n <= 0) return "0h";
  let whole = Math.floor(n);
  let mins = Math.round((n - whole) * 60);
  if (mins === 60) {
    whole += 1;
    mins = 0;
  }
  if (whole === 0) return `${mins}m`;
  const h = `${whole.toLocaleString("en-US")}h`;
  return mins > 0 ? `${h} ${mins}m` : h;
}

/**
 * Usage hours where the backend may not report them yet: "—" when the field is
 * missing, so an absent number is never shown as "0h" of use.
 */
export function usageHours(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value) ? hours(value) : "—";
}

/** Backend hour-of-day integer (0-23) as a readable range. */
export function peakHour(h: number | null | undefined): string {
  if (typeof h !== "number" || !Number.isInteger(h) || h < 0 || h > 23) return "—";
  const label = (x: number) => {
    const suffix = x < 12 ? "am" : "pm";
    const hour12 = x % 12 === 0 ? 12 : x % 12;
    return `${hour12}${suffix}`;
  };
  return `${label(h)}–${label((h + 1) % 24)}`;
}

export function dateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function dateOnly(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * Backend status strings are snake_case enums (`pending_review`, `approved`).
 * Render them as words without inventing statuses that do not exist.
 */
export function humanise(value: string | null | undefined): string {
  if (!value) return "—";
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
