-- Enable RLS on tables that were missing it
-- Security audit identified these 3 tables without RLS protection

-- 1. publishing_windows - controls when content can be published
ALTER TABLE publishing_windows ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users (needed for app functionality)
CREATE POLICY "Allow authenticated read on publishing_windows"
  ON publishing_windows FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can modify (admin operations)
CREATE POLICY "Allow service role full access on publishing_windows"
  ON publishing_windows FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 2. smart_spacing_config - algorithm configuration
ALTER TABLE smart_spacing_config ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow authenticated read on smart_spacing_config"
  ON smart_spacing_config FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can modify
CREATE POLICY "Allow service role full access on smart_spacing_config"
  ON smart_spacing_config FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. skill_categories - marketplace category definitions
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access (marketplace is public)
CREATE POLICY "Allow public read on skill_categories"
  ON skill_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only service role can modify
CREATE POLICY "Allow service role full access on skill_categories"
  ON skill_categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
