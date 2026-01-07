-- Performance indexes for skills marketplace
-- Fixes query timeout issues (error 57014)

-- Index for skill_collection_items lookups
CREATE INDEX IF NOT EXISTS idx_skill_collection_items_collection_id 
  ON public.skill_collection_items(collection_id);

CREATE INDEX IF NOT EXISTS idx_skill_collection_items_skill_id 
  ON public.skill_collection_items(skill_id);

-- Composite index for the join
CREATE INDEX IF NOT EXISTS idx_skill_collection_items_composite 
  ON public.skill_collection_items(collection_id, skill_id);

-- Index for skills by status (used in most queries)
CREATE INDEX IF NOT EXISTS idx_skills_status 
  ON public.skills(status) WHERE status = 'published';

-- Index for collections by public flag
CREATE INDEX IF NOT EXISTS idx_skill_collections_public 
  ON public.skill_collections(is_public) WHERE is_public = true;

-- Analyze tables to update statistics
ANALYZE public.skills;
ANALYZE public.skill_collections;
ANALYZE public.skill_collection_items;
