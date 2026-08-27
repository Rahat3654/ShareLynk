import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Downloads } from "@/components/sections/Downloads";

export const metadata: Metadata = {
  title: "Downloads — ShareLynk",
  description:
    "Download official ShareLynk apps for Windows, macOS, Android, and Linux.",
};

// No incremental cache is configured on Workers (see open-next.config.ts),
// so `revalidate` would silently never fire. Render on every request instead.
export const dynamic = "force-dynamic";

export default function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <Downloads />
      </main>
      <Footer />
    </>
  );
}
