"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HeroVisual } from "@/components/hero/AppMockup";
import type { Dictionary } from "@/i18n";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ t }: { t: Dictionary }) {
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
            <HeroVisual t={t} />
          </motion.div>
        </div>
      </div>

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
