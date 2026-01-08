-- Seed workflow commands (50 commands across 6 categories)

-- Git commands (10)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('git-commit', 'Quick Commit', 'Stage all changes and commit with a message', 'git', 'git add -A && git commit -m "$MESSAGE"', ARRAY['git'], ARRAY['git', 'version-control', 'workflow'], true, true),
('git-push-branch', 'Push Current Branch', 'Push current branch to origin', 'git', 'git push -u origin $(git branch --show-current)', ARRAY['git'], ARRAY['git', 'push', 'remote'], true, false),
('git-pull-rebase', 'Pull with Rebase', 'Pull latest changes and rebase local commits', 'git', 'git pull --rebase origin $(git branch --show-current)', ARRAY['git'], ARRAY['git', 'pull', 'rebase'], true, false),
('git-new-branch', 'Create Feature Branch', 'Create and switch to a new feature branch', 'git', 'git checkout -b feature/$NAME', ARRAY['git'], ARRAY['git', 'branch', 'feature'], true, true),
('git-merge-main', 'Merge Main into Current', 'Merge main/master into current branch', 'git', 'git fetch origin && git merge origin/main', ARRAY['git'], ARRAY['git', 'merge', 'main'], true, false),
('git-stash-save', 'Stash Changes', 'Stash all current changes with a message', 'git', 'git stash push -m "$MESSAGE"', ARRAY['git'], ARRAY['git', 'stash', 'save'], true, false),
('git-stash-pop', 'Pop Latest Stash', 'Apply and remove the latest stash', 'git', 'git stash pop', ARRAY['git'], ARRAY['git', 'stash', 'restore'], true, false),
('git-interactive-rebase', 'Interactive Rebase', 'Interactively rebase last N commits', 'git', 'git rebase -i HEAD~$COUNT', ARRAY['git'], ARRAY['git', 'rebase', 'history'], true, false),
('git-undo-commit', 'Undo Last Commit', 'Undo last commit but keep changes staged', 'git', 'git reset --soft HEAD~1', ARRAY['git'], ARRAY['git', 'undo', 'reset'], true, true),
('git-log-pretty', 'Pretty Git Log', 'Show commit history in a clean format', 'git', 'git log --oneline --graph --decorate -20', ARRAY['git'], ARRAY['git', 'log', 'history'], true, false)
ON CONFLICT (slug) DO NOTHING;

-- Project Setup commands (8)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('init-nextjs', 'Create Next.js App', 'Initialize a new Next.js 14 project with TypeScript', 'setup', 'npx create-next-app@latest $NAME --typescript --tailwind --eslint --app --src-dir', ARRAY['node', 'npm'], ARRAY['nextjs', 'typescript', 'setup'], true, true),
('init-vite', 'Create Vite Project', 'Initialize a new Vite project with React and TypeScript', 'setup', 'npm create vite@latest $NAME -- --template react-ts', ARRAY['node', 'npm'], ARRAY['vite', 'react', 'typescript'], true, false),
('setup-env', 'Setup Environment', 'Copy .env.example to .env.local', 'setup', 'cp .env.example .env.local && echo "Created .env.local - please fill in values"', NULL, ARRAY['env', 'config', 'setup'], true, false),
('install-deps', 'Install Dependencies', 'Install all project dependencies', 'setup', 'npm install', ARRAY['node', 'npm'], ARRAY['npm', 'install', 'dependencies'], true, false),
('create-component', 'Create React Component', 'Generate a new React component with TypeScript', 'setup', 'mkdir -p src/components/$NAME && echo "export function $NAME() { return <div>$NAME</div> }" > src/components/$NAME/index.tsx', ARRAY['node'], ARRAY['react', 'component', 'generator'], true, false),
('init-prisma', 'Initialize Prisma', 'Setup Prisma ORM with PostgreSQL', 'setup', 'npx prisma init --datasource-provider postgresql', ARRAY['node', 'npm'], ARRAY['prisma', 'database', 'orm'], true, true),
('setup-husky', 'Setup Git Hooks', 'Install Husky for Git hooks with lint-staged', 'setup', 'npx husky-init && npm install && npx husky add .husky/pre-commit "npx lint-staged"', ARRAY['node', 'npm', 'git'], ARRAY['husky', 'git-hooks', 'lint'], true, false),
('setup-shadcn', 'Setup shadcn/ui', 'Initialize shadcn/ui component library', 'setup', 'npx shadcn-ui@latest init', ARRAY['node', 'npm', 'tailwind'], ARRAY['shadcn', 'ui', 'components'], true, true)
ON CONFLICT (slug) DO NOTHING;

-- Testing commands (8)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('test-run', 'Run Tests', 'Execute all tests in the project', 'testing', 'npm test', ARRAY['node', 'npm'], ARRAY['test', 'jest', 'vitest'], true, true),
('test-watch', 'Test Watch Mode', 'Run tests in watch mode for development', 'testing', 'npm test -- --watch', ARRAY['node', 'npm'], ARRAY['test', 'watch', 'development'], true, false),
('test-coverage', 'Test Coverage', 'Run tests with coverage report', 'testing', 'npm test -- --coverage', ARRAY['node', 'npm'], ARRAY['test', 'coverage', 'report'], true, true),
('test-e2e', 'Run E2E Tests', 'Execute Playwright end-to-end tests', 'testing', 'npx playwright test', ARRAY['node', 'npm', 'playwright'], ARRAY['e2e', 'playwright', 'integration'], true, true),
('test-ui', 'E2E Test UI Mode', 'Run Playwright tests with UI mode', 'testing', 'npx playwright test --ui', ARRAY['node', 'npm', 'playwright'], ARRAY['e2e', 'playwright', 'debug'], true, false),
('lint-check', 'Lint Check', 'Run ESLint to check for issues', 'testing', 'npm run lint', ARRAY['node', 'npm', 'eslint'], ARRAY['lint', 'eslint', 'quality'], true, false),
('lint-fix', 'Lint Fix', 'Auto-fix ESLint issues', 'testing', 'npm run lint -- --fix', ARRAY['node', 'npm', 'eslint'], ARRAY['lint', 'fix', 'autofix'], true, false),
('typecheck', 'TypeScript Check', 'Run TypeScript compiler without emitting', 'testing', 'npx tsc --noEmit', ARRAY['node', 'npm', 'typescript'], ARRAY['typescript', 'types', 'check'], true, true)
ON CONFLICT (slug) DO NOTHING;

-- Deployment commands (8)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('deploy-vercel', 'Deploy to Vercel', 'Deploy project to Vercel production', 'deployment', 'vercel --prod', ARRAY['vercel-cli'], ARRAY['vercel', 'deploy', 'production'], true, true),
('deploy-preview', 'Deploy Preview', 'Create a Vercel preview deployment', 'deployment', 'vercel', ARRAY['vercel-cli'], ARRAY['vercel', 'preview', 'staging'], true, false),
('build-prod', 'Production Build', 'Create optimized production build', 'deployment', 'npm run build', ARRAY['node', 'npm'], ARRAY['build', 'production', 'optimize'], true, true),
('docker-build', 'Docker Build', 'Build Docker image for the project', 'deployment', 'docker build -t $NAME:latest .', ARRAY['docker'], ARRAY['docker', 'container', 'build'], true, false),
('docker-compose-up', 'Docker Compose Up', 'Start all services with Docker Compose', 'deployment', 'docker-compose up -d', ARRAY['docker', 'docker-compose'], ARRAY['docker', 'compose', 'services'], true, false),
('vercel-env-pull', 'Pull Vercel Env', 'Download environment variables from Vercel', 'deployment', 'vercel env pull .env.local', ARRAY['vercel-cli'], ARRAY['vercel', 'env', 'config'], true, false),
('vercel-env-push', 'Push Vercel Env', 'Upload environment variable to Vercel', 'deployment', 'vercel env add $VAR_NAME', ARRAY['vercel-cli'], ARRAY['vercel', 'env', 'secrets'], true, false),
('build-analyze', 'Bundle Analyzer', 'Analyze bundle size with next/bundle-analyzer', 'deployment', 'ANALYZE=true npm run build', ARRAY['node', 'npm'], ARRAY['bundle', 'analyze', 'size'], true, false)
ON CONFLICT (slug) DO NOTHING;

-- Database commands (8)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('db-migrate', 'Run Migrations', 'Apply pending database migrations', 'database', 'npx prisma migrate deploy', ARRAY['prisma'], ARRAY['prisma', 'migrate', 'database'], true, true),
('db-push', 'Push Schema', 'Push Prisma schema changes to database', 'database', 'npx prisma db push', ARRAY['prisma'], ARRAY['prisma', 'schema', 'sync'], true, false),
('db-seed', 'Seed Database', 'Run database seed script', 'database', 'npx prisma db seed', ARRAY['prisma'], ARRAY['prisma', 'seed', 'data'], true, false),
('db-reset', 'Reset Database', 'Reset database and run all migrations', 'database', 'npx prisma migrate reset', ARRAY['prisma'], ARRAY['prisma', 'reset', 'fresh'], true, false),
('db-studio', 'Open Prisma Studio', 'Launch Prisma Studio database GUI', 'database', 'npx prisma studio', ARRAY['prisma'], ARRAY['prisma', 'studio', 'gui'], true, true),
('supabase-push', 'Supabase Push', 'Push local migrations to Supabase', 'database', 'npx supabase db push', ARRAY['supabase-cli'], ARRAY['supabase', 'migrate', 'push'], true, true),
('supabase-pull', 'Supabase Pull', 'Pull remote schema changes from Supabase', 'database', 'npx supabase db pull', ARRAY['supabase-cli'], ARRAY['supabase', 'schema', 'pull'], true, false),
('supabase-gen-types', 'Generate Types', 'Generate TypeScript types from Supabase schema', 'database', 'npx supabase gen types typescript --local > src/types/database.ts', ARRAY['supabase-cli'], ARRAY['supabase', 'typescript', 'types'], true, false)
ON CONFLICT (slug) DO NOTHING;

-- Development commands (8)
INSERT INTO commands (slug, name, description, category, command, prerequisites, tags, verified, featured) VALUES
('dev-start', 'Start Dev Server', 'Start the development server', 'development', 'npm run dev', ARRAY['node', 'npm'], ARRAY['dev', 'server', 'local'], true, true),
('dev-turbo', 'Turbo Dev Server', 'Start Next.js dev server with Turbopack', 'development', 'npm run dev -- --turbo', ARRAY['node', 'npm'], ARRAY['dev', 'turbo', 'fast'], true, true),
('clean-install', 'Clean Install', 'Remove node_modules and reinstall', 'development', 'rm -rf node_modules && rm -f package-lock.json && npm install', ARRAY['node', 'npm'], ARRAY['clean', 'install', 'fresh'], true, false),
('clear-cache', 'Clear Next.js Cache', 'Remove .next cache directory', 'development', 'rm -rf .next', ARRAY['nextjs'], ARRAY['cache', 'clear', 'nextjs'], true, false),
('format-code', 'Format Code', 'Run Prettier to format all files', 'development', 'npx prettier --write .', ARRAY['prettier'], ARRAY['format', 'prettier', 'style'], true, false),
('inspect-debug', 'Node Debug Mode', 'Start dev server with Node debugger', 'development', 'NODE_OPTIONS="--inspect" npm run dev', ARRAY['node', 'npm'], ARRAY['debug', 'inspect', 'node'], true, false),
('check-updates', 'Check Updates', 'Check for package updates', 'development', 'npx npm-check-updates', ARRAY['node', 'npm'], ARRAY['update', 'packages', 'check'], true, false),
('update-deps', 'Update Dependencies', 'Update all dependencies to latest', 'development', 'npx npm-check-updates -u && npm install', ARRAY['node', 'npm'], ARRAY['update', 'upgrade', 'packages'], true, false)
ON CONFLICT (slug) DO NOTHING;

-- Seed settings presets (10)
INSERT INTO settings (slug, name, description, category, settings, tags, verified, featured) VALUES
('vs-code-essentials', 'VS Code Essentials', 'Essential VS Code settings for web development', 'editor', '{"editor.formatOnSave": true, "editor.defaultFormatter": "esbenp.prettier-vscode", "editor.tabSize": 2, "editor.wordWrap": "on", "editor.minimap.enabled": false, "editor.bracketPairColorization.enabled": true}', ARRAY['vscode', 'editor', 'essential'], true, true),
('prettier-standard', 'Prettier Standard', 'Standard Prettier configuration for TypeScript projects', 'formatting', '{"semi": false, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5", "printWidth": 100, "arrowParens": "avoid"}', ARRAY['prettier', 'formatting', 'typescript'], true, true),
('eslint-nextjs', 'ESLint Next.js', 'ESLint configuration optimized for Next.js', 'linting', '{"extends": ["next/core-web-vitals", "prettier"], "rules": {"react/no-unescaped-entities": "off", "@next/next/no-img-element": "warn"}}', ARRAY['eslint', 'nextjs', 'react'], true, true),
('typescript-strict', 'TypeScript Strict', 'Strict TypeScript compiler options', 'typescript', '{"strict": true, "noImplicitAny": true, "noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "noUncheckedIndexedAccess": true, "exactOptionalPropertyTypes": true}', ARRAY['typescript', 'strict', 'types'], true, true),
('tailwind-config', 'Tailwind Config', 'Extended Tailwind CSS configuration', 'styling', '{"theme": {"extend": {"colors": {"primary": "#FF6B00", "secondary": "#1A1A2E"}, "fontFamily": {"sans": ["Inter", "system-ui"]}}}, "plugins": ["@tailwindcss/typography", "@tailwindcss/forms"]}', ARRAY['tailwind', 'css', 'styling'], true, false),
('git-config', 'Git Config', 'Recommended Git configuration settings', 'git', '{"core.autocrlf": "input", "pull.rebase": true, "fetch.prune": true, "diff.colorMoved": "zebra", "init.defaultBranch": "main"}', ARRAY['git', 'config', 'workflow'], true, false),
('jest-config', 'Jest Config', 'Jest testing configuration for React/Next.js', 'testing', '{"testEnvironment": "jsdom", "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"], "moduleNameMapper": {"^@/(.*)$": "<rootDir>/src/$1"}, "collectCoverageFrom": ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"]}', ARRAY['jest', 'testing', 'react'], true, false),
('playwright-config', 'Playwright Config', 'Playwright E2E testing configuration', 'testing', '{"testDir": "./e2e", "timeout": 30000, "retries": 2, "use": {"baseURL": "http://localhost:3000", "trace": "on-first-retry", "screenshot": "only-on-failure"}}', ARRAY['playwright', 'e2e', 'testing'], true, true),
('docker-node', 'Docker Node Config', 'Dockerfile configuration for Node.js apps', 'deployment', '{"baseImage": "node:20-alpine", "workdir": "/app", "port": 3000, "buildSteps": ["COPY package*.json ./", "RUN npm ci", "COPY . .", "RUN npm run build"]}', ARRAY['docker', 'node', 'deployment'], true, false),
('vercel-config', 'Vercel Config', 'Vercel deployment configuration', 'deployment', '{"buildCommand": "npm run build", "outputDirectory": ".next", "framework": "nextjs", "regions": ["iad1"], "headers": [{"source": "/(.*)", "headers": [{"key": "X-Content-Type-Options", "value": "nosniff"}]}]}', ARRAY['vercel', 'deployment', 'nextjs'], true, true)
ON CONFLICT (slug) DO NOTHING;
