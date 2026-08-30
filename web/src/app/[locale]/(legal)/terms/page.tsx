import type { Metadata } from "next";
import { LegalPage } from "../legal";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).legal.termsTitle };
}

export default function TermsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const t = getDictionary(params.locale);

  return (
    <LegalPage
      locale={params.locale}
      t={t}
      title={t.legal.termsTitle}
      intro={t.legal.terms.intro}
      sections={t.legal.terms.sections}
    />
  );
}
