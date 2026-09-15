"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3, Banknote, LayoutDashboard, Menu, Settings, Wallet, Wifi, X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LogoutButton } from "@/components/owner/LogoutButton";
import { cn } from "@/lib/utils";

/**
 * Only routes that exist are listed. There is no Sessions entry: the backend
 * has no owner-facing per-session endpoint (GET /api/owners/sessions is 404,
 * and the per-user list was removed from the owner portal on purpose for
 * privacy), so the real aggregates live under Usage instead.
 */
const NAV = [
  { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/owner/networks", label: "My Wi-Fi", icon: Wifi },
  { href: "/owner/earnings", label: "Earnings", icon: Banknote },
  { href: "/owner/usage", label: "Usage", icon: BarChart3 },
  { href: "/owner/payouts", label: "Payouts", icon: Wallet },
  { href: "/owner/settings", label: "Settings", icon: Settings },
] as const;

export function OwnerShell({
  ownerName,
  children,
}: {
  ownerName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A drawer that survives navigation traps the reader behind it on mobile.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape is the expected way out of any overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-ink-900/60 backdrop-blur-xl lg:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div
            id="owner-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Owner navigation"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-white/10 bg-ink-900"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarContent pathname={pathname} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-white/10 bg-ink-950/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="owner-mobile-nav"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-slate-400">
              Welcome, <span className="font-medium text-white">{ownerName}</span>
            </p>
          </div>

          <div className="hidden lg:block">
            <LogoutButton />
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Logo href="/owner/dashboard" />
      </div>

      <nav aria-label="Owner" className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Owner
        </p>
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            // startsWith so /owner/networks/<id> keeps My Wi-Fi highlighted.
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60",
                    active
                      ? "bg-[linear-gradient(100deg,rgba(15,76,255,0.35),rgba(0,194,255,0.18))] text-white shadow-glow-sm"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <LogoutButton className="w-full justify-start" />
      </div>
    </>
  );
}
