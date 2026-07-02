import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Secure Connectivity. Smarter Sharing.`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "ShareLynk", "secure wifi sharing", "network management", "connectivity",
    "internet access control", "digital infrastructure", "Dhaka University",
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
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Secure Connectivity. Smarter Sharing.`,
    description: site.description,
    images: [{ url: "/assets/logo/sharelynk-logo.png", width: 1200, height: 630, alt: "ShareLynk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Secure Connectivity. Smarter Sharing.`,
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
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
