// Shared API types mirroring the backend Prisma models.

export type OsFamily = "ANDROID" | "IOS" | "WINDOWS" | "MACOS" | "LINUX" | "WEB";
export type ReleaseStatus = "LATEST" | "STABLE" | "BETA" | "DEPRECATED" | "DISABLED";
export type Role = "ADMIN" | "EDITOR" | "VIEWER";

export interface Release {
  id: string;
  platformId: string;
  version: string;
  channel: string;
  status: ReleaseStatus;
  architecture: string;
  fileSizeBytes: number;
  downloadUrl: string;
  checksumSha256?: string | null;
  releaseNotes?: string | null;
  releaseDate: string;
  isEnabled: boolean;
  downloadCount: number;
}

/** "user" = the consumer ShareLynk app; "agent" = the field-agent app. */
export type ReleaseApp = "user" | "agent";

export interface PlatformDownload {
  id: string;
  slug: string;
  name: string;
  os: OsFamily;
  arch: string;
  icon: string;
  extension: string;
  isComingSoon: boolean;
  sortOrder: number;
  /**
   * Which ShareLynk app this platform ships, set in the admin panel. Absent
   * from backends that predate the field, which is why callers go through
   * platformApp() instead of reading it directly.
   */
  app?: ReleaseApp;
  latest: Release | null;
  releases: Release[];
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  level: "info" | "success" | "warning";
  isPinned: boolean;
  publishedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { message: string; details?: unknown };
}

/** A platform's app, treating a missing value as the consumer app. */
export function platformApp(p: Pick<PlatformDownload, "app">): ReleaseApp {
  return p.app === "agent" ? "agent" : "user";
}
