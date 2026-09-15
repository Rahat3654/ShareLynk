import type { Metadata } from "next";
import { Activity, Clock, Repeat, Users } from "lucide-react";
import { StatCard } from "@/components/owner/StatCard";
import { Panel } from "@/components/owner/Panel";
import { ConnectionsChart } from "@/components/owner/ConnectionsChart";
import { ErrorState } from "@/components/owner/States";
import { ownerGet, settle } from "@/lib/owner/server-api";
import { dailySeries, monthlySeries } from "@/lib/owner/series";
import { count, hours, peakHour } from "@/lib/owner/format";
import type { OwnerAnalytics, OwnerEarnings } from "@/lib/owner/types";

export const metadata: Metadata = { title: "Usage" };
export const dynamic = "force-dynamic";

/**
 * Usage, not Sessions.
 *
 * There is no owner-facing per-session endpoint: GET /api/owners/sessions is
 * 404, and the per-user activity list was deliberately removed from the owner
 * portal (ShareLynk_wifi commit 09875cf — "user activity is admin-only now")
 * because it exposed what individual end users were doing on someone's Wi-Fi.
 *
 * Rather than re-create that, or invent rows, this page shows the aggregates
 * the backend genuinely publishes for an owner.
 */
export default async function OwnerUsagePage() {
  const [analytics, earnings] = await Promise.all([
    settle(ownerGet<OwnerAnalytics>("/analytics")),
    settle(ownerGet<OwnerEarnings>("/earnings")),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Usage</h1>
        <p className="mt-1 text-sm text-slate-400">
          How busy your networks are, aggregated across everyone who connects.
        </p>
      </header>

      {"error" in analytics ? (
        <ErrorState
          title="Unable to load your usage"
          message={analytics.error}
          retryHref="/owner/usage"
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Connected now"
              value={count(analytics.data.current_active_connections)}
              icon={Activity}
              accent="live"
            />
            <StatCard
              label="Today"
              value={count(analytics.data.today_connections)}
              icon={Users}
              hint={`${count(analytics.data.weekly_connections)} this week`}
            />
            <StatCard
              label="Average session"
              value={
                analytics.data.avg_session_minutes > 0
                  ? `${Math.round(analytics.data.avg_session_minutes)} min`
                  : "—"
              }
              icon={Clock}
            />
            <StatCard
              label="Busiest hour"
              value={peakHour(analytics.data.peak_hour)}
              icon={Activity}
              hint="UTC, last 30 days"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              label="People served"
              value={count(analytics.data.unique_users)}
              icon={Users}
              hint="unique users, all time"
            />
            <StatCard
              label="Came back"
              value={count(analytics.data.returning_users)}
              icon={Repeat}
              hint="users with more than one session"
            />
          </div>

          <Panel title="Connections this week">
            <ConnectionsChart
              points={dailySeries(analytics.data.daily)}
              label="Connections per day over the last 7 days"
            />
          </Panel>

          <Panel title="Connections by month">
            <ConnectionsChart
              points={monthlySeries(analytics.data.monthly)}
              label="Connections per month over the last 6 months"
            />
          </Panel>
        </>
      )}

      <Panel
        title="Time online"
        description="Total connected time across all sessions on your networks."
      >
        {"error" in earnings ? (
          <ErrorState message={earnings.error} retryHref="/owner/usage" />
        ) : (
          <dl className="grid gap-4 sm:grid-cols-3">
            <Figure label="Today" value={hours(earnings.data.today_usage_hours)} />
            <Figure label="This month" value={hours(earnings.data.month_usage_hours)} />
            <Figure label="All time" value={hours(earnings.data.total_usage_hours)} />
          </dl>
        )}
      </Panel>

      <p className="text-xs leading-relaxed text-slate-500">
        Individual sessions are not shown here. ShareLynk keeps per-user
        activity private to the people who connect to your network — you see
        totals, not who did what.
      </p>
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-1.5 text-xl font-semibold tabular-nums text-white">{value}</dd>
    </div>
  );
}
