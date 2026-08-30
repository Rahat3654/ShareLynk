import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Downloads } from "@/components/sections/Downloads";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return { title: t.downloads.pageTitle, description: t.downloads.pageDescription };
}

// No incremental cache is configured on Workers (see open-next.config.ts), so
// `revalidate` would silently never fire. Render on every request instead —
// which is also what makes a newly published release appear immediately.
export const dynamic = "force-dynamic";

export default function DownloadsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} t={t} />
      <main className="pt-24 pb-16">
        <Downloads locale={locale} t={t} />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
