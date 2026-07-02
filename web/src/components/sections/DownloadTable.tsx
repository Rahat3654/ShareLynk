"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Check, Clock, ChevronRight } from "lucide-react";
import type { PlatformDownload } from "@/lib/types";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { formatBytes, formatDate, cn } from "@/lib/utils";

// Detects the visitor's OS to highlight the recommended download.
function detectOs(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "ANDROID";
  if (/iphone|ipad|ipod/.test(ua)) return "IOS";
  if (/win/.test(ua)) return "WINDOWS";
  if (/mac/.test(ua)) return "MACOS";
  if (/linux/.test(ua)) return "LINUX";
  return null;
}

const statusStyles: Record<string, string> = {
  LATEST: "bg-brand-cyan/15 text-brand-cyan ring-brand-cyan/30",
  STABLE: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
  BETA: "bg-amber-400/10 text-amber-300 ring-amber-400/30",
  DEPRECATED: "bg-slate-400/10 text-slate-400 ring-slate-400/30",
};

export function DownloadTable({ platforms }: { platforms: PlatformDownload[] }) {
  const userOs = useMemo(detectOs, []);
  const [busy, setBusy] = useState<string | null>(null);

  // Fire-and-forget download tracking, then navigate to the asset URL.
  async function handleDownload(p: PlatformDownload) {
    if (!p.latest) return;
    setBusy(p.id);
    try {
      await fetch(`/api/downloads/${p.latest.id}/track`, { method: "POST" }).catch(() => {});
    } finally {
      setBusy(null);
      window.open(p.latest.downloadUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="mx-auto mt-14 max-w-5xl">
      {/* Column header (desktop) */}
      <div className="hidden grid-cols-[1.6fr_0.9fr_1fr_0.9fr_auto] gap-4 px-6 pb-3 text-xs font-medium uppercase tracking-wider text-slate-500 lg:grid">
        <span>Platform</span>
        <span>Version</span>
        <span>Architecture</span>
        <span>Size</span>
        <span className="text-right">Download</span>
      </div>

      <div className="glass overflow-hidden rounded-3xl shadow-card">
        {platforms.map((p, i) => {
          const recommended = userOs && p.os === userOs && !p.isComingSoon;
          const rel = p.latest;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
              className={cn(
                "group relative grid grid-cols-1 items-center gap-4 border-b border-white/5 px-5 py-5 transition-colors last:border-0 lg:grid-cols-[1.6fr_0.9fr_1fr_0.9fr_auto] lg:px-6",
                "hover:bg-white/[0.03]",
                recommended && "bg-brand-blue/[0.06]"
              )}
            >
              {/* Platform identity */}
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-transform group-hover:scale-105">
                  <PlatformIcon icon={p.icon} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold text-white">{p.name}</span>
                    {recommended && (
                      <span className="rounded-full bg-brand-cyan/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-cyan ring-1 ring-brand-cyan/30">
                        Your device
                      </span>
                    )}
                    {rel && (
                      <span className={cn("hidden rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 sm:inline-block", statusStyles[rel.status])}>
                        {rel.status}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {p.isComingSoon ? "Coming soon" : `Released ${formatDate(rel!.releaseDate)}`}
                  </div>
                </div>
              </div>

              {/* Version */}
              <div className="flex items-center gap-2 lg:block">
                <span className="text-xs text-slate-500 lg:hidden">Version</span>
                <span className="font-mono text-sm text-slate-200">
                  {p.isComingSoon ? "—" : `v${rel!.version}`}
                </span>
              </div>

              {/* Architecture */}
              <div className="flex items-center gap-2 lg:block">
                <span className="text-xs text-slate-500 lg:hidden">Arch</span>
                <span className="text-sm text-slate-300">
                  {p.isComingSoon ? "—" : rel!.architecture}
                </span>
              </div>

              {/* Size */}
              <div className="flex items-center gap-2 lg:block">
                <span className="text-xs text-slate-500 lg:hidden">Size</span>
                <span className="text-sm text-slate-300">
                  {p.isComingSoon ? "—" : formatBytes(rel!.fileSizeBytes)}
                </span>
              </div>

              {/* Download action */}
              <div className="lg:text-right">
                {p.isComingSoon ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" /> Notify me
                  </span>
                ) : (
                  <button
                    onClick={() => handleDownload(p)}
                    disabled={busy === p.id}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all lg:w-auto",
                      "bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] bg-[length:200%_100%] shadow-glow-sm hover:bg-[position:100%_0] hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-60"
                    )}
                  >
                    {busy === p.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Download
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-sm text-slate-500">
        Looking for older builds or checksums?
        <a href="/#faq" className="inline-flex items-center gap-0.5 text-brand-cyan hover:underline">
          View all releases <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </p>
    </div>
  );
}
