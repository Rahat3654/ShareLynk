import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Shared shell for simple long-form legal pages.
export function LegalPage({
  title, updated, children,
}: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container max-w-3xl pt-36">
        <h1 className="text-4xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
        <div className="prose-invert mt-10 space-y-6 pb-24 text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_p]:leading-relaxed [&_p]:text-slate-400">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
