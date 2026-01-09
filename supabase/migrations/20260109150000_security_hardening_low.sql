-- Security Hardening Migration (LOW priority)
-- Addresses: Overly permissive admin tables, unindexed foreign keys

-- ============================================================================
-- PART 1: Lock down admin-only tables (platform_status, posts)
-- These tables have no user_id column, indicating single-tenant admin use
-- ============================================================================

-- Drop overly permissive policies on platform_status
DROP POLICY IF EXISTS "Allow all for authenticated users" ON platform_status;

-- Add proper admin-only policies
CREATE POLICY "Service role full access on platform_status"
  ON platform_status FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read (needed for UI status display)
CREATE POLICY "Authenticated users can read platform_status"
  ON platform_status FOR SELECT
  TO authenticated
  USING (true);

-- Drop overly permissive policies on posts
DROP POLICY IF EXISTS "Allow all for authenticated users" ON posts;

-- Add proper admin-only policies
CREATE POLICY "Service role full access on posts"
  ON posts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read their scheduled posts
-- Note: This table lacks user_id - for now, allow read-only
-- TODO: Add user_id column for proper multi-tenancy
CREATE POLICY "Authenticated users can read posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- PART 2: Add indexes for unindexed foreign keys (performance)
-- ============================================================================

-- pause.outcomes.message_id (if pause schema exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'pause' AND table_name = 'outcomes' AND column_name = 'message_id'
  ) THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_outcomes_message_id ON pause.outcomes(message_id)';
  END IF;
END $$;

-- public.cross_references.created_by
CREATE INDEX IF NOT EXISTS idx_cross_references_created_by
  ON cross_references(created_by);

-- public.focus_sessions.project_id
CREATE INDEX IF NOT EXISTS idx_focus_sessions_project_id
  ON focus_sessions(project_id);

-- public.project_collaborators.invited_by
CREATE INDEX IF NOT EXISTS idx_project_collaborators_invited_by
  ON project_collaborators(invited_by);

-- public.skill_views.user_id
CREATE INDEX IF NOT EXISTS idx_skill_views_user_id
  ON skill_views(user_id);

-- ============================================================================
-- PART 3: Additional foreign key indexes found in performance advisor
-- ============================================================================

-- Check and add other commonly missed indexes
CREATE INDEX IF NOT EXISTS idx_skill_installs_user_id
  ON skill_installs(user_id) WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_skill_installs_skill_id
  ON skill_installs(skill_id);

-- Content queue scheduling (column is scheduled_at, not scheduled_for)
CREATE INDEX IF NOT EXISTS idx_content_queue_scheduled_at
  ON content_queue(scheduled_at) WHERE scheduled_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_content_queue_status
  ON content_queue(status);

-- Email sequences (column is sequence_record_id, not sequence_id for FK)
CREATE INDEX IF NOT EXISTS idx_email_sequence_logs_sequence_record_id
  ON email_sequence_logs(sequence_record_id);

CREATE INDEX IF NOT EXISTS idx_email_sequence_logs_status
  ON email_sequence_logs(status);
