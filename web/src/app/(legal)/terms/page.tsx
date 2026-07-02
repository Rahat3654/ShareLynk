import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 1, 2026">
      <p>
        These Terms govern your access to and use of ShareLynk software and services. By
        downloading or using ShareLynk, you agree to these Terms.
      </p>
      <h2>Use of the service</h2>
      <p>
        You agree to use ShareLynk lawfully and not to misuse, disrupt, or attempt to gain
        unauthorized access to the service or the networks of others.
      </p>
      <h2>Accounts</h2>
      <p>
        You are responsible for safeguarding your account credentials and for all activity under
        your account.
      </p>
      <h2>Software licenses</h2>
      <p>
        ShareLynk grants you a limited, non-exclusive, non-transferable license to use the apps in
        accordance with these Terms.
      </p>
      <h2>Disclaimer & liability</h2>
      <p>
        The service is provided &quot;as is&quot; without warranties of any kind. To the maximum extent
        permitted by law, ShareLynk is not liable for indirect or consequential damages.
      </p>
      <h2>Contact</h2>
      <p>Questions about these Terms? Email legal@sharelynk.com.</p>
    </LegalPage>
  );
}
