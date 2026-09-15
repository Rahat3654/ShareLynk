import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Every page exists once per locale.
 *
 * Each entry also carries its translations as `alternates.languages`, which
 * Next renders as <xhtml:link rel="alternate" hreflang="…"> inside the entry.
 * The page <head> already declares the same pairs; repeating them here is what
 * lets Google match /bn and /en as one page in two languages from the sitemap
 * alone, instead of treating them as two pages competing with each other.
 *
 * `x-default` points at the Bengali page because the product is Bengali-first
 * and that is where `/` sends anyone whose Accept-Language matches neither.
 *
 * The owner portal is deliberately absent: /owner is authenticated and
 * noindex, and listing it would invite Google to crawl a login wall.
 */
const PAGES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/downloads", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/team", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
          "x-default": `${site.url}/${defaultLocale}${path}`,
        },
      },
    })),
  );
}
