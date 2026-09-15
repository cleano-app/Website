-- Photos sent with a quote request are no longer stored on this site at
-- all: the browser compresses them and /api/leads attaches them to the
-- office notification email (Microsoft 365) instead. Nothing in the
-- browser talks to Supabase any more, so the anon-key upload policy on the
-- lead-photos bucket is a door with nothing behind it - close it. The
-- bucket and any objects already in it are left alone (the office may
-- still want them); /api/cron/purge-leads removes objects older than
-- twelve months alongside the lead rows, per the privacy policy.
drop policy if exists "anon can upload lead photos" on storage.objects;
