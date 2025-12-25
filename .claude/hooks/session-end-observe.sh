#!/bin/bash
# Session end hook for Claude Code
# Logs session completion as an observation
# Receives JSON on stdin from Claude Code hooks system

set -e

# Read JSON input from stdin
INPUT=$(cat)

# Extract session details
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
REASON=$(echo "$INPUT" | jq -r '.reason // "exit"')

# Only log meaningful session endings
if [ "$REASON" = "exit" ] || [ "$REASON" = "logout" ]; then
  # Calculate session duration would require tracking start time
  # For now, just log that a session completed

  SCRIPT_DIR="$(dirname "$0")"

  # Log a session observation (optional - might be too noisy)
  # Uncomment below if you want session end observations:
  # "$SCRIPT_DIR/auto-observe.sh" "session" "Session completed" 2>/dev/null || true

  # Instead, we just silently succeed
  :
fi

exit 0
