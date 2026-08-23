# Cleano Website

The public marketing site for Cleano — professional exterior cleaning
(gutter cleaning, bin cleaning, window cleaning, pressure washing,
commercial cleaning) across North London. This is a separate app from
[Cleano Ops](https://ops.cleano.services) (the internal field-service
management tool) — it exists to generate quote requests, not to run jobs.

Built with Next.js (App Router), Tailwind CSS v4, and Supabase for lead
capture.

## Status: V1

This is a first version built to the V1 build plan. Known gaps to close
before launch:

- **All photography is a placeholder.** Every image on the site is a
  labelled grey box (see `PhotoPlaceholder`/`BeforeAfterSlider`) rather than
  stock photography, on purpose — drop real Cleano photos into
  `public/images/` and swap them in (see `public/images/README.md`).
- **Reviews are sample text**, clearly marked in `src/components/Reviews.tsx`
  — replace with real Google/customer reviews.
- **Pricing figures are placeholders**, clearly marked in
  `src/lib/content/services.ts` — replace with Cleano's real "from" prices.
- **Neither Vercel nor Supabase has been set up yet** — see Deployment below.

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lead capture

Every "Get a Quote" submission (`/quote`, or the embedded form on each
service page) POSTs to `/api/leads`, which:

1. Inserts a row into the `leads` table in Supabase (schema in
   `supabase/migrations/0001_init_leads.sql`) — capturing name, phone,
   postcode, service, uploaded photo paths, source page, UTM params, and a
   `status` column (`new` → `contacted` → `quoted` → `booked` → `completed`
   → `lost`) ready to plug into Cleano's wider operating system later.
2. Sends a notification email via Resend to `LEADS_NOTIFICATION_EMAIL`.

Optional photos are uploaded directly from the browser to a private
`lead-photos` Supabase Storage bucket (anon key can only insert, never
read/list — only the service role can read them back out).

## Deployment

### 1. Supabase — create a **new, separate** project

Use the same Supabase account/org as Cleano Ops, but a **new project** —
this site's leads shouldn't share a database with Ops.

1. supabase.com dashboard → **New Project**
2. Once created, open the **SQL Editor** and run
   `supabase/migrations/0001_init_leads.sql`
3. **Project Settings → API** → copy the Project URL, `anon` key, and
   `service_role` key

### 2. Vercel — new project

1. **Add New → Project** → import this repo (`cleano-app/website`)
2. Framework preset: Next.js (auto-detected), default build settings
3. **Project Settings → Environment Variables** — add everything from
   `.env.local.example` with real values:
   - `NEXT_PUBLIC_APP_URL` — this site's production URL
   - `NEXT_PUBLIC_OPS_APP_URL` — defaults to `https://ops.cleano.services`
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` /
     `SUPABASE_SERVICE_ROLE_KEY` — from the new Supabase project above
   - `RESEND_API_KEY` / `LEADS_NOTIFICATION_EMAIL` — for the lead
     notification email
   - `NEXT_PUBLIC_CONTACT_PHONE` / `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY` /
     `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Deploy

## Structure

```
src/app/                 # one folder per route (9 pages)
src/components/          # shared UI (Header, Footer, QuoteForm, etc.)
src/lib/content/         # copy/data: services.ts, areas.ts
src/lib/siteConfig.ts    # contact details, nav, tel/whatsapp/mailto links
src/lib/leads.ts         # lead types + validation
src/app/api/leads/       # lead insert + notification email
supabase/migrations/     # SQL schema for the leads table + storage bucket
```

## Excluded from V1

Per the build plan, deliberately not built yet: blog, online payments, live
chat, pricing calculator, full team bios, customer accounts, a complex
booking system.
