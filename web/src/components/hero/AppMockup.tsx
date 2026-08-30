"use client";

import { useState } from "react";
import {
  Wifi,
  ShieldCheck,
  Users,
  Zap,
  Smartphone,
  Laptop,
  Activity,
  Lock,
  Pause,
  Play,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { GlobeIllustration } from "./GlobeIllustration";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";
import type { Dictionary } from "@/i18n";

export function HeroVisual({ t }: { t: Dictionary }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "globe">("dashboard");
  const [sharingActive, setSharingActive] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      {/* Continuous Sliding Image Background Layer (Behind the Mockup Window) */}
      <HeroBackgroundSlider />

      {/* Ambient background glows */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-brand-blue/30 via-brand-cyan/20 to-indigo-600/30 blur-3xl opacity-70 animate-pulse-glow" />
      <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Visual Switcher Bar */}
      <div className="mb-4 flex items-center justify-between rounded-full border border-white/10 bg-slate-900/60 p-1.5 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 px-3 text-xs text-slate-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{t.mockup.livePreview}</span>
        </div>
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            {t.mockup.dashboard}
          </button>
          <button
            onClick={() => setActiveTab("globe")}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "globe"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            {t.mockup.globe}
          </button>
        </div>
      </div>

      {activeTab === "globe" ? (
        <GlobeIllustration />
      ) : (
        /* App Dashboard Mockup */
        <div className="relative rounded-2xl border border-white/15 bg-slate-950/80 p-1 shadow-2xl backdrop-blur-2xl transition-all duration-500">
          {/* Window Header / Titlebar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02] rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
              </div>
              <span className="ml-2 text-xs font-mono tracking-tight text-slate-400">
                ShareLynk v1.2.0 Desktop
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> E2E Encrypted
              </span>
            </div>
          </div>

          {/* App Inner Canvas */}
          <div className="p-5 space-y-4">
            {/* Top Status Banner */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-slate-950/60 p-4">
              <div className="flex items-center gap-3.5">
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                  sharingActive
                    ? "bg-gradient-to-tr from-brand-blue to-brand-cyan text-white shadow-lg shadow-brand-blue/30"
                    : "bg-slate-800 text-slate-400"
                }`}>
                  <Wifi className="h-6 w-6" />
                  {sharingActive && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {sharingActive ? t.mockup.hubActive : t.mockup.sharingOff}
                    </h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      5 GHz
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                    {t.mockup.sessionKey} <code className="text-cyan-300 font-mono">SL-89F2-DHAKA</code>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSharingActive(!sharingActive)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  sharingActive
                    ? "border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                    : "bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90"
                }`}
              >
                {sharingActive ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> {t.mockup.stopSharing}
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> {t.mockup.startSharing}
                  </>
                )}
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-medium tracking-wide">{t.mockup.connected}</span>
                  <Users className="h-3.5 w-3.5 text-brand-cyan" />
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">4</span>
                  <span className="text-xs text-slate-400">/ 10 max</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-medium tracking-wide">{t.mockup.downloadSpeed}</span>
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">84.2</span>
                  <span className="text-xs text-slate-400">Mbps</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-medium tracking-wide">{t.mockup.sessionData}</span>
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">12.4</span>
                  <span className="text-xs text-slate-400">GB shared</span>
                </div>
              </div>
            </div>

            {/* Active Connected Devices Preview */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-brand-cyan" /> {t.mockup.activeDevices}
                </span>
                <span className="text-[10px] text-cyan-400 hover:underline cursor-pointer">
                  {t.mockup.accessControl}
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { name: "Rafiq's MacBook Air", icon: Laptop, ip: "192.168.4.12", speed: "32 Mbps" },
                  { name: "Galaxy S23 Ultra", icon: Smartphone, ip: "192.168.4.19", speed: "18 Mbps" },
                  { name: "Campus Lab Desktop", icon: Laptop, ip: "192.168.4.24", speed: "24 Mbps" },
                ].map((device, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900/50 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      <device.icon className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-200">{device.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">{device.ip}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-emerald-400">{device.speed}</span>
                      <button className="rounded px-2 py-0.5 text-[10px] font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20">
                        {t.mockup.remove}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating badge over mockup */}
      <div className="absolute -bottom-4 -left-4 hidden animate-float rounded-xl border border-white/10 bg-slate-900/90 p-3 shadow-xl backdrop-blur-xl sm:flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">{t.mockup.encrypted}</div>
          <div className="text-[10px] text-slate-400">{t.mockup.encryptedNote}</div>
        </div>
      </div>
    </div>
  );
}
