import { cn } from "@/lib/utils";

/**
 * Withdrawal status. The backend creates rows as "pending"
 * (owner_service.py:247); the admin flow moves them on from there. Unknown
 * values render verbatim rather than being forced into a known bucket.
 */
export function PayoutStatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    approved: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    processing: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    paid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    rejected: "border-red-400/30 bg-red-400/10 text-red-300",
    cancelled: "border-white/15 bg-white/[0.06] text-slate-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize",
        map[status] ?? "border-white/15 bg-white/[0.06] text-slate-300",
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
