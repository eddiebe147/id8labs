#!/bin/bash
# Post-tool hook for Claude Code
# Detects git commits and logs observations automatically
# Receives JSON on stdin from Claude Code hooks system

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract tool details
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
EXIT_CODE=$(echo "$INPUT" | jq -r '.tool_response.exit_code // 0')

# Only process successful Bash commands
if [ "$EXIT_CODE" != "0" ]; then
  exit 0
fi

# Check if this is a git commit
if [[ "$COMMAND" == *"git commit"* ]]; then
  # Extract commit message (handles both -m "msg" and -m 'msg')
  COMMIT_MSG=$(echo "$COMMAND" | grep -oP '(?<=-m\s["\047])[^"\047]+' | head -1)

  if [ -n "$COMMIT_MSG" ]; then
    # Call the auto-observe script
    SCRIPT_DIR="$(dirname "$0")"
    "$SCRIPT_DIR/auto-observe.sh" "commit" "$COMMIT_MSG" 2>/dev/null || true
  fi
fi

# Check if this is a deployment command
if [[ "$COMMAND" == *"vercel"* && "$COMMAND" == *"--prod"* ]]; then
  SCRIPT_DIR="$(dirname "$0")"
  "$SCRIPT_DIR/auto-observe.sh" "milestone" "Deployed to production" 2>/dev/null || true
fi

exit 0
