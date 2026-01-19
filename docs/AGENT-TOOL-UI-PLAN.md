# AGENT Tool Page - UI/UX Plan

## Research Summary

### Competitive Analysis (Screenshots in `.playwright-mcp/`)

| Platform | Approach | Key UI Patterns | Theme |
|----------|----------|-----------------|-------|
| **Flowise** | Visual node-based canvas | Drag-drop nodes, flow connections, chat preview panel | Dark |
| **Dify** | Block-based workflow builder | Categorized tool library, linear block flows, extensive sidebar | Light (blue accents) |
| **n8n** | Workflow automation | AI Agent nodes, trigger-based flows, execution history | Dark (orange accents) |
| **Lindy** | Prompt-first "AI Employee" | Use case tabs, natural language config, minimal visual builder | Light |
| **Claude Cowork** | Chat-first with sidebars | 3-column layout, task history, progress panel, artifacts, file context | Dark/Light |
| **Real Estate Dashboards** | Data-rich workspaces | Icon sidebars, analytics widgets, map integrations, status indicators | Varied |
| **TradingView** | Tool-dense horizontal toolbar | Top toolbar with dropdowns, collapsible side panels, bottom status bar, keyboard shortcuts | Dark (red accents) |

### Common Patterns Across All Platforms

1. **Split-View Layout**: Builder/canvas on one side, preview/chat on the other
2. **Tool Library Sidebar**: Categorized tools/blocks that can be added to workflows
3. **Quick-Start Templates**: Pre-built workflows for common use cases
4. **Use Case Navigation**: Tabs or filters for Support, Sales, Marketing, Operations, etc.
5. **Real-time Preview**: Chat or execution preview as you build
6. **Dark Theme Option**: Most platforms offer dark mode (matches developer preference)

### Claude Cowork Key Insights (Primary Inspiration)

From Simon Willison's analysis and screenshots:
- **Three tabs**: Chat, Code, Cowork (we'll have similar navigation)
- **Task History Panel**: Left sidebar with past conversations/tasks
- **Progress Panel**: Right sidebar showing task status, file references
- **Artifacts**: Inline rendered outputs (charts, visualizations, files)
- **Context Section**: Shows files being accessed
- **Sandbox Approach**: Files mounted into containerized environment

### Real Estate Dashboard Patterns (from Dribbble/Behance)

Key UI elements to borrow:
- **Icon-based vertical navigation** (compact, allows more content space)
- **Widget-based dashboards** (modular, can show KPIs, charts, status)
- **Status indicators** (colored dots, progress bars)
- **Table-based data views** (for file lists, run history)
- **Card layouts** (for templates, agents, files)

---

## Recommended Architecture for ID8Labs AGENT Tool

### Position in StackShack

The AGENT tool should be a **new top-level section** alongside Skills, Commands, Settings, Plugins, and Kits.

```
/stackshack
├── ?tab=skills      (existing)
├── ?tab=commands    (existing)
├── ?tab=settings    (existing)
├── ?tab=plugins     (existing)
├── ?tab=kits        (existing)
└── /agents          (NEW - dedicated workspace)
    ├── /             → Agent gallery/browse
    ├── /create       → Agent builder workspace
    ├── /[agent-id]   → Agent detail/edit page
    └── /templates    → Pre-built agent templates
```

### Core Differentiator

**What makes ID8Labs different from Flowise/Dify:**
- We're building agents for **Claude Code** specifically (CLI-first, developer-focused)
- Integration with **Skills, Plugins, MCP servers** already in StackShack
- **Agent-native design** from the start (PARITY_MAP compliance)
- Natural language configuration over visual node complexity

---

## UI Wireframe Specification

### Page 1: Agent Gallery (`/stackshack/agents`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Back to StackShack]                                                    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  🤖 AGENT FACTORY                                                │  │
│  │  Build and deploy AI agents powered by Claude                    │  │
│  │                                                                  │  │
│  │  [🔧 Create Agent]   [📦 Browse Templates]   [📖 Documentation] │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─── Use Case Tabs ─────────────────────────────────────────────────┐ │
│  │ [All] [Support] [Sales] [Engineering] [Marketing] [Operations]   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Featured Agents ───────────────────────────────────────────────┐ │
│  │ ╔════════════════╗  ╔════════════════╗  ╔════════════════╗       │ │
│  │ ║ 🎫 Support Pro ║  ║ 📊 Data Analyst║  ║ 🔍 Code Review ║       │ │
│  │ ║ Handles tickets║  ║ SQL + insights ║  ║ PR automation  ║       │ │
│  │ ║ [Use Template] ║  ║ [Use Template] ║  ║ [Use Template] ║       │ │
│  │ ╚════════════════╝  ╚════════════════╝  ╚════════════════╝       │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Your Agents ───────────────────────────────────────────────────┐ │
│  │ (List of user-created agents with edit/deploy actions)            │ │
│  │ - Agent Name | Status | Last Run | [Edit] [Deploy] [Delete]       │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Page 2: Agent Workspace (`/stackshack/agents/create` or `/stackshack/agents/[id]/workspace`)

**Design Philosophy: TradingView-Inspired Horizontal Toolbar + Claude Cowork Panels**

Key insight from TradingView: Tools on TOP (horizontal), context panels on SIDES (collapsible).

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ┌─── TOP TOOLBAR (TradingView-style) ──────────────────────────────────────────────────────────┐ │
│ │ [≡] [🤖 Support Agent ▾] │ [📎 Attach] [🔧 Tools ▾] [📊 Analytics] [⚡ Test] [🔔 Alert] │    │ │
│ │                          │                                                                   │ │
│ │                          │ [↩️] [↪️] │ [💾 Save ▾] [⚙️] [⛶] [📸] │ [▶️ Deploy] [📤 Share]  │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│ ┌─ FILES ────────────┐  ┌─── MAIN CHAT AREA ─────────────────────────────────────┐  ┌─ CONTEXT ─┐│
│ │ [📁 ▾] Files       │  │                                                        │  │ [📖▾] Docs││
│ │                    │  │  Agent: Support Agent Pro                              │  │           ││
│ │ ⭐ Quick Access    │  │  Status: 🟢 Active │ Tools: 5/12 │ Cost: $0.04         │  │ 📖 Docs   ││
│ │ ├─ config.yaml     │  │  ─────────────────────────────────────────────────────│  │ 🔧 Tools  ││
│ │ ├─ prompts/        │  │                                                        │  │ 📋 History││
│ │ └─ .env            │  │  ┌────────────────────────────────────────────────────┐│  │           ││
│ │                    │  │  │                                                    ││  │───────────││
│ │ 🕐 Recent          │  │  │  💬 You: Build me a support agent that handles    ││  │           ││
│ │ ├─ output.json     │  │  │      customer tickets from Zendesk                 ││  │ Getting   ││
│ │ └─ debug.log       │  │  │                                                    ││  │ Started   ││
│ │                    │  │  │  🤖 Agent: I'll create a support agent for you.   ││  │ ─────────││
│ │ 📂 Workspace       │  │  │     Let me configure the following:                ││  │ System    ││
│ │ ├─ agents/         │  │  │                                                    ││  │ prompts   ││
│ │ │  └─ support/     │  │  │     ✅ System prompt configured                    ││  │ define    ││
│ │ ├─ schemas/        │  │  │     ✅ Zendesk API integration                     ││  │ agent     ││
│ │ └─ outputs/        │  │  │     ⏳ Database access (requesting...)             ││  │ behavior  ││
│ │                    │  │  │                                                    ││  │           ││
│ │ ─────────────────  │  │  │  ┌─ ARTIFACT ──────────────────────────────────┐  ││  │ Tool Ref  ││
│ │ [+ New] [📤 Upload]│  │  │  │ // agent-config.yaml                        │  ││  │ ─────────││
│ │                    │  │  │  │ name: support-agent                         │  ││  │ read_file ││
│ │ [◀ Hide]           │  │  │  │ tools: [zendesk, email, slack]              │  ││  │ write_file││
│ └────────────────────┘  │  │  │ approval: auto                              │  ││  │ grep      ││
│                         │  │  └─────────────────────────────────────────────┘  ││  │ bash      ││
│                         │  │                                                    ││  │           ││
│                         │  │  [📋 View Full Config] [🧪 Test Agent]            ││  │ Examples  ││
│                         │  │                                                    ││  │ ─────────││
│                         │  └────────────────────────────────────────────────────┘│  │ "Review   ││
│                         │                                                        │  │  PRs..."  ││
│                         │  ┌─ INPUT ────────────────────────────────────────────┐│  │           ││
│                         │  │ [📎] [🔧] │ Ask the agent anything...    [Send ➤] ││  │ [Hide ▶]  ││
│                         │  └────────────────────────────────────────────────────┘│  └───────────┘│
│                         └────────────────────────────────────────────────────────┘               │
│                                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─── BOTTOM BAR (Quick Actions + Status) ──────────────────────────────────────────────────────┐ │
│ │ [Workspace] [Dashboard] [History] [Logs] │ 03:20:18 UTC │ v1.2.3 │ [Trading Panel: Deploy] │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### TradingView-Inspired Layout Breakdown

#### 1. TOP TOOLBAR (Horizontal - Primary Actions)
Borrowed from TradingView's top bar pattern:

| Section | TradingView | Agent Workspace |
|---------|-------------|-----------------|
| **Left** | Symbol selector (AAPL ▾) | Agent selector (🤖 Support Agent ▾) |
| **Center** | Indicators, Alert, Replay | Attach, Tools ▾, Analytics, Test, Alert |
| **Center-Right** | Undo/Redo, Save, Settings | Undo/Redo, Save ▾, Settings, Fullscreen |
| **Right** | Trade, Publish | Deploy, Share |

**Tool Dropdown Pattern** (like TradingView's Indicators):
```
[🔧 Tools ▾]
├─ File Operations
│  ├─ ✅ read_file
│  ├─ ✅ write_file
│  └─ ☐ delete_file
├─ Search
│  ├─ ✅ grep
│  └─ ✅ glob
├─ External APIs
│  ├─ ☐ zendesk
│  └─ ☐ slack
└─ [Manage All Tools...]
```

#### 2. LEFT PANEL: Files (Collapsible)
Like TradingView's drawing tools sidebar, but for file context:
- **Quick Access**: Pinned files (⭐)
- **Recent**: Session history (🕐)
- **Workspace**: Full tree (📂)
- **Actions**: New file, Upload
- **Collapse**: [◀ Hide] to maximize chat

#### 3. CENTER: Main Chat Area
The "chart" equivalent - primary workspace:
- **Header Bar**: Agent name, status indicators, quick stats
- **Chat Stream**: Conversation with inline artifacts
- **Artifacts**: Rendered outputs (code, configs, charts)
- **Input**: Primary command interface with quick-attach buttons

#### 4. RIGHT PANEL: Context (Collapsible)
Like TradingView's Watchlist/Details panel:
- **Tab Switcher**: Docs, Tools, History
- **Docs Section**: Context-aware help, getting started
- **Tool Reference**: Available tools and usage
- **Examples**: Prompt templates
- **Collapse**: [Hide ▶] to maximize chat

#### 5. BOTTOM BAR (Quick Navigation + Status)
Borrowed from TradingView's timeframe bar:
- **View Tabs**: Workspace, Dashboard, History, Logs
- **Status**: Timestamp, version
- **Action Panel**: Deploy toggle (like TradingView's Trading Panel)

### Keyboard Shortcuts (TradingView-style)
| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Quick search (files, tools, commands) |
| `Cmd+S` | Save agent |
| `Cmd+Enter` | Send message |
| `Cmd+Shift+T` | Toggle tools panel |
| `Cmd+Shift+D` | Toggle docs panel |
| `Cmd+Shift+F` | Toggle files panel |
| `Cmd+/` | Command palette |
| `Esc` | Close dropdowns/modals |

---

### Page 2B: Dashboard View (Toggle from Workspace)

Visual analytics and overview when user clicks [Dashboard] in toolbar:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ ┌──┐  AGENT DASHBOARD                    [Dashboard] [Workspace] [History]    [⚙️] [Save]  │
│ │🏠│───────────────────────────────────────────────────────────────────────────────────────│
│ │📁│                                                                                       │
│ │🔧│  ┌─── OVERVIEW WIDGETS ─────────────────────────────────────────────────────────────┐│
│ │📊│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐                 ││
│ │⚡│  │  │ Total Runs │  │ Success    │  │ Avg Time   │  │ Cost MTD   │                 ││
│ │📝│  │  │    247     │  │   94.3%    │  │   3.2s     │  │   $12.40   │                 ││
│ │🔍│  │  │ ↑ 12% week │  │ ↑ 2.1%     │  │ ↓ 0.4s     │  │ ↑ $2.30    │                 ││
│ │  │  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘                 ││
│ └──┘  └──────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                           │
│       ┌─── TOOL USAGE ────────────────────┐  ┌─── RECENT ACTIVITY ─────────────────────┐│
│       │                                    │  │                                         ││
│       │  read_file     ████████████ 45%   │  │  Today                                  ││
│       │  grep          ████████    32%    │  │  • 2:34 PM - Reviewed PR #123           ││
│       │  edit          ████       15%     │  │  • 1:22 PM - Generated test file        ││
│       │  bash          ██          8%     │  │  • 11:45 AM - Analyzed codebase         ││
│       │                                    │  │                                         ││
│       │  [View Details]                    │  │  Yesterday                              ││
│       │                                    │  │  • 5:12 PM - Fixed type errors          ││
│       └────────────────────────────────────┘  │  • 3:30 PM - Created migration          ││
│                                               │                                         ││
│       ┌─── AGENT CONFIGURATION ──────────┐   │  [View All History]                     ││
│       │                                   │   └─────────────────────────────────────────┘│
│       │  Name: Code Review Agent          │                                              │
│       │  Status: 🟢 Active                │   ┌─── ACTIVE TOOLS ──────────────────────┐ │
│       │  Stakes: Low                       │   │                                        │ │
│       │  Reversibility: Easy               │   │  ✓ File Operations                     │ │
│       │  Approval: Auto-apply              │   │  ✓ Code Search (grep)                  │ │
│       │                                    │   │  ✓ Git Operations                      │ │
│       │  [Edit Configuration]              │   │  ☐ Database Access                     │ │
│       │                                    │   │  ☐ External APIs                       │ │
│       └────────────────────────────────────┘   │                                        │ │
│                                                │  [Manage Tools]                        │ │
│                                                └────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Legacy: Simple Builder View (for quick creation)

For users who want a simpler form-based approach:

### Page 3: Agent Detail (`/stackshack/agents/[agent-id]`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [← Back to Agents]                                                      │
│                                                                         │
│  ┌─── Agent Header ─────────────────────────────────────────────────┐  │
│  │  🔍 Code Review Agent           [Edit] [Deploy] [Share] [Delete] │  │
│  │  Automated PR review and code quality analysis                   │  │
│  │  Created: Jan 10, 2026 • Last run: 2 hours ago • 47 runs total   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─── Tabs ─────────────────────────────────────────────────────────┐  │
│  │ [Overview] [Configuration] [Run History] [Analytics] [Settings]  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─── Overview Content ─────────────────────────────────────────────┐  │
│  │                                                                  │  │
│  │  System Prompt                     Tools Enabled                 │  │
│  │  ┌────────────────────────┐       ┌─────────────────────────┐   │  │
│  │  │ You are a code review  │       │ ✓ read_file             │   │  │
│  │  │ specialist who...      │       │ ✓ grep                  │   │  │
│  │  └────────────────────────┘       │ ✓ git_diff              │   │  │
│  │                                    │ ✓ create_review         │   │  │
│  │  Quick Stats                       └─────────────────────────┘   │  │
│  │  • Avg response time: 4.2s                                      │  │
│  │  • Success rate: 98.2%          [Test Agent]                    │  │
│  │  • Tools used: 156 total                                        │  │
│  │                                                                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### New Components Needed

```
/components/agents/
│
├── gallery/                    # Agent Gallery Components
│   ├── AgentCard.tsx           # Card for gallery display
│   ├── AgentGallery.tsx        # Main gallery grid with filters
│   ├── FeaturedAgents.tsx      # Hero section with top agents
│   └── TemplateGallery.tsx     # Browse pre-built templates
│
├── workspace/                  # Workspace Layout Components
│   ├── AgentWorkspace.tsx      # Main workspace container (orchestrates panels)
│   ├── TopToolbar.tsx          # TradingView-style horizontal toolbar (primary actions)
│   ├── ToolbarDropdown.tsx     # Dropdown menu component (Tools, Save, etc.)
│   ├── AgentSelector.tsx       # Agent picker dropdown (like TradingView symbol selector)
│   ├── FilesPanel.tsx          # Left collapsible panel - file tree, quick access
│   ├── ChatArea.tsx            # Center panel - main chat interface
│   ├── ChatHeader.tsx          # Agent status bar within chat area
│   ├── ArtifactRenderer.tsx    # Inline artifact display (code, charts, configs)
│   ├── ContextPanel.tsx        # Right collapsible panel - docs, tools, history tabs
│   ├── BottomBar.tsx           # View tabs, status, action panel
│   └── CommandPalette.tsx      # Cmd+K quick search modal
│
├── dashboard/                  # Dashboard View Components
│   ├── AgentDashboard.tsx      # Dashboard container (toggles with workspace)
│   ├── DashboardWidgets.tsx    # KPI cards (runs, success rate, time, cost)
│   ├── ToolUsageChart.tsx      # Bar chart of tool usage percentages
│   ├── ActivityFeed.tsx        # Recent activity timeline
│   └── ConfigSummary.tsx       # Agent configuration overview panel
│
├── builder/                    # Agent Configuration Components
│   ├── AgentBuilder.tsx        # Form-based agent creation (simple mode)
│   ├── PromptEditor.tsx        # Rich prompt editing with syntax hints
│   ├── ToolSelector.tsx        # Pick tools from StackShack inventory
│   ├── ApprovalFlowConfig.tsx  # Stakes/reversibility matrix selector
│   └── PluginSelector.tsx      # Select MCP plugins to enable
│
├── detail/                     # Agent Detail Page Components
│   ├── AgentDetail.tsx         # Full agent detail page
│   ├── AgentHeader.tsx         # Name, description, actions
│   ├── AgentTabs.tsx           # Overview/Config/History/Analytics tabs
│   ├── AgentRunHistory.tsx     # Execution history list with filters
│   └── AgentAnalytics.tsx      # Detailed usage stats and graphs
│
└── shared/                     # Shared/Utility Components
    ├── AgentStatusBadge.tsx    # Status indicator (🟢 Active, 🔴 Error, etc.)
    ├── ToolChip.tsx            # Compact tool display with icon
    ├── CopyPromptButton.tsx    # Copy agent config/prompt
    └── AgentEmoji.tsx          # Agent avatar with emoji or custom icon
```

### Component Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                         AgentWorkspace                          │
│  ┌─────────┬─────────────┬────────────────────┬────────────┐   │
│  │         │             │                    │            │   │
│  │  Icon   │   Files     │     ChatArea +     │    Docs    │   │
│  │ Sidebar │   Panel     │ WorkspaceToolbar   │   Panel    │   │
│  │         │             │                    │            │   │
│  └─────────┴─────────────┴────────────────────┴────────────┘   │
│  └──────────────────── StatusBar ─────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

Toggle to:

┌─────────────────────────────────────────────────────────────────┐
│                        AgentDashboard                           │
│  ┌─────────┬───────────────────────────────────────────────┐   │
│  │         │  DashboardWidgets                             │   │
│  │  Icon   │  ┌──────────────────────────────────────────┐ │   │
│  │ Sidebar │  │ ToolUsageChart │ ActivityFeed           │ │   │
│  │         │  │ ConfigSummary  │ ...more widgets        │ │   │
│  │         │  └──────────────────────────────────────────┘ │   │
│  └─────────┴───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Model

```typescript
// Core Agent Entity
interface Agent {
  id: string
  name: string
  description: string
  system_prompt: string
  emoji: string

  // Capabilities
  tools: string[]           // Tool IDs from StackShack
  skills: string[]          // Skill IDs to bundle
  plugins: string[]         // Plugin IDs to enable

  // Approval flow
  stakes: 'low' | 'medium' | 'high'
  reversibility: 'easy' | 'hard'
  approval_pattern: 'auto' | 'confirm' | 'explicit'

  // Metadata
  use_case: string          // support, sales, engineering, etc.
  author_id: string
  is_public: boolean
  is_official: boolean

  // Stats
  run_count: number
  success_rate: number
  avg_response_time: number

  created_at: string
  updated_at: string
}

// Workspace State (React Context)
interface WorkspaceState {
  // View mode
  view: 'workspace' | 'dashboard'

  // Panel visibility
  panels: {
    files: boolean    // Left panel collapsed/expanded
    docs: boolean     // Right panel collapsed/expanded
  }

  // Active agent
  agent: Agent | null

  // Chat state
  messages: ChatMessage[]
  isStreaming: boolean

  // Files context
  files: WorkspaceFile[]
  activeFile: string | null
  quickAccess: string[]   // Pinned file paths

  // Tools state
  enabledTools: string[]
  activeToolCall: ToolCall | null
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date

  // Agent-specific
  toolCalls?: ToolCall[]
  artifacts?: Artifact[]
}

interface ToolCall {
  id: string
  tool: string
  params: Record<string, unknown>
  status: 'pending' | 'running' | 'success' | 'error'
  result?: unknown
  duration?: number
}

interface Artifact {
  id: string
  type: 'code' | 'file' | 'chart' | 'table' | 'image'
  title: string
  content: string
  language?: string  // For code artifacts
}

interface WorkspaceFile {
  path: string
  name: string
  type: 'file' | 'directory'
  modified: Date
  size?: number
  children?: WorkspaceFile[]
}

// Dashboard metrics
interface AgentMetrics {
  totalRuns: number
  successRate: number
  avgResponseTime: number
  costMTD: number

  // Trends
  runsTrend: number        // Percentage change
  successTrend: number
  timeTrend: number

  // Tool usage breakdown
  toolUsage: Record<string, number>  // tool_id -> count

  // Activity feed
  recentActivity: ActivityItem[]
}

interface ActivityItem {
  id: string
  action: string
  timestamp: Date
  details?: string
}
```

### State Management

The workspace uses React Context + useReducer pattern:

```typescript
// WorkspaceContext.tsx
const WorkspaceContext = createContext<{
  state: WorkspaceState
  dispatch: Dispatch<WorkspaceAction>
} | null>(null)

type WorkspaceAction =
  | { type: 'SET_VIEW'; view: 'workspace' | 'dashboard' }
  | { type: 'TOGGLE_PANEL'; panel: 'files' | 'docs' }
  | { type: 'SET_AGENT'; agent: Agent }
  | { type: 'ADD_MESSAGE'; message: ChatMessage }
  | { type: 'SET_STREAMING'; isStreaming: boolean }
  | { type: 'OPEN_FILE'; path: string }
  | { type: 'PIN_FILE'; path: string }
  | { type: 'TOGGLE_TOOL'; toolId: string }
  | { type: 'SET_TOOL_CALL'; toolCall: ToolCall | null }
```

---

## Design Decisions

### 1. Theme
**Dark theme** (consistent with Claude Code CLI aesthetic)
- Primary: `var(--id8-orange)` for actions
- Accent: Purple for agent-specific elements (differentiate from skills)
- Background: Dark grays with subtle dot patterns

### 2. Builder Paradigm
**Prompt-first with visual feedback** (like Lindy, not Flowise)
- Natural language configuration is primary
- Tools/capabilities shown as toggleable chips, not nodes
- Real-time preview shows how agent responds
- Advanced users can access raw JSON config

### 3. Integration Points
- **StackShack Tools**: Selector pulls from existing skills/plugins
- **MCP Servers**: Native integration for tool definitions
- **Claude Code**: Export as installable skill bundle
- **Hooks**: Configure pre/post execution hooks

### 4. Mobile Consideration
- Builder is desktop-only (complex interaction)
- Gallery and agent detail are responsive
- "Quick deploy" actions work on mobile

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Create `/stackshack/agents` route structure
- [ ] Build `AgentCard` component for gallery
- [ ] Add "Agents" tab to MarketplaceTabs
- [ ] Design and implement database schema

### Phase 2: Builder MVP
- [ ] Create `AgentBuilder` workspace component
- [ ] Implement `PromptEditor` with syntax hints
- [ ] Build `ToolSelector` integrated with StackShack data
- [ ] Add `AgentPreview` chat simulation

### Phase 3: Execution & History
- [ ] Connect to Claude API for agent execution
- [ ] Build run history tracking
- [ ] Implement `AgentAnalytics` dashboard
- [ ] Add approval flow enforcement

### Phase 4: Templates & Sharing
- [ ] Create official template library
- [ ] Enable community sharing
- [ ] Add "fork/remix" functionality
- [ ] Build export to Claude Code format

---

## Agent-Native Compliance Checklist

Per CLAUDE.md Pattern 6 requirements:

- [ ] **Parity**: Agent can create/edit agents same as UI
- [ ] **Granularity**: Tools are atomic (create, update, delete, run, list)
- [ ] **CRUD Complete**: All agent CRUD operations exposed
- [ ] **Completion Signals**: Tools return `{ success, output, shouldContinue }`
- [ ] **Context Injection**: Agent knows available tools and user's agents

---

## Files Referenced

- Screenshots: `/Users/eddiebelaval/Development/id8/.playwright-mcp/`
  - `flowise-homepage.png`
  - `dify-homepage.png`
  - `n8n-homepage.png`
  - `lindy-homepage.png`
  - `tradingview-full-interface.png` - **Primary inspiration for toolbar layout**
  - `dribbble-real-estate-gallery.png`
  - `tabela-dashboard-detail.png`
  - `claude-cowork-review.png`
  - `claude-cowork-interface.png`

- Current StackShack: `/Users/eddiebelaval/Development/id8/id8labs/app/stackshack/`

---

*Document created: Jan 15, 2026*
*Last updated: Jan 15, 2026*
*Research conducted via Playwright automation of competitor platforms*
*Key inspirations: TradingView (toolbar), Claude Cowork (panels), Real Estate Dashboards (analytics)*
