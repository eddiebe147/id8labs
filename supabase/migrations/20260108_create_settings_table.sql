-- Create settings table for Claude Code configuration presets
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- model, permissions, context, budget, behavior
  settings JSONB NOT NULL, -- The actual configuration object
  tags TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'ID8Labs',
  license TEXT DEFAULT 'MIT',
  version TEXT DEFAULT '1.0.0',
  install_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published', -- draft, published, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_slug ON settings(slug);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_status ON settings(status);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_settings_search ON settings USING GIN (
  to_tsvector('english', name || ' ' || description || ' ' || COALESCE(array_to_string(tags, ' '), ''))
);

-- Add RLS policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for published settings
CREATE POLICY "Public read access for published settings"
  ON settings
  FOR SELECT
  USING (status = 'published');

-- Only authenticated users can insert/update (for future admin panel)
CREATE POLICY "Authenticated users can insert settings"
  ON settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to search settings
CREATE OR REPLACE FUNCTION search_settings(query_text TEXT, limit_count INTEGER DEFAULT 20)
RETURNS SETOF settings AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM settings
  WHERE status = 'published'
    AND (
      to_tsvector('english', name || ' ' || description || ' ' || COALESCE(array_to_string(tags, ' '), ''))
      @@ plainto_tsquery('english', query_text)
    )
  ORDER BY install_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create function to track setting installs
CREATE OR REPLACE FUNCTION track_setting_install(p_setting_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE settings
  SET install_count = install_count + 1
  WHERE id = p_setting_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE settings IS 'Claude Code configuration presets for model, permissions, and behavior settings';
COMMENT ON COLUMN settings.category IS 'Setting category: model, permissions, context, budget, behavior';
COMMENT ON COLUMN settings.settings IS 'JSONB configuration object with all settings';
