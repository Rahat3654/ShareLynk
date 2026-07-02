import type { PlatformDownload, Release, ReleaseStatus } from "@/lib/types";

// Fallback download catalog used when the backend API is unavailable
// (e.g. static preview, first paint before the DB is seeded). The live site
// prefers data from GET /api/downloads; this keeps the UI fully rendered
// regardless. Mirrors prisma/seed.ts.
const MB = 1024 * 1024;
const V = "2.3.1";
const date = "2026-06-18T10:00:00Z";
const url = (slug: string, ext: string) =>
  `https://downloads.sharelynk.com/${slug}/sharelynk-${V}.${ext}`;

function release(
  slug: string,
  arch: string,
  sizeMb: number,
  status: ReleaseStatus,
  ext: string
): Release {
  return {
    id: `fallback-${slug}`,
    platformId: slug,
    version: V,
    channel: "stable",
    status,
    architecture: arch,
    fileSizeBytes: sizeMb * MB,
    downloadUrl: url(slug, ext),
    releaseNotes: null,
    releaseDate: date,
    isEnabled: true,
    downloadCount: 0,
  };
}

export const fallbackDownloads: PlatformDownload[] = [
  { id: "android", slug: "android", name: "Android", os: "ANDROID", arch: "arm64-v8a", icon: "android", extension: "apk", isComingSoon: false, sortOrder: 1, latest: release("android", "APK · Universal", 48, "LATEST", "apk"), releases: [] },
  { id: "windows-x64", slug: "windows-x64", name: "Windows", os: "WINDOWS", arch: "x64", icon: "windows", extension: "exe", isComingSoon: false, sortOrder: 2, latest: release("windows-x64", "x64", 90, "LATEST", "exe"), releases: [] },
  { id: "windows-arm", slug: "windows-arm", name: "Windows ARM", os: "WINDOWS", arch: "arm64", icon: "windows", extension: "exe", isComingSoon: false, sortOrder: 3, latest: release("windows-arm", "ARM64", 86, "STABLE", "exe"), releases: [] },
  { id: "macos-intel", slug: "macos-intel", name: "macOS", os: "MACOS", arch: "x64", icon: "apple", extension: "dmg", isComingSoon: false, sortOrder: 4, latest: release("macos-intel", "Intel", 78, "STABLE", "dmg"), releases: [] },
  { id: "macos-apple-silicon", slug: "macos-apple-silicon", name: "macOS", os: "MACOS", arch: "arm64", icon: "apple", extension: "dmg", isComingSoon: false, sortOrder: 5, latest: release("macos-apple-silicon", "Apple Silicon", 74, "LATEST", "dmg"), releases: [] },
  { id: "linux-appimage", slug: "linux-appimage", name: "Linux", os: "LINUX", arch: "x86_64", icon: "linux", extension: "AppImage", isComingSoon: false, sortOrder: 6, latest: release("linux-appimage", "AppImage", 96, "LATEST", "AppImage"), releases: [] },
  { id: "linux-deb", slug: "linux-deb", name: "Linux", os: "LINUX", arch: "amd64", icon: "linux", extension: "deb", isComingSoon: false, sortOrder: 7, latest: release("linux-deb", "Debian / Ubuntu", 82, "STABLE", "deb"), releases: [] },
  { id: "linux-rpm", slug: "linux-rpm", name: "Linux", os: "LINUX", arch: "x86_64", icon: "linux", extension: "rpm", isComingSoon: false, sortOrder: 8, latest: release("linux-rpm", "Fedora / RHEL", 84, "STABLE", "rpm"), releases: [] },
  { id: "ios", slug: "ios", name: "iOS", os: "IOS", arch: "arm64", icon: "apple", extension: "ipa", isComingSoon: true, sortOrder: 9, latest: null, releases: [] },
  { id: "web", slug: "web", name: "Web App", os: "WEB", arch: "universal", icon: "globe", extension: "web", isComingSoon: true, sortOrder: 10, latest: null, releases: [] },
];
