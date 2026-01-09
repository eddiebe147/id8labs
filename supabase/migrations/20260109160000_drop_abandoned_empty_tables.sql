-- Drop abandoned empty tables (simplification cleanup)
-- These tables have 0 rows and belong to abandoned feature sets
--
-- Trading/Finance (7 tables): chart_layouts, watchlists, price_alerts,
--   trade_journal, thesis, daily_scores, daily_stats
-- Creative/Story (4 tables): characters, universes, conversations, messages

-- Trading/Finance features (never launched)
DROP TABLE IF EXISTS chart_layouts CASCADE;
DROP TABLE IF EXISTS watchlists CASCADE;
DROP TABLE IF EXISTS price_alerts CASCADE;
DROP TABLE IF EXISTS trade_journal CASCADE;
DROP TABLE IF EXISTS thesis CASCADE;
DROP TABLE IF EXISTS daily_scores CASCADE;
DROP TABLE IF EXISTS daily_stats CASCADE;

-- Creative/Story features (never launched)
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS universes CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
