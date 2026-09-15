import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OwnerLoginForm } from "@/components/owner/OwnerLoginForm";

export const metadata: Metadata = { title: "Sign in" };

// Rendered per request: middleware sends signed-in owners straight to the
// dashboard, so this must never be served from a cache.
export const dynamic = "force-dynamic";

/**
 * `next` comes from the URL, so it is attacker-controllable. Only same-site
 * paths inside the portal are honoured — anything else (absolute URLs,
 * protocol-relative "//evil.test", paths outside /owner) falls back to the
 * dashboard, so this cannot be turned into an open redirect.
 */
function safeNext(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return "/owner/dashboard";
  if (!raw.startsWith("/owner/") || raw.startsWith("//")) return "/owner/dashboard";
  return raw;
}

export default function OwnerLoginPage({
  searchParams,
}: {
  searchParams: { next?: string | string[] };
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-glow"
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo href="/" />
          <h1 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">Owner Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your Wi-Fi. Track your earnings.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 shadow-card sm:p-8">
          <OwnerLoginForm next={safeNext(searchParams?.next)} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Owner accounts are created in the ShareLynk app.{" "}
          <Link href="/" className="text-cyan-300 underline-offset-4 hover:underline">
            Back to sharelynk.app
          </Link>
        </p>
      </div>
    </main>
  );
}
