-- Adds Rooftop Cleaning as a lead service. Run this against the `website`
-- Supabase project (NOT cleno-app) - same one 0001_init_leads.sql ran on.
--
-- Note: ALTER TYPE ... ADD VALUE cannot run inside the same transaction
-- block as other statements that use the new value, but on its own (as
-- here) it's safe to run directly in the SQL Editor.
alter type lead_service add value if not exists 'rooftop_cleaning';
