-- Seed all 38 plugins (25 official Anthropic + 13 community)

-- ============================================
-- OFFICIAL ANTHROPIC PLUGINS (25)
-- ============================================

-- Featured: code-simplifier
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('code-simplifier', 'Code Simplifier', 'Expert code simplification specialist focused on enhancing code clarity, consistency, and maintainability while preserving exact functionality. Perfect for cleaning up PRs and simplifying complex code at the end of development sessions.', 'code-quality', 'claude plugin install code-simplifier', '/plugin install code-simplifier', 'anthropics/claude-plugins-official', 'Boris Cherny', 'Anthropic', ARRAY['refactoring', 'clean-code', 'code-review', 'maintainability', 'official'], ARRAY['Clean up pull requests', 'Simplify complex functions', 'End-of-session code cleanup', 'Improve code readability'], true, true, true)
ON CONFLICT (slug) DO NOTHING;

-- Featured: ralph-loop
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, original_author, tags, use_cases, verified, featured, official) VALUES
('ralph-loop', 'Ralph Loop', 'Autonomous development loops that let Claude Code agents work for hours without intervention. Uses stop hooks to intercept exits and feed prompts back, enabling continuous task completion until the work is done.', 'automation', 'claude plugin install ralph-loop', '/plugin install ralph-loop', 'anthropics/claude-plugins-official', 'Boris Cherny', 'Anthropic', 'Geoffrey Huntley', ARRAY['autonomous', 'automation', 'loops', 'long-running', 'agent', 'official'], ARRAY['Overnight development tasks', 'Large refactoring projects', 'Batch processing', 'Unattended code generation'], true, true, true)
ON CONFLICT (slug) DO NOTHING;

-- code-review
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('code-review', 'Code Review', 'Automated code review agent that analyzes code changes for bugs, security issues, performance problems, and style violations. Provides actionable feedback and suggestions.', 'code-quality', 'claude plugin install code-review', '/plugin install code-review', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['code-review', 'analysis', 'bugs', 'security', 'official'], ARRAY['Pull request review', 'Code analysis', 'Security scanning', 'Style checking'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- pr-review-toolkit
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('pr-review-toolkit', 'PR Review Toolkit', 'Comprehensive toolkit for reviewing pull requests with multiple specialized agents for different aspects of code review including silent failure detection and type design analysis.', 'code-quality', 'claude plugin install pr-review-toolkit', '/plugin install pr-review-toolkit', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['pr-review', 'toolkit', 'agents', 'analysis', 'official'], ARRAY['PR reviews', 'Multi-agent analysis', 'Type design review', 'Silent failure detection'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- feature-dev
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('feature-dev', 'Feature Dev', 'Feature development workflow plugin with specialized agents for exploring codebases, architecting solutions, reviewing code, and implementing features systematically.', 'development', 'claude plugin install feature-dev', '/plugin install feature-dev', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['feature', 'development', 'workflow', 'architecture', 'official'], ARRAY['Feature planning', 'Code architecture', 'Implementation workflow', 'Systematic development'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- frontend-design
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('frontend-design', 'Frontend Design', 'Frontend design assistance plugin for UI/UX development, component design, and responsive layouts with modern frameworks.', 'development', 'claude plugin install frontend-design', '/plugin install frontend-design', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['frontend', 'design', 'ui', 'ux', 'components', 'official'], ARRAY['UI component design', 'Responsive layouts', 'Design systems', 'Frontend architecture'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- plugin-dev
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('plugin-dev', 'Plugin Dev', 'Plugin development tools for creating, testing, and publishing Claude Code plugins with proper structure and documentation.', 'development', 'claude plugin install plugin-dev', '/plugin install plugin-dev', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['plugin', 'development', 'tooling', 'sdk', 'official'], ARRAY['Create new plugins', 'Plugin testing', 'Plugin publishing', 'Documentation generation'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- agent-sdk-dev
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('agent-sdk-dev', 'Agent SDK Dev', 'Agent SDK development tools with verification agents for TypeScript and Python to ensure SDK applications follow best practices.', 'development', 'claude plugin install agent-sdk-dev', '/plugin install agent-sdk-dev', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['agent', 'sdk', 'typescript', 'python', 'verification', 'official'], ARRAY['Agent development', 'SDK verification', 'Best practices', 'Multi-language support'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- commit-commands
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('commit-commands', 'Commit Commands', 'Git commit workflow commands for streamlined version control with conventional commits and automated changelog generation.', 'productivity', 'claude plugin install commit-commands', '/plugin install commit-commands', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['git', 'commit', 'workflow', 'conventional', 'changelog', 'official'], ARRAY['Git commits', 'Conventional commits', 'Changelog generation', 'Version control'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- hookify
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('hookify', 'Hookify', 'Hook creation and management plugin for setting up Claude Code hooks that execute commands on various events like tool calls and prompts.', 'automation', 'claude plugin install hookify', '/plugin install hookify', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['hooks', 'automation', 'events', 'triggers', 'official'], ARRAY['Create hooks', 'Event automation', 'Workflow triggers', 'Custom integrations'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- security-guidance
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('security-guidance', 'Security Guidance', 'Security best practices plugin providing guidance on secure coding, vulnerability prevention, and security auditing.', 'code-quality', 'claude plugin install security-guidance', '/plugin install security-guidance', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['security', 'best-practices', 'vulnerabilities', 'auditing', 'official'], ARRAY['Security review', 'Vulnerability scanning', 'Secure coding', 'Compliance checks'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- learning-output-style
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('learning-output-style', 'Learning Output Style', 'Educational output formatting that combines interactive learning with explanatory content, providing insights and opportunities for hands-on coding.', 'output-style', 'claude plugin install learning-output-style', '/plugin install learning-output-style', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['learning', 'education', 'interactive', 'explanatory', 'official'], ARRAY['Learning mode', 'Educational content', 'Interactive coding', 'Skill building'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- explanatory-output-style
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('explanatory-output-style', 'Explanatory Output Style', 'Detailed explanations output style providing comprehensive context and reasoning for all code changes and decisions.', 'output-style', 'claude plugin install explanatory-output-style', '/plugin install explanatory-output-style', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['explanatory', 'detailed', 'reasoning', 'documentation', 'official'], ARRAY['Detailed explanations', 'Code documentation', 'Decision reasoning', 'Learning context'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- LSP Plugins (11)
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('typescript-lsp', 'TypeScript LSP', 'TypeScript language server protocol integration for enhanced type checking, autocompletion, and code navigation.', 'lsp', 'claude plugin install typescript-lsp', '/plugin install typescript-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['typescript', 'lsp', 'intellisense', 'types', 'official'], ARRAY['TypeScript development', 'Type checking', 'Code navigation', 'Autocompletion'], true, false, true),
('pyright-lsp', 'Pyright LSP', 'Python language server using Pyright for static type checking and intelligent code completion.', 'lsp', 'claude plugin install pyright-lsp', '/plugin install pyright-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['python', 'pyright', 'lsp', 'types', 'official'], ARRAY['Python development', 'Type checking', 'Static analysis', 'Code intelligence'], true, false, true),
('rust-analyzer-lsp', 'Rust Analyzer LSP', 'Rust language server providing comprehensive Rust development support with rust-analyzer.', 'lsp', 'claude plugin install rust-analyzer-lsp', '/plugin install rust-analyzer-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['rust', 'rust-analyzer', 'lsp', 'systems', 'official'], ARRAY['Rust development', 'Cargo integration', 'Type inference', 'Code analysis'], true, false, true),
('gopls-lsp', 'Go LSP', 'Go language server using gopls for Go development with module support and code navigation.', 'lsp', 'claude plugin install gopls-lsp', '/plugin install gopls-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['go', 'golang', 'gopls', 'lsp', 'official'], ARRAY['Go development', 'Module support', 'Code navigation', 'Formatting'], true, false, true),
('clangd-lsp', 'Clangd LSP', 'C/C++ language server using clangd for C and C++ development with LLVM tooling.', 'lsp', 'claude plugin install clangd-lsp', '/plugin install clangd-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['c', 'cpp', 'clangd', 'llvm', 'lsp', 'official'], ARRAY['C/C++ development', 'LLVM integration', 'Code completion', 'Diagnostics'], true, false, true),
('swift-lsp', 'Swift LSP', 'Swift language server for iOS and macOS development with SourceKit integration.', 'lsp', 'claude plugin install swift-lsp', '/plugin install swift-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['swift', 'ios', 'macos', 'sourcekit', 'lsp', 'official'], ARRAY['Swift development', 'iOS apps', 'macOS apps', 'Apple platforms'], true, false, true),
('kotlin-lsp', 'Kotlin LSP', 'Kotlin language server for JVM and Android development with intelligent code assistance.', 'lsp', 'claude plugin install kotlin-lsp', '/plugin install kotlin-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['kotlin', 'android', 'jvm', 'lsp', 'official'], ARRAY['Kotlin development', 'Android apps', 'JVM applications', 'Multiplatform'], true, false, true),
('jdtls-lsp', 'Java LSP', 'Java language server using Eclipse JDT for Java development with Maven/Gradle support.', 'lsp', 'claude plugin install jdtls-lsp', '/plugin install jdtls-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['java', 'jdt', 'eclipse', 'maven', 'gradle', 'lsp', 'official'], ARRAY['Java development', 'Maven projects', 'Gradle builds', 'Enterprise Java'], true, false, true),
('csharp-lsp', 'C# LSP', 'C# language server for .NET development with OmniSharp integration.', 'lsp', 'claude plugin install csharp-lsp', '/plugin install csharp-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['csharp', 'dotnet', 'omnisharp', 'lsp', 'official'], ARRAY['C# development', '.NET applications', 'ASP.NET', 'Unity'], true, false, true),
('php-lsp', 'PHP LSP', 'PHP language server for web development with framework support and static analysis.', 'lsp', 'claude plugin install php-lsp', '/plugin install php-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['php', 'web', 'laravel', 'lsp', 'official'], ARRAY['PHP development', 'Laravel', 'WordPress', 'Web backends'], true, false, true),
('lua-lsp', 'Lua LSP', 'Lua language server for game development and scripting with LuaLS integration.', 'lsp', 'claude plugin install lua-lsp', '/plugin install lua-lsp', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['lua', 'gaming', 'scripting', 'lsp', 'official'], ARRAY['Lua scripting', 'Game development', 'Neovim plugins', 'Embedded systems'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- example-plugin
INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('example-plugin', 'Example Plugin', 'Template and example plugin demonstrating proper plugin structure and best practices for creating Claude Code plugins.', 'development', 'claude plugin install example-plugin', '/plugin install example-plugin', 'anthropics/claude-plugins-official', 'Anthropic', 'Anthropic', ARRAY['example', 'template', 'learning', 'documentation', 'official'], ARRAY['Plugin template', 'Learning resource', 'Best practices', 'Getting started'], true, false, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- COMMUNITY/EXTERNAL PLUGINS (13)
-- ============================================

INSERT INTO plugins (slug, name, description, category, install_command, slash_command, github_repo, author, author_org, tags, use_cases, verified, featured, official) VALUES
('github-integration', 'GitHub Integration', 'GitHub integration plugin for managing repositories, issues, pull requests, and workflows directly from Claude Code.', 'integration', 'claude plugin install github', '/plugin install github', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['github', 'git', 'repositories', 'issues', 'prs'], ARRAY['Repository management', 'Issue tracking', 'PR automation', 'GitHub Actions'], true, false, false),
('gitlab-integration', 'GitLab Integration', 'GitLab integration plugin for managing GitLab repositories, merge requests, and CI/CD pipelines.', 'integration', 'claude plugin install gitlab', '/plugin install gitlab', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['gitlab', 'git', 'merge-requests', 'cicd', 'pipelines'], ARRAY['GitLab projects', 'Merge requests', 'CI/CD', 'DevOps workflows'], true, false, false),
('linear-integration', 'Linear Integration', 'Linear issue tracking integration for managing projects, issues, and sprints with Linear.', 'integration', 'claude plugin install linear', '/plugin install linear', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['linear', 'issues', 'projects', 'sprints', 'agile'], ARRAY['Issue management', 'Sprint planning', 'Project tracking', 'Team collaboration'], true, false, false),
('asana-integration', 'Asana Integration', 'Asana project management integration for task management and team coordination.', 'integration', 'claude plugin install asana', '/plugin install asana', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['asana', 'tasks', 'projects', 'teams', 'management'], ARRAY['Task management', 'Project planning', 'Team coordination', 'Workflow automation'], true, false, false),
('slack-integration', 'Slack Integration', 'Slack messaging integration for sending notifications and updates to Slack channels.', 'integration', 'claude plugin install slack', '/plugin install slack', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['slack', 'messaging', 'notifications', 'teams', 'chat'], ARRAY['Team notifications', 'Status updates', 'Bot integration', 'Channel messaging'], true, false, false),
('supabase-integration', 'Supabase Integration', 'Supabase database integration for managing PostgreSQL databases, auth, and storage.', 'integration', 'claude plugin install supabase', '/plugin install supabase', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['supabase', 'postgresql', 'database', 'auth', 'storage'], ARRAY['Database management', 'Auth setup', 'Storage operations', 'Real-time subscriptions'], true, false, false),
('firebase-integration', 'Firebase Integration', 'Firebase and Google Cloud integration for Firebase projects and GCP services.', 'integration', 'claude plugin install firebase', '/plugin install firebase', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['firebase', 'google-cloud', 'firestore', 'functions', 'hosting'], ARRAY['Firebase projects', 'Cloud Functions', 'Firestore', 'Hosting'], true, false, false),
('stripe-integration', 'Stripe Integration', 'Stripe payments integration for managing subscriptions, invoices, and payment processing.', 'integration', 'claude plugin install stripe', '/plugin install stripe', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['stripe', 'payments', 'subscriptions', 'invoices', 'checkout'], ARRAY['Payment processing', 'Subscription management', 'Invoice handling', 'Checkout integration'], true, false, false),
('playwright-integration', 'Playwright Integration', 'Playwright browser automation plugin for E2E testing and web scraping.', 'testing', 'claude plugin install playwright', '/plugin install playwright', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['playwright', 'testing', 'e2e', 'browser', 'automation'], ARRAY['E2E testing', 'Browser automation', 'Web scraping', 'Visual testing'], true, false, false),
('greptile-integration', 'Greptile Integration', 'Greptile code search and analysis plugin for semantic code search across repositories.', 'code-quality', 'claude plugin install greptile', '/plugin install greptile', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['greptile', 'search', 'semantic', 'codebase', 'analysis'], ARRAY['Semantic search', 'Code analysis', 'Codebase exploration', 'Pattern finding'], true, false, false),
('laravel-boost', 'Laravel Boost', 'Laravel framework enhancement plugin for Laravel-specific development patterns and tooling.', 'framework', 'claude plugin install laravel-boost', '/plugin install laravel-boost', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['laravel', 'php', 'framework', 'artisan', 'eloquent'], ARRAY['Laravel development', 'Artisan commands', 'Eloquent models', 'Blade templates'], true, false, false),
('context7-integration', 'Context7 Integration', 'Context7 context management plugin for managing conversation context and memory.', 'productivity', 'claude plugin install context7', '/plugin install context7', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['context', 'memory', 'management', 'conversation', 'state'], ARRAY['Context management', 'Memory optimization', 'State persistence', 'Session handling'], true, false, false),
('serena-integration', 'Serena Integration', 'Serena assistant plugin providing additional AI-powered development assistance.', 'productivity', 'claude plugin install serena', '/plugin install serena', 'anthropics/claude-plugins-official/external_plugins', 'Community', 'Community', ARRAY['serena', 'assistant', 'ai', 'development', 'productivity'], ARRAY['AI assistance', 'Development support', 'Productivity boost', 'Smart suggestions'], true, false, false)
ON CONFLICT (slug) DO NOTHING;
