import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { CSSProperties } from "react";
import "../globals.css";

// The owner portal is a second root layout, parallel to /[locale]. It is
// deliberately outside the locale tree: it is an authenticated tool rather
// than indexable marketing copy, and the Flutter owner portal it mirrors is
// English-only too (owner_shell.dart), so duplicating it per locale would
// invent a translation the product does not have.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-english",
  display: "swap",
});

/**
 * globals.css builds --font-sans from the Bengali faces first. Those are not
 * loaded here, and an undefined custom property makes the whole font-family
 * declaration invalid, so the chain is re-pointed at Inter for this subtree.
 */
const fontVars = {
  "--font-sans": "var(--font-sans-english), ui-sans-serif, system-ui, sans-serif",
  "--font-display": "var(--font-sans-english), ui-sans-serif, system-ui, sans-serif",
} as CSSProperties;

export const metadata: Metadata = {
  title: { default: "ShareLynk Owner", template: "%s · ShareLynk Owner" },
  description: "Manage your Wi-Fi. Track your earnings.",
  // Owner pages show one person's networks and money. Keeping them out of
  // search indexes is a privacy requirement, not an SEO preference.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#07132B",
  colorScheme: "dark",
};

export default function OwnerRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} style={fontVars}>
      <body className="min-h-screen bg-ink-950 text-slate-200 antialiased">{children}</body>
    </html>
  );
}
