# ShareLynk brand assets

All of these are generated from the Flutter app's official mark,
`ShareLynk_wifi/assets/icon/icon_master.png` (1024×1024), with its white
background removed so the mark sits directly on the dark site. The in-app
`assets/icon/logo_mark.png` is the same artwork at 320px.

| File | Size | Used for |
|---|---|---|
| `sharelynk-mark.png` | 256×256, transparent | Header/footer logo (`components/ui/Logo.tsx`) |
| `sharelynk-logo-512.png` | 512×512, transparent | Organization logo in structured data (Google), manifest |
| `sharelynk-icon-192.png` | 192×192, transparent | Web app manifest |
| `sharelynk-maskable-512.png` | 512×512, navy | Manifest maskable icon (Android crops it to a circle) |
| `og-image.png` | 1200×630 | Open Graph / Twitter preview |

Browser icons live in `src/app` as Next.js file conventions — `favicon.ico`
(16/32/48), `icon.png` (96, a multiple of 48 as Google asks) and
`apple-icon.png` (180, navy background because iOS fills transparency with
black) — so they apply to every route, the owner portal included.

The wordmark is not an image: like the app's `ShareLynkWordmark`, it is text —
"Share" in white and "Lynk" in `#4C8DFF`.

If the app's logo changes, regenerate every file here from the new
`icon_master.png` rather than editing them individually.
