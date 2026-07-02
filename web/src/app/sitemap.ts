import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "#downloads", "#features", "#about", "#roadmap", "#faq", "#contact"];
  return [
    ...routes.map((r) => ({
      url: `${site.url}/${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.3 },
  ];
}
