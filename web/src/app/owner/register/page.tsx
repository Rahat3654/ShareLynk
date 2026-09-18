import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OwnerRegisterForm } from "@/components/owner/OwnerRegisterForm";

export const metadata: Metadata = { title: "Register as Owner" };

// Per request: middleware sends a signed-in owner straight to the dashboard.
export const dynamic = "force-dynamic";

export default function OwnerRegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-glow" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo href="/" />
          <h1 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">Register as Owner</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your Wi-Fi. Track your earnings.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 shadow-card sm:p-8">
          <OwnerRegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an Owner account?{" "}
          <Link href="/owner/login" className="font-medium text-cyan-300 underline-offset-4 hover:underline">
            Owner Login
          </Link>
        </p>
      </div>
    </main>
  );
}
