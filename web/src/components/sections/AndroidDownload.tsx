"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Download, Info, Smartphone } from "lucide-react";
import type { AndroidReleaseView } from "@/lib/androidRelease";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { detectAndroid, MIN_ANDROID_MAJOR, type AndroidCheck } from "@/lib/android";
import { cn, formatBytes, formatDate } from "@/lib/utils";
import type { Dictionary, Locale } from "@/i18n";

// The single Android download.
//
// The link is a plain anchor to the published APK, so the download itself
// depends on nothing but the release host: no popup that a blocker or an
// in-app browser could swallow. Detection only changes the sentence under the
// button. The admin download counter is bumped alongside, never in the way.
export function AndroidDownload({
  release,
  locale,
  t,
}: {
  release: AndroidReleaseView;
  locale: Locale;
  t: Dictionary;
}) {
  const d = t.downloads;
  const [check, setCheck] = useState<AndroidCheck>({ status: "pending" });

  useEffect(() => {
    let alive = true;
    detectAndroid().then((result) => {
      if (alive) setCheck(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  const major = check.status === "android" ? check.major : null;
  const tooOld = major !== null && major < MIN_ANDROID_MAJOR;
  const supported = major !== null && major >= MIN_ANDROID_MAJOR;
  const notAndroid = check.status === "not-android";
  const size = release.sizeBytes > 0 ? formatBytes(release.sizeBytes) : null;
  const withSize = (label: string) => (size ? `${label} (${size})` : label);

  // Fire-and-forget: keepalive lets the request finish while the browser moves
  // on to the download, and a failure changes nothing for the user.
  function countDownload() {
    if (!release.releaseId) return;
    fetch(`/api/downloads/${release.releaseId}/track`, { method: "POST", keepalive: true }).catch(
      () => {}
    );
  }

  let status: { tone: "ok" | "warn" | "info"; text: string };
  if (tooOld) {
    status = { tone: "warn", text: d.statusTooOld.replace("{version}", String(major)) };
  } else if (supported) {
    status = { tone: "ok", text: d.statusSupported.replace("{version}", String(major)) };
  } else if (notAndroid) {
    status = { tone: "info", text: d.statusNotAndroid };
  } else {
    status = { tone: "info", text: d.statusUnknown };
  }

  const StatusIcon = status.tone === "ok" ? CheckCircle2 : status.tone === "warn" ? AlertTriangle : Info;

  return (
    <div className="mx-auto mt-10 grid max-w-4xl gap-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-cyan/25 bg-gradient-to-br from-brand-blue/15 via-slate-900/85 to-cyan-950/30 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
              <PlatformIcon icon="android" className="h-8 w-8" />
            </div>
            <div className="min-w-0 space-y-2">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{d.cardTitle}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/15 px-3 py-1 text-xs font-semibold text-brand-cyan">
                <Smartphone className="h-3.5 w-3.5" />
                {d.requirement}
              </span>
              <dl className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm text-slate-400">
                <div className="flex gap-1.5">
                  <dt>{d.version}</dt>
                  <dd className="whitespace-nowrap font-mono text-slate-200">
                    {release.version}
                    {release.versionCode !== null && ` (${d.build} ${release.versionCode})`}
                  </dd>
                </div>
                {size && (
                  <div className="flex gap-1.5">
                    <dt>{d.size}</dt>
                    <dd className="text-slate-200">{size}</dd>
                  </div>
                )}
                <div className="flex gap-1.5">
                  <dt>{d.released}</dt>
                  <dd className="text-slate-200">{formatDate(release.releasedAt, locale)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-3 md:items-end">
            {notAndroid ? (
              <a
                href={release.url}
                rel="noopener"
                onClick={countDownload}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-cyan/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan"
              >
                <Download className="h-4 w-4" />
                {withSize(d.downloadFileLink)}
              </a>
            ) : (
              <a
                href={release.url}
                rel="noopener"
                onClick={countDownload}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan",
                  tooOld
                    ? "border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white"
                    : "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow hover:scale-[1.02] hover:opacity-90"
                )}
              >
                <Download className="h-5 w-5" />
                {tooOld ? d.downloadAnyway : withSize(d.downloadApk)}
              </a>
            )}
          </div>
        </div>

        <p
          role="status"
          className={cn(
            "relative mt-8 flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-sm",
            status.tone === "ok" && "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
            status.tone === "warn" && "border-amber-400/30 bg-amber-400/10 text-amber-200",
            status.tone === "info" && "border-white/10 bg-white/[0.03] text-slate-300"
          )}
        >
          <StatusIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{status.text}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{d.installTitle}</h4>
          <ol className="mt-4 space-y-3 text-sm text-slate-300">
            {d.installSteps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue/20 text-xs font-bold text-brand-cyan">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs text-slate-500">{d.inAppBrowserTip}</p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-400 backdrop-blur-xl">
          <p>{d.pilotNote}</p>
          {release.sha256 && (
          <details className="group">
            <summary className="cursor-pointer select-none font-medium text-slate-300 hover:text-white">
              {d.checksum}
            </summary>
            <code className="mt-2 block break-all rounded-xl bg-white/[0.04] p-3 font-mono text-[11px] leading-relaxed text-slate-300">
              {release.sha256}
            </code>
          </details>
          )}
        </div>
      </div>
    </div>
  );
}
