import staticRelease from "@/data/android-release.json";
import type { PlatformDownload } from "@/lib/types";

// What the Android download card shows, whichever source it came from.
//
// The admin panel's catalog is the source of truth: a release added there
// appears on the site on the next page load. `android-release.json` is only
// the fallback for when the Render backend is asleep or down, so the download
// button never waits on it. Keep that file pointing at the current APK — it is
// generated from the APK by ShareLynk_wifi/scripts/android_release_manifest.py.
export interface AndroidReleaseView {
  version: string;
  /** Only known when the file is the one described by android-release.json. */
  versionCode: number | null;
  sizeBytes: number;
  url: string;
  sha256: string | null;
  releasedAt: string;
  /** Catalog release id, for the admin download counter. Null for the fallback. */
  releaseId: string | null;
  source: "catalog" | "fallback";
}

export function fallbackAndroidRelease(): AndroidReleaseView {
  return {
    version: staticRelease.versionName,
    versionCode: staticRelease.versionCode,
    sizeBytes: staticRelease.sizeBytes,
    url: staticRelease.url,
    sha256: staticRelease.sha256,
    releasedAt: staticRelease.releasedAt,
    releaseId: null,
    source: "fallback",
  };
}

/** The Android release the admin panel marks live, or null if there is none. */
export function androidReleaseFromCatalog(
  platforms: PlatformDownload[] | null
): AndroidReleaseView | null {
  const platform = platforms?.find((p) => p.os === "ANDROID" && !p.isComingSoon && p.latest);
  const rel = platform?.latest;
  if (!rel || !rel.downloadUrl?.startsWith("https://")) return null;

  // When the admin release IS the file the manifest describes, the manifest's
  // values were read from the APK itself, so they win over hand-typed ones.
  // Otherwise the page would show one version when Render answers and another
  // when it falls back — for the same download.
  const sameFile = rel.downloadUrl === staticRelease.url;
  return {
    version: sameFile ? staticRelease.versionName : rel.version,
    // The catalog has no version-code field.
    versionCode: sameFile ? staticRelease.versionCode : null,
    sizeBytes: sameFile ? staticRelease.sizeBytes : rel.fileSizeBytes,
    url: rel.downloadUrl,
    sha256: sameFile ? staticRelease.sha256 : rel.checksumSha256 || null,
    releasedAt: rel.releaseDate,
    releaseId: rel.id,
    source: "catalog",
  };
}
