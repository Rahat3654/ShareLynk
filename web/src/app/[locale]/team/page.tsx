import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChromaGrid } from "@/components/team/ChromaGrid";
import { chromaAllMembers } from "@/data/team";
import { Users } from "lucide-react";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.team.pageTitle, description: t.team.pageDescription };
}

export default function TeamPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} t={t} />
      <main className="pt-28 pb-20 overflow-x-hidden">
        {/* Page Hero */}
        <section className="relative overflow-hidden pt-12 pb-14">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-b opacity-50" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[130px]" />

          <div className="container text-center max-w-4xl mx-auto">
            <span className="eyebrow mx-auto">
              <Users className="h-3.5 w-3.5" /> {t.team.eyebrow}
            </span>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.team.titleA} <span className="text-gradient">{t.team.titleB}</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto font-normal">
              {t.team.subtitle}
            </p>
          </div>
        </section>

        {/* Interactive Continuous ChromaGrid Showcase featuring all team members */}
        <section className="w-full pb-12">
          <ChromaGrid items={chromaAllMembers} continuousSlide={true} slideDuration={38} />
        </section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
