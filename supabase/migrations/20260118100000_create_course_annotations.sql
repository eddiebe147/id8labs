-- Course Annotations Migration
-- Personal highlights and notes system for ID8Labs Academy
-- Allows learners to highlight text and add notes while reading courses

-- ═══════════════════════════════════════════════════════════════════════════
-- COURSE HIGHLIGHTS TABLE
-- User highlights on course text (like Kindle/Medium highlighting)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.course_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Location context
  course_slug TEXT NOT NULL,
  module_slug TEXT NOT NULL,

  -- Highlight content
  highlighted_text TEXT NOT NULL,
  text_prefix TEXT,           -- ~50 chars before (for repositioning on page changes)
  text_suffix TEXT,           -- ~50 chars after (for repositioning on page changes)

  -- Styling
  color TEXT DEFAULT 'yellow' CHECK (color IN ('yellow', 'green', 'blue', 'pink')),

  -- Optional attached note
  note TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.course_highlights ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only manage their own highlights
CREATE POLICY "Users can view own highlights" ON public.course_highlights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create highlights" ON public.course_highlights
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own highlights" ON public.course_highlights
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own highlights" ON public.course_highlights
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_highlights_user_module
  ON public.course_highlights(user_id, course_slug, module_slug);

CREATE INDEX IF NOT EXISTS idx_highlights_user_course
  ON public.course_highlights(user_id, course_slug);

CREATE INDEX IF NOT EXISTS idx_highlights_created_at
  ON public.course_highlights(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- COURSE NOTES TABLE
-- Standalone notes (not attached to highlights)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.course_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Location context
  course_slug TEXT NOT NULL,
  module_slug TEXT,           -- NULL = course-level note (general note about whole course)

  -- Note content
  title TEXT,                 -- Optional title for the note
  content TEXT NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.course_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only manage their own notes
CREATE POLICY "Users can view own notes" ON public.course_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create notes" ON public.course_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON public.course_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON public.course_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_notes_user_course
  ON public.course_notes(user_id, course_slug);

CREATE INDEX IF NOT EXISTS idx_notes_user_module
  ON public.course_notes(user_id, course_slug, module_slug);

CREATE INDEX IF NOT EXISTS idx_notes_created_at
  ON public.course_notes(created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- HELPER FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- Function to get annotation stats for a user
CREATE OR REPLACE FUNCTION public.get_annotation_stats(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_highlights', (SELECT COUNT(*) FROM public.course_highlights WHERE user_id = p_user_id),
    'total_notes', (SELECT COUNT(*) FROM public.course_notes WHERE user_id = p_user_id),
    'by_course', (
      SELECT json_object_agg(course_slug, course_stats)
      FROM (
        SELECT
          course_slug,
          json_build_object(
            'highlights', (SELECT COUNT(*) FROM public.course_highlights h WHERE h.user_id = p_user_id AND h.course_slug = courses.course_slug),
            'notes', (SELECT COUNT(*) FROM public.course_notes n WHERE n.user_id = p_user_id AND n.course_slug = courses.course_slug)
          ) as course_stats
        FROM (
          SELECT DISTINCT course_slug FROM public.course_highlights WHERE user_id = p_user_id
          UNION
          SELECT DISTINCT course_slug FROM public.course_notes WHERE user_id = p_user_id
        ) courses
      ) sub
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update timestamps on changes
CREATE OR REPLACE FUNCTION public.update_annotation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp triggers
DROP TRIGGER IF EXISTS update_highlight_timestamp ON public.course_highlights;
CREATE TRIGGER update_highlight_timestamp
  BEFORE UPDATE ON public.course_highlights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_annotation_timestamp();

DROP TRIGGER IF EXISTS update_note_timestamp ON public.course_notes;
CREATE TRIGGER update_note_timestamp
  BEFORE UPDATE ON public.course_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_annotation_timestamp();

-- ═══════════════════════════════════════════════════════════════════════════
-- GRANTS
-- ═══════════════════════════════════════════════════════════════════════════

-- Grant access to authenticated users only
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_highlights TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_notes TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_annotation_stats(UUID) TO authenticated;
