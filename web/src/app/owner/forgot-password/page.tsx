import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OwnerForgotPasswordForm } from "@/components/owner/OwnerForgotPasswordForm";

export const metadata: Metadata = { title: "Reset password" };
export const dynamic = "force-dynamic";

export default function OwnerForgotPasswordPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-glow" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo href="/" />
          <h1 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-400">
            We&apos;ll email you a code to confirm it&apos;s you.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 shadow-card sm:p-8">
          <OwnerForgotPasswordForm />
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/owner/login" className="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
