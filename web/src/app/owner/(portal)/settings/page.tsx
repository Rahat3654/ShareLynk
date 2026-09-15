import type { Metadata } from "next";
import { Panel } from "@/components/owner/Panel";
import { ErrorState } from "@/components/owner/States";
import { ProfileForm } from "@/components/owner/ProfileForm";
import { LogoutButton } from "@/components/owner/LogoutButton";
import { ownerGet, settle } from "@/lib/owner/server-api";
import { dateOnly, dateTime } from "@/lib/owner/format";
import type { OwnerProfile } from "@/lib/owner/types";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function OwnerSettingsPage() {
  const profile = await settle(ownerGet<OwnerProfile>("/profile"));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white sm:text-2xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Your ShareLynk owner account.</p>
      </header>

      {"error" in profile ? (
        <ErrorState
          title="Unable to load your profile"
          message={profile.error}
          retryHref="/owner/settings"
        />
      ) : (
        <>
          <Panel title="Profile" description="Updates apply to the ShareLynk app as well.">
            <ProfileForm
              initialName={profile.data.name}
              initialPhone={profile.data.phone ?? ""}
            />
          </Panel>

          <Panel title="Account">
            <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <Row label="Email" value={profile.data.email} />
              <Row label="Verified" value={profile.data.is_verified ? "Yes" : "Not verified"} />
              <Row label="Owner since" value={dateOnly(profile.data.created_at)} />
              <Row label="Last sign-in" value={dateTime(profile.data.last_login)} />
            </dl>
            {/*
              Email is the login identity and the backend has no change-email
              endpoint, so it is shown rather than offered as a field. Password
              changes go through the emailed-code reset flow, which is the only
              path the backend exposes for an owner.
            */}
            <p className="mt-5 text-xs text-slate-500">
              To change your email, contact ShareLynk support. To change your
              password, sign out and use{" "}
              <a href="/owner/forgot-password" className="text-cyan-300 underline-offset-4 hover:underline">
                Forgot your password
              </a>
              .
            </p>
          </Panel>

          <Panel title="Session">
            <p className="mb-4 text-sm text-slate-400">
              Signing out ends this browser session everywhere it is stored.
            </p>
            <LogoutButton className="border border-white/10 bg-white/[0.04]" />
          </Panel>
        </>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="break-all text-right font-medium text-slate-200">{value}</dd>
    </div>
  );
}
