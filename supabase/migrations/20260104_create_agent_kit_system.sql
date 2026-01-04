-- Agent Kit System Migration
-- Extends purchases table for GitHub delivery and creates agent_kit_access table

-- Add GitHub delivery columns to purchases table
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS github_username TEXT,
  ADD COLUMN IF NOT EXISTS github_invite_sent BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS github_invite_sent_at TIMESTAMPTZ;

-- Create index for GitHub username lookups
CREATE INDEX IF NOT EXISTS purchases_github_username_idx ON public.purchases(github_username);

-- AGENT_KIT_ACCESS table (tracks which kits each user has access to)
CREATE TABLE IF NOT EXISTS public.agent_kit_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  github_username TEXT NOT NULL,
  kit_id TEXT NOT NULL, -- e.g., 'agent-kit-tmnt', 'agent-kit-llc-ops'
  purchase_id UUID REFERENCES public.purchases(id) ON DELETE SET NULL,
  access_granted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.agent_kit_access ENABLE ROW LEVEL SECURITY;

-- Users can view their own kit access
CREATE POLICY "Users can view own kit access" ON public.agent_kit_access
  FOR SELECT USING (auth.uid() = user_id);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS agent_kit_access_user_idx ON public.agent_kit_access(user_id);
CREATE INDEX IF NOT EXISTS agent_kit_access_github_idx ON public.agent_kit_access(github_username);
CREATE INDEX IF NOT EXISTS agent_kit_access_kit_idx ON public.agent_kit_access(kit_id);
CREATE INDEX IF NOT EXISTS agent_kit_access_purchase_idx ON public.agent_kit_access(purchase_id);

-- Unique constraint: one kit access per user per kit
CREATE UNIQUE INDEX IF NOT EXISTS agent_kit_access_unique_idx
  ON public.agent_kit_access(user_id, kit_id);

-- Function to check if user has access to a specific kit
CREATE OR REPLACE FUNCTION public.has_kit_access(p_kit_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.agent_kit_access
    WHERE user_id = auth.uid()
    AND kit_id = p_kit_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.has_kit_access(TEXT) TO authenticated;

-- Function to get all kits user has access to
CREATE OR REPLACE FUNCTION public.get_user_kits()
RETURNS TABLE(kit_id TEXT, access_granted_at TIMESTAMPTZ) AS $$
BEGIN
  RETURN QUERY
    SELECT a.kit_id, a.access_granted_at
    FROM public.agent_kit_access a
    WHERE a.user_id = auth.uid()
    ORDER BY a.access_granted_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_user_kits() TO authenticated;
