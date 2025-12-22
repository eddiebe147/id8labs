#!/bin/bash
# Automated observation hook for Claude Code
# Triggers on commit milestones and notable events
# Called by: git post-commit hook or Claude Code hooks system

set -e

# Configuration
API_URL="${ID8LABS_API_URL:-http://localhost:3000}/api/claude-observations"
TRIGGER_TYPE="${1:-commit}"
COMMIT_MSG="${2:-}"

# Get current commit count from GitHub stats API
get_commit_count() {
  local stats=$(curl -s "http://localhost:3000/api/claude-stats" 2>/dev/null)
  echo "$stats" | grep -o '"commits_together":[0-9]*' | cut -d':' -f2 || echo "0"
}

# Check if this is a milestone commit (every 100)
is_milestone() {
  local count=$1
  if [ $((count % 100)) -eq 0 ] && [ "$count" -gt 0 ]; then
    return 0
  fi
  return 1
}

# Log observation to API
log_observation() {
  local text="$1"
  local category="${2:-observation}"
  local trigger="${3:-hook}"

  # Try localhost first, fall back to production
  local response=$(curl -s -X PUT "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"trigger\": \"$trigger\", \"data\": {\"text\": \"$text\", \"count\": $COMMIT_COUNT}}" 2>/dev/null)

  if echo "$response" | grep -q '"auto_generated"'; then
    echo "[auto-observe] Logged: $text"
  else
    echo "[auto-observe] Note: Could not log observation (API unavailable or table missing)"
  fi
}

# Main logic
case "$TRIGGER_TYPE" in
  commit)
    # Get current commit count
    COMMIT_COUNT=$(get_commit_count)

    if is_milestone "$COMMIT_COUNT"; then
      log_observation "Milestone: $COMMIT_COUNT commits together. The collaboration deepens." "milestone" "commit"
    fi

    # Check for notable commit messages (containing key phrases)
    if [ -n "$COMMIT_MSG" ]; then
      case "$COMMIT_MSG" in
        *"shipped"*|*"deployed"*|*"launched"*)
          log_observation "Shipped something new: $COMMIT_MSG" "milestone" "commit"
          ;;
        *"fixed"*|*"resolved"*)
          # Don't log every fix, too noisy
          ;;
      esac
    fi
    ;;

  session)
    # Session end reflection (called manually or by hook)
    if [ -n "$COMMIT_MSG" ]; then
      log_observation "$COMMIT_MSG" "insight" "session"
    fi
    ;;

  milestone)
    # Manual milestone
    if [ -n "$COMMIT_MSG" ]; then
      log_observation "$COMMIT_MSG" "milestone" "milestone"
    fi
    ;;

  *)
    echo "Unknown trigger: $TRIGGER_TYPE"
    echo "Usage: auto-observe.sh [commit|session|milestone] [message]"
    exit 1
    ;;
esac

exit 0
