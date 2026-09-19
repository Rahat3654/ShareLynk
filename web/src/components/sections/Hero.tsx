"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { HeroVisual, type HeroTab } from "@/components/hero/AppMockup";
import type { Dictionary } from "@/i18n";

// The hero alternates between the app dashboard and the "Global network"
// poster, each for this long (including its half-second fade), on a loop.
// Paused while either is hovered or focused, and off for reduced motion.
const SLIDE_MS = 4_000;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ t }: { t: Dictionary }) {
  const [activeTab, setActiveTab] = useState<HeroTab>("dashboard");
  // Hover or keyboard focus on either view holds it, so it can be read or used.
  const [held, setHeld] = useState(false);
  const reduceMotion = useReducedMotion();
  const hold = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: () => setHeld(false),
  };
  const back = () => {
    setHeld(false);
    setActiveTab("dashboard");
  };

  // Keyed on activeTab, so choosing a tab by hand restarts the full interval.
  useEffect(() => {
    if (held || reduceMotion) return;
    const id = setTimeout(
      () => setActiveTab((tab) => (tab === "globe" ? "dashboard" : "globe")),
      SLIDE_MS,
    );
    return () => clearTimeout(id);
  }, [activeTab, held, reduceMotion]);

  useEffect(() => {
    if (activeTab !== "globe") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHeld(false);
        setActiveTab("dashboard");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTab]);

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36">
      {/* Backdrop grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />

      <AnimatePresence mode="wait" initial={false}>
        {activeTab === "globe" ? (
          // "Global network": the full-width ShareLynk poster, running up
          // behind the transparent navbar. Poster by Wahida Akhter (PR #14).
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-32 w-full sm:-mt-36"
            {...hold}
          >
            {/* Keeps the navbar legible over the top of the image. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="relative w-full overflow-hidden border-b border-white/10 bg-slate-950 shadow-2xl">
              <Image
                src="/assets/hero-poster.jpg"
                alt={t.hero.posterAlt}
                width={1024}
                height={576}
                sizes="100vw"
                // Mounts only when it comes round, so fetch right away.
                loading="eager"
                className="block h-auto w-full"
              />
              {/* The whole poster returns to the app preview; a real button so
                  it works from the keyboard, with a visible label. */}
              <button
                type="button"
                onClick={back}
                aria-label={t.hero.posterBack}
                className="group absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-cyan/70"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors group-hover:bg-slate-950/90 sm:bottom-5 sm:right-5"
                >
                  <X className="h-3.5 w-3.5" />
                  {t.hero.posterBack}
                </span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            {...hold}
          >
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <motion.div variants={container} initial="hidden" animate="visible">
                <motion.div variants={item}>
                  <span className="eyebrow">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t.meta.tagline}
                  </span>
                </motion.div>

                <motion.h1
                  variants={item}
                  className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  {t.hero.headlineA}{" "}
                  <span className="text-gradient">{t.hero.headlineB}</span>
                </motion.h1>

                <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  {t.hero.subtitle}
                </motion.p>

                {/* Trust stats */}
                <motion.dl variants={item} className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
                  {t.stats.map((s) => (
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
                <HeroVisual t={t} activeTab={activeTab} onSelectTab={setActiveTab} />
              </motion.div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo cloud / social proof strip */}
      <div className="container mt-20 sm:mt-24">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
          {t.hero.builtWith}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500">
          {["Next.js", "TypeScript", "PostgreSQL", "FastAPI", "Docker", "NGINX"].map((tech) => (
            <span key={tech} className="text-sm font-medium tracking-wide text-slate-400/80">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
