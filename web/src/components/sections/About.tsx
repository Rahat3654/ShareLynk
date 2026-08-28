"use client";

import { GraduationCap, Target, Users, Globe2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const pillarIcons = [GraduationCap, Users, Target, Globe2];

export function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={t.eyebrow}
              title={
                <>
                  {t.titleStart} <span className="text-gradient">{t.titleGradient}</span>
                </>
              }
            />
            <Reveal delay={2}>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                {t.description}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm uppercase tracking-wider text-cyan-200/80 font-medium">{t.missionLabel}</p>
                <p className="mt-2 text-xl font-medium text-white">
                  {t.missionText}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.pillars.map((p, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <Reveal key={p.title} delay={i}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-cyan/30">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/15 ring-1 ring-white/10">
                      <Icon className="h-5 w-5 text-brand-cyan" />
                    </div>
                    <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
