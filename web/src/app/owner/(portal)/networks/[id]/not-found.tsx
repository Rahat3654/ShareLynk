import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function NetworkNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05]">
        <WifiOff className="h-6 w-6 text-slate-400" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-lg font-semibold text-white">Network not found</h1>
      <p className="mt-2 text-sm text-slate-400">
        This network isn&apos;t registered to your owner account, or it has been
        removed.
      </p>
      <Link
        href="/owner/networks"
        className="mt-6 inline-flex h-11 items-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
      >
        Back to my networks
      </Link>
    </div>
  );
}
