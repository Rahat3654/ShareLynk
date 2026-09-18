import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Clock, Users, Wifi } from "lucide-react";
import { StatCard } from "@/components/owner/StatCard";
import { Panel } from "@/components/owner/Panel";
import { ConnectionsChart } from "@/components/owner/ConnectionsChart";
import { NetworkCard } from "@/components/owner/NetworkCard";
import { EmptyState, ErrorState } from "@/components/owner/States";
import { ownerGet, settle } from "@/lib/owner/server-api";
import { dailySeries } from "@/lib/owner/series";
import { bdt, count, hours, usageHours } from "@/lib/owner/format";
import type { OwnerAnalytics, OwnerDashboard, OwnerRouter } from "@/lib/owner/types";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function OwnerDashboardPage() {
  // One round of requests per page view — no polling and no heartbeat. The
  // three calls are issued together so a cold Render instance costs one wait,
  // not three, and settle() keeps a failure in one panel from blanking the
  // others.
  const [summary, analytics, routers] = await Promise.all([
    settle(ownerGet<OwnerDashboard>("/dashboard")),
    settle(ownerGet<OwnerAnalytics>("/analytics")),
    settle(ownerGet<OwnerRouter[]>("/routers")),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Owner Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your Wi-Fi networks, activity and earnings at a glance.
        </p>
      </header>

      {"error" in summary ? (
        <ErrorState
          title="Unable to load your overview"
          message={summary.error}
          retryHref="/owner/dashboard"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/*
            Usage leads: it is the one number every owner can check against
            what they see in their shop. Recorded session durations, never an
            estimate — the same figure as the Earnings and Usage pages.
          */}
          <StatCard
            label="Total usage"
            value={usageHours(summary.data.total_usage_hours)}
            icon={Clock}
            accent="live"
            hint={
              summary.data.total_usage_hours === undefined
                ? "Hours of Wi-Fi used on your networks"
                : `${hours(summary.data.month_usage_hours)} this month · ${hours(summary.data.today_usage_hours)} today`
            }
          />
          <StatCard
            label="Total earnings"
            value={bdt(summary.data.total_earnings)}
            icon={Banknote}
            accent="money"
            hint={`${bdt(summary.data.monthly_earnings)} this month · ${bdt(summary.data.available_balance)} available`}
          />
          <StatCard
            label="Active users"
            value={count(summary.data.current_active_connections)}
            icon={Users}
            hint={`${count(summary.data.today_connections)} connected today`}
          />
          <StatCard
            label="Wi-Fi networks"
            value={count(summary.data.total_routers)}
            icon={Wifi}
            hint={
              summary.data.pending_routers > 0
                ? `${count(summary.data.active_routers)} active · ${count(summary.data.pending_routers)} in review`
                : `${count(summary.data.active_routers)} active`
            }
          />
        </div>
      )}

      <Panel
        title="Connections this week"
        // Named for what the data is. The backend exposes no earnings time
        // series, so charting this as revenue would be a fabricated curve.
        description="Sessions started on your networks over the last 7 days."
      >
        {"error" in analytics ? (
          <ErrorState message={analytics.error} retryHref="/owner/dashboard" />
        ) : (
          <ConnectionsChart
            points={dailySeries(analytics.data.daily)}
            label="Connections per day over the last 7 days"
          />
        )}
      </Panel>

      <Panel
        title="My Wi-Fi networks"
        action={
          <Link
            href="/owner/networks"
            className="text-sm font-medium text-cyan-300 underline-offset-4 hover:underline"
          >
            View all
          </Link>
        }
      >
        {"error" in routers ? (
          <ErrorState message={routers.error} retryHref="/owner/dashboard" />
        ) : routers.data.length === 0 ? (
          <EmptyState
            icon={Wifi}
            title="No Wi-Fi networks yet"
            message="Wi-Fi a ShareLynk agent registers with your account's email appears here automatically, as do routers you add in the ShareLynk app once they are approved."
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {routers.data.slice(0, 4).map((router) => (
              <li key={router.id}>
                <NetworkCard router={router} />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
