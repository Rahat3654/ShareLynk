# ShareLynk Logo

**Replace `sharelynk-logo.png` with the official ShareLynk logo.**

`sharelynk-logo.png` in this folder is a **placeholder** (a neutral brand-gradient
tile) generated as a stand-in. The website loads this exact path everywhere:

- Navbar (`src/components/ui/Logo.tsx`)
- Footer
- Hero / login page
- Favicon & OpenGraph image (`src/app/layout.tsx` `metadata.icons` / `openGraph`)

## How to replace

1. Drop the official logo in as `sharelynk-logo.png` (square, transparent PNG,
   ideally 512×512 or larger). Keep the **same filename and path**.
2. That's it — no code changes required.

> The logo was intentionally **not** designed or recreated in code. Only swap in
> the real asset from the ShareLynk brand kit.
