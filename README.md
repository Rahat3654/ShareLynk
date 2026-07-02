<div align="center">

# ShareLynk — Official Website (public download site)

**Connect • Share • Empower**

Secure Connectivity. Smarter Sharing. Unlimited Possibilities.

</div>

A premium, dark-gradient marketing + **software-distribution** website. The
download catalog is managed from your **existing** ShareLynk admin panel and
served by your **existing** FastAPI backend — no separate backend, no Docker,
no new secrets.

---

## How it fits your existing stack

This site is **only a frontend**. It reuses what you already run:

| Piece | Where | Runs on |
| ----- | ----- | ------- |
| **Public site** (this repo) | `sharelynk-website/web` (Next.js) | `:3000` |
| **Backend** (existing, extended) | `sharelynk/backend` (FastAPI + Supabase) | `:8000` |
| **Admin panel** (existing, extended) | `sharelynk/frontend` (React + Vite) | `:5173` |

The download feature was **added into your existing backend and admin** rather
than duplicated:

- **Backend** — new tables `platforms`, `releases`, `contact_messages`,
  `newsletter_subscribers` (Alembic migration `0014_downloads`), plus
  `app/services/download_service.py`, `app/repositories/download_repository.py`,
  and endpoints in `app/api/v1/endpoints/downloads.py` (public) and
  `admin_downloads.py` (admin, guarded by your existing `get_current_admin`).
  Reuses your existing `DATABASE_URL` + `JWT_SECRET` — **nothing new in `.env`**.
- **Admin** — a new **Downloads** page (`src/pages/downloads/DownloadsPage.tsx`)
  + sidebar link. Add / edit / delete releases, mark latest, enable/disable,
  paste download URL, upload release notes. Saving updates the public site
  instantly.

## Run it locally (no Docker)

**1. Backend** (existing) — apply the new migration once, then run as usual:

```bash
cd sharelynk/backend
venv/Scripts/python -m alembic upgrade head     # creates the 4 new tables
venv/Scripts/python seed_downloads.py           # optional: sample platforms/releases
venv/Scripts/python -m uvicorn main:app --reload --port 8000
```

**2. Admin panel** (existing):

```bash
cd sharelynk/frontend
npm install       # if not already
npm run dev       # http://localhost:5173  → open the new "Downloads" tab
```

**3. Public website** (this repo):

```bash
cd sharelynk-website/web
cp .env.example .env      # defaults already point at http://localhost:8000
npm install
npm run dev               # http://localhost:3000
```

That's it. Open http://localhost:3000 — the download table is populated by the
backend. Publish a version in the admin's **Downloads** tab and the public page
updates automatically (revalidates within ~60s, or hard-refresh).

## API endpoints (added to your FastAPI backend)

Public (no auth):

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/downloads` | Catalog grouped by platform |
| GET | `/api/latest` | Recommended latest build per platform |
| GET | `/api/platform/{slug}` | Releases for one platform |
| POST | `/api/downloads/{id}/track` | Count a download, return asset URL |
| POST | `/api/contact` | Contact-form submission |
| POST | `/api/newsletter` | Newsletter subscription |

Admin (existing admin JWT — `get_current_admin`):

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/admin/downloads` | Full catalog (incl. disabled) |
| GET | `/api/admin/downloads/overview` | Summary counts |
| POST/PUT/DELETE | `/api/admin/downloads/platforms[/{id}]` | Manage platforms |
| POST/PUT/DELETE | `/api/admin/downloads/releases[/{id}]` | Manage releases |
| PATCH | `/api/admin/downloads/releases/{id}/status` | Mark latest / enable-disable |
| GET/PATCH | `/api/admin/downloads/messages[/{id}]` | Contact inbox |

## Deploying the public site

The site is a standard Next.js app — deploy `web/` to Vercel (or any Node host).
Set env vars to point at your deployed backend:

```
API_PROXY_TARGET=https://sharelynk-wifi-admin-web-1.onrender.com
API_INTERNAL_URL=https://sharelynk-wifi-admin-web-1.onrender.com
NEXT_PUBLIC_SITE_URL=https://<your-public-domain>
```

`http://localhost:3000` and your `FRONTEND_URL` are already in the backend's CORS
allow-list; add your production domain via the backend's `CORS_ORIGINS` env.

## Logo

Placeholder at `web/public/assets/logo/sharelynk-logo.png`. Replace with the
official logo — same filename/path, no code changes. See that folder's README.

## Design

Dark blue-gradient glassmorphism (`#0F4CFF` / `#00C2FF` / `#07132B`), animated
digital-globe hero, and sections for Downloads, Features, About, Roadmap, FAQ,
Newsletter, and Contact. Fully responsive, SEO + OpenGraph + Schema.org, dark
theme by default.
