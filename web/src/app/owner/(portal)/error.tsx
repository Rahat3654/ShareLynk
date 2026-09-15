"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Last-resort boundary for the portal.
 *
 * Individual panels already report their own failures, so reaching this means
 * something outside them broke — most often the backend being unreachable
 * while the layout loads the profile. The real error is logged for the
 * console but never rendered: backend exception text can carry internal
 * detail and is not useful to an owner.
 */
export default function OwnerPortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[owner-portal]", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10">
        <AlertTriangle className="h-6 w-6 text-amber-400" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-lg font-semibold text-white">
        We couldn&apos;t load your owner data
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        The ShareLynk server did not respond. This is usually temporary — it can
        take a few seconds to wake up.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 text-sm font-medium text-white shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
