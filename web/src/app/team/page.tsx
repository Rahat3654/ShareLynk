import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChromaGrid } from "@/components/team/ChromaGrid";
import { chromaAllMembers } from "@/data/team";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "People Behind ShareLynk — Team & Interns",
  description:
    "Meet the people contributing their ideas, creativity, and technical skills to build the future of ShareLynk — leadership, core engineers, and interns.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 overflow-x-hidden">
        {/* Page Hero */}
        <section className="relative overflow-hidden pt-12 pb-14">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-50" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[130px]" />

          <div className="container text-center max-w-4xl mx-auto">
            <span className="eyebrow mx-auto">
              <Users className="h-3.5 w-3.5" /> The People Behind the Product
            </span>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Meet the People Behind <span className="text-gradient">ShareLynk</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto font-normal">
              Meet the talented engineers, researchers, and interns contributing their ideas, creativity, and technical skills to build the future of ShareLynk.
            </p>
          </div>
        </section>

        {/* Interactive Continuous ChromaGrid Showcase featuring all team members */}
        <section className="w-full pb-12">
          <ChromaGrid
            items={chromaAllMembers}
            radius={280}
            damping={0.45}
            fadeOut={0.6}
            continuousSlide={true}
            slideDuration={38}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
