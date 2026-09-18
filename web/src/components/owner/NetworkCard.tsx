import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { LiveDot, StatusChip } from "@/components/owner/NetworkStatus";
import { bdt, count, usageHours } from "@/lib/owner/format";
import type { OwnerRouter } from "@/lib/owner/types";

export function NetworkCard({ router }: { router: OwnerRouter }) {
  const limit = router.connection_limit;
  return (
    <div className="glass flex h-full flex-col rounded-2xl p-5 shadow-card transition-colors hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white" title={router.ssid}>
            {router.ssid}
          </h3>
          <div className="mt-1.5">
            <LiveDot status={router.status} enabled={router.enabled} />
          </div>
        </div>
        <StatusChip status={router.status} />
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div>
          <dt className="sr-only">Active users</dt>
          <dd className="flex items-center justify-center gap-1.5 text-sm font-semibold tabular-nums text-white">
            <Users className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            {count(router.connected_users)}
            {typeof limit === "number" ? (
              <span className="text-slate-500">/{limit}</span>
            ) : null}
          </dd>
          <p className="mt-0.5 text-[11px] text-slate-500">Active</p>
        </div>
        {/*
          Usage replaces the separate Limit column: the limit already shows as
          "active / limit" beside it, and the network page has the full control.
        */}
        <div>
          <dt className="sr-only">Total usage</dt>
          <dd className="flex items-center justify-center gap-1.5 text-sm font-semibold tabular-nums text-white">
            <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            {usageHours(router.usage_hours)}
          </dd>
          <p className="mt-0.5 text-[11px] text-slate-500">Used</p>
        </div>
        <div>
          <dt className="sr-only">Earnings</dt>
          <dd className="text-sm font-semibold tabular-nums text-emerald-300">
            {bdt(router.earnings)}
          </dd>
          <p className="mt-0.5 text-[11px] text-slate-500">Earned</p>
        </div>
      </dl>

      <Link
        href={`/owner/networks/${router.id}`}
        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
      >
        Manage
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only"> {router.ssid}</span>
      </Link>
    </div>
  );
}
