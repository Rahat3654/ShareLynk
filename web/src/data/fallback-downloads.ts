import type { PlatformDownload, Release, ReleaseStatus } from "@/lib/types";

// Fallback download catalog used when the backend API is unavailable
// (e.g. static preview, first paint before the DB is seeded). The live site
// prefers data from GET /api/downloads; this keeps the UI fully rendered
// regardless. Mirrors prisma/seed.ts.
const MB = 1024 * 1024;
const V = "2.3.1";
const date = "2026-06-18T10:00:00Z";
const url = (slug: string, ext: string) =>
  `https://downloads.sharelynk.app/${slug}/sharelynk-${V}.${ext}`;

const dummyHashes: Record<string, string> = {
  android: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "windows-x64": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "windows-arm": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
  "macos-intel": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  "macos-apple-silicon": "86f7e437faa5a7fce15d1ddcb9eaeaea377667b80045d111082215c00e70498b",
  "linux-appimage": "d41d8cd98f00b204e9800998ecf8427e997237976e33c066f7f6f57876a44549",
  "linux-deb": "b10a8db164e0754105b7a99be72e3fe591a23a31e846747209355152a550d536",
  "linux-rpm": "301548a8cf38b1f8ef440c9460e536e52003c004245585501869e5d9560f2d4e",
};

const releaseNotesText = `### ShareLynk v2.3.1 Highlights:
- **Enhanced E2E Session Encryption**: Upgraded to 256-bit AES-GCM with hardware token rotation.
- **Bandwidth Quota Management**: Per-device bandwidth caps and automatic session expiry.
- **Background Tray Service**: Low-overhead tray service for seamless background connectivity.
- **Performance & Bug Fixes**: 40% faster initial peer handshake over Wi-Fi Direct.`;

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
    checksumSha256: dummyHashes[slug] || "86f7e437faa5a7fce15d1ddcb9eaeaea377667b80045d111082215c00e70498b",
    releaseNotes: releaseNotesText,
    releaseDate: date,
    isEnabled: true,
    downloadCount: 1420,
  };
}

export const fallbackDownloads: PlatformDownload[] = [
  { id: "windows-x64", slug: "windows-x64", name: "Windows", os: "WINDOWS", arch: "x64", icon: "windows", extension: "exe", isComingSoon: false, sortOrder: 1, latest: release("windows-x64", "x64 (64-bit)", 90, "LATEST", "exe"), releases: [] },
  { id: "android", slug: "android", name: "Android", os: "ANDROID", arch: "arm64-v8a", icon: "android", extension: "apk", isComingSoon: false, sortOrder: 2, latest: release("android", "APK · Universal", 48, "LATEST", "apk"), releases: [] },
  { id: "windows-arm", slug: "windows-arm", name: "Windows ARM", os: "WINDOWS", arch: "arm64", icon: "windows", extension: "exe", isComingSoon: false, sortOrder: 3, latest: release("windows-arm", "ARM64", 86, "STABLE", "exe"), releases: [] },
  { id: "macos-apple-silicon", slug: "macos-apple-silicon", name: "macOS", os: "MACOS", arch: "arm64", icon: "apple", extension: "dmg", isComingSoon: false, sortOrder: 4, latest: release("macos-apple-silicon", "Apple Silicon (M1/M2/M3)", 74, "LATEST", "dmg"), releases: [] },
  { id: "macos-intel", slug: "macos-intel", name: "macOS", os: "MACOS", arch: "x64", icon: "apple", extension: "dmg", isComingSoon: false, sortOrder: 5, latest: release("macos-intel", "Intel x64", 78, "STABLE", "dmg"), releases: [] },
  { id: "linux-appimage", slug: "linux-appimage", name: "Linux", os: "LINUX", arch: "x86_64", icon: "linux", extension: "AppImage", isComingSoon: false, sortOrder: 6, latest: release("linux-appimage", "AppImage (Universal)", 96, "LATEST", "AppImage"), releases: [] },
  { id: "linux-deb", slug: "linux-deb", name: "Linux", os: "LINUX", arch: "amd64", icon: "linux", extension: "deb", isComingSoon: false, sortOrder: 7, latest: release("linux-deb", "Debian / Ubuntu", 82, "STABLE", "deb"), releases: [] },
  { id: "linux-rpm", slug: "linux-rpm", name: "Linux", os: "LINUX", arch: "x86_64", icon: "linux", extension: "rpm", isComingSoon: false, sortOrder: 8, latest: release("linux-rpm", "Fedora / RHEL", 84, "STABLE", "rpm"), releases: [] },
  { id: "ios", slug: "ios", name: "iOS", os: "IOS", arch: "arm64", icon: "apple", extension: "ipa", isComingSoon: true, sortOrder: 9, latest: null, releases: [] },
  { id: "web", slug: "web", name: "Web App", os: "WEB", arch: "universal", icon: "globe", extension: "web", isComingSoon: true, sortOrder: 10, latest: null, releases: [] },
];
