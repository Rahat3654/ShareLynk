import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shimmer block used while a server component streams in. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-white/[0.06] after:to-transparent",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export function StatCardSkeleton() {
  return <Skeleton className="h-[108px]" />;
}

export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Failure of one panel, not the page.
 *
 * `retry` is a plain link back to the same route rather than a client-side
 * refetch: the data is fetched during the server render, so re-requesting the
 * page is what actually retries it.
 */
export function ErrorState({
  title = "Something went wrong",
  message,
  retryHref,
}: {
  title?: string;
  message: string;
  retryHref?: string;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.07] p-5 text-sm"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-100">{title}</p>
          <p className="mt-1 text-amber-200/75">{message}</p>
        </div>
      </div>
      {retryHref ? (
        <a
          href={retryHref}
          className="ml-8 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 px-3 py-1.5 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Try again
        </a>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  icon: Icon = Inbox,
  children,
}: {
  title: string;
  message: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05]">
        <Icon className="h-5.5 w-5.5 text-slate-400" aria-hidden />
      </span>
      <p className="mt-4 font-semibold text-slate-200">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm text-slate-400">{message}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
