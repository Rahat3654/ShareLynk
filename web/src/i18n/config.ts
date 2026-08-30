export const locales = ["bn", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Bengali is the default: the product is Bengali-first and the majority of the
 * copy was authored in Bengali. `/` redirects here, and this locale is the one
 * search engines are pointed at via x-default.
 */
export const defaultLocale: Locale = "bn";

export const localeNames: Record<Locale, string> = {
  bn: "বাংলা",
  en: "English",
};

/** BCP-47 tags for <html lang>, OpenGraph and Intl date formatting. */
export const localeTags: Record<Locale, string> = {
  bn: "bn-BD",
  en: "en-US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
