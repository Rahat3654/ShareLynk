"use client";

import { Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export function TeamHero() {
  const { language } = useLanguage();
  const t = translations[language].teamPage;

  return (
    <section className="relative overflow-hidden pt-12 pb-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[130px]" />

      <div className="container text-center max-w-4xl mx-auto">
        <span className="eyebrow mx-auto">
          <Users className="h-3.5 w-3.5" /> {t.eyebrow}
        </span>

        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t.titleStart} <span className="text-gradient">{t.titleGradient}</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto font-normal">
          {t.description}
        </p>
      </div>
    </section>
  );
}
