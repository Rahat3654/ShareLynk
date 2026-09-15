"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ends the session.
 *
 * The POST clears both httpOnly cookies and revokes the refresh token on the
 * backend. router.refresh() then drops the cached server-rendered owner pages
 * from the client router, so a Back press cannot repaint a dashboard that the
 * session no longer authorises — middleware re-runs and redirects to login.
 */
export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/owner/auth/logout", { method: "POST" });
    } catch {
      // Ignored on purpose: the cookies are cleared server-side either way,
      // and refusing to navigate would strand someone who asked to sign out.
    }
    router.replace("/owner/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400",
        "transition-colors hover:bg-red-500/10 hover:text-red-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60",
        "disabled:opacity-60",
        className,
      )}
    >
      {busy ? (
        <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin" aria-hidden="true" />
      ) : (
        <LogOut className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
      )}
      {busy ? "Signing out…" : "Logout"}
    </button>
  );
}
