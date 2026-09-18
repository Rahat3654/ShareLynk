"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Info, Loader2, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, FormError } from "@/components/owner/Field";

/**
 * Owner registration, in the two calls the backend exposes:
 *
 *   POST /register          { name, email, phone?, password, confirm_password }
 *                            -> creates an UNVERIFIED account, emails a code
 *   POST /verify-login-otp  { email, otp }
 *                            -> verifies it, signs the owner in (httpOnly
 *                               cookies), and adopts every Wi-Fi network a
 *                               ShareLynk agent registered under this email
 *
 * Password rules (8+ characters, an uppercase letter, a digit) are the
 * backend's; they are repeated as a hint, and enforced only by the backend so
 * the two cannot drift apart.
 */
export function OwnerRegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "verify">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: res.ok, ...data };
  }

  async function register(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await post("register", {
        name: name.trim(),
        // Trimmed and lower-cased here as well as on the server: this is the
        // address agent-added networks are matched against.
        email: email.trim().toLowerCase(),
        ...(phone.trim() ? { phone: phone.trim() } : {}),
        password,
        confirm_password: confirm,
      });
      if (!r.ok) {
        setError(r.error || "Could not create your account. Please try again.");
        return;
      }
      setStep("verify");
      setNotice(`We emailed a verification code to ${email.trim().toLowerCase()}.`);
    } catch {
      setError("Could not reach ShareLynk. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await post("verify-login-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      if (!r.ok) {
        setError(r.error || "That code was not accepted.");
        return;
      }
      router.replace("/owner/dashboard");
      router.refresh();
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
      const r = await post("resend-login-otp", { email: email.trim().toLowerCase() });
      if (r.ok) setNotice("A new code is on its way.");
      else setError(r.error || "Could not send a new code.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "verify") {
    return (
      <form onSubmit={verify} className="space-y-5" noValidate>
        <div className="flex items-start gap-3 rounded-2xl border border-cyan-400/25 bg-cyan-400/10 p-3.5 text-sm text-cyan-100">
          <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <p role="status">{notice}</p>
        </div>
        <Field id="register-otp" label="Verification code" value={otp} onChange={setOtp}
               autoComplete="one-time-code" inputMode="numeric" required autoFocus
               placeholder="6-digit code" />
        <FormError message={error} />
        <Button type="submit" className="w-full" size="lg" disabled={busy || otp.trim().length === 0}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {busy ? "Verifying…" : "Verify and open my dashboard"}
        </Button>
        <button type="button" onClick={resend} disabled={busy}
                className="w-full text-center text-sm text-cyan-300 underline-offset-4 hover:underline disabled:opacity-50">
          Send a new code
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={register} className="space-y-5" noValidate>
      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-sm text-slate-300">
        <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-300" aria-hidden="true" />
        <p>
          Register with the <strong className="text-white">same email</strong> you gave the
          ShareLynk agent. Any Wi-Fi they added for you appears in your dashboard automatically.
        </p>
      </div>

      <Field id="register-name" label="Full name" value={name} onChange={setName}
             autoComplete="name" required autoFocus />
      <Field id="register-email" label="Email" type="email" value={email} onChange={setEmail}
             autoComplete="email" required placeholder="you@gmail.com" />
      <Field id="register-phone" label="Phone (optional)" type="tel" value={phone} onChange={setPhone}
             autoComplete="tel" placeholder="01XXXXXXXXX"
             hint="Contact number only. Your email is what links your Wi-Fi." />
      <Field id="register-password" label="Password" type="password" value={password}
             onChange={setPassword} autoComplete="new-password" required
             hint="At least 8 characters, with one uppercase letter and one digit." />
      <Field id="register-confirm" label="Confirm password" type="password" value={confirm}
             onChange={setConfirm} autoComplete="new-password" required />

      <FormError message={error} />

      <Button type="submit" className="w-full" size="lg"
              disabled={busy || !name.trim() || !email.trim() || !password || !confirm}>
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <UserPlus className="h-4 w-4" aria-hidden="true" />
        )}
        {busy ? "Creating account…" : "Create Owner account"}
      </Button>
    </form>
  );
}
