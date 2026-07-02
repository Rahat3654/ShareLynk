import * as Icons from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/site";

export function Features() {
  return (
    <section id="features" className="section scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-64 bg-grid-glow" />
      <div className="container">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything you need to <span className="text-gradient">share smarter</span>
            </>
          }
          description="A complete connectivity platform — secure by design, effortless to operate, and ready to scale from a single room to the entire globe."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = (Icons[f.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ?? Icons.Sparkles;
            return (
              <Reveal key={f.title} delay={i % 4}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:bg-white/[0.05]">
                  {/* Card glow on hover */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgba(15,76,255,0.25),rgba(0,194,255,0.15))] ring-1 ring-white/10">
                    <Icon className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <h3 className="relative mt-5 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
