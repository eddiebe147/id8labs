DO $$
DECLARE
  r record;
  new_qual text;
  new_check text;
  sql text;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (
        coalesce(qual, '') ~ 'auth\\.uid\\(\\)|auth\\.role\\(\\)|auth\\.jwt\\(\\)|current_setting\\('
        OR coalesce(with_check, '') ~ 'auth\\.uid\\(\\)|auth\\.role\\(\\)|auth\\.jwt\\(\\)|current_setting\\('
      )
  LOOP
    new_qual := r.qual;
    new_check := r.with_check;

    IF new_qual IS NOT NULL THEN
      IF new_qual ILIKE '%auth.uid()%' AND new_qual NOT ILIKE '%select auth.uid()%' THEN
        new_qual := regexp_replace(new_qual, 'auth\\.uid\\(\\)', '(select auth.uid())', 'g');
      END IF;
      IF new_qual ILIKE '%auth.role()%' AND new_qual NOT ILIKE '%select auth.role()%' THEN
        new_qual := regexp_replace(new_qual, 'auth\\.role\\(\\)', '(select auth.role())', 'g');
      END IF;
      IF new_qual ILIKE '%auth.jwt()%' AND new_qual NOT ILIKE '%select auth.jwt()%' THEN
        new_qual := regexp_replace(new_qual, 'auth\\.jwt\\(\\)', '(select auth.jwt())', 'g');
      END IF;
      IF new_qual ILIKE '%current_setting(%' AND new_qual NOT ILIKE '%select current_setting(%' THEN
        new_qual := regexp_replace(new_qual, 'current_setting\\(([^)]*)\\)', '(select current_setting(\\1))', 'g');
      END IF;
    END IF;

    IF new_check IS NOT NULL THEN
      IF new_check ILIKE '%auth.uid()%' AND new_check NOT ILIKE '%select auth.uid()%' THEN
        new_check := regexp_replace(new_check, 'auth\\.uid\\(\\)', '(select auth.uid())', 'g');
      END IF;
      IF new_check ILIKE '%auth.role()%' AND new_check NOT ILIKE '%select auth.role()%' THEN
        new_check := regexp_replace(new_check, 'auth\\.role\\(\\)', '(select auth.role())', 'g');
      END IF;
      IF new_check ILIKE '%auth.jwt()%' AND new_check NOT ILIKE '%select auth.jwt()%' THEN
        new_check := regexp_replace(new_check, 'auth\\.jwt\\(\\)', '(select auth.jwt())', 'g');
      END IF;
      IF new_check ILIKE '%current_setting(%' AND new_check NOT ILIKE '%select current_setting(%' THEN
        new_check := regexp_replace(new_check, 'current_setting\\(([^)]*)\\)', '(select current_setting(\\1))', 'g');
      END IF;
    END IF;

    IF new_qual IS DISTINCT FROM r.qual OR new_check IS DISTINCT FROM r.with_check THEN
      sql := format('ALTER POLICY %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
      IF new_qual IS NOT NULL THEN
        sql := sql || format(' USING (%s)', new_qual);
      END IF;
      IF new_check IS NOT NULL THEN
        sql := sql || format(' WITH CHECK (%s)', new_check);
      END IF;
      EXECUTE sql;
    END IF;
  END LOOP;
END $$;

ALTER POLICY "Allow public read access" ON public.claude_observations TO anon, authenticated;
ALTER POLICY "Allow service role write access" ON public.claude_observations TO service_role;

ALTER POLICY "Allow public read access" ON public.claude_stats TO anon, authenticated;
ALTER POLICY "Allow service role write access" ON public.claude_stats TO service_role;

DROP INDEX IF EXISTS public.email_sequence_logs_sequence_idx;
DROP INDEX IF EXISTS public.skill_collection_items_collection_idx;
DROP INDEX IF EXISTS public.skill_collection_items_skill_idx;
DROP INDEX IF EXISTS public.skill_installs_skill_idx;
