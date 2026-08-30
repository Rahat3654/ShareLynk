import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { defaultLocale, localeTags, type Locale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Human-readable file size from bytes (e.g. 50331648 -> "48 MB").
export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value >= 100 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

// Release dates follow the active locale — a Bengali page previously rendered
// "Jun 18, 2026" in English in the middle of Bengali copy.
export function formatDate(input: string | Date, locale: Locale = defaultLocale): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleDateString(localeTags[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
