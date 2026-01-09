-- Create plugins table for Claude Code plugins
CREATE TABLE IF NOT EXISTS plugins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- code-quality, automation, development, productivity, output-style, lsp, integration, framework, testing

  -- Plugin-specific fields
  install_command TEXT NOT NULL,           -- e.g., 'claude plugin install code-simplifier'
  slash_command TEXT,                       -- e.g., '/plugin install code-simplifier'
  github_repo TEXT,                         -- e.g., 'anthropics/claude-plugins-official'

  -- Authorship
  author TEXT NOT NULL,
  author_org TEXT,                          -- e.g., 'Anthropic', 'Community'
  original_author TEXT,                     -- For formalized community plugins

  -- Discovery
  tags TEXT[] DEFAULT '{}',
  use_cases TEXT[],                         -- Key use cases

  -- Quality badges
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  official BOOLEAN DEFAULT false,           -- Official Anthropic plugin

  -- Metadata
  license TEXT DEFAULT 'MIT',
  version TEXT DEFAULT '1.0.0',

  -- Stats
  install_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'published',          -- draft, published, archived

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_plugins_slug ON plugins(slug);
CREATE INDEX IF NOT EXISTS idx_plugins_category ON plugins(category);
CREATE INDEX IF NOT EXISTS idx_plugins_status ON plugins(status);
CREATE INDEX IF NOT EXISTS idx_plugins_official ON plugins(official) WHERE official = TRUE;
CREATE INDEX IF NOT EXISTS idx_plugins_featured ON plugins(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_plugins_install_count ON plugins(install_count DESC);

-- Create text search column
ALTER TABLE plugins ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create trigger function to update search vector
CREATE OR REPLACE FUNCTION plugins_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    COALESCE(NEW.name, '') || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(NEW.author, '') || ' ' ||
    COALESCE(array_to_string(NEW.tags, ' '), '') || ' ' ||
    COALESCE(array_to_string(NEW.use_cases, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create trigger
DROP TRIGGER IF EXISTS plugins_search_update ON plugins;
CREATE TRIGGER plugins_search_update
  BEFORE INSERT OR UPDATE ON plugins
  FOR EACH ROW EXECUTE FUNCTION plugins_search_trigger();

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_plugins_search ON plugins USING GIN (search_vector);

-- Add RLS policies
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;

-- Public read access for published plugins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'plugins'
    AND policyname = 'Public read access for published plugins'
  ) THEN
    CREATE POLICY "Public read access for published plugins"
      ON plugins
      FOR SELECT
      USING (status = 'published');
  END IF;
END $$;

-- Authenticated users can insert plugins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'plugins'
    AND policyname = 'Authenticated users can insert plugins'
  ) THEN
    CREATE POLICY "Authenticated users can insert plugins"
      ON plugins
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Authenticated users can update plugins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'plugins'
    AND policyname = 'Authenticated users can update plugins'
  ) THEN
    CREATE POLICY "Authenticated users can update plugins"
      ON plugins
      FOR UPDATE
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create function to search plugins
CREATE OR REPLACE FUNCTION search_plugins(query_text TEXT, limit_count INTEGER DEFAULT 20)
RETURNS SETOF plugins AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM plugins
  WHERE status = 'published'
    AND search_vector @@ plainto_tsquery('english', query_text)
  ORDER BY install_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create function to track plugin installs
CREATE OR REPLACE FUNCTION track_plugin_install(p_plugin_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE plugins
  SET install_count = install_count + 1
  WHERE id = p_plugin_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to track plugin views
CREATE OR REPLACE FUNCTION track_plugin_view(p_plugin_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE plugins
  SET view_count = view_count + 1
  WHERE id = p_plugin_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE plugins IS 'Claude Code plugins from official and community sources';
COMMENT ON COLUMN plugins.category IS 'Plugin category: code-quality, automation, development, productivity, output-style, lsp, integration, framework, testing';
COMMENT ON COLUMN plugins.install_command IS 'Full installation command (e.g., claude plugin install code-simplifier)';
COMMENT ON COLUMN plugins.official IS 'Whether this is an official Anthropic plugin';
