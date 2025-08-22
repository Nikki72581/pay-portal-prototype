# Nuvei Pay Portal — Prototype

A minimal Next.js (App Router) + Tailwind prototype to demo a payment portal that lets you create AR/AP payment requests and share link-based payments. Everything is front-end only and tokenized in the URL; no backend or real payments.

## Quick start

```bash
npm i
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Create a new GitHub repo and push this folder.
2. In Vercel, "Add New → Project", select the repo.
3. Framework preset: **Next.js**. No environment variables required.
4. Deploy. The default route `/` is your landing page. Dashboard is at `/dashboard` and the creator is at `/documents/new`.

## How it works

- **Create**: fill the form at `/documents/new`. A tokenized link like `/pay/<token>` is generated. We also save a local copy to `localStorage` so you can see it in `/dashboard`.
- **Pay**: open the link. The page decodes the token payload and simulates a payment UI. Clicking "Pay" just shows a success state.
- **Dashboard**: basic totals and a list of generated docs. You can mark an item paid locally.

## Limitations

- No server, no persistence beyond `localStorage`.
- Payment status on the pay page does not update the dashboard automatically.
- Token contains readable JSON (base64url), no signing or encryption.

## Next steps

- Add a small API (Next route handlers) and a DB (e.g., Postgres) for persistence.
- Integrate real payment methods and webhook callbacks for status.
- Add authentication and a portal login flow.
- Sync with ERP sources of truth (Sage, Acumatica, NetSuite, Dynamics).
