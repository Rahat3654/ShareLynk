// Minimal Android check for the download page.
//
// This only shapes the MESSAGE next to the download button. It never decides
// whether someone may download: the APK's own minSdk is what enforces
// compatibility, because the Android installer refuses the file on anything
// older. A browser that hides its version therefore costs the user nothing —
// they still get the download, with the requirement spelled out.

/** The oldest Android major version ShareLynk supports (API 29). */
export const MIN_ANDROID_MAJOR = 10;

export type AndroidCheck =
  | { status: "pending" }
  | { status: "not-android" }
  /** `major` is null when the browser does not reveal the version. */
  | { status: "android"; major: number | null };

type UADataLike = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ platformVersion?: string }>;
};

// Chrome for Android freezes its user-agent string to this on every phone, so
// it says nothing about the real version. Reading it as "Android 10" would
// wrongly present an Android 8 phone as supported.
const FROZEN_CHROME_UA = /Android 10; K[;)]/;

export async function detectAndroid(): Promise<Exclude<AndroidCheck, { status: "pending" }>> {
  if (typeof navigator === "undefined") return { status: "not-android" };
  const ua = navigator.userAgent || "";
  const uaData = (navigator as Navigator & { userAgentData?: UADataLike }).userAgentData;

  const isAndroid = uaData?.platform === "Android" || /Android/i.test(ua);
  if (!isAndroid) return { status: "not-android" };

  // Chromium browsers expose the real version through client hints.
  if (uaData?.getHighEntropyValues) {
    try {
      const { platformVersion } = await uaData.getHighEntropyValues(["platformVersion"]);
      const major = Number.parseInt(platformVersion ?? "", 10);
      if (Number.isFinite(major) && major > 0) return { status: "android", major };
    } catch {
      // Hints refused — fall through to the user-agent string.
    }
  }

  if (FROZEN_CHROME_UA.test(ua)) return { status: "android", major: null };

  // Firefox and in-app browsers still report the real version here.
  const m = /Android (\d+)/i.exec(ua);
  return { status: "android", major: m ? Number(m[1]) : null };
}
