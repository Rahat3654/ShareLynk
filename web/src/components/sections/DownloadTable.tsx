"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Check, Clock, ShieldCheck, Sparkles, Filter } from "lucide-react";
import type { PlatformDownload, OsFamily } from "@/lib/types";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { formatBytes, formatDate, cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/i18n";

function detectOs(): OsFamily | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "ANDROID";
  if (/win/.test(ua)) return "WINDOWS";
  if (/mac/.test(ua)) return "MACOS";
  if (/linux/.test(ua)) return "LINUX";
  if (/iphone|ipad|ipod/.test(ua)) return "IOS";
  return null;
}

const statusStyles: Record<string, string> = {
  LATEST: "bg-brand-cyan/15 text-brand-cyan ring-brand-cyan/30",
  STABLE: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
  BETA: "bg-amber-400/10 text-amber-300 ring-amber-400/30",
  DEPRECATED: "bg-slate-400/10 text-slate-400 ring-slate-400/30",
};

export function DownloadTable({
  platforms,
  locale,
  t,
}: {
  platforms: PlatformDownload[];
  locale: Locale;
  t: Dictionary;
}) {
  const userOs = useMemo(detectOs, []);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [busy, setBusy] = useState<string | null>(null);

  const filterTabs: { id: string; label: string; os?: OsFamily }[] = [
    { id: "all", label: t.downloads.allPlatforms },
    { id: "windows", label: "Windows", os: "WINDOWS" },
    { id: "macos", label: "macOS", os: "MACOS" },
    { id: "android", label: "Android", os: "ANDROID" },
    { id: "linux", label: "Linux", os: "LINUX" },
  ];

  const filteredPlatforms = useMemo(() => {
    if (activeTab === "all") return platforms;
    const tab = filterTabs.find((tb) => tb.id === activeTab);
    if (!tab || !tab.os) return platforms;
    return platforms.filter((p) => p.os === tab.os);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platforms, activeTab]);

  const recommendedPlatform = useMemo(() => {
    if (!userOs) return null;
    return platforms.find((p) => p.os === userOs && !p.isComingSoon && p.latest);
  }, [platforms, userOs]);

  async function handleDownload(p: PlatformDownload) {
    if (!p.latest) return;
    const target = p.latest.downloadUrl;
    setBusy(p.id);
    // Open synchronously: doing this after `await` breaks the user-gesture chain
    // and popup blockers (Safari, Firefox) silently drop the download.
    const opened = window.open(target, "_blank", "noopener,noreferrer");
    try {
      await fetch(`/api/downloads/${p.latest.id}/track`, { method: "POST" }).catch(() => {});
    } finally {
      setBusy(null);
      if (!opened) window.location.href = target;
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-9">
      {/* 1. Recommended Device Featured Banner */}
      {recommendedPlatform && recommendedPlatform.latest && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-brand-cyan/30 bg-gradient-to-r from-brand-blue/20 via-slate-900/80 to-cyan-950/30 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold text-brand-cyan border border-brand-cyan/30 whitespace-nowrap">
                  <Sparkles className="h-3.5 w-3.5" /> {t.downloads.recommended}
                </span>
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                  {recommendedPlatform.name} ({recommendedPlatform.arch})
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {t.downloads.recommendedTitle} {recommendedPlatform.name}
              </h3>

              <p className="text-sm text-slate-300 max-w-xl">
                {t.downloads.recommendedNote} (v{recommendedPlatform.latest.version}) •{" "}
                {t.downloads.recommendedNoteTail}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleDownload(recommendedPlatform)}
                disabled={busy === recommendedPlatform.id}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-8 py-4 text-base font-semibold text-white shadow-glow hover:opacity-90 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                {busy === recommendedPlatform.id ? <Check className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                <span>
                  {t.downloads.downloadNow} ({formatBytes(recommendedPlatform.latest.fileSizeBytes)})
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. OS Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur-xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-semibold transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-medium text-slate-400 flex items-center gap-2 whitespace-nowrap px-2">
          <Filter className="h-4 w-4 text-brand-cyan" />
          {t.downloads.totalBuildsPrefix} {filteredPlatforms.length} {t.downloads.totalBuilds}
        </div>
      </div>

      {/* 3. Column catalog table — overflow-x-auto so it stays usable on mobile */}
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-2xl overflow-x-auto">
        <div className="min-w-[880px]">
          {/* Table Header Row */}
          <div className="grid grid-cols-[minmax(280px,2.4fr)_minmax(110px,1fr)_minmax(220px,1.7fr)_minmax(100px,1fr)_minmax(170px,auto)] gap-6 px-8 py-5 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/10 items-center">
            <span className="text-left">{t.downloads.colPlatform}</span>
            <span className="text-left">{t.downloads.colVersion}</span>
            <span className="text-left">{t.downloads.colArchitecture}</span>
            <span className="text-left">{t.downloads.colSize}</span>
            <span className="text-right">{t.downloads.colDownload}</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {filteredPlatforms.map((p, i) => {
              const isRec = userOs && p.os === userOs && !p.isComingSoon;
              const rel = p.latest;
              const unavailable = p.isComingSoon || !rel;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className={cn(
                    "group grid grid-cols-[minmax(280px,2.4fr)_minmax(110px,1fr)_minmax(220px,1.7fr)_minmax(100px,1fr)_minmax(170px,auto)] items-center gap-6 px-8 py-6 transition-all duration-300",
                    "hover:bg-white/[0.04]",
                    isRec && "bg-brand-blue/[0.07]"
                  )}
                >
                  {/* Platform Column */}
                  <div className="flex items-center gap-4 text-left min-w-0">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white shadow-inner transition-transform group-hover:scale-105">
                      <PlatformIcon icon={p.icon} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-base whitespace-nowrap tracking-tight">{p.name}</span>
                        {isRec && (
                          <span className="whitespace-nowrap rounded-full bg-brand-cyan/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-cyan ring-1 ring-brand-cyan/40">
                            {t.downloads.yourDevice}
                          </span>
                        )}
                        {rel && (
                          <span className={cn("whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1", statusStyles[rel.status])}>
                            {rel.status}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 mt-1 whitespace-nowrap font-normal">
                        {unavailable
                          ? t.downloads.inDevelopment
                          : `${t.downloads.releasedOn}: ${formatDate(rel!.releaseDate, locale)}`}
                      </span>
                    </div>
                  </div>

                  {/* Version */}
                  <div className="flex items-center text-left">
                    <span className="font-mono text-sm font-semibold text-slate-200 whitespace-nowrap">
                      {unavailable ? "—" : `v${rel!.version}`}
                    </span>
                  </div>

                  {/* Architecture */}
                  <div className="flex items-center text-left">
                    <span className="text-xs font-mono text-slate-300 whitespace-nowrap">
                      {unavailable ? "—" : rel!.architecture}
                    </span>
                  </div>

                  {/* Size */}
                  <div className="flex items-center text-left">
                    <span className="text-sm font-normal text-slate-300 whitespace-nowrap">
                      {unavailable ? "—" : formatBytes(rel!.fileSizeBytes)}
                    </span>
                  </div>

                  {/* Download action */}
                  <div className="flex items-center justify-end text-right">
                    {unavailable ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-medium text-slate-400 whitespace-nowrap">
                        <Clock className="h-4 w-4" /> {t.downloads.comingSoon}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDownload(p)}
                        disabled={busy === p.id}
                        className={cn(
                          "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-xs font-bold text-white transition-all whitespace-nowrap shadow-glow-sm",
                          "bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] bg-[length:200%_100%] hover:bg-[position:100%_0] hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-60"
                        )}
                      >
                        {busy === p.id ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        <span>
                          {p.extension ? `${t.downloads.download} .${p.extension}` : t.downloads.download}
                        </span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Verified Security Footer Strip */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>
            {t.downloads.virusFree} <strong>{t.downloads.virusFreeStrong}</strong>{" "}
            {t.downloads.virusFreeTail}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
          <span>E2E ENCRYPTED</span>
          <span>•</span>
          <span>RELEASE CDN</span>
        </div>
      </div>
    </div>
  );
}
