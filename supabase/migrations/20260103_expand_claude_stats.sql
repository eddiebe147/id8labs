-- Migration: Expand claude_stats with agents, skills, MCP, and quality metrics
-- Date: 2026-01-03
-- Purpose: Add tracking for agents deployed, skills used, MCP servers, and quality metrics

-- Agent tracking (e.g., {"code-reviewer": 15, "debugger": 8})
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS agents_used jsonb DEFAULT '{}';

-- Skill/command tracking (e.g., {"commit": 45, "fix": 23})
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS skills_used jsonb DEFAULT '{}';

-- MCP server tracking (e.g., {"playwright": 120, "supabase": 89})
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS mcp_used jsonb DEFAULT '{}';

-- Session metrics
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS sessions_count integer DEFAULT 0;
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS hours_collaborated numeric(10,2) DEFAULT 0;

-- Quality metrics
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS tests_written integer DEFAULT 0;
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS builds_succeeded integer DEFAULT 0;
ALTER TABLE claude_stats ADD COLUMN IF NOT EXISTS bugs_fixed integer DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN claude_stats.agents_used IS 'JSONB tracking agent usage counts: {"code-reviewer": count, "debugger": count, ...}';
COMMENT ON COLUMN claude_stats.skills_used IS 'JSONB tracking skill/command usage counts: {"commit": count, "fix": count, ...}';
COMMENT ON COLUMN claude_stats.mcp_used IS 'JSONB tracking MCP server usage counts: {"playwright": count, "supabase": count, ...}';
COMMENT ON COLUMN claude_stats.sessions_count IS 'Total number of Claude Code sessions';
COMMENT ON COLUMN claude_stats.hours_collaborated IS 'Estimated hours spent collaborating';
COMMENT ON COLUMN claude_stats.tests_written IS 'Number of tests written together';
COMMENT ON COLUMN claude_stats.builds_succeeded IS 'Number of successful builds';
COMMENT ON COLUMN claude_stats.bugs_fixed IS 'Number of bugs fixed together';
