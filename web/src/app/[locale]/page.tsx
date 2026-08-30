import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { Roadmap } from "@/components/sections/Roadmap";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} t={t} />
      <main>
        <Hero t={t} />
        <Features t={t} />
        <About t={t} />
        <Roadmap t={t} />
        <Faq t={t} />
        <Newsletter t={t} />
        <Contact t={t} />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
