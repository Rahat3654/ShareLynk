/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // NOTE: no `output: "standalone"` — the OpenNext Cloudflare adapter
  // (`opennextjs-cloudflare build`) consumes the default .next output and
  // produces the Worker itself. See wrangler.jsonc.
  images: {
    // Allow remote release/CDN assets if you later swap the placeholder logo
    // or serve screenshots from a CDN.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // NOTE: /api/* is proxied by the runtime route handler at
  // src/app/api/[...path]/route.ts — deliberately NOT by `rewrites()` here.
  // `rewrites()` is evaluated at build time, so the backend host would be
  // baked into the bundle and could not be changed without a rebuild.
};

export default nextConfig;
