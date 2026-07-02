import { GraduationCap, Target, Users, Globe2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  { icon: GraduationCap, title: "Born at Dhaka University", text: "ShareLynk began as an innovation project inside the University of Dhaka, Bangladesh — solving connectivity gaps students faced every day." },
  { icon: Users, title: "Built by passionate engineers", text: "A team obsessed with reliability, security, and craft — shipping software we're proud to put our name on." },
  { icon: Target, title: "Focused on real problems", text: "We build for the messy reality of shared networks: unreliable links, mixed devices, and the need for control." },
  { icon: Globe2, title: "A global mission", text: "Our long-term goal is to build connectivity products trusted and used by people and organizations worldwide." },
];

export function About() {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title={
                <>
                  From a campus idea to <span className="text-gradient">global connectivity</span>
                </>
              }
            />
            <Reveal delay={2}>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                ShareLynk is building the future of secure digital connectivity. We create
                intelligent solutions that let people and organizations securely share internet
                access, manage networks, simplify connectivity, and build smarter digital
                infrastructure.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm uppercase tracking-widest text-cyan-200/70">Our Vision</p>
                <p className="mt-2 text-xl font-medium text-white">
                  To become the world&apos;s most trusted platform for controlled digital
                  connectivity and network sharing.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-cyan/30">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/15 ring-1 ring-white/10">
                    <p.icon className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
