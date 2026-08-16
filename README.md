# Easy Wedding Cards

A luxury wedding-invitation website. The first glimpse of your wedding.

## Stack

- React 19 + Create React App (CRACO)
- Tailwind CSS + Framer Motion + Lenis (smooth scroll)
- Static data (no backend)

## Pages

- `/` — Landing page (hero, scroll moment, featured collection, gifts teaser, CTA)
- `/shop` — Wedding card catalogue (search, sort, favorites, quick-view)
- `/shop/:slug` — Product detail
- `/gifts` — Gift guide

## Development

```bash
cd frontend
npm install
npm start
```

## Production build

```bash
cd frontend
npm run build
```

## Deploy (Vercel)

1. Create a new project and import this repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Create React App (build `npm run build`, output `build/`).
4. Deploy — the `frontend/vercel.json` already configures SPA rewrites for client-side routing.

## Images

Product images live in `frontend/public/images/`. Data files reference them as
`/images/<file>`. The logo is `/images/logo.png`.
