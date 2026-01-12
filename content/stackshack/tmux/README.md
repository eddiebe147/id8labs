# Tmux Dev Workflow

A lightweight terminal-based development environment that gives you constant visibility into your files and git status.

```
┌─────────────────┬───────────────────────────────────┐
│   lf (files)    │                                   │
│                 │                                   │
├─────────────────┤         claude / editor           │
│                 │                                   │
│  lazygit (git)  │                                   │
│                 │                                   │
└─────────────────┴───────────────────────────────────┘
```

## Why This Exists

Heavy IDE tools like Antigravity can crash machines and use excessive resources. This setup does two things really well:
1. **See your files** - always visible file tree
2. **Know your git status** - branch, changes, diffs at a glance

No crashes. Zero startup time. Battle-tested for 30 years.

## Quick Start

### 1. Install Dependencies

```bash
brew install tmux lf lazygit tree
```

### 2. Install the Config

```bash
# Backup existing config if you have one
mv ~/.tmux.conf ~/.tmux.conf.backup

# Copy our config
cp tmux.conf ~/.tmux.conf

# Make the script executable
chmod +x dev-session.sh
```

### 3. Install Tmux Plugins (Optional but Recommended)

This enables session persistence - your layout survives terminal restarts.

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Start tmux, then press: Ctrl+a then I (capital i)
# This installs the plugins
```

### 4. Launch

```bash
./dev-session.sh
# or
./dev-session.sh ~/your/project/path
```

## Key Bindings

All commands start with the prefix `Ctrl+a` (hold Control, press A, release, then press the command key).

### Essential

| Keys | Action |
|------|--------|
| `Ctrl+a` then `D` | Create dev layout (file tree + git + main pane) |
| `Ctrl+a` then `\|` | Split vertically |
| `Ctrl+a` then `-` | Split horizontally |
| `Ctrl+a` then `x` | Close current pane |
| `Ctrl+a` then `z` | Zoom/unzoom current pane |
| `Ctrl+a` then `r` | Reload config |

### Navigation (No Prefix Needed)

| Keys | Action |
|------|--------|
| `Alt + Arrow` | Move between panes |
| `Alt + 1-5` | Switch to window 1-5 |

### With Prefix

| Keys | Action |
|------|--------|
| `Ctrl+a` then `h/j/k/l` | Vim-style pane navigation |
| `Ctrl+a` then `H/J/K/L` | Resize panes |
| `Ctrl+a` then `S` | Choose session |
| `Ctrl+a` then `N` | New session |

## The Tools

### lf (List Files)
Terminal file manager. Navigate with arrow keys or vim bindings. Press `q` to quit.

### lazygit
Full git UI in your terminal. Stage files, commit, push, pull, view diffs - all without typing git commands.

### tmux
The foundation. Splits your terminal, persists sessions, lets you detach and reattach.

## Customization

### Change the Theme

The config uses "Amber Ember" colors. Edit `~/.tmux.conf` and look for the `THEME` section. Colors use the format `colour###` where ### is 0-255.

### Change the Dev Layout

The `prefix + D` binding creates the default layout. Modify the `bind D` line in the config to customize:
- Adjust pane sizes (change `35%`)
- Replace `lf` with `ranger` or another file manager
- Replace `lazygit` with plain `git status`
- Replace `claude` with `vim`, `nvim`, or nothing

## Troubleshooting

### "command not found: tmux"
Run `brew install tmux`

### Mouse scrolling doesn't work
Make sure `set -g mouse on` is in your config and reload with `Ctrl+a then r`

### Colors look wrong
Your terminal needs true color support. Add to your `.zshrc` or `.bashrc`:
```bash
export TERM="xterm-256color"
```

### Session doesn't persist after restart
Make sure TPM is installed and plugins are loaded. Run `Ctrl+a then I` to install.

---

*From the ID8Labs StackShack collection. See [Touching Electrons](/essays/touching-electrons) for the story behind this setup.*
