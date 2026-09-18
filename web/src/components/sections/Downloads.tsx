import { apiGet } from "@/lib/api";
import { platformApp, type PlatformDownload } from "@/lib/types";
import { androidReleaseFromCatalog, fallbackAndroidRelease } from "@/lib/androidRelease";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AgentAppDownload } from "./AgentAppDownload";
import { AndroidDownload } from "./AndroidDownload";
import { DownloadTable } from "./DownloadTable";
import type { Dictionary, Locale } from "@/i18n";

// How long the page waits for the admin catalog before showing the fallback
// Android release. Short on purpose: Render's free tier can take ~50 s to wake,
// and the download button must not sit behind that. The catalog is still the
// source of truth whenever it answers in time.
const CATALOG_TIMEOUT_MS = 4_000;

// Other platforms from the admin panel are hidden during the Android pilot.
// Set DOWNLOADS_SHOW_ALL_PLATFORMS=true in the Cloudflare dashboard to show
// every platform that has a live release in the admin panel — no code change or
// rebuild needed. Read per request for the same reason backendBase() is.
function showAllPlatforms(): boolean {
  return process.env.DOWNLOADS_SHOW_ALL_PLATFORMS === "true";
}

export async function Downloads({ locale, t }: { locale: Locale; t: Dictionary }) {
  let platforms: PlatformDownload[] | null = null;
  try {
    platforms = await apiGet<PlatformDownload[]>("/downloads", {
      signal: AbortSignal.timeout(CATALOG_TIMEOUT_MS),
    });
  } catch (err) {
    // Not an error the visitor needs to see: the fallback below is the real,
    // current APK. Logged so an outage is still visible in the Worker logs.
    console.error("[downloads] catalog unavailable, using android-release.json:", err);
  }

  const android = androidReleaseFromCatalog(platforms) ?? fallbackAndroidRelease();

  // The field-agent app is listed separately from the consumer app, always —
  // it is not part of the Android-only pilot gate below. Keyed on the `app`
  // the admin panel sets, never on the platform's name.
  const agentPlatforms = (platforms ?? []).filter(
    (p) => platformApp(p) === "agent" && !p.isComingSoon && p.latest?.downloadUrl?.startsWith("https://")
  );

  const others =
    showAllPlatforms() && platforms
      ? platforms.filter((p) => p.os !== "ANDROID" && platformApp(p) === "user")
      : [];

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
        <AndroidDownload release={android} locale={locale} t={t} />
        <AgentAppDownload platforms={agentPlatforms} locale={locale} t={t} />
        {others.length > 0 && <DownloadTable platforms={others} locale={locale} t={t} />}
      </div>
    </section>
  );
}
