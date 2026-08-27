import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache is configured, which is a deliberate choice: an R2 (or
// KV) binding is what makes ISR work on Workers, and we opted not to add one.
//
// Consequence: `revalidate` is a no-op here, so /downloads is rendered on every
// request (see the `force-dynamic` export on that page). Every page view
// therefore hits the FastAPI backend. If that backend is asleep the request
// pays its cold start, and `fallback-downloads.ts` is served if it times out.
//
// To turn ISR on later, create a Workers KV namespace (free plan, no payment
// method needed) and pass `incrementalCache: kvIncrementalCache` here, plus the
// matching `kv_namespaces` binding in wrangler.jsonc.
export default defineCloudflareConfig();
