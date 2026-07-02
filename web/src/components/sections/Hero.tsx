"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlobeIllustration } from "@/components/hero/GlobeIllustration";
import { site, stats } from "@/data/site";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-40">
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

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/#downloads" size="lg">
                <Download className="h-5 w-5" />
                Download Now
              </Button>
              <Button href="/#downloads" variant="secondary" size="lg">
                <BookOpen className="h-5 w-5" />
                Documentation
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-cyan" /> End-to-end encrypted
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-brand-cyan" /> Cross-platform apps
              </span>
            </motion.div>

            {/* Trust stats */}
            <motion.dl variants={item} className="mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/[0.02] px-4 py-4 text-center">
                  <dt className="text-xl font-semibold text-white">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <GlobeIllustration />
          </motion.div>
        </div>
      </div>

      {/* Logo cloud / social proof strip */}
      <div className="container mt-20 sm:mt-24">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500">
          Engineered with modern, trusted technology
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500">
          {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "NGINX"].map((t) => (
            <span key={t} className="text-sm font-medium tracking-wide text-slate-400/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
