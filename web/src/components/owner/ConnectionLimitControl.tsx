"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { setConnectionLimit } from "@/app/owner/actions";
import { FormError } from "@/components/owner/Field";

/**
 * Connection-limit stepper.
 *
 * Steps mirror the Flutter owner portal exactly (my_routers_screen.dart:129):
 * 2-10 by 1, 10-50 by 5, 50-100 by 10, then Unlimited. Both clients drive the
 * same PATCH /routers/{id}/connection-limit, so a limit set here is the same
 * setting the app shows — there is no second mechanism.
 *
 * `null` means unlimited; the backend rejects any number below 2
 * (ConnectionLimitRequest: ge=2).
 */
const MIN = 2;
const MAX = 100;

function step(value: number): number {
  if (value < 10) return 1;
  if (value < 50) return 5;
  return 10;
}

function increment(current: number | null): number | null {
  if (current === null) return null; // already unlimited
  const next = current + step(current);
  return next > MAX ? null : next; // stepping past 100 means unlimited
}

function decrement(current: number | null): number | null {
  if (current === null) return MAX; // come back down from unlimited
  // Step by the band below the current value, so 50 -> 45 rather than 50 -> 40.
  const next = current - step(current - 1);
  return next < MIN ? MIN : next;
}

export function ConnectionLimitControl({
  routerId,
  initialLimit,
}: {
  routerId: string;
  initialLimit: number | null;
}) {
  const [limit, setLimit] = useState<number | null>(initialLimit);
  const [saved, setSaved] = useState<number | null>(initialLimit);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty = limit !== saved;

  function save() {
    setError(null);
    startTransition(async () => {
      const result = await setConnectionLimit(routerId, limit);
      if (!result.ok) {
        setError(result.error);
        // Put the control back to the value the server still holds, so the UI
        // never claims a limit that was not stored.
        setLimit(saved);
        return;
      }
      setSaved(result.data.connection_limit);
      setLimit(result.data.connection_limit);
    });
  }

  const display = limit === null ? "Unlimited" : String(limit);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setLimit(decrement(limit))}
          disabled={pending || limit === MIN}
          aria-label="Decrease connection limit"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.1] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>

        <output
          aria-live="polite"
          className="min-w-[7rem] flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-center text-lg font-semibold tabular-nums text-white"
        >
          {display}
        </output>

        <button
          type="button"
          onClick={() => setLimit(increment(limit))}
          disabled={pending || limit === null}
          aria-label="Increase connection limit"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.1] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <FormError message={error} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending || !dirty}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-5 text-sm font-medium text-white shadow-glow-sm transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? "Saving…" : "Save limit"}
        </button>
        {!dirty && !pending ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            Saved
          </span>
        ) : null}
      </div>
    </div>
  );
}
