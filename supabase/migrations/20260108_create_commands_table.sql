-- Create commands table for workflow automation commands
CREATE TABLE IF NOT EXISTS commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- git, testing, deployment, setup, quality, docker, ci-cd
  command TEXT NOT NULL, -- The actual command to run
  prerequisites TEXT[], -- Required tools/packages
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
CREATE INDEX IF NOT EXISTS idx_commands_slug ON commands(slug);
CREATE INDEX IF NOT EXISTS idx_commands_category ON commands(category);
CREATE INDEX IF NOT EXISTS idx_commands_status ON commands(status);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_commands_search ON commands USING GIN (
  to_tsvector('english', name || ' ' || description || ' ' || COALESCE(array_to_string(tags, ' '), ''))
);

-- Add RLS policies
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;

-- Public read access for published commands
CREATE POLICY "Public read access for published commands"
  ON commands
  FOR SELECT
  USING (status = 'published');

-- Only authenticated users can insert/update (for future admin panel)
CREATE POLICY "Authenticated users can insert commands"
  ON commands
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update commands"
  ON commands
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to search commands
CREATE OR REPLACE FUNCTION search_commands(query_text TEXT, limit_count INTEGER DEFAULT 20)
RETURNS SETOF commands AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM commands
  WHERE status = 'published'
    AND (
      to_tsvector('english', name || ' ' || description || ' ' || COALESCE(array_to_string(tags, ' '), ''))
      @@ plainto_tsquery('english', query_text)
    )
  ORDER BY install_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create function to track command installs
CREATE OR REPLACE FUNCTION track_command_install(p_command_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE commands
  SET install_count = install_count + 1
  WHERE id = p_command_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE commands IS 'Workflow automation commands for development tasks';
COMMENT ON COLUMN commands.category IS 'Command category: git, testing, deployment, setup, quality, docker, ci-cd';
COMMENT ON COLUMN commands.command IS 'The actual shell command or script to execute';
COMMENT ON COLUMN commands.prerequisites IS 'Array of required tools/packages (e.g., git, node, docker)';
