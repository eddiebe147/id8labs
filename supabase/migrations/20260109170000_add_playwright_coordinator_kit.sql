-- Add Playwright Agent Coordinator as a featured toolkit
-- This is infrastructure, not a skill collection - it's a standalone toolkit
-- that enables multi-agent browser automation

-- Insert the collection
INSERT INTO skill_collections (
  id,
  slug,
  name,
  description,
  emoji,
  author,
  is_official,
  is_public,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'playwright-coordinator',
  'Playwright Agent Coordinator',
  'Multi-agent browser pool management system. Automatically coordinates Playwright access across parallel AI agents with reservation, heartbeat tracking, and graceful queuing. Prevents browser conflicts in agentic workflows. Includes MCP server, hooks, and CLI.',
  '🎭',
  'ID8Labs',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  updated_at = NOW();

-- Create the individual tool "skills" that make up this kit
-- These represent the MCP tools in the toolkit

INSERT INTO skills (
  id, slug, name, description, category_id, complexity, version, author, license,
  triggers, commands, tags, content, readme,
  quality_score, quality_tier, validated, install_count, view_count,
  status, featured, verified, created_at, updated_at, published_at
) VALUES
-- playwright_reserve tool
(
  gen_random_uuid(),
  'playwright-reserve',
  'Playwright Reserve',
  'Reserve a browser context from the pool before using Playwright. Automatically called via PreToolUse hook.',
  'code',
  'multi-agent',
  '1.0.0',
  'ID8Labs',
  'MIT',
  ARRAY['playwright', 'browser', 'reserve'],
  ARRAY['playwright_reserve'],
  ARRAY['playwright', 'mcp', 'browser-automation', 'multi-agent', 'coordination'],
  'MCP tool that reserves a browser context from the pool. Part of the Playwright Agent Coordinator toolkit.',
  '# playwright_reserve

Reserve a browser context before using Playwright.

## Usage
```
playwright_reserve(agent_id, purpose)
```

## Parameters
- `agent_id`: Unique identifier for your agent/session
- `purpose`: Brief description of what you will use Playwright for

## Returns
- `success`: boolean
- `contextId`: The reserved context ID',
  90, 'gold', true, 0, 0, 'published', false, true, NOW(), NOW(), NOW()
),
-- playwright_release tool
(
  gen_random_uuid(),
  'playwright-release',
  'Playwright Release',
  'Release a browser context back to the pool when done with Playwright.',
  'code',
  'multi-agent',
  '1.0.0',
  'ID8Labs',
  'MIT',
  ARRAY['playwright', 'browser', 'release'],
  ARRAY['playwright_release'],
  ARRAY['playwright', 'mcp', 'browser-automation', 'multi-agent', 'coordination'],
  'MCP tool that releases a browser context back to the pool. Part of the Playwright Agent Coordinator toolkit.',
  '# playwright_release

Release your browser context back to the pool.

## Usage
```
playwright_release(agent_id)
```

## Parameters
- `agent_id`: Your agent/session identifier

## Returns
- `success`: boolean
- `contextId`: The released context ID',
  90, 'gold', true, 0, 0, 'published', false, true, NOW(), NOW(), NOW()
),
-- playwright_pool_status tool
(
  gen_random_uuid(),
  'playwright-pool-status',
  'Playwright Pool Status',
  'Check the current status of the browser pool - available, reserved, and waiting contexts.',
  'code',
  'multi-agent',
  '1.0.0',
  'ID8Labs',
  'MIT',
  ARRAY['playwright', 'browser', 'status', 'pool'],
  ARRAY['playwright_pool_status'],
  ARRAY['playwright', 'mcp', 'browser-automation', 'multi-agent', 'monitoring'],
  'MCP tool that shows pool status. Part of the Playwright Agent Coordinator toolkit.',
  '# playwright_pool_status

Check the current status of the Playwright browser pool.

## Usage
```
playwright_pool_status()
```

## Returns
- Available context count
- Reserved context count
- Shared context count
- Waiting queue length
- Status of each context',
  90, 'gold', true, 0, 0, 'published', false, true, NOW(), NOW(), NOW()
),
-- playwright_heartbeat tool
(
  gen_random_uuid(),
  'playwright-heartbeat',
  'Playwright Heartbeat',
  'Send a heartbeat to indicate you are still using Playwright. Prevents auto-release timeout.',
  'code',
  'multi-agent',
  '1.0.0',
  'ID8Labs',
  'MIT',
  ARRAY['playwright', 'browser', 'heartbeat'],
  ARRAY['playwright_heartbeat'],
  ARRAY['playwright', 'mcp', 'browser-automation', 'multi-agent', 'coordination'],
  'MCP tool that sends heartbeat to coordinator. Part of the Playwright Agent Coordinator toolkit.',
  '# playwright_heartbeat

Send a heartbeat during long Playwright operations.

## Usage
```
playwright_heartbeat(agent_id)
```

## Parameters
- `agent_id`: Your agent/session identifier

## Notes
Contexts are auto-released after 10 minutes of inactivity. Call heartbeat during long operations to prevent this.',
  90, 'gold', true, 0, 0, 'published', false, true, NOW(), NOW(), NOW()
),
-- playwright_force_cleanup tool
(
  gen_random_uuid(),
  'playwright-force-cleanup',
  'Playwright Force Cleanup',
  'Emergency cleanup - force release all contexts held by an agent.',
  'code',
  'multi-agent',
  '1.0.0',
  'ID8Labs',
  'MIT',
  ARRAY['playwright', 'browser', 'cleanup', 'emergency'],
  ARRAY['playwright_force_cleanup'],
  ARRAY['playwright', 'mcp', 'browser-automation', 'multi-agent', 'coordination'],
  'MCP tool for emergency cleanup. Part of the Playwright Agent Coordinator toolkit.',
  '# playwright_force_cleanup

Force release all contexts held by an agent.

## Usage
```
playwright_force_cleanup(agent_id)
```

## Parameters
- `agent_id`: Agent ID to clean up

## Warning
Use only for emergency cleanup when an agent has crashed or is unresponsive.',
  90, 'gold', true, 0, 0, 'published', false, true, NOW(), NOW(), NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Link the skills to the collection
INSERT INTO skill_collection_items (id, collection_id, skill_id, display_order, note)
SELECT
  gen_random_uuid(),
  c.id,
  s.id,
  row_number() OVER (ORDER BY s.slug),
  CASE s.slug
    WHEN 'playwright-reserve' THEN 'Reserve a context before using Playwright'
    WHEN 'playwright-release' THEN 'Release context when done'
    WHEN 'playwright-pool-status' THEN 'Check pool availability'
    WHEN 'playwright-heartbeat' THEN 'Keep context alive during long ops'
    WHEN 'playwright-force-cleanup' THEN 'Emergency cleanup'
  END
FROM skill_collections c, skills s
WHERE c.slug = 'playwright-coordinator'
  AND s.slug IN ('playwright-reserve', 'playwright-release', 'playwright-pool-status', 'playwright-heartbeat', 'playwright-force-cleanup')
ON CONFLICT DO NOTHING;
