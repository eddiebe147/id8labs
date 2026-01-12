#!/bin/bash
# ============================================
# Dev Session Startup Script
# ============================================
# From ID8Labs StackShack - "Touching Electrons" workflow
#
# Creates a three-pane development layout:
#   - Top-left: lf file manager
#   - Bottom-left: lazygit
#   - Right: Claude (or your editor)
#
# Prerequisites:
#   brew install tmux lf lazygit
#
# Usage:
#   ./dev-session.sh              # Uses current directory
#   ./dev-session.sh ~/myproject  # Uses specified directory

# Use argument or current directory
PROJECT_DIR="${1:-$(pwd)}"
SESSION="dev-$$"

cd "$PROJECT_DIR" || exit 1

# Create session in detached mode
tmux new-session -d -s "$SESSION"

# Split: create left column (35%)
tmux split-window -h -b -l 35% -t "$SESSION:1"

# Split the left pane vertically
tmux split-window -v -t "$SESSION:1.1"

# Panes are now: 1=top-left, 2=bottom-left, 3=right

# Top-left: lf file manager (navigate project files)
tmux send-keys -t "$SESSION:1.1" 'lf' Enter

# Bottom-left: lazygit (git status, staging, branches)
tmux send-keys -t "$SESSION:1.2" 'lazygit' Enter

# Right pane: Claude (or customize to your editor)
tmux send-keys -t "$SESSION:1.3" 'claude' Enter

# Select the main pane (right side)
tmux select-pane -t "$SESSION:1.3"

# Attach
exec tmux attach-session -t "$SESSION"
