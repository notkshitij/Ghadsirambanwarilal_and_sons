# Ghadsiram Banwarilal & Sons

Jewelry e-commerce platform (necklaces, bracelets, hair clips) — React frontend + Supabase backend.

> **Note:** Yeh README project ke saath time-to-time update hoti rahegi. Jab bhi naya feature/page/route add ho, is file ko update karna hai.

---

## Project Structure

```
Ghadsirambanwarilal_and_sons/
├── backend/        # Currently empty — reserved for future backend service
└── frontend/       # React 19 + Vite SPA (main application)
```

## Tech Stack

| Layer      | Tech                                      |
|------------|--------------------------------------------|
| Frontend   | React 19, Vite 8                          |
| Styling    | Tailwind CSS v4                           |
| Auth / DB  | Supabase (`@supabase/supabase-js`)        |
| Scrolling  | Lenis (smooth scroll)                     |
| Linting    | Oxlint                                    |
| Hosting    | Vercel (SPA rewrites configured)          |

## Routing

No router library — routing is handled manually in `App.jsx` via `window.location.pathname` + `pushState`/`popstate`.

| Route              | Page                  |
|--------------------|-----------------------|
| `/`                | Landing (with splash) |
| `/shop`            | Shop                  |
| `/category/:slug`  | Shop (filtered)       |
| `/product/:id`     | Product Details       |
| `/cart`            | Cart                  |
| `/appointment`     | Appointment booking   |
| `/login`           | Login                 |
| `/profile`         | Profile               |
| `/about`           | About Us              |
| `/contact`         | Contact               |
| `/care-guide`      | Care Guide            |
| `/size-guide`      | Size Guide            |
| `/privacy`         | Privacy Policy        |
| `/terms`           | Terms of Service      |
| `/cookie-policy`   | Cookie Policy         |
| `/sons`            | Admin Panel           |
| *(anything else)*  | 404 Not Found         |

## Auth Flow

1. On load, Supabase session is checked (`supabase.auth.getSession`).
2. If logged in, profile completeness is verified (`phone` in `profiles` + at least one address in `addresses`).
3. Incomplete profiles are gated into `CompleteProfilePage` before accessing the rest of the site (bypassed for `/sons` admin panel).

## Key Directories (`frontend/src`)

- `components/` — all page-level components
- `context/CartContext.jsx` — cart state
- `data/products.js` — product catalog data
- `lib/` — `supabaseClient.js`, `locationUtils.js`
- `assets/Product Image/` — product photos, grouped by product folder

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # fill in real values
npm run dev
```

### Environment Variables (`.env`)

| Variable                        | Purpose                                |
|---------------------------------|----------------------------------------|
| `VITE_SUPABASE_URL`             | Supabase project URL                   |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key               |
| `VITE_ADMIN_EMAIL`              | Email for `/sons` admin authentication |
| `VITE_ADMIN_PASSWORD`           | Password for `/sons` admin panel       |

> **Security note:** `.env.example` should only contain placeholders, never real secrets. Ensure real credentials are kept in `.env` and never committed.

## Deployment

Hosted on Vercel. `vercel.json` rewrites all routes to `index.html` (required for client-side routing SPA).

---

## Changelog / Progress Log

> Har naya change yahan ek line me add karo (date ke saath), taaki project ka history track ho sake.

- `2026-09-12` — Initial README created; complete profile onboarding gate, /sons admin dashboard, and newsletter subscription integration added.
- `2026-09-12` — Integrated Contact form with Supabase `contact_messages` table with loading/error handling.
- `2026-09-12` — Added Contact Messages inquiry table & metric counter to /sons admin portal.
- `2026-09-12` — Updated Studio & Flagship Store address in Cookie Policy to match studio headquarters address.
- `2026-09-12` — Corrected Cookie & Storage Policy claims to accurately reflect localStorage and Supabase usage without fabricated tracking cookies.
- `2026-09-13` — Updated About Us page with 100+ years legacy, Taranagar roots, 5th generation heritage, and Thappa jewellery expertise.
