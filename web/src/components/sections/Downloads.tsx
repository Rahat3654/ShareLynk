import { apiGet } from "@/lib/api";
import type { PlatformDownload } from "@/lib/types";
import { fallbackDownloads } from "@/data/fallback-downloads";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DownloadTable } from "./DownloadTable";
import { AlertTriangle } from "lucide-react";

// Server component: fetches the live download catalog on every request (the
// page is force-dynamic), so a release published in the admin panel shows up
// immediately — creates, edits and deletes alike.
//
// fallback-downloads.ts is a last resort so the page still renders during a
// backend outage. It used to be swallowed by a bare `catch`, which meant a
// completely unreachable backend looked identical to a healthy one and the site
// served stale hardcoded versions for days. It is now logged and flagged.
export async function Downloads() {
  let platforms: PlatformDownload[];
  let staleReason: string | null = null;

  try {
    platforms = await apiGet<PlatformDownload[]>("/downloads");
    if (!platforms?.length) {
      staleReason = "The backend returned an empty catalog.";
      platforms = fallbackDownloads;
    }
  } catch (err) {
    staleReason = err instanceof Error ? err.message : String(err);
    console.error("[downloads] live catalog unavailable, serving fallback:", err);
    platforms = fallbackDownloads;
  }

  return (
    <section id="downloads" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="ডাউনলোড"
          title={
            <>
              আপনার ডিভাইসের জন্য <span className="text-gradient">ShareLynk অ্যাপ নিন</span>
            </>
          }
          description="নিচের তালিকা থেকে আপনার অপারেটিং সিস্টেম নির্বাচন করে অফিশিয়াল ভেরিফাইড ইনস্টলারটি সহজে ডাউনলোড করে নিন।"
        />

        {staleReason && (
          <div
            role="status"
            className="mx-auto mt-8 flex max-w-6xl items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-semibold">
                রিলিজ তালিকা সাময়িকভাবে হালনাগাদ করা যায়নি — নিচে সর্বশেষ জানা সংস্করণ দেখানো হচ্ছে।
              </p>
              <p className="mt-1 text-amber-200/70">
                We could not reach the release service, so this list may be out of date.
              </p>
            </div>
          </div>
        )}

        <DownloadTable platforms={platforms} />
      </div>
    </section>
  );
}
