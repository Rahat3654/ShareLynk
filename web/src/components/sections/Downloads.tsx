import { apiGet } from "@/lib/api";
import type { PlatformDownload } from "@/lib/types";
import { fallbackDownloads } from "@/data/fallback-downloads";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DownloadTable } from "./DownloadTable";

// Server component: fetches the live download catalog. If the API is
// unavailable (e.g. before the DB is seeded), it gracefully falls back to a
// bundled catalog so the page always renders. When admins publish a new
// version in the dashboard, this section updates automatically — no code change.
export async function Downloads() {
  let platforms: PlatformDownload[];
  try {
    platforms = await apiGet<PlatformDownload[]>("/downloads");
    if (!platforms?.length) platforms = fallbackDownloads;
  } catch {
    platforms = fallbackDownloads;
  }

  return (
    <section id="downloads" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="Downloads"
          title={
            <>
              Get ShareLynk for <span className="text-gradient">every platform</span>
            </>
          }
          description="Pick your operating system and start sharing securely in minutes. Every build is signed, versioned, and served from our global release network."
        />
        <DownloadTable platforms={platforms} />
      </div>
    </section>
  );
}
