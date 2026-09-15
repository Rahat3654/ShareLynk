"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { setNetworkEnabled } from "@/app/owner/actions";
import { FormError } from "@/components/owner/Field";
import { cn } from "@/lib/utils";

/**
 * Pause or resume a network. Drives PATCH /routers/{id}/enable — the same
 * switch the Flutter owner portal uses.
 */
export function NetworkEnableToggle({
  routerId,
  initialEnabled,
  disabled,
  disabledReason,
}: {
  routerId: string;
  initialEnabled: boolean;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !enabled;
    setError(null);
    setEnabled(next); // optimistic
    startTransition(async () => {
      const result = await setNetworkEnabled(routerId, next);
      if (!result.ok) {
        setEnabled(!next); // roll back rather than show a state the server rejected
        setError(result.error);
        return;
      }
      setEnabled(result.data.enabled);
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-slate-300" id={`enable-label-${routerId}`}>
          {enabled ? "Serving connections" : "Paused"}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby={`enable-label-${routerId}`}
          onClick={toggle}
          disabled={pending || disabled}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
            "disabled:cursor-not-allowed disabled:opacity-50",
            enabled ? "bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)]" : "bg-white/15",
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform",
              enabled ? "translate-x-6" : "translate-x-1",
            )}
          >
            {pending ? (
              <Loader2 className="h-3 w-3 animate-spin text-ink-900" aria-hidden="true" />
            ) : null}
          </span>
        </button>
      </div>
      {disabled && disabledReason ? (
        <p className="text-xs text-slate-500">{disabledReason}</p>
      ) : null}
      <FormError message={error} />
    </div>
  );
}
