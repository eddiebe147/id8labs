#!/bin/bash
# Hook to log milestones to Notes from Claude
# Usage: ./log-milestone.sh "milestone text" [category]
# Categories: milestone, observation, insight

set -e

TEXT="$1"
CATEGORY="${2:-milestone}"
DATE=$(date +%Y-%m-%d)

# Check if API key is set
if [ -z "$CLAUDE_OBSERVATIONS_API_KEY" ]; then
  echo "Error: CLAUDE_OBSERVATIONS_API_KEY not set"
  exit 1
fi

# Check if text provided
if [ -z "$TEXT" ]; then
  echo "Error: No milestone text provided"
  echo "Usage: ./log-milestone.sh \"milestone text\" [category]"
  exit 1
fi

# API endpoint (production)
API_URL="${ID8LABS_API_URL:-https://id8labs.app}/api/claude-observations"

# Make the API call
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CLAUDE_OBSERVATIONS_API_KEY" \
  -d "{\"text\": \"$TEXT\", \"category\": \"$CATEGORY\", \"date\": \"$DATE\"}")

# Check response
if echo "$response" | grep -q '"observation"'; then
  echo "Milestone logged successfully!"
  echo "$response" | jq -r '.observation.text' 2>/dev/null || echo "$response"
else
  echo "Failed to log milestone:"
  echo "$response"
  exit 1
fi
