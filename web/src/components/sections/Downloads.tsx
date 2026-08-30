import { apiGet } from "@/lib/api";
import type { PlatformDownload } from "@/lib/types";
import { fallbackDownloads } from "@/data/fallback-downloads";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DownloadTable } from "./DownloadTable";
import { AlertTriangle } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";

// Server component: fetches the live download catalog on every request (the
// page is force-dynamic), so a release published in the admin panel shows up
// immediately — creates, edits and deletes alike.
//
// fallback-downloads.ts is a last resort so the page still renders during a
// backend outage. It used to be swallowed by a bare `catch`, which meant a
// completely unreachable backend looked identical to a healthy one and the site
// served stale hardcoded versions for days. It is now logged and flagged.
export async function Downloads({ locale, t }: { locale: Locale; t: Dictionary }) {
  let platforms: PlatformDownload[];
  let staleReason: string | null = null;

  try {
    platforms = await apiGet<PlatformDownload[]>("/downloads");
    if (!platforms?.length) {
      staleReason = "The backend returned an empty catalog.";
      platforms = fallbackDownloads;
    }
  } catch (err) {
    staleReason = err instanceof Error ? err.message : String(err);
    console.error("[downloads] live catalog unavailable, serving fallback:", err);
    platforms = fallbackDownloads;
  }

  return (
    <section id="downloads" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t.downloads.eyebrow}
          title={
            <>
              {t.downloads.titleA} <span className="text-gradient">{t.downloads.titleB}</span>
            </>
          }
          description={t.downloads.description}
        />

        {staleReason && (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-6xl items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-semibold">{t.downloads.staleTitle}</p>
              <p className="mt-1 text-amber-200/70">{t.downloads.staleBody}</p>
            </div>
          </div>
        )}

        <DownloadTable platforms={platforms} locale={locale} t={t} />
      </div>
    </section>
  );
}
