"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { HeroVisual } from "@/components/hero/AppMockup";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const [activeTab, setActiveTab] = useState<"dashboard" | "globe">("dashboard");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (activeTab === "globe") {
      timer = setTimeout(() => {
        setActiveTab("dashboard");
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [activeTab]);

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 pb-12 transition-all duration-500">
      {/* Backdrop grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />

      <AnimatePresence mode="wait">
        {activeTab === "globe" ? (
          <motion.div
            key="globe-banner-view"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-28 sm:-mt-32 w-full relative"
          >
            {/* Soft top gradient overlay so navbar text/buttons remain crisp over image */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent z-10" />

            {/* Full Width Banner Image extending behind Navbar */}
            <div className="relative w-full overflow-hidden border-b border-white/10 bg-slate-950 shadow-2xl">
              <Image
                src="/assets/hero-poster.jpg"
                alt="ShareLynk Global Network Banner"
                width={1920}
                height={1080}
                priority
                quality={100}
                sizes="100vw"
                className="w-full h-auto block cursor-pointer"
                onClick={() => setActiveTab("dashboard")}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="normal-hero-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container">
              {/* Text & Interactive App Mockup Section */}
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                <motion.div variants={container} initial="hidden" animate="visible">
                  <motion.div variants={item}>
                    <span className="eyebrow">
                      <Sparkles className="h-3.5 w-3.5" />
                      {t.tagline}
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={item}
                    className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
                  >
                    {t.titleStart}
                    <span className="text-gradient">{t.titleGradient}</span>
                  </motion.h1>

                  <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                    {t.description}
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
                  <HeroVisual activeTab={activeTab} onSelectTab={setActiveTab} />
                </motion.div>
              </div>
            </div>

            {/* Logo cloud / social proof strip */}
            <div className="container mt-20 sm:mt-24">
              <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
                {t.techTrust}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-500">
                {["Next.js", "TypeScript", "PostgreSQL", "FastAPI", "Docker", "NGINX"].map((tech) => (
                  <span key={tech} className="text-sm font-medium tracking-wide text-slate-400/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
