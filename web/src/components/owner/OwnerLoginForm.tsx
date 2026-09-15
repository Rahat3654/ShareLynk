"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError } from "@/components/owner/Field";

/**
 * Two-step owner sign-in.
 *
 * The backend refuses a password-only login for an unverified account: it
 * emails a code and answers 400 "OTP_REQUIRED" (owner_auth_service.py:189).
 * The second step is therefore part of the normal flow, not an error path,
 * and the form has to carry it.
 *
 * Credentials are posted to our own /api/owner/auth/* handlers, never to the
 * ShareLynk backend directly, so the tokens come back as httpOnly cookies and
 * nothing here can read them.
 */
export function OwnerLoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function post(action: string, body: unknown) {
    const res = await fetch(`/api/owner/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      otpRequired?: boolean;
    };
    return { ok: res.ok, ...data };
  }

  function done() {
    // replace() so the login page is not left in history behind the dashboard.
    router.replace(next);
    // The portal is server-rendered; refresh() makes the new cookie take
    // effect without a full page load.
    router.refresh();
  }

  async function submitCredentials(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const r = await post("login", { email: email.trim(), password });
      if (r.otpRequired) {
        setStep("otp");
        setNotice("We emailed you a verification code. Enter it below to finish signing in.");
        return;
      }
      if (!r.ok) {
        setError(r.error || "Sign-in failed. Please try again.");
        return;
      }
      done();
    } catch {
      setError("Could not reach ShareLynk. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await post("verify-login-otp", { email: email.trim(), otp: otp.trim() });
      if (!r.ok) {
        setError(r.error || "That code was not accepted.");
        return;
      }
      done();
    } catch {
      setError("Could not reach ShareLynk. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    setError(null);
    try {
      const r = await post("resend-login-otp", { email: email.trim() });
      setNotice(r.ok ? "A new code is on its way." : null);
      if (!r.ok) setError(r.error || "Could not send a new code.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "otp") {
    return (
      <form onSubmit={submitOtp} className="space-y-5" noValidate>
        <div className="flex items-start gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3.5 text-sm text-cyan-100">
          <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <p>{notice ?? `Enter the code we sent to ${email}.`}</p>
        </div>

        <Field
          id="owner-otp"
          label="Verification code"
          value={otp}
          onChange={setOtp}
          autoComplete="one-time-code"
          inputMode="numeric"
          required
          autoFocus
          placeholder="6-digit code"
        />

        <FormError message={error} />

        <Button type="submit" className="w-full" size="lg" disabled={busy || otp.trim().length === 0}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {busy ? "Verifying…" : "Verify and sign in"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={resend}
            disabled={busy}
            className="text-cyan-300 underline-offset-4 hover:underline disabled:opacity-50"
          >
            Send a new code
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("credentials");
              setOtp("");
              setError(null);
              setNotice(null);
            }}
            className="text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Use a different account
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submitCredentials} className="space-y-5" noValidate>
      <Field
        id="owner-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
        autoFocus
        placeholder="you@example.com"
      />
      <Field
        id="owner-password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        required
        placeholder="••••••••"
      />

      <FormError message={error} />

      <Button type="submit" className="w-full" size="lg" disabled={busy || !email || !password}>
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        {busy ? "Signing in…" : "Sign in"}
      </Button>

      <div className="text-center text-sm">
        <Link
          href="/owner/forgot-password"
          className="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
