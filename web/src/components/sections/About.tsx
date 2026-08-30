import * as Icons from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";

export function About({ t }: { t: Dictionary }) {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={t.about.eyebrow}
              title={
                <>
                  {t.about.titleA} <span className="text-gradient">{t.about.titleB}</span>
                </>
              }
            />
            <Reveal delay={2}>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">{t.about.body}</p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm uppercase tracking-wider text-cyan-200/80 font-medium">
                  {t.about.missionLabel}
                </p>
                <p className="mt-2 text-xl font-medium text-white">{t.about.mission}</p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.about.pillars.map((p, i) => {
              const Icon =
                (Icons[p.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ??
                Icons.Sparkles;
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
