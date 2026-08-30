import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Bengali, Anek_Bangla } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n";
import { isLocale, locales, localeTags, type Locale } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-english",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["bengali"],
  variable: "--font-sans-bengali",
  display: "swap",
});

const anekBangla = Anek_Bangla({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["bengali"],
  variable: "--font-display-bengali",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: `%s · ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    keywords: [
      "ShareLynk", "secure wifi sharing", "network management", "connectivity",
      "internet access control", "digital infrastructure", "Dhaka University",
      "শেয়ারলিংক", "ওয়াইফাই শেয়ারিং", "নেটওয়ার্ক ম্যানেজমেন্ট",
    ],
    authors: [{ name: "ShareLynk" }],
    creator: "ShareLynk",
    icons: {
      icon: "/assets/logo/sharelynk-logo.png",
      apple: "/assets/logo/sharelynk-logo.png",
    },
    // Tell search engines both languages exist and which is the fallback —
    // without hreflang they treat one locale as a duplicate of the other.
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: {
        bn: `${site.url}/bn`,
        en: `${site.url}/en`,
        "x-default": `${site.url}/bn`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeTags[locale].replace("-", "_"),
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: t.meta.homeTitle,
      description: t.meta.description,
      images: [{ url: "/assets/logo/sharelynk-logo.png", width: 1200, height: 630, alt: "ShareLynk" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.homeTitle,
      description: t.meta.description,
      images: ["/assets/logo/sharelynk-logo.png"],
      creator: "@sharelynk",
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#07132B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const t = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/assets/logo/sharelynk-logo.png`,
    description: t.meta.description,
    slogan: t.meta.tagline,
    foundingLocation: {
      "@type": "Place",
      name: "University of Dhaka, Bangladesh",
    },
    sameAs: [
      "https://facebook.com/sharelynk",
      "https://linkedin.com/company/sharelynk",
      "https://github.com/sharelynk",
      "https://x.com/sharelynk",
    ],
  };

  return (
    <html
      lang={localeTags[locale]}
      className={`${inter.variable} ${notoSansBengali.variable} ${anekBangla.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased" data-locale={locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
