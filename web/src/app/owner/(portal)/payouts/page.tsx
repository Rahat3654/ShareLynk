import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import { Panel } from "@/components/owner/Panel";
import { StatCard } from "@/components/owner/StatCard";
import { EmptyState, ErrorState } from "@/components/owner/States";
import { WithdrawForm } from "@/components/owner/WithdrawForm";
import { PayoutStatusChip } from "@/components/owner/PayoutStatusChip";
import { ownerGet, settle } from "@/lib/owner/server-api";
import { bdtExact, dateTime, humanise } from "@/lib/owner/format";
import type { OwnerEarnings, Withdrawal, WithdrawalConfig } from "@/lib/owner/types";

export const metadata: Metadata = { title: "Payouts" };
export const dynamic = "force-dynamic";

export default async function OwnerPayoutsPage() {
  const [earnings, withdrawals, config] = await Promise.all([
    settle(ownerGet<OwnerEarnings>("/earnings")),
    settle(ownerGet<Withdrawal[]>("/withdrawals")),
    settle(ownerGet<WithdrawalConfig>("/withdrawals/config")),
  ]);

  const available = "error" in earnings ? null : earnings.data.available_balance;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Payouts</h1>
        <p className="mt-1 text-sm text-slate-400">
          Withdraw your available balance and follow the status of past requests.
        </p>
      </header>

      {"error" in earnings ? (
        <ErrorState
          title="Unable to load your balance"
          message={earnings.error}
          retryHref="/owner/payouts"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Available balance"
            value={bdtExact(earnings.data.available_balance)}
            icon={Wallet}
            accent="money"
          />
          <StatCard label="Pending" value={bdtExact(earnings.data.pending_withdrawals)} />
          <StatCard label="Paid out" value={bdtExact(earnings.data.completed_withdrawals)} />
        </div>
      )}

      <Panel
        title="Request a payout"
        description="Requests are reviewed by the ShareLynk team before payment."
      >
        {"error" in config ? (
          <ErrorState message={config.error} retryHref="/owner/payouts" />
        ) : (
          <WithdrawForm
            methods={config.data.methods}
            minimum={config.data.minimum_bdt}
            available={available}
          />
        )}
      </Panel>

      <Panel title="Payout history">
        {"error" in withdrawals ? (
          <ErrorState message={withdrawals.error} retryHref="/owner/payouts" />
        ) : withdrawals.data.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No payouts yet"
            message="Once you request a payout it appears here with its status."
          />
        ) : (
          <div className="-mx-5 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[40rem] text-sm">
              <caption className="sr-only">Your payout requests</caption>
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th scope="col" className="px-5 pb-3 font-medium sm:pl-0">Requested</th>
                  <th scope="col" className="px-5 pb-3 font-medium">Method</th>
                  <th scope="col" className="px-5 pb-3 text-right font-medium">Amount</th>
                  <th scope="col" className="px-5 pb-3 font-medium">Status</th>
                  <th scope="col" className="px-5 pb-3 font-medium sm:pr-0">Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {withdrawals.data.map((w) => (
                  <tr key={w.id}>
                    <th scope="row" className="whitespace-nowrap px-5 py-3.5 text-left font-medium text-slate-300 sm:pl-0">
                      {dateTime(w.created_at)}
                    </th>
                    <td className="px-5 py-3.5 text-slate-400">{humanise(w.method)}</td>
                    <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-white">
                      {bdtExact(w.amount_bdt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <PayoutStatusChip status={w.status} />
                      {w.admin_note ? (
                        <p className="mt-1 max-w-[18rem] text-xs text-slate-500">{w.admin_note}</p>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-slate-400 sm:pr-0">
                      {dateTime(w.processed_at)}
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
