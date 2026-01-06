-- Skills Marketplace Migration
-- Complete database schema for Claude Code Skills Marketplace

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL CATEGORIES TABLE
-- Defines the 11 categories from the marketplace taxonomy
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_categories (
  id TEXT PRIMARY KEY,  -- e.g., 'document-creation', 'communication'
  name TEXT NOT NULL,   -- Human-readable name
  description TEXT,
  emoji TEXT,           -- Category emoji icon
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed category data
INSERT INTO public.skill_categories (id, name, description, emoji, display_order) VALUES
  ('document-creation', 'Document Creation & Manipulation', 'Create, format, and manage documents of all types', '📄', 1),
  ('communication', 'Communication & Messaging', 'Compose emails, messages, and professional correspondence', '📬', 2),
  ('research', 'Research & Analysis', 'Gather information, analyze data, and generate insights', '🔍', 3),
  ('writing', 'Writing & Content', 'Create blog posts, copy, documentation, and creative content', '✍️', 4),
  ('design', 'Visual & Design', 'Create visual assets, diagrams, and design specifications', '🎨', 5),
  ('code', 'Code & Technical', 'Generate, review, and optimize code across languages', '💻', 6),
  ('project', 'Project & Workflow', 'Manage projects, track progress, and automate workflows', '📋', 7),
  ('business', 'Business Operations', 'Handle business tasks, finances, and operations', '💼', 8),
  ('domain', 'Domain-Specific', 'Specialized skills for specific industries and domains', '🏢', 9),
  ('personal', 'Personal Productivity', 'Boost personal efficiency and task management', '👤', 10),
  ('meta', 'Meta-Skills', 'Skills about building, managing, and organizing other skills', '⚙️', 11)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  display_order = EXCLUDED.display_order;

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILLS TABLE
-- Main table storing all skill metadata and content
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Core identity
  slug TEXT UNIQUE NOT NULL,           -- URL-safe identifier (e.g., 'email-composer')
  name TEXT NOT NULL,                   -- Display name
  description TEXT NOT NULL,            -- 1-2 sentence description

  -- Classification
  category_id TEXT REFERENCES public.skill_categories(id),
  complexity TEXT CHECK (complexity IN ('simple', 'complex', 'multi-agent')) DEFAULT 'simple',

  -- Version and authorship
  version TEXT NOT NULL DEFAULT '0.1.0',
  author TEXT DEFAULT 'ID8Labs',
  license TEXT DEFAULT 'MIT',

  -- Discovery
  triggers TEXT[] DEFAULT '{}',         -- Keywords that invoke this skill
  commands TEXT[] DEFAULT '{}',         -- Slash commands provided
  tags TEXT[] DEFAULT '{}',             -- Search tags

  -- Content
  content TEXT,                         -- Full markdown content
  readme TEXT,                          -- Short README/quick start

  -- Repository info (for GitHub-hosted skills)
  repo_url TEXT,
  repo_path TEXT,                       -- Path within repo

  -- Quality metrics
  quality_score INT CHECK (quality_score >= 0 AND quality_score <= 100),
  quality_tier TEXT CHECK (quality_tier IN ('bronze', 'silver', 'gold', 'platinum')),
  validated BOOLEAN DEFAULT FALSE,

  -- Statistics (denormalized for performance)
  install_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  review_count INT DEFAULT 0,
  avg_rating DECIMAL(2,1) DEFAULT 0.0,

  -- Status
  status TEXT CHECK (status IN ('draft', 'review', 'published', 'archived')) DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,       -- ID8Labs verified badge

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Public read for published skills
CREATE POLICY "Anyone can view published skills" ON public.skills
  FOR SELECT USING (status = 'published');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS skills_slug_idx ON public.skills(slug);
CREATE INDEX IF NOT EXISTS skills_category_idx ON public.skills(category_id);
CREATE INDEX IF NOT EXISTS skills_status_idx ON public.skills(status);
CREATE INDEX IF NOT EXISTS skills_quality_tier_idx ON public.skills(quality_tier);
CREATE INDEX IF NOT EXISTS skills_featured_idx ON public.skills(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS skills_verified_idx ON public.skills(verified) WHERE verified = TRUE;
CREATE INDEX IF NOT EXISTS skills_install_count_idx ON public.skills(install_count DESC);
CREATE INDEX IF NOT EXISTS skills_avg_rating_idx ON public.skills(avg_rating DESC);
CREATE INDEX IF NOT EXISTS skills_created_at_idx ON public.skills(created_at DESC);

-- Add search_vector column for full-text search (maintained by trigger)
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Full-text search index
CREATE INDEX IF NOT EXISTS skills_search_idx ON public.skills USING GIN (search_vector);

-- Function to update search_vector on INSERT/UPDATE
CREATE OR REPLACE FUNCTION public.skills_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.name, '') || ' ' ||
    coalesce(NEW.description, '') || ' ' ||
    array_to_string(coalesce(NEW.tags, ARRAY[]::text[]), ' ')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update search_vector
DROP TRIGGER IF EXISTS skills_search_vector_trigger ON public.skills;
CREATE TRIGGER skills_search_vector_trigger
  BEFORE INSERT OR UPDATE OF name, description, tags ON public.skills
  FOR EACH ROW
  EXECUTE FUNCTION public.skills_search_vector_update();

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL REVIEWS TABLE
-- User ratings and feedback
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Rating
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,

  -- Review content
  title TEXT,
  body TEXT,

  -- Metadata
  helpful_count INT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.skill_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews" ON public.skill_reviews
  FOR SELECT USING (TRUE);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews" ON public.skill_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON public.skill_reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.skill_reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS skill_reviews_skill_idx ON public.skill_reviews(skill_id);
CREATE INDEX IF NOT EXISTS skill_reviews_user_idx ON public.skill_reviews(user_id);
CREATE INDEX IF NOT EXISTS skill_reviews_rating_idx ON public.skill_reviews(rating);

-- Unique constraint: one review per user per skill
CREATE UNIQUE INDEX IF NOT EXISTS skill_reviews_unique_idx
  ON public.skill_reviews(skill_id, user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL INSTALLS TABLE
-- Track installations for analytics
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_installs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,                      -- For anonymous tracking

  -- Install method
  method TEXT CHECK (method IN ('copy', 'curl', 'git', 'npm', 'manual')) DEFAULT 'copy',

  -- Client info
  platform TEXT,                        -- 'macos', 'linux', 'windows'

  -- Timestamps
  installed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.skill_installs ENABLE ROW LEVEL SECURITY;

-- Users can view their own installs
CREATE POLICY "Users can view own installs" ON public.skill_installs
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can insert installs (for anonymous tracking)
CREATE POLICY "Anyone can track installs" ON public.skill_installs
  FOR INSERT WITH CHECK (TRUE);

-- Indexes
CREATE INDEX IF NOT EXISTS skill_installs_skill_idx ON public.skill_installs(skill_id);
CREATE INDEX IF NOT EXISTS skill_installs_user_idx ON public.skill_installs(user_id);
CREATE INDEX IF NOT EXISTS skill_installs_installed_at_idx ON public.skill_installs(installed_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL VIEWS TABLE
-- Track page views for analytics
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,                      -- For anonymous tracking

  -- Referrer info
  referrer TEXT,

  -- Timestamps
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.skill_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views (for anonymous tracking)
CREATE POLICY "Anyone can track views" ON public.skill_views
  FOR INSERT WITH CHECK (TRUE);

-- Indexes
CREATE INDEX IF NOT EXISTS skill_views_skill_idx ON public.skill_views(skill_id);
CREATE INDEX IF NOT EXISTS skill_views_viewed_at_idx ON public.skill_views(viewed_at DESC);

-- Partition by month for large-scale analytics (optional optimization)
-- CREATE INDEX IF NOT EXISTS skill_views_month_idx ON public.skill_views(date_trunc('month', viewed_at));

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL COLLECTIONS TABLE
-- Curated skill bundles (Starter Kits)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,

  -- Display
  emoji TEXT,
  cover_image_url TEXT,

  -- Metadata
  author TEXT DEFAULT 'ID8Labs',
  is_official BOOLEAN DEFAULT FALSE,   -- ID8Labs curated
  is_public BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.skill_collections ENABLE ROW LEVEL SECURITY;

-- Anyone can view public collections
CREATE POLICY "Anyone can view public collections" ON public.skill_collections
  FOR SELECT USING (is_public = TRUE);

-- Indexes
CREATE INDEX IF NOT EXISTS skill_collections_slug_idx ON public.skill_collections(slug);
CREATE INDEX IF NOT EXISTS skill_collections_official_idx ON public.skill_collections(is_official) WHERE is_official = TRUE;

-- ═══════════════════════════════════════════════════════════════════════════
-- SKILL COLLECTION ITEMS (Junction table)
-- Links skills to collections
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.skill_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.skill_collections(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,

  -- Display order within collection
  display_order INT DEFAULT 0,

  -- Optional note about why this skill is in the collection
  note TEXT,

  -- Timestamps
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.skill_collection_items ENABLE ROW LEVEL SECURITY;

-- Anyone can view collection items for public collections
CREATE POLICY "Anyone can view public collection items" ON public.skill_collection_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.skill_collections
      WHERE id = collection_id AND is_public = TRUE
    )
  );

-- Unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS skill_collection_items_unique_idx
  ON public.skill_collection_items(collection_id, skill_id);

-- Indexes
CREATE INDEX IF NOT EXISTS skill_collection_items_collection_idx ON public.skill_collection_items(collection_id);
CREATE INDEX IF NOT EXISTS skill_collection_items_skill_idx ON public.skill_collection_items(skill_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- USER SKILL STACKS TABLE
-- User's personal skill collections (Stack Builder feature)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.user_skill_stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  name TEXT NOT NULL DEFAULT 'My Stack',
  description TEXT,

  -- Sharing
  share_id TEXT UNIQUE,                 -- For shareable links
  is_public BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_skill_stacks ENABLE ROW LEVEL SECURITY;

-- Users can view their own stacks
CREATE POLICY "Users can view own stacks" ON public.user_skill_stacks
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

-- Users can create stacks
CREATE POLICY "Users can create stacks" ON public.user_skill_stacks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own stacks
CREATE POLICY "Users can update own stacks" ON public.user_skill_stacks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own stacks
CREATE POLICY "Users can delete own stacks" ON public.user_skill_stacks
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS user_skill_stacks_user_idx ON public.user_skill_stacks(user_id);
CREATE INDEX IF NOT EXISTS user_skill_stacks_share_idx ON public.user_skill_stacks(share_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- USER SKILL STACK ITEMS (Junction table)
-- Skills in a user's stack
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.user_skill_stack_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stack_id UUID REFERENCES public.user_skill_stacks(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,

  -- Display order
  display_order INT DEFAULT 0,

  -- Timestamps
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_skill_stack_items ENABLE ROW LEVEL SECURITY;

-- Users can view items in their stacks or public stacks
CREATE POLICY "Users can view stack items" ON public.user_skill_stack_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_skill_stacks
      WHERE id = stack_id AND (user_id = auth.uid() OR is_public = TRUE)
    )
  );

-- Users can manage items in their own stacks
CREATE POLICY "Users can insert stack items" ON public.user_skill_stack_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_skill_stacks
      WHERE id = stack_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete stack items" ON public.user_skill_stack_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.user_skill_stacks
      WHERE id = stack_id AND user_id = auth.uid()
    )
  );

-- Unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS user_skill_stack_items_unique_idx
  ON public.user_skill_stack_items(stack_id, skill_id);

-- Indexes
CREATE INDEX IF NOT EXISTS user_skill_stack_items_stack_idx ON public.user_skill_stack_items(stack_id);
CREATE INDEX IF NOT EXISTS user_skill_stack_items_skill_idx ON public.user_skill_stack_items(skill_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- Function to search skills with full-text search
CREATE OR REPLACE FUNCTION public.search_skills(
  query_text TEXT,
  limit_count INT DEFAULT 20
)
RETURNS SETOF public.skills AS $$
BEGIN
  RETURN QUERY
    SELECT *
    FROM public.skills
    WHERE status = 'published'
      AND (
        search_vector @@ plainto_tsquery('english', query_text)
        OR name ILIKE '%' || query_text || '%'
        OR description ILIKE '%' || query_text || '%'
        OR query_text = ANY(tags)
        OR query_text = ANY(triggers)
      )
    ORDER BY
      ts_rank(search_vector, plainto_tsquery('english', query_text)) DESC,
      install_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get trending skills (most views in last N days)
CREATE OR REPLACE FUNCTION public.get_trending_skills(
  days_back INT DEFAULT 7,
  limit_count INT DEFAULT 10
)
RETURNS TABLE(
  skill_id UUID,
  skill_slug TEXT,
  skill_name TEXT,
  view_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
    SELECT
      s.id,
      s.slug,
      s.name,
      COUNT(v.id) as view_count
    FROM public.skills s
    LEFT JOIN public.skill_views v ON s.id = v.skill_id
      AND v.viewed_at > NOW() - (days_back || ' days')::INTERVAL
    WHERE s.status = 'published'
    GROUP BY s.id, s.slug, s.name
    ORDER BY view_count DESC, s.install_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track a skill view
CREATE OR REPLACE FUNCTION public.track_skill_view(
  p_skill_id UUID,
  p_session_id TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insert view record
  INSERT INTO public.skill_views (skill_id, user_id, session_id, referrer)
  VALUES (p_skill_id, auth.uid(), p_session_id, p_referrer);

  -- Update denormalized count
  UPDATE public.skills
  SET view_count = view_count + 1,
      updated_at = NOW()
  WHERE id = p_skill_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track a skill install
CREATE OR REPLACE FUNCTION public.track_skill_install(
  p_skill_id UUID,
  p_method TEXT DEFAULT 'copy',
  p_platform TEXT DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insert install record
  INSERT INTO public.skill_installs (skill_id, user_id, session_id, method, platform)
  VALUES (p_skill_id, auth.uid(), p_session_id, p_method, p_platform);

  -- Update denormalized count
  UPDATE public.skills
  SET install_count = install_count + 1,
      updated_at = NOW()
  WHERE id = p_skill_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update skill rating after review
CREATE OR REPLACE FUNCTION public.update_skill_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.skills
  SET
    review_count = (SELECT COUNT(*) FROM public.skill_reviews WHERE skill_id = COALESCE(NEW.skill_id, OLD.skill_id)),
    avg_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.skill_reviews WHERE skill_id = COALESCE(NEW.skill_id, OLD.skill_id)),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.skill_id, OLD.skill_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rating on review changes
DROP TRIGGER IF EXISTS update_skill_rating_trigger ON public.skill_reviews;
CREATE TRIGGER update_skill_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.skill_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_skill_rating();

-- Function to generate share ID for stacks
CREATE OR REPLACE FUNCTION public.generate_stack_share_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = TRUE AND NEW.share_id IS NULL THEN
    NEW.share_id := encode(gen_random_bytes(8), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate share ID
DROP TRIGGER IF EXISTS generate_share_id_trigger ON public.user_skill_stacks;
CREATE TRIGGER generate_share_id_trigger
  BEFORE INSERT OR UPDATE ON public.user_skill_stacks
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_stack_share_id();

-- ═══════════════════════════════════════════════════════════════════════════
-- GRANTS
-- ═══════════════════════════════════════════════════════════════════════════

-- Grant access to authenticated users
GRANT SELECT ON public.skill_categories TO authenticated, anon;
GRANT SELECT ON public.skills TO authenticated, anon;
GRANT SELECT ON public.skill_reviews TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON public.skill_reviews TO authenticated;
GRANT INSERT ON public.skill_installs TO authenticated, anon;
GRANT INSERT ON public.skill_views TO authenticated, anon;
GRANT SELECT ON public.skill_collections TO authenticated, anon;
GRANT SELECT ON public.skill_collection_items TO authenticated, anon;
GRANT ALL ON public.user_skill_stacks TO authenticated;
GRANT ALL ON public.user_skill_stack_items TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.search_skills(TEXT, INT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.get_trending_skills(INT, INT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.track_skill_view(UUID, TEXT, TEXT) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.track_skill_install(UUID, TEXT, TEXT, TEXT) TO authenticated, anon;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED STARTER KITS (Official Collections)
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.skill_collections (slug, name, description, emoji, is_official, is_public) VALUES
  ('frontend-dev', 'Frontend Developer Kit', 'Essential skills for React/Next.js frontend development', '⚛️', TRUE, TRUE),
  ('content-creator', 'Content Creator Kit', 'Everything you need for writing, editing, and publishing content', '✍️', TRUE, TRUE),
  ('business-ops', 'Business Operations Kit', 'Run your business smarter with AI-powered operations', '📊', TRUE, TRUE),
  ('researcher', 'Research & Analysis Kit', 'Deep research, data analysis, and insight generation', '🔬', TRUE, TRUE),
  ('solopreneur', 'Solopreneur Essentials', 'All-in-one toolkit for solo founders and indie hackers', '🚀', TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;
