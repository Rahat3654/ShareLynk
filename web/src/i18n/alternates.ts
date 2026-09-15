import { site } from "@/data/site";
import { defaultLocale, locales, type Locale } from "./config";

/**
 * Canonical + hreflang for one page, in one locale.
 *
 * This has to be set per page. Next merges metadata down the tree, and
 * `alternates` declared in [locale]/layout.tsx applies to every page beneath
 * it — so when a child page's generateMetadata returned only a title, it
 * inherited the layout's canonical and every subpage claimed the locale root
 * as its canonical URL:
 *
 *   /en/downloads -> <link rel="canonical" href="https://sharelynk.app/en">
 *
 * Google reads that as "this page is a duplicate of the homepage" and indexes
 * the homepage instead, which silently kept 8 of the 10 sitemap URLs out of
 * the index. Every page that defines generateMetadata must therefore pass its
 * own path here.
 *
 * `path` is the route below the locale segment ("" for the homepage,
 * "/downloads", "/team", …). The sitemap builds its entries from this same
 * helper so the two can never disagree.
 */
export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: `${site.url}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      // Bengali is where `/` sends anyone whose Accept-Language matches
      // neither locale, so it is also the x-default target.
      "x-default": `${site.url}/${defaultLocale}${path}`,
    },
  };
}
