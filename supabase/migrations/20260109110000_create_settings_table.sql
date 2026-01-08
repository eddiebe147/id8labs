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

-- Create text search column (updated via trigger)
ALTER TABLE settings ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create trigger function to update search vector
CREATE OR REPLACE FUNCTION settings_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.name, '') || ' ' || 
    COALESCE(NEW.description, '') || ' ' || 
    COALESCE(array_to_string(NEW.tags, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create trigger
DROP TRIGGER IF EXISTS settings_search_update ON settings;
CREATE TRIGGER settings_search_update
  BEFORE INSERT OR UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION settings_search_trigger();

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_settings_search ON settings USING GIN (search_vector);

-- Add RLS policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for published settings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'settings' 
    AND policyname = 'Public read access for published settings'
  ) THEN
    CREATE POLICY "Public read access for published settings"
      ON settings
      FOR SELECT
      USING (status = 'published');
  END IF;
END $$;

-- Only authenticated users can insert/update (for future admin panel)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'settings' 
    AND policyname = 'Authenticated users can insert settings'
  ) THEN
    CREATE POLICY "Authenticated users can insert settings"
      ON settings
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'settings' 
    AND policyname = 'Authenticated users can update settings'
  ) THEN
    CREATE POLICY "Authenticated users can update settings"
      ON settings
      FOR UPDATE
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create function to search settings
CREATE OR REPLACE FUNCTION search_settings(query_text TEXT, limit_count INTEGER DEFAULT 20)
RETURNS SETOF settings AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM settings
  WHERE status = 'published'
    AND search_vector @@ plainto_tsquery('english', query_text)
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
