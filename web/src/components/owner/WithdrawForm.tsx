"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { requestWithdrawal } from "@/app/owner/actions";
import { Field, FormError, FormNotice } from "@/components/owner/Field";
import { bdtExact } from "@/lib/owner/format";

const METHOD_LABELS: Record<string, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  bank: "Bank transfer",
};

/**
 * Payout request form.
 *
 * The method list and the minimum come from GET /withdrawals/config rather
 * than being hardcoded, so if the backend adds a provider this form offers it
 * without a code change. The minimum and the available-balance ceiling are
 * enforced server-side; the checks here are only to save a round trip.
 */
export function WithdrawForm({
  methods,
  minimum,
  available,
}: {
  methods: string[];
  minimum: number;
  available: number | null;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(methods[0] ?? "bkash");
  const [account, setAccount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const parsed = Number(amount);
  const belowMinimum = amount !== "" && Number.isFinite(parsed) && parsed < minimum;
  const overBalance =
    available !== null && amount !== "" && Number.isFinite(parsed) && parsed > available;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const result = await requestWithdrawal({
        amount_bdt: parsed,
        method,
        account_details: account,
      });
      if (!result.ok) {
        setError(result.error);
        if (result.unauthenticated) router.replace("/owner/login");
        return;
      }
      setNotice(`Payout of ${bdtExact(result.data.amount_bdt)} requested. We'll review it shortly.`);
      setAmount("");
      setAccount("");
      router.refresh();
    });
  }

  const blocked = available !== null && available < minimum;

  if (blocked) {
    return (
      <p className="text-sm text-slate-400">
        You need at least {bdtExact(minimum)} available to request a payout. Your
        balance is {bdtExact(available)}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="withdraw-amount"
          label="Amount (BDT)"
          type="number"
          inputMode="decimal"
          min={minimum}
          step="1"
          value={amount}
          onChange={setAmount}
          required
          placeholder={String(minimum)}
          hint={
            available !== null
              ? `Minimum ${bdtExact(minimum)} · ${bdtExact(available)} available`
              : `Minimum ${bdtExact(minimum)}`
          }
        />

        <div>
          <label htmlFor="withdraw-method" className="mb-1.5 block text-sm font-medium text-slate-300">
            Payout method
          </label>
          <select
            id="withdraw-method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors focus:border-brand-cyan/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50"
          >
            {methods.map((m) => (
              <option key={m} value={m} className="bg-ink-900">
                {METHOD_LABELS[m] ?? m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field
        id="withdraw-account"
        label={method === "bank" ? "Bank account details" : "Mobile number"}
        value={account}
        onChange={setAccount}
        required
        placeholder={method === "bank" ? "Account name, number, branch" : "01XXXXXXXXX"}
        hint="Where the money should be sent."
      />

      {belowMinimum ? <FormError message={`The minimum payout is ${bdtExact(minimum)}.`} /> : null}
      {overBalance ? <FormError message="That is more than your available balance." /> : null}
      <FormError message={error} />
      <FormNotice message={notice} />

      <button
        type="submit"
        disabled={pending || !amount || !account || belowMinimum || overBalance}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 text-sm font-medium text-white shadow-glow-sm transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {pending ? "Requesting…" : "Request payout"}
      </button>
    </form>
  );
}
