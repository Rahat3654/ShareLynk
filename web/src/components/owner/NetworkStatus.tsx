import { cn } from "@/lib/utils";

/**
 * Review status of a network, exactly as the backend records it
 * (models.py:542 defaults to "pending_review"; the admin flow sets "approved"
 * or "rejected"). Anything unrecognised is shown verbatim rather than being
 * coerced into one of the three, so a new backend status is visible instead of
 * silently mislabelled.
 */
export function StatusChip({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    approved: { label: "Approved", className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
    pending_review: { label: "In review", className: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
    rejected: { label: "Rejected", className: "border-red-400/30 bg-red-400/10 text-red-300" },
  };
  const tone = map[status] ?? {
    label: status.replace(/_/g, " "),
    className: "border-white/15 bg-white/[0.06] text-slate-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize",
        tone.className,
      )}
    >
      {tone.label}
    </span>
  );
}

/**
 * Whether the network is currently serving.
 *
 * "Live" requires BOTH admin approval and the owner's own enable switch — a
 * paused-but-approved network is not online, and saying otherwise would have
 * an owner wondering why an "online" network earns nothing.
 */
export function LiveDot({ status, enabled }: { status: string; enabled: boolean }) {
  const live = status === "approved" && enabled;
  const label = live ? "Live" : status === "approved" ? "Paused" : "Not serving";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          live ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" : "bg-slate-500",
        )}
        aria-hidden="true"
      />
      <span className={live ? "text-emerald-300" : "text-slate-400"}>{label}</span>
    </span>
  );
}
