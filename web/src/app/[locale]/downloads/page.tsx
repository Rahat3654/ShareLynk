import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Downloads } from "@/components/sections/Downloads";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getDictionary(params.locale);
  return {
    title: t.downloads.pageTitle,
    description: t.downloads.pageDescription,
    alternates: localeAlternates(params.locale, "/downloads"),
  };
}

// Rendered per request so a release published in the admin panel appears on
// the next page load. The Android download does not wait on the backend for
// long — see CATALOG_TIMEOUT_MS in Downloads.tsx.
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
