-- Security Hardening Migration (MEDIUM priority)
-- Addresses: Missing RLS policies, function search_path, permissive policies

-- ============================================================================
-- PART 1: Add RLS policies to tables that have RLS enabled but no policies
-- These are internal/admin tables - only service_role should access them
-- ============================================================================

-- content_queue - internal content scheduling
CREATE POLICY "Service role full access on content_queue"
  ON content_queue FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- customers - Stripe customer data (sensitive)
-- Note: id column IS the user's auth.uid(), so users can read their own record
CREATE POLICY "Service role full access on customers"
  ON customers FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can read own customer record"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- email_sequence_logs - internal email tracking
CREATE POLICY "Service role full access on email_sequence_logs"
  ON email_sequence_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- email_sequences - internal email automation
CREATE POLICY "Service role full access on email_sequences"
  ON email_sequences FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- newsletter_sends - internal send logs
CREATE POLICY "Service role full access on newsletter_sends"
  ON newsletter_sends FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- newsletter_subscribers - subscriber data
CREATE POLICY "Service role full access on newsletter_subscribers"
  ON newsletter_subscribers FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- PART 2: Fix function search_path to prevent search path injection attacks
-- Setting search_path = '' forces fully qualified references
-- ============================================================================

-- public schema functions
ALTER FUNCTION public.update_skill_rating() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.track_command_install(uuid) SET search_path = '';
ALTER FUNCTION public.update_content_queue_timestamp() SET search_path = '';
ALTER FUNCTION public.skills_search_vector_update() SET search_path = '';
ALTER FUNCTION public.track_skill_view(uuid, text, text) SET search_path = '';
ALTER FUNCTION public.find_next_publish_slot() SET search_path = '';
ALTER FUNCTION public.settings_search_trigger() SET search_path = '';
ALTER FUNCTION public.search_skills(text, integer) SET search_path = '';
ALTER FUNCTION public.add_academy_member_to_newsletter() SET search_path = '';
ALTER FUNCTION public.update_email_sequence_timestamp() SET search_path = '';
ALTER FUNCTION public.generate_stack_share_id() SET search_path = '';
ALTER FUNCTION public.update_project_task_count() SET search_path = '';
ALTER FUNCTION public.track_setting_install(uuid) SET search_path = '';
ALTER FUNCTION public.track_skill_install(uuid, text, text, text) SET search_path = '';
ALTER FUNCTION public.search_settings(text, integer) SET search_path = '';
ALTER FUNCTION public.get_trending_skills(integer, integer) SET search_path = '';
ALTER FUNCTION public.search_commands(text, integer) SET search_path = '';
ALTER FUNCTION public.update_claude_stats_timestamp() SET search_path = '';
ALTER FUNCTION public.update_newsletter_subscriber_timestamp() SET search_path = '';
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.has_purchased(text) SET search_path = '';
ALTER FUNCTION public.commands_search_trigger() SET search_path = '';

-- pause schema functions (if they exist) - using dynamic SQL
DO $$
DECLARE
  func_exists BOOLEAN;
BEGIN
  -- Check and alter get_or_create_profile
  SELECT EXISTS(
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'pause' AND p.proname = 'get_or_create_profile'
  ) INTO func_exists;

  IF func_exists THEN
    EXECUTE 'ALTER FUNCTION pause.get_or_create_profile SET search_path = ''''';
  END IF;

  -- Check and alter update_updated_at
  SELECT EXISTS(
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'pause' AND p.proname = 'update_updated_at'
  ) INTO func_exists;

  IF func_exists THEN
    EXECUTE 'ALTER FUNCTION pause.update_updated_at() SET search_path = ''''';
  END IF;
END $$;

-- ============================================================================
-- PART 3: Notes on overly permissive RLS policies
-- ============================================================================

-- The following policies are flagged as permissive but are INTENTIONALLY so:
--
-- Community contribution tables (author is TEXT display name, not user ID):
-- - commands: Authenticated users can insert/update (community marketplace)
-- - settings: Authenticated users can insert/update (community marketplace)
--
-- Public submission forms (INSERT only is appropriate):
-- - email_subscribers: Anyone can subscribe
-- - milo_waitlist: Anyone can join waitlist
-- - waitlist: Anyone can join waitlist
-- - waitlist_submissions: Anyone can submit
--
-- Analytics tracking (INSERT only is appropriate):
-- - skill_installs: Anyone can track installs
-- - skill_views: Anyone can track views
--
-- Platform tables (may need product review):
-- - platform_status: Currently allows all operations
-- - posts: Currently allows all operations
--
-- To properly lock down commands/settings, would need schema change to add
-- author_id UUID column linked to auth.users. This is a product decision
-- that should be made separately from security hardening.
