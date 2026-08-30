import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Dictionary, Locale } from "@/i18n";

// Shared shell for simple long-form legal pages.
export function LegalPage({
  locale,
  t,
  title,
  intro,
  sections,
}: {
  locale: Locale;
  t: Dictionary;
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <>
      <Navbar locale={locale} t={t} />
      <main className="container max-w-3xl pt-36">
        <h1 className="text-4xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          {t.legal.lastUpdatedLabel} {t.legal.lastUpdated}
        </p>
        <div className="prose-invert mt-10 space-y-6 pb-24 text-slate-300">
          <p className="leading-relaxed text-slate-400">{intro}</p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="mt-10 text-xl font-semibold text-white">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-slate-400">{s.p}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
