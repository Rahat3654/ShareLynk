import type { MetadataRoute } from "next";

// Web app manifest: the name, colours and icons browsers use when the site is
// installed or pinned, and one more place crawlers read the brand identity from.
// Icons are the Flutter app's mark (see public/brand).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ShareLynk",
    short_name: "ShareLynk",
    description: "Secure internet sharing. Smart connectivity.",
    start_url: "/",
    display: "browser",
    background_color: "#07132B",
    theme_color: "#07132B",
    icons: [
      { src: "/brand/sharelynk-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/sharelynk-logo-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/sharelynk-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
