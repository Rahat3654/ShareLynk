import { redirect } from "next/navigation";
import { OwnerShell } from "@/components/owner/OwnerShell";
import { OwnerApiError, ownerGet } from "@/lib/owner/server-api";
import type { OwnerProfile } from "@/lib/owner/types";

// Every page in this group is one owner's private data. Nothing here may be
// prerendered or cached.
export const dynamic = "force-dynamic";

/**
 * Gate for the authenticated portal.
 *
 * Middleware has already bounced requests with no usable session, so this is
 * the second of two checks rather than the only one — and the backend, which
 * verifies the token signature and the `owner` role on every endpoint, is the
 * third and authoritative one. Loading the profile here doubles as proof the
 * token is genuinely accepted: a forged or downgraded cookie fails this call
 * and never reaches a page.
 */
export default async function OwnerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let profile: OwnerProfile;
  try {
    profile = await ownerGet<OwnerProfile>("/profile");
  } catch (err) {
    if (err instanceof OwnerApiError && err.isAuth) redirect("/owner/login");
    // A backend outage is not an authentication failure. Redirecting to login
    // would tell the owner their credentials are wrong when the server is
    // simply down, so the shell renders and each panel reports its own error.
    throw err;
  }

  return <OwnerShell ownerName={profile.name}>{children}</OwnerShell>;
}
