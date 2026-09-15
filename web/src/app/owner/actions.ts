"use server";

import { revalidatePath } from "next/cache";
import { OwnerApiError, ownerSend } from "@/lib/owner/server-api";
import type { OwnerProfile, OwnerRouter, Withdrawal } from "@/lib/owner/types";

/**
 * Owner mutations.
 *
 * Every call goes through ownerSend(), which attaches the httpOnly cookie
 * server-side. None of these functions accepts an owner id — the backend
 * resolves the owner from the token and scopes the write to them, so a crafted
 * form post cannot touch another owner's network, balance or profile. The
 * router id IS passed, but the backend checks it belongs to the caller
 * (OwnerService looks the router up by owner) and answers 404 otherwise.
 */

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; unauthenticated?: boolean };

function fail(err: unknown): ActionResult<never> {
  if (err instanceof OwnerApiError) {
    return { ok: false, error: err.message, unauthenticated: err.isAuth };
  }
  return { ok: false, error: "Something went wrong. Please try again." };
}

/** Bounds mirror the backend: null = unlimited, otherwise an integer >= 2. */
export async function setConnectionLimit(
  routerId: string,
  limit: number | null,
): Promise<ActionResult<OwnerRouter>> {
  if (limit !== null && (!Number.isInteger(limit) || limit < 2)) {
    return { ok: false, error: "A connection limit must be 2 or more." };
  }
  try {
    const data = await ownerSend<OwnerRouter>(
      "PATCH",
      `/routers/${routerId}/connection-limit`,
      { connection_limit: limit },
    );
    revalidatePath(`/owner/networks/${routerId}`);
    revalidatePath("/owner/networks");
    revalidatePath("/owner/dashboard");
    return { ok: true, data };
  } catch (err) {
    return fail(err);
  }
}

export async function setNetworkEnabled(
  routerId: string,
  enabled: boolean,
): Promise<ActionResult<OwnerRouter>> {
  try {
    const data = await ownerSend<OwnerRouter>("PATCH", `/routers/${routerId}/enable`, { enabled });
    revalidatePath(`/owner/networks/${routerId}`);
    revalidatePath("/owner/networks");
    revalidatePath("/owner/dashboard");
    return { ok: true, data };
  } catch (err) {
    return fail(err);
  }
}

export async function requestWithdrawal(input: {
  amount_bdt: number;
  method: string;
  account_details: string;
}): Promise<ActionResult<Withdrawal>> {
  if (!Number.isFinite(input.amount_bdt) || input.amount_bdt <= 0) {
    return { ok: false, error: "Enter a valid amount." };
  }
  if (input.account_details.trim().length < 3) {
    return { ok: false, error: "Enter the account the payout should go to." };
  }
  try {
    // The minimum and the available-balance ceiling are enforced by the
    // backend (owner_service.py:235) and surfaced here as its own message —
    // duplicating those rules in the browser would let the two drift apart.
    const data = await ownerSend<Withdrawal>("POST", "/withdrawals", {
      amount_bdt: input.amount_bdt,
      method: input.method,
      account_details: input.account_details.trim(),
    });
    revalidatePath("/owner/payouts");
    revalidatePath("/owner/earnings");
    revalidatePath("/owner/dashboard");
    return { ok: true, data };
  } catch (err) {
    return fail(err);
  }
}

/**
 * Name and phone only.
 *
 * The backend's OwnerProfileUpdateRequest also accepts photo_url, but there is
 * no owner-facing upload endpoint to produce one, so exposing the field would
 * be a box that cannot be filled. Email is deliberately absent: it is the
 * login identity and the backend has no change-email flow.
 */
export async function updateOwnerProfile(input: {
  name: string;
  phone: string;
}): Promise<ActionResult<OwnerProfile>> {
  const name = input.name.trim();
  const phone = input.phone.trim();
  if (name.length < 2) return { ok: false, error: "Enter your name." };
  if (phone && phone.length < 6) return { ok: false, error: "That phone number looks too short." };
  try {
    const data = await ownerSend<OwnerProfile>("PATCH", "/profile", {
      name,
      ...(phone ? { phone } : {}),
    });
    revalidatePath("/owner/settings");
    revalidatePath("/owner/dashboard");
    return { ok: true, data };
  } catch (err) {
    return fail(err);
  }
}
