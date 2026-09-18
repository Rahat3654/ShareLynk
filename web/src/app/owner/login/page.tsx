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

          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-slate-400">Don&apos;t have an Owner account?</p>
            <Link
              href="/owner/register"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
            >
              Register as Owner
            </Link>
          </div>
        </div>

        {/*
          The website has no consumer sign-in: people who connect to Wi-Fi use
          the app. "Continue as User" therefore leads to the download, rather
          than to a login form that does not exist.
        */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center text-sm">
          <p className="text-slate-400">Just want to get online with ShareLynk?</p>
          <Link
            href="/downloads"
            className="mt-1 inline-block font-medium text-cyan-300 underline-offset-4 hover:underline"
          >
            Continue as User — get the app
          </Link>
        </div>
      </div>
    </main>
  );
}
