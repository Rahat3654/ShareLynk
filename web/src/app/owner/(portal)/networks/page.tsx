import type { Metadata } from "next";
import { Wifi } from "lucide-react";
import { NetworkCard } from "@/components/owner/NetworkCard";
import { EmptyState, ErrorState } from "@/components/owner/States";
import { ownerGet, settle } from "@/lib/owner/server-api";
import type { OwnerRouter } from "@/lib/owner/types";

export const metadata: Metadata = { title: "My Wi-Fi" };
export const dynamic = "force-dynamic";

export default async function OwnerNetworksPage() {
  const routers = await settle(ownerGet<OwnerRouter[]>("/routers"));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">My Wi-Fi networks</h1>
        <p className="mt-1 text-sm text-slate-400">
          Every network registered to your ShareLynk owner account.
        </p>
      </header>

      {"error" in routers ? (
        <ErrorState
          title="Unable to load your networks"
          message={routers.error}
          retryHref="/owner/networks"
        />
      ) : routers.data.length === 0 ? (
        <EmptyState
          icon={Wifi}
          title="No Wi-Fi networks added yet"
          message="Add a router in the ShareLynk app. Once an admin approves it, it appears here with its activity and earnings."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {routers.data.map((router) => (
            <li key={router.id}>
              <NetworkCard router={router} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
