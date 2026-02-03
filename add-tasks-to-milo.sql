-- Tasks from tonight's work session (2026-01-25)
-- Based on field notes automation, stats updates, and product page fixes

-- 1. Blog Automation & Infrastructure
INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_blog_stats_automation',
  'Set up automated stats syncing for Claude Corner',
  'Create cron job or GitHub webhook to automatically sync: LOC counts, commit history, Arsenal counts, quality metrics, and activity heatmap. Scripts already built (sync-stats-now.js, count-loc-local.js, update-all-stats.js, generate-heatmap.js). Need to schedule them to run weekly or on git push events.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  2,
  '2026-01-26',
  'Stats are now accurate but manually synced. Automation prevents drift and keeps id8labs.io/claude-corner always up-to-date.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_commit_stats_scripts',
  'Commit and document stats sync scripts',
  'Commit the 5 stats scripts to id8labs repo: sync-stats-now.js, count-loc-local.js, update-all-stats.js, check-stats.js, generate-heatmap.js. Add README documenting what each does and when to run them. Clean up temporary files.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  3,
  '2026-01-26',
  'Scripts are functional but living loose in repo root. Should be organized in /scripts directory with docs.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_blog_heartbeat_setup',
  'Set up heartbeat monitoring for id8Labs blog',
  'Implement check-heartbeat.sh as recurring monitor (every 5 min?) to verify blog is live. Alert if down. Consider integrating with existing heartbeat system or creating standalone cron.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  4,
  '2026-01-27',
  'Blog is live but no active monitoring. Should catch outages quickly.'
);

-- 2. Product Pages Updates
INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_homer_product_page',
  'Update Homer product card to link to actual website',
  'Fix /products/homer page - card should link directly to Homer website when clicked instead of showing details page. Update ProductsContent.tsx or homer/page.tsx.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  2,
  '2026-01-25',
  'User mentioned Homer section needs updating with link to actual site.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_products_homepage_fixes',
  'Fix products homepage issues',
  'Eddie mentioned the products homepage needs fixes. Need to clarify what exactly is broken or needs updating. Check /app/products/page.tsx and ProductsContent.tsx.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  2,
  '2026-01-25',
  'Products page has issues but specifics unclear - need to identify what needs fixing.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_milo_product_page',
  'Update Milo product page',
  'Review and update /products/milo page. Ensure description, features, and links are current. Consider adding screenshots or demo.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  3,
  '2026-01-26',
  'Milo page might need refreshing after recent updates to the app.'
);

-- 3. Cleanup & Organization
INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_cleanup_astro_blog',
  'Clean up or document accidental Astro blog',
  'Decide what to do with ~/id8labs-blog/ - it is a fully functional Astro blog built by accident tonight. Options: 1) Delete it, 2) Keep as separate project/experiment, 3) Use for something else. If keeping, add README explaining what it is.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  4,
  '2026-01-27',
  'Built complete blog thinking it was the main site. It works but we do not need it. Clean up or repurpose.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_organize_scripts_dir',
  'Organize /scripts directory in id8labs repo',
  'Move all stats scripts into /scripts/stats/ subdirectory. Create /scripts/README.md explaining structure. Ensure deploy.sh, check-heartbeat.sh, and status.sh are also properly documented.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  3,
  '2026-01-26',
  'Scripts are working but scattered. Better organization = easier maintenance.'
);

-- 4. Future Enhancements
INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_arsenal_auto_update',
  'Build Arsenal manifest auto-update system',
  'Instead of manually updating ARSENAL_MANIFEST in StatsPanel.tsx, create script that reads from claude-settings repo (agents/*.md, plugins/, skills-manifest.json, mcpServers.json) and auto-generates the manifest object. Run on deploy or via cron.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  4,
  '2026-01-28',
  'Arsenal counts change as we add agents/skills. Auto-sync keeps them accurate without manual updates.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, rationale)
VALUES (
  'task_field_notes_cadence',
  'Establish regular field notes publishing cadence',
  'Now that Milo is writing field notes, establish rhythm: weekly? bi-weekly? Create template/checklist for what to include. Consider using heartbeat to remind when it is time to publish.',
  's6_1lGEGOd-Nrt7egnstm',
  'pending',
  3,
  '2026-01-27',
  'Field Note #001 published. Need system to keep them coming regularly without becoming a chore.'
);

-- Mark tonight's completed work
INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, completed_at, rationale)
VALUES (
  'task_field_note_001',
  'Write and publish Field Note #001: Milo introduction',
  'Wrote essay introducing Milo, explaining handoff from Eddie to AI for documentation. Published to /content/essays/ and added short entry to Claude Corner field notes (entry #30). Explains philosophy, what to expect, and recent work.',
  's6_1lGEGOd-Nrt7egnstm',
  'completed',
  1,
  '2026-01-25',
  '2026-01-25 00:32:00',
  'First official field note from Milo. Sets tone and expectations for future updates.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, completed_at, rationale)
VALUES (
  'task_stats_sync_accurate',
  'Sync Claude Corner stats with accurate data',
  'Built and ran scripts to sync: 4.5M LOC (from local repos), 1,553 commits, 40 agents, 293 skills, 5 MCPs, 35,820 tests, 80% build success, real activity heatmap. All stats on id8labs.io/claude-corner now 100% accurate.',
  's6_1lGEGOd-Nrt7egnstm',
  'completed',
  1,
  '2026-01-25',
  '2026-01-25 00:45:00',
  'Stats were showing estimates/outdated numbers. Now pulling from real data sources.'
);

INSERT INTO tasks (id, title, description, category_id, status, priority, scheduled_date, completed_at, rationale)
VALUES (
  'task_activity_heatmap_real',
  'Generate real activity heatmap from git history',
  'Replaced static/estimated activity heatmap with real data generated from git logs across all 7 repos. Shows 1,719 commits over 15 weeks (Oct 2025 - Jan 2026). Peak day: 78 commits. Deployed to live site.',
  's6_1lGEGOd-Nrt7egnstm',
  'completed',
  2,
  '2026-01-25',
  '2026-01-25 00:52:00',
  'Activity heatmap was fabricated data. Now shows actual contribution pattern.'
);
