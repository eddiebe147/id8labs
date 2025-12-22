-- Table for live Claude Code statistics
-- Updated via GitHub webhooks and hooks

CREATE TABLE IF NOT EXISTS claude_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Core metrics
  commits_together integer DEFAULT 0,
  lines_added integer DEFAULT 0,
  lines_removed integer DEFAULT 0,
  lines_of_code integer DEFAULT 0,  -- net (added - removed)

  -- Project tracking
  projects_shipped integer DEFAULT 0,
  milestones_hit integer DEFAULT 0,

  -- Time tracking
  first_commit_date date,
  last_commit_date date,

  -- Tool usage (updated via hooks)
  tool_bash integer DEFAULT 0,
  tool_read integer DEFAULT 0,
  tool_edit integer DEFAULT 0,
  tool_write integer DEFAULT 0,

  -- Language breakdown (JSON for flexibility)
  languages jsonb DEFAULT '{}',

  -- Metadata
  last_synced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE claude_stats;

-- RLS policies
ALTER TABLE claude_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON claude_stats
  FOR SELECT USING (true);

CREATE POLICY "Allow service role write access" ON claude_stats
  FOR ALL USING (auth.role() = 'service_role');

-- Insert initial row (singleton pattern - one row for all stats)
INSERT INTO claude_stats (
  commits_together,
  lines_of_code,
  projects_shipped,
  first_commit_date,
  languages
) VALUES (
  0,
  0,
  5,
  '2025-10-13',
  '{"TypeScript": 68, "Python": 18, "CSS": 9, "MDX": 5}'
);

-- Function to update timestamp on changes
CREATE OR REPLACE FUNCTION update_claude_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER claude_stats_updated
  BEFORE UPDATE ON claude_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_claude_stats_timestamp();

COMMENT ON TABLE claude_stats IS 'Live statistics from Claude Code sessions - updated via GitHub webhooks and hooks';
