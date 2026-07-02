import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 1, 2026">
      <p>
        ShareLynk (&quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains
        what data we collect, how we use it, and the choices you have. We designed ShareLynk to
        be privacy-first: we collect the minimum necessary to operate the service.
      </p>
      <h2>Information we collect</h2>
      <p>
        Account details you provide (name, email), telemetry required to operate secure sessions,
        and optional diagnostics you choose to share. We do not sell your personal data.
      </p>
      <h2>How we use information</h2>
      <p>
        To provide and secure the service, deliver software updates, respond to support requests,
        and improve reliability and performance.
      </p>
      <h2>Data retention & security</h2>
      <p>
        Data is encrypted in transit and at rest where applicable, and retained only as long as
        needed to provide the service or meet legal obligations.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data by contacting
        privacy@sharelynk.com.
      </p>
      <h2>Contact</h2>
      <p>Questions? Email us at contact@sharelynk.com.</p>
    </LegalPage>
  );
}
