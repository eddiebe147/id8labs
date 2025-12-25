# Claude Code Hooks Starter Kit
## Production-Ready Hook Templates by ID8Labs

---

## What's Included

This starter kit provides battle-tested hooks for common Claude Code workflows:

```
hooks/
├── pre-commit/
│   ├── lint-check.sh          # Run linter before commits
│   ├── test-runner.sh         # Run tests before commits
│   └── secrets-scan.sh        # Detect leaked credentials
├── post-tool-use/
│   ├── file-backup.sh         # Backup files before edits
│   ├── cost-tracker.sh        # Track API usage costs
│   └── audit-logger.sh        # Log all tool invocations
├── permission-request/
│   ├── auto-approve-safe.sh   # Auto-approve read-only ops
│   └── deny-dangerous.sh      # Block destructive commands
└── session/
    ├── session-start.sh       # Initialize session context
    └── session-end.sh         # Cleanup and reporting
```

---

## Quick Start

### 1. Copy to your project

```bash
cp -r hooks ~/.claude/hooks
```

### 2. Make executable

```bash
chmod +x ~/.claude/hooks/**/*.sh
```

### 3. Configure in settings.json

```json
{
  "hooks": {
    "PreToolUse": ["~/.claude/hooks/pre-commit/lint-check.sh"],
    "PostToolUse": ["~/.claude/hooks/post-tool-use/audit-logger.sh"],
    "PermissionRequest": ["~/.claude/hooks/permission-request/auto-approve-safe.sh"]
  }
}
```

---

## Hook Templates

### Pre-Commit: Lint Check

```bash
#!/bin/bash
# hooks/pre-commit/lint-check.sh
# Runs ESLint before any commit operation

TOOL_NAME="$1"

if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND=$(echo "$HOOK_INPUT" | jq -r '.command // empty')

  if [[ "$COMMAND" == *"git commit"* ]]; then
    echo "Running lint check before commit..."
    npm run lint --silent

    if [[ $? -ne 0 ]]; then
      echo "❌ Lint failed. Fix errors before committing."
      exit 1
    fi
    echo "✅ Lint passed"
  fi
fi

exit 0
```

### Post-Tool-Use: Audit Logger

```bash
#!/bin/bash
# hooks/post-tool-use/audit-logger.sh
# Logs all tool invocations for compliance

LOG_FILE="${HOME}/.claude/audit.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TOOL_NAME="$1"
SESSION_ID="${CLAUDE_SESSION_ID:-unknown}"

# Extract relevant info from hook input
INPUT_SUMMARY=$(echo "$HOOK_INPUT" | jq -c '{tool: .tool_name, success: .success}' 2>/dev/null)

# Append to audit log
echo "${TIMESTAMP} | ${SESSION_ID} | ${TOOL_NAME} | ${INPUT_SUMMARY}" >> "$LOG_FILE"

exit 0
```

### Permission Request: Auto-Approve Safe Operations

```bash
#!/bin/bash
# hooks/permission-request/auto-approve-safe.sh
# Automatically approves read-only and safe operations

TOOL_NAME="$1"
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.command // empty')

# Safe patterns - auto-approve
SAFE_PATTERNS=(
  "^git status"
  "^git log"
  "^git diff"
  "^git branch"
  "^npm run lint"
  "^npm run test"
  "^npm run build"
  "^ls "
  "^cat "
  "^head "
  "^tail "
)

for pattern in "${SAFE_PATTERNS[@]}"; do
  if [[ "$COMMAND" =~ $pattern ]]; then
    echo '{"action": "approve"}'
    exit 0
  fi
done

# Not a safe pattern - let user decide
exit 0
```

### Permission Request: Block Dangerous Commands

```bash
#!/bin/bash
# hooks/permission-request/deny-dangerous.sh
# Blocks potentially destructive operations

COMMAND=$(echo "$HOOK_INPUT" | jq -r '.command // empty')

# Dangerous patterns - always block
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \*"
  "> /dev/sd"
  "mkfs\."
  "dd if="
  ":(){:|:&};:"
  "chmod -R 777 /"
  "git push --force origin main"
  "git push --force origin master"
  "DROP DATABASE"
  "DROP TABLE"
  "TRUNCATE"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if [[ "$COMMAND" == *"$pattern"* ]]; then
    echo '{"action": "deny", "reason": "Blocked: Potentially destructive command"}'
    exit 0
  fi
done

exit 0
```

### Session: Start Hook

```bash
#!/bin/bash
# hooks/session/session-start.sh
# Initializes session context and environment

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION_ID="${CLAUDE_SESSION_ID:-$(uuidgen)}"

# Log session start
echo "[${TIMESTAMP}] Session started: ${SESSION_ID}" >> ~/.claude/sessions.log

# Set up session-specific environment
export CLAUDE_SESSION_START="${TIMESTAMP}"

# Check for project-specific configuration
if [[ -f ".claude/project-hooks.sh" ]]; then
  source .claude/project-hooks.sh
fi

exit 0
```

---

## Best Practices

### 1. Keep Hooks Fast
Hooks run synchronously. Long-running hooks slow down Claude Code.

```bash
# Bad: Runs full test suite on every tool use
npm test

# Good: Quick check, full tests only before commit
if [[ "$COMMAND" == *"git commit"* ]]; then
  npm test
fi
```

### 2. Handle Errors Gracefully
Return appropriate exit codes and messages.

```bash
# Exit 0 = success, continue
# Exit 1 = error, may block operation
# Output JSON for PermissionRequest hooks
```

### 3. Use Environment Variables
Claude Code provides useful context:

```bash
CLAUDE_SESSION_ID    # Current session identifier
CLAUDE_WORKING_DIR   # Current working directory
HOOK_INPUT           # JSON input with tool details
```

### 4. Log Everything (in production)
Create an audit trail for compliance:

```bash
LOG_FILE="${HOME}/.claude/audit.log"
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $TOOL_NAME | $COMMAND" >> "$LOG_FILE"
```

---

## Troubleshooting

### Hook Not Running
1. Check file permissions: `chmod +x hook.sh`
2. Verify path in settings.json
3. Check for syntax errors: `bash -n hook.sh`

### Hook Blocking Everything
1. Review exit codes (1 = block)
2. Check pattern matching logic
3. Add debug logging

### Performance Issues
1. Profile hook execution time
2. Move expensive operations to background
3. Use caching where possible

---

## Need More?

ID8Labs offers:
- **Custom Hook Development** - Tailored to your workflow
- **Claude Code Training** - Master hooks, MCP, and more
- **Enterprise Consulting** - Full AI integration strategy

**Contact:** hello@id8labs.app
**Web:** https://id8labs.app/services

---

© 2025 ID8Labs. MIT License.
