import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

// Keyed by a stable status key, not by the translated label — otherwise the
// lookup breaks the moment a language is switched.
const statusMeta = {
  shipped: { icon: CheckCircle2, color: "text-emerald-400" },
  inProgress: { icon: Loader2, color: "text-brand-cyan" },
  next: { icon: Circle, color: "text-amber-300" },
  planned: { icon: Circle, color: "text-slate-500" },
};

type StatusKey = keyof typeof statusMeta;

export function Roadmap({ t }: { t: Dictionary }) {
  return (
    <section id="roadmap" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t.roadmap.eyebrow}
          title={
            <>
              {t.roadmap.titleA} <span className="text-gradient">{t.roadmap.titleB}</span>
            </>
          }
          description={t.roadmap.description}
        />

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-4">
            {t.roadmap.items.map((r, i) => {
              const key = (r.status in statusMeta ? r.status : "planned") as StatusKey;
              const meta = statusMeta[key];
              return (
                <Reveal key={r.phase} delay={i}>
                  <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-brand-cyan/30">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-950 text-sm font-semibold text-brand-cyan">
                        {i + 1}
                      </span>
                      <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", meta.color)}>
                        <meta.icon className={cn("h-4 w-4", key === "inProgress" && "animate-spin-slow")} />
                        {t.roadmap.status[key]}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-slate-500">{r.phase}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.description}</p>
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
