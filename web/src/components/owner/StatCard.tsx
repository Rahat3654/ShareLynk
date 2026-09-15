import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One headline figure.
 *
 * `value` is always a string the caller has already formatted, so the card
 * never decides how money or hours are rendered — that lives in
 * lib/owner/format.ts and stays consistent across every page.
 */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "default",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  accent?: "default" | "money" | "live";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 shadow-card transition-colors hover:bg-white/[0.06]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
        {Icon ? (
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              accent === "money" && "bg-emerald-400/10 text-emerald-300",
              accent === "live" && "bg-cyan-400/10 text-cyan-300",
              accent === "default" && "bg-white/[0.06] text-slate-300",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p
        className={cn(
          "mt-3 text-2xl font-semibold tabular-nums tracking-tight sm:text-[1.75rem]",
          accent === "money" ? "text-emerald-300" : "text-white",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
