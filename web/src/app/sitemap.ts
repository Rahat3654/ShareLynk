import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales } from "@/i18n/config";

// Every page now exists once per locale, so each locale gets its own entries.
// Without this only one language is discoverable.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${site.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });
    entries.push({
      url: `${site.url}/${locale}/downloads`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    });
    entries.push({
      url: `${site.url}/${locale}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    entries.push({ url: `${site.url}/${locale}/privacy`, lastModified: now, priority: 0.3 });
    entries.push({ url: `${site.url}/${locale}/terms`, lastModified: now, priority: 0.3 });
  }

  return entries;
}
