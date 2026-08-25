-- Hardens the lead-photos bucket at the storage-engine level: the RLS
-- policy from 0001_init_leads.sql only checks bucket_id, so without this
-- an anon upload could be any file type, any size, in any quantity. These
-- two bucket settings are enforced by Supabase Storage itself before an
-- object is ever written, regardless of RLS.
--
-- Run this against the `website` Supabase project (NOT cleno-app).
update storage.buckets
set
  file_size_limit = 10485760, -- 10MB per file, matches QuoteForm's client-side check
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
where id = 'lead-photos';
