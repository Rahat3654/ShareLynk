"use client";

import { BadgeCheck, Download, History, Briefcase } from "lucide-react";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { formatBytes, formatDate } from "@/lib/utils";
import type { PlatformDownload, Release } from "@/lib/types";
import type { Dictionary, Locale } from "@/i18n";

// The ShareLynk Agent app, for registered field agents.
//
// Everything here comes from the admin panel's catalog: every platform marked
// as the Agent app, its recommended release (`latest`, chosen by the backend's
// status/date rules) and the rest of its enabled releases as previous
// versions. Nothing is listed by hand, so a release added in the admin panel
// appears on the next page load.
export function AgentAppDownload({
  platforms,
  locale,
  t,
}: {
  platforms: PlatformDownload[];
  locale: Locale;
  t: Dictionary;
}) {
  const d = t.downloads;
  if (platforms.length === 0) return null;

  return (
    <section
      aria-labelledby="agent-app-heading"
      className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-brand-cyan">
          <Briefcase className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 id="agent-app-heading" className="text-xl font-bold text-white sm:text-2xl">
            {d.agentTitle}
          </h3>
          <p className="mt-1.5 text-sm text-slate-400">{d.agentDescription}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {platforms.map((p) => (
          <li key={p.id}>
            <AgentPlatform platform={p} locale={locale} t={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function track(release: Release) {
  // Same keepalive counter the consumer card uses; never in the download's way.
  fetch(`/api/downloads/${release.id}/track`, { method: "POST", keepalive: true }).catch(() => {});
}

function AgentPlatform({
  platform,
  locale,
  t,
}: {
  platform: PlatformDownload;
  locale: Locale;
  t: Dictionary;
}) {
  const d = t.downloads;
  const latest = platform.latest!;
  const previous = platform.releases.filter(
    (r) => r.id !== latest.id && r.downloadUrl?.startsWith("https://")
  );
  const size = latest.fileSizeBytes > 0 ? formatBytes(latest.fileSizeBytes) : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <PlatformIcon icon={platform.icon || "android"} className="mt-1 h-5 w-5 shrink-0 text-slate-300" />
          <div className="min-w-0">
            <p className="font-semibold text-white">{platform.name}</p>
            <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
              <div className="flex gap-1.5">
                <dt>{d.version}</dt>
                <dd className="font-mono text-slate-200">{latest.version}</dd>
              </div>
              {latest.status && latest.status !== "LATEST" && latest.status !== "STABLE" && (
                <dd className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 text-xs font-medium uppercase tracking-wide text-amber-200">
                  {latest.status.toLowerCase()}
                </dd>
              )}
              {size && (
                <div className="flex gap-1.5">
                  <dt>{d.size}</dt>
                  <dd className="text-slate-200">{size}</dd>
                </div>
              )}
              {latest.releaseDate && (
                <div className="flex gap-1.5">
                  <dt>{d.released}</dt>
                  <dd className="text-slate-200">{formatDate(latest.releaseDate, locale)}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <a
          href={latest.downloadUrl}
          rel="noopener"
          onClick={() => track(latest)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cyan"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {d.agentDownload}
          <span className="sr-only"> {platform.name} {latest.version}</span>
        </a>
      </div>

      {latest.releaseNotes && (
        <p className="mt-4 whitespace-pre-line text-sm text-slate-400">{latest.releaseNotes}</p>
      )}

      {latest.checksumSha256 && (
        <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
          <BadgeCheck className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="break-all font-mono">SHA-256 {latest.checksumSha256}</span>
        </p>
      )}

      {previous.length > 0 && (
        <details className="mt-4">
          <summary className="flex cursor-pointer select-none items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white">
            <History className="h-4 w-4" aria-hidden="true" />
            {d.previousVersions} ({previous.length})
          </summary>
          <ul className="mt-3 divide-y divide-white/5 text-sm">
            {previous.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                <span className="text-slate-300">
                  <span className="font-mono">{r.version}</span>
                  {r.releaseDate && (
                    <span className="ml-2 text-slate-500">{formatDate(r.releaseDate, locale)}</span>
                  )}
                </span>
                <a
                  href={r.downloadUrl}
                  rel="noopener"
                  onClick={() => track(r)}
                  className="text-brand-cyan underline-offset-4 hover:underline"
                >
                  {d.download}
                  <span className="sr-only"> {platform.name} {r.version}</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
