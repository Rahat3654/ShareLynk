import { bn, type Dictionary } from "./dictionaries/bn";
import { en } from "./dictionaries/en";
import { defaultLocale, isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { bn, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Prefix an app-relative href with the active locale: "/downloads" -> "/en/downloads". */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

/**
 * Swap the locale segment of a pathname, preserving the rest of the path.
 * "/bn/downloads" + "en" -> "/en/downloads"
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return `/${segments.join("/")}`;
}

export type { Dictionary, Locale };
