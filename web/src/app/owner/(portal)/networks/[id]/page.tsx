import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Gauge, Signal, Users } from "lucide-react";
import { Panel } from "@/components/owner/Panel";
import { StatCard } from "@/components/owner/StatCard";
import { ErrorState } from "@/components/owner/States";
import { LiveDot, StatusChip } from "@/components/owner/NetworkStatus";
import { ConnectionLimitControl } from "@/components/owner/ConnectionLimitControl";
import { NetworkEnableToggle } from "@/components/owner/NetworkEnableToggle";
import { OwnerApiError, ownerGet } from "@/lib/owner/server-api";
import { bdt, count, dateOnly, humanise, usageHours } from "@/lib/owner/format";
import type { OwnerRouter } from "@/lib/owner/types";

export const dynamic = "force-dynamic";

/**
 * The backend has no GET /routers/{id} — only the list endpoint
 * (owners.py:63). Selecting from the list is therefore the available way to
 * render one network, and it inherits the same ownership scoping: the list is
 * already filtered to the authenticated owner, so an id belonging to someone
 * else simply is not in it and this 404s.
 */
async function loadRouter(id: string): Promise<OwnerRouter | null | { error: string }> {
  try {
    const routers = await ownerGet<OwnerRouter[]>("/routers");
    return routers.find((r) => r.id === id) ?? null;
  } catch (err) {
    return { error: err instanceof OwnerApiError ? err.message : "Unable to load this network." };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const result = await loadRouter(params.id);
  if (!result || "error" in result) return { title: "Network" };
  return { title: result.ssid };
}

export default async function OwnerNetworkDetailPage({ params }: { params: { id: string } }) {
  const result = await loadRouter(params.id);

  if (result && "error" in result) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <BackLink />
        <ErrorState
          title="Unable to load this network"
          message={result.error}
          retryHref={`/owner/networks/${params.id}`}
        />
      </div>
    );
  }
  if (!result) notFound();

  const router = result;
  const approved = router.status === "approved";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <BackLink />

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-white sm:text-2xl">{router.ssid}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <LiveDot status={router.status} enabled={router.enabled} />
            <span className="text-xs text-slate-500">
              Added {dateOnly(router.created_at)} · {humanise(router.network_type)} network
            </span>
          </div>
        </div>
        <StatusChip status={router.status} />
      </header>

      {router.review_note ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
          <p className="font-medium text-slate-200">Note from the ShareLynk team</p>
          <p className="mt-1 text-slate-400">{router.review_note}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total usage"
          value={usageHours(router.usage_hours)}
          icon={Clock}
          accent="live"
          hint="hours of Wi-Fi used"
        />
        <StatCard
          label="Active now"
          value={count(router.connected_users)}
          icon={Users}
        />
        <StatCard
          label="This month"
          value={count(router.monthly_connections)}
          icon={Signal}
          hint="connections"
        />
        <StatCard
          label="Earnings"
          value={bdt(router.earnings)}
          icon={Gauge}
          accent="money"
          hint="from this network"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Panel
          title="Connection limit"
          description="How many people may be connected at once. Applies to the ShareLynk app too."
        >
          <ConnectionLimitControl routerId={router.id} initialLimit={router.connection_limit} />
        </Panel>

        <Panel
          title="Availability"
          description="Pause to stop accepting new connections without removing the network."
        >
          <NetworkEnableToggle
            routerId={router.id}
            initialEnabled={router.enabled}
            disabled={!approved}
            disabledReason={
              router.status === "pending_review"
                ? "This network is still being reviewed, so it cannot be enabled yet."
                : "Rejected networks cannot be enabled. Contact ShareLynk support."
            }
          />
        </Panel>
      </div>

      <Panel title="Details">
        <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
          <Detail label="Network type" value={humanise(router.network_type)} />
          <Detail label="Review status" value={humanise(router.status)} />
          <Detail label="Added via" value={humanise(router.source)} />
          <Detail
            label="Password verified"
            value={router.password_verified ? "Yes" : "Not yet"}
          />
          {/*
            rate_per_minute is set by admins only (backend commit 8eb89b0), so
            it is shown as information and never as an editable field.
          */}
          <Detail
            label="Rate"
            value={
              router.network_type === "paid"
                ? `৳${router.rate_per_minute}/min · set by ShareLynk`
                : "Free network"
            }
          />
          <Detail
            label="Connection limit"
            value={router.connection_limit === null ? "Unlimited" : String(router.connection_limit)}
          />
        </dl>
      </Panel>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/owner/networks"
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      All networks
    </Link>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-slate-200">{value}</dd>
    </div>
  );
}
