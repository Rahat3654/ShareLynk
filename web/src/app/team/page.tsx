import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChromaGrid } from "@/components/team/ChromaGrid";
import { TeamHero } from "@/components/team/TeamHero";
import { chromaAllMembers } from "@/data/team";

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
        <TeamHero />
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
