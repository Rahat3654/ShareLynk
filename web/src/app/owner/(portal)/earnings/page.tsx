import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, CalendarDays, Clock, Wallet } from "lucide-react";
import { StatCard } from "@/components/owner/StatCard";
import { Panel } from "@/components/owner/Panel";
import { ConnectionsChart } from "@/components/owner/ConnectionsChart";
import { EmptyState, ErrorState } from "@/components/owner/States";
import { ownerGet, settle } from "@/lib/owner/server-api";
import { monthlySeries } from "@/lib/owner/series";
import { bdt, bdtExact, count, hours } from "@/lib/owner/format";
import type { OwnerAnalytics, OwnerEarnings, OwnerRouter } from "@/lib/owner/types";

export const metadata: Metadata = { title: "Earnings" };
export const dynamic = "force-dynamic";

export default async function OwnerEarningsPage() {
  const [earnings, analytics, routers] = await Promise.all([
    settle(ownerGet<OwnerEarnings>("/earnings")),
    settle(ownerGet<OwnerAnalytics>("/analytics")),
    settle(ownerGet<OwnerRouter[]>("/routers")),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Earnings</h1>
        <p className="mt-1 text-sm text-slate-400">
          Every figure is calculated by the ShareLynk backend from real session
          data — the same numbers the app shows.
        </p>
      </header>

      {"error" in earnings ? (
        <ErrorState
          title="Unable to load your earnings"
          message={earnings.error}
          retryHref="/owner/earnings"
        />
      ) : (
        <>
          {/*
            The backend exposes fixed buckets (today / this week / this month /
            lifetime) and no date-range parameter, so there are no custom-range
            filters here. Adding a range picker would mean re-deriving money in
            the browser, which is exactly what must not happen.
          */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Today" value={bdt(earnings.data.today_earnings)} icon={Banknote} accent="money" />
            <StatCard label="This week" value={bdt(earnings.data.weekly_earnings)} icon={CalendarDays} />
            <StatCard label="This month" value={bdt(earnings.data.monthly_earnings)} icon={CalendarDays} />
            <StatCard label="Lifetime" value={bdt(earnings.data.lifetime_earnings)} icon={Banknote} accent="money" />
          </div>

          <Panel
            title="Balance"
            action={
              <Link
                href="/owner/payouts"
                className="text-sm font-medium text-cyan-300 underline-offset-4 hover:underline"
              >
                Request a payout
              </Link>
            }
          >
            <dl className="grid gap-4 sm:grid-cols-3">
              <Figure
                label="Available now"
                value={bdtExact(earnings.data.available_balance)}
                tone="money"
              />
              <Figure label="Pending payouts" value={bdtExact(earnings.data.pending_withdrawals)} />
              <Figure label="Already paid out" value={bdtExact(earnings.data.completed_withdrawals)} />
            </dl>
          </Panel>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Total sessions"
              value={count(earnings.data.total_sessions)}
              icon={Wallet}
              hint="connections that generated earnings"
            />
            <StatCard
              label="Usage this month"
              value={hours(earnings.data.month_usage_hours)}
              icon={Clock}
            />
            <StatCard
              label="Usage all time"
              value={hours(earnings.data.total_usage_hours)}
              icon={Clock}
            />
          </div>
        </>
      )}

      <Panel
        title="Activity over 6 months"
        description="Connections per month. The backend records earnings as totals rather than a time series, so this charts the activity that produces them."
      >
        {"error" in analytics ? (
          <ErrorState message={analytics.error} retryHref="/owner/earnings" />
        ) : (
          <ConnectionsChart
            points={monthlySeries(analytics.data.monthly)}
            label="Connections per month over the last 6 months"
          />
        )}
      </Panel>

      <Panel title="Earnings by network">
        {"error" in routers ? (
          <ErrorState message={routers.error} retryHref="/owner/earnings" />
        ) : routers.data.length === 0 ? (
          <EmptyState
            title="No networks yet"
            message="Earnings appear per network once you have an approved Wi-Fi network."
          />
        ) : (
          <div className="-mx-5 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[32rem] text-sm">
              <caption className="sr-only">Lifetime earnings for each of your networks</caption>
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th scope="col" className="px-5 pb-3 font-medium sm:pl-0">Network</th>
                  <th scope="col" className="px-5 pb-3 text-right font-medium">This month</th>
                  <th scope="col" className="px-5 pb-3 text-right font-medium sm:pr-0">Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {routers.data.map((router) => (
                  <tr key={router.id}>
                    <th scope="row" className="max-w-[16rem] truncate px-5 py-3.5 text-left font-medium text-slate-200 sm:pl-0">
                      <Link
                        href={`/owner/networks/${router.id}`}
                        className="underline-offset-4 hover:text-cyan-300 hover:underline"
                      >
                        {router.ssid}
                      </Link>
                    </th>
                    <td className="px-5 py-3.5 text-right tabular-nums text-slate-400">
                      {count(router.monthly_connections)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-emerald-300 sm:pr-0">
                      {bdt(router.earnings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

function Figure({ label, value, tone }: { label: string; value: string; tone?: "money" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
      <dd
        className={`mt-1.5 text-xl font-semibold tabular-nums ${
          tone === "money" ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
