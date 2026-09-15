"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError, FormNotice } from "@/components/owner/Field";

/**
 * Password reset, in the two calls the backend actually exposes:
 *
 *   POST /forgot-password { email }                       -> emails a code
 *   POST /reset-password  { email, otp, new_password }    -> sets the password
 *
 * The backend answers /forgot-password with a success message even for an
 * unknown address (owner_auth_service.py:229 returns silently) so the form
 * cannot be used to discover which emails have owner accounts. The copy here
 * matches that: it says a code was sent *if* the account exists.
 */
export function OwnerForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function post(action: string, body: unknown) {
    const res = await fetch(`/api/owner/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: res.ok, ...data };
  }

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await post("forgot-password", { email: email.trim() });
      if (!r.ok) {
        setError(r.error || "Could not send a reset code.");
        return;
      }
      setStep("reset");
      setNotice("If that email has a ShareLynk owner account, a reset code is on its way.");
    } catch {
      setError("Could not reach ShareLynk. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await post("reset-password", {
        email: email.trim(),
        otp: otp.trim(),
        new_password: password,
      });
      if (!r.ok) {
        setError(r.error || "Could not reset your password.");
        return;
      }
      // Every refresh token was revoked server-side, so there is no session to
      // resume — send them to sign in with the new password.
      router.replace("/owner/login");
    } catch {
      setError("Could not reach ShareLynk. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "reset") {
    return (
      <form onSubmit={resetPassword} className="space-y-5" noValidate>
        <div className="flex items-start gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3.5 text-sm text-cyan-100">
          <MailCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <p>{notice}</p>
        </div>

        <Field id="reset-otp" label="Reset code" value={otp} onChange={setOtp}
               autoComplete="one-time-code" inputMode="numeric" required autoFocus />
        <Field id="reset-password" label="New password" type="password" value={password}
               onChange={setPassword} autoComplete="new-password" required
               hint="At least 8 characters, with one uppercase letter and one digit." />
        <Field id="reset-confirm" label="Confirm new password" type="password" value={confirm}
               onChange={setConfirm} autoComplete="new-password" required />

        <FormError message={error} />

        <Button type="submit" className="w-full" size="lg" disabled={busy || !otp || !password || !confirm}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {busy ? "Saving…" : "Set new password"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={requestCode} className="space-y-5" noValidate>
      <Field id="reset-email" label="Email" type="email" value={email} onChange={setEmail}
             autoComplete="email" required autoFocus placeholder="you@example.com" />
      <FormNotice message={notice} />
      <FormError message={error} />
      <Button type="submit" className="w-full" size="lg" disabled={busy || !email}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {busy ? "Sending…" : "Send reset code"}
      </Button>
    </form>
  );
}
