"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Sparkles, ShieldCheck, Zap, Monitor, Smartphone, Laptop, Terminal, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/hero/AppMockup";
import { site, stats } from "@/data/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type DetectedOS = {
  name: string;
  icon: any;
  arch: string;
  version: string;
  slug: string;
};

export function Hero() {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>({
    name: "Windows",
    icon: Monitor,
    arch: "64-bit",
    version: "v1.2.0",
    slug: "windows",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("win")) {
      setDetectedOS({ name: "Windows", icon: Monitor, arch: "x64 / ARM", version: "v1.2.0", slug: "windows" });
    } else if (ua.includes("mac")) {
      setDetectedOS({ name: "macOS", icon: Laptop, arch: "Apple Silicon & Intel", version: "v1.2.0", slug: "macos" });
    } else if (ua.includes("android")) {
      setDetectedOS({ name: "Android", icon: Smartphone, arch: "APK / Play Store", version: "v1.2.0", slug: "android" });
    } else if (ua.includes("linux")) {
      setDetectedOS({ name: "Linux", icon: Terminal, arch: "AppImage & .deb", version: "v1.2.0", slug: "linux" });
    }
  }, []);

  const OSIcon = detectedOS.icon;

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36">
      {/* Backdrop grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item}>
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                {site.tagline}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Secure Connectivity.{" "}
              <span className="text-gradient">Smarter Sharing.</span>{" "}
              Unlimited Possibilities.
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Building the future of intelligent digital connectivity through secure
              Wi-Fi sharing, network management, and innovative connectivity solutions.
            </motion.p>

            {/* Smart OS Auto-Detected CTA Button Box */}
            <motion.div variants={item} className="mt-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Button href={`/#downloads`} size="lg" className="px-6 py-4 shadow-lg shadow-brand-blue/25">
                  <OSIcon className="h-5 w-5 text-cyan-200" />
                  <span>Download for {detectedOS.name}</span>
                  <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono">
                    {detectedOS.version}
                  </span>
                </Button>
                
                <Button href="/#downloads" variant="secondary" size="lg">
                  <BookOpen className="h-4 w-4" />
                  All Platforms & Docs
                </Button>
              </div>

              {/* OS Detection Status Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle className="h-3.5 w-3.5" /> Detected: {detectedOS.name} ({detectedOS.arch})
                </span>
                <span>•</span>
                <span>Free & Verified Build</span>
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-cyan" /> End-to-end encrypted
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-cyan" /> Cross-platform native apps
              </span>
            </motion.div>

            {/* Trust stats */}
            <motion.dl variants={item} className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/[0.02] px-4 py-4 text-center">
                  <dt className="text-xl font-semibold text-white">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right Column: Interactive App Dashboard Mockup + Globe Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Logo cloud / social proof strip */}
      <div className="container mt-20 sm:mt-24">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500">
          Engineered with modern, trusted technology
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500">
          {["Next.js", "TypeScript", "PostgreSQL", "FastAPI", "Docker", "NGINX"].map((t) => (
            <span key={t} className="text-sm font-medium tracking-wide text-slate-400/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
