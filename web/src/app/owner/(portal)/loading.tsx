import { Skeleton, StatGridSkeleton } from "@/components/owner/States";

/**
 * Shown while a portal page's server render is in flight. The owner API talks
 * to a Render free-tier backend that can take tens of seconds to wake, so this
 * is a real state people will see, not a formality.
 */
export default function OwnerPortalLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading your ShareLynk owner data…</span>
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <StatGridSkeleton />
      <Skeleton className="h-64" />
      <Skeleton className="h-52" />
    </div>
  );
}
