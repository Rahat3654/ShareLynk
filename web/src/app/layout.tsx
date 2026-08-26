import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Bengali, Anek_Bangla } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — সহজ কানেক্টিভিটি • নিরাপদ শেয়ারিং`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ShareLynk", "secure wifi sharing", "network management", "connectivity",
    "internet access control", "digital infrastructure", "Dhaka University",
    "শেয়ারলিংক", "ওয়াইফাই শেয়ারিং", "নেটওয়ার্ক ম্যানেজমেন্ট",
  ],
  authors: [{ name: "ShareLynk" }],
  creator: "ShareLynk",
  // Replace with official ShareLynk logo
  icons: {
    icon: "/assets/logo/sharelynk-logo.png",
    apple: "/assets/logo/sharelynk-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — সহজ কানেক্টিভিটি • নিরাপদ শেয়ারিং`,
    description: site.description,
    images: [{ url: "/assets/logo/sharelynk-logo.png", width: 1200, height: 630, alt: "ShareLynk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — সহজ কানেক্টিভিটি • নিরাপদ শেয়ারিং`,
    description: site.description,
    images: ["/assets/logo/sharelynk-logo.png"],
    creator: "@sharelynk",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#07132B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Schema.org structured data for rich results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/assets/logo/sharelynk-logo.png`,
  description: site.description,
  slogan: site.tagline,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoSansBengali.variable} ${anekBangla.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
