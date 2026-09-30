# Cleano Website

The public marketing site for Cleano — professional exterior cleaning
(gutter cleaning, bin cleaning, window cleaning, pressure washing,
commercial cleaning) across North London. This is a separate app from
[Cleano Ops](https://ops.cleano.services) (the internal field-service
management tool) — it exists to generate quote requests, not to run jobs.

Built with Next.js (App Router), Tailwind CSS v4, and Supabase for lead
capture.

## Status: V1

The site is live at https://www.cleano.services. What still needs a real
person's attention:

- **Three brand photos are AI-generated and must be replaced with real
  ones**: `public/photos/cleano-vehicle.jpg`, `cleano-equipment.jpg` and
  `cleano-team.jpg` (the About page row, and the van is also the site's
  share image at `public/og-image.jpg`). They were generated with
  `cleano.co.uk` on the van — a domain that is not this website and does
  not reach it — so the lettering has been repainted to read
  `cleano.services`. When real photographs replace them, check the livery
  in shot says the right domain, and regenerate `og-image.jpg` from the new
  van photo (1200x630).
- **The job before/after photos are real** (`gutter*`, `bin*`, `driveway*`,
  `graffiti*`, `window*`, `rooftop*`), as are the two Photo Report
  screenshots on the About page — those are a genuine Cleano report with
  the customer's name, address and email redacted.
- **`/refunds` is still placeholder wording** — the only policy page not yet
  written. See `src/components/legal/LegalPage.tsx` for how the others were
  handled.
- **"Our work and your rights" on `/terms`** is deliberately unpublished
  until an adviser checks it; the draft sits in a comment at that section.
- **No Google Business Profile yet.** Nothing in this repo can substitute
  for it: it is what produces the knowledge panel, the map listing and most
  of what the AI answer engines repeat back about Cleano.

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
   postcode, service, source page, UTM params, and a
   `status` column (`new` → `contacted` → `quoted` → `booked` → `completed`
   → `lost`) ready to plug into Cleano's wider operating system later.
2. Emails the office (`LEADS_NOTIFICATION_EMAIL`) with any photos the
   customer attached. Sent through Resend when `RESEND_API_KEY` is set
   (cleano.services is verified there, EU region), otherwise Microsoft 365
   via Graph using the same app registration Cleano Ops uses — see
   `src/lib/email/send.ts`.

Photos are never stored by this site: the browser compresses them
(`browser-image-compression`, ~300KB each, max 8) and they travel with the
form post as multipart fields; `/api/leads` sniffs the real image format,
enforces the size caps in `PHOTO_LIMITS`, and attaches them to that email.
A daily Vercel cron (`/api/cron/purge-leads`, `vercel.json`) deletes lead
rows older than twelve months, which is what lets the privacy policy say so.
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
   - `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — from the
     new Supabase project above (the *secret* key, not the publishable one)
   - `LEADS_NOTIFICATION_EMAIL` — where quote requests are emailed, plus
     **either** `RESEND_API_KEY` **or** the four `MICROSOFT_*` values (same
     as Cleano Ops) to carry them
   - `CRON_SECRET` — for the daily enquiry purge
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
