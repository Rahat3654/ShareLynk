/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Produces a minimal standalone server bundle for the Docker runtime stage.
  output: "standalone",
  images: {
    // Allow remote release/CDN assets if you later swap the placeholder logo
    // or serve screenshots from a CDN.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    // Proxy /api/* to the ShareLynk FastAPI backend so the browser and server
    // share one origin (also sidesteps CORS). Points at uvicorn on :8000.
    const apiBase = process.env.API_PROXY_TARGET || "http://localhost:8000";
    return [{ source: "/api/:path*", destination: `${apiBase}/api/:path*` }];
  },
};

export default nextConfig;
