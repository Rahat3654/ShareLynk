"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateOwnerProfile } from "@/app/owner/actions";
import { Field, FormError, FormNotice } from "@/components/owner/Field";

export function ProfileForm({
  initialName,
  initialPhone,
}: {
  initialName: string;
  initialPhone: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty = name !== initialName || phone !== initialPhone;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const result = await updateOwnerProfile({ name, phone });
      if (!result.ok) {
        setError(result.error);
        if (result.unauthenticated) router.replace("/owner/login");
        return;
      }
      setNotice("Profile updated.");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Field id="profile-name" label="Name" value={name} onChange={setName}
             autoComplete="name" required />
      <Field id="profile-phone" label="Phone" value={phone} onChange={setPhone}
             type="tel" autoComplete="tel" hint="Optional. Used by ShareLynk to reach you about payouts." />

      <FormError message={error} />
      <FormNotice message={notice} />

      <button
        type="submit"
        disabled={pending || !dirty}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 text-sm font-medium text-white shadow-glow-sm transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
