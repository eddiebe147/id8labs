/**
 * Claude Code Install Prompt Templates
 *
 * These prompts guide Claude Code to install generated tools with:
 * 1. Prerequisites verification
 * 2. Conflict checking
 * 3. Installation with validation
 * 4. Knowledge update notes
 */

import type {
  ToolType,
  GeneratedSkill,
  GeneratedCommand,
  GeneratedAgent,
  GeneratedMCP,
} from './types'

interface InstallPromptOptions {
  toolType: ToolType
  data: GeneratedSkill | GeneratedCommand | GeneratedAgent | GeneratedMCP
  generatedDate?: string
}

/**
 * Generate install prompt for a Skill
 */
function generateSkillInstallPrompt(data: GeneratedSkill, date: string): string {
  const triggers = data.triggers || []
  const triggerExample = triggers[0] || data.name.toLowerCase()

  return `## Installing: ${data.name}

### Pre-Installation Verification

Before installing this skill, please verify:

1. **Check skills directory exists:**
   \`\`\`bash
   ls -la ~/.claude/skills/ || mkdir -p ~/.claude/skills/
   \`\`\`

2. **Verify no existing skill conflicts:**
   \`\`\`bash
   ls ~/.claude/skills/${data.slug}.md 2>/dev/null && echo "WARNING: Skill already exists"
   \`\`\`

### Installation

Create the skill file at \`~/.claude/skills/${data.slug}.md\`:

\`\`\`markdown
${data.rawContent || data.content}
\`\`\`

### Post-Installation Verification

1. **Confirm file was created:**
   \`\`\`bash
   test -f ~/.claude/skills/${data.slug}.md && echo "SUCCESS: Skill installed"
   \`\`\`

2. **Test the skill:**
   Try invoking with: "${triggerExample}"

### Knowledge Update Notice

This skill was generated on ${date}. If you're installing this skill at a later date:

- Review for any outdated patterns or best practices
- Check if mentioned tools/APIs have newer versions
- Consider if Claude Code conventions have changed
- The skill may reference syntax or features that have evolved

### Troubleshooting

- If the skill doesn't trigger, check Claude Code logs
- Ensure the file has proper UTF-8 encoding
- Verify YAML frontmatter is valid (no tabs, proper indentation)
- Restart Claude Code if needed to reload skills

### Uninstall

To remove this skill:
\`\`\`bash
rm ~/.claude/skills/${data.slug}.md
\`\`\`
`
}

/**
 * Generate install prompt for a Command
 */
function generateCommandInstallPrompt(data: GeneratedCommand, date: string): string {
  const prerequisites = data.prerequisites || []
  const prereqChecks = prerequisites
    .map((p) => `   - Verify \`${p}\` is installed: \`which ${p}\``)
    .join('\n')

  return `## Installing: ${data.name}

### Prerequisites Check

Before using this command, ensure you have the required tools:

${prereqChecks || '   - No specific prerequisites listed'}

### Installation Options

#### Option 1: Shell Alias (Recommended)

Add to your shell config (\`~/.zshrc\` or \`~/.bashrc\`):

\`\`\`bash
# ${data.name}
# ${data.description}
alias ${data.slug.replace(/-/g, '_')}='${data.command}'
\`\`\`

Then reload your shell:
\`\`\`bash
source ~/.zshrc  # or source ~/.bashrc
\`\`\`

#### Option 2: Shell Function (For Complex Commands)

\`\`\`bash
# ${data.name}
${data.slug.replace(/-/g, '_')}() {
  ${data.command}
}
\`\`\`

#### Option 3: Standalone Script

Create \`~/bin/${data.slug}\`:

\`\`\`bash
#!/bin/bash
# ${data.name}
# ${data.description}
# Generated: ${date}

${data.command}
\`\`\`

Make executable:
\`\`\`bash
chmod +x ~/bin/${data.slug}
\`\`\`

### Verification

Test the command:
\`\`\`bash
# Dry run if supported, or test with safe parameters
${data.command.replace(/\$\w+/g, '"test-value"')}
\`\`\`

### Command Variables

${data.content.includes('Variable') ? 'See the Variables section in the documentation above.' : 'This command may include variables (e.g., $MESSAGE, $BRANCH). Replace them with actual values.'}

### Knowledge Update Notice

This command was generated on ${date}. Consider:

- Checking if shell syntax has updated best practices
- Verifying tool flags haven't changed
- Reviewing for security improvements

### Variants

${data.variants && data.variants.length > 0
    ? data.variants.map((v) => `#### ${v.name}\n\`\`\`bash\n${v.command}\n\`\`\`\n${v.description}`).join('\n\n')
    : 'No variants defined.'}
`
}

/**
 * Generate install prompt for an Agent
 */
function generateAgentInstallPrompt(data: GeneratedAgent, date: string): string {
  const toolsRequired = data.tools_required || []
  const triggers = data.triggers || []
  const triggerExample = triggers[0] || `activate ${data.slug}`

  const collaborators = data.coordination?.collaborates_with || []
  const reportsTo = data.coordination?.reports_to

  return `## Installing: ${data.name}

### Environment Verification

Before installing this agent, verify your Claude Code environment:

1. **Check agents directory:**
   \`\`\`bash
   ls -la ~/.claude/agents/ || mkdir -p ~/.claude/agents/
   \`\`\`

2. **Verify required tools are available:**
   The agent needs these Claude Code tools: ${toolsRequired.join(', ') || 'read, write, grep, glob'}

3. **Check coordination targets:**
   ${reportsTo ? `- This agent reports to: \`${reportsTo}\`` : '- This agent is standalone (no parent)'}
   ${collaborators.length > 0 ? `- Works with: ${collaborators.join(', ')}` : '- No collaborating agents defined'}

### Installation

Create the agent file at \`~/.claude/agents/${data.slug}.md\`:

\`\`\`markdown
${data.rawContent || data.content}
\`\`\`

### Activation

Invoke this agent by saying:
${triggers.map((t) => `- "${t}"`).join('\n') || `- "${triggerExample}"`}

### Coordination Setup

${reportsTo
    ? `**Parent Agent:** Ensure \`${reportsTo}\` is installed before using this agent in coordinated workflows.`
    : 'This agent operates independently but can collaborate with others.'}

${collaborators.length > 0
    ? `**Collaborating Agents:** For full functionality, consider installing:\n${collaborators.map((c) => `- ${c}`).join('\n')}`
    : ''}

### Post-Installation Verification

1. **Confirm file was created:**
   \`\`\`bash
   test -f ~/.claude/agents/${data.slug}.md && echo "SUCCESS: Agent installed"
   \`\`\`

2. **Test the agent:**
   Start a conversation and try: "${triggerExample}"

### Agent Capabilities

${data.capabilities?.map((c) => `- ${c}`).join('\n') || 'See the capabilities section in the documentation above.'}

### Knowledge Update Notice

This agent was generated on ${date}. Agents may need updates for:

- New Claude Code features or tools
- Updated best practices for the agent's domain
- Changes to collaborating agents
- Improved prompting techniques

### Persona

${data.persona || 'See the persona section in the agent definition.'}

### Uninstall

To remove this agent:
\`\`\`bash
rm ~/.claude/agents/${data.slug}.md
\`\`\`
`
}

/**
 * Generate install prompt for an MCP Server
 */
function generateMCPInstallPrompt(data: GeneratedMCP, date: string): string {
  const dependencies = data.dependencies || ['@modelcontextprotocol/sdk']
  const envVars = data.env_vars || []

  const isTypeScript = data.language === 'typescript'
  const fileExt = isTypeScript ? 'ts' : 'py'
  const runCommand = isTypeScript ? 'npx tsx' : 'python'

  return `## Installing: ${data.name}

### Prerequisites

Before installing this MCP server:

1. **Runtime:**
   ${isTypeScript
    ? `- Node.js 18+ required: \`node --version\``
    : `- Python 3.9+ required: \`python --version\``}

2. **MCP SDK:**
   ${isTypeScript
    ? `\`\`\`bash\n   npm install -g @modelcontextprotocol/sdk\n   \`\`\``
    : `\`\`\`bash\n   pip install mcp\n   \`\`\``}

### Installation Steps

#### Step 1: Create Server Directory

\`\`\`bash
mkdir -p ~/.claude/mcps/${data.slug}
cd ~/.claude/mcps/${data.slug}
\`\`\`

#### Step 2: Initialize Project

${isTypeScript
    ? `\`\`\`bash
npm init -y
npm install ${dependencies.join(' ')}
\`\`\``
    : `\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install ${dependencies.join(' ')}
\`\`\``}

#### Step 3: Create Server File

Create \`~/.claude/mcps/${data.slug}/index.${fileExt}\`:

\`\`\`${data.language}
${data.content.includes('```') ? '// See the implementation in the documentation below' : data.content.slice(0, 500) + '...'}
\`\`\`

(Full implementation in the documentation above)

#### Step 4: Configure Claude Desktop

Add to your \`claude_desktop_config.json\`:

${isTypeScript
    ? `\`\`\`json
{
  "mcpServers": {
    "${data.slug}": {
      "command": "node",
      "args": ["${process.env.HOME || '~'}/.claude/mcps/${data.slug}/dist/index.js"]
    }
  }
}
\`\`\``
    : `\`\`\`json
{
  "mcpServers": {
    "${data.slug}": {
      "command": "python",
      "args": ["${process.env.HOME || '~'}/.claude/mcps/${data.slug}/index.py"]
    }
  }
}
\`\`\``}

#### Step 5: Environment Variables

${envVars.length > 0
    ? `This server requires environment variables:\n\n${envVars.map((e) => `- \`${e.name}\`: ${e.description} ${e.required ? '(required)' : '(optional)'}`).join('\n')}\n\nAdd them to your shell config or create a \`.env\` file.`
    : 'No environment variables required.'}

### Verification

1. **Restart Claude Desktop**

2. **Check MCP connection:**
   - Open Claude Desktop settings
   - Navigate to MCP servers
   - Verify "${data.slug}" shows as connected

3. **Test the server:**
   ${data.tools && data.tools[0] ? `Try: "Use ${data.slug} to ${data.tools[0].description}"` : 'Try invoking one of the defined tools'}

### Available Tools

${data.tools?.map((t) => `- **${t.name}**: ${t.description}`).join('\n') || 'See the tools reference in the documentation above.'}

### Available Resources

${data.resources?.map((r) => `- **${r.name}**: ${r.description}`).join('\n') || 'No resources defined.'}

### Security Considerations

- Review the MCP Security Checklist before enabling in production
- Audit all API calls and data access
- Use environment variables for secrets, never hardcode
- Consider rate limiting for external API calls

### Knowledge Update Notice

This MCP server was generated on ${date} using MCP SDK ${data.sdk_version || '>=1.10.0'}.

- Check for SDK updates: \`npm outdated @modelcontextprotocol/sdk\`
- Review for API changes in external services
- Consider security patches and improvements

### Build (TypeScript only)

${isTypeScript
    ? `\`\`\`bash
cd ~/.claude/mcps/${data.slug}
npm run build
\`\`\``
    : 'N/A - Python servers run directly.'}

### Uninstall

\`\`\`bash
rm -rf ~/.claude/mcps/${data.slug}
\`\`\`

Then remove the entry from \`claude_desktop_config.json\`.
`
}

/**
 * Generate the appropriate install prompt based on tool type
 */
export function generateInstallPrompt(options: InstallPromptOptions): string {
  const { toolType, data, generatedDate } = options
  const date = generatedDate || new Date().toISOString().split('T')[0]

  switch (toolType) {
    case 'skill':
      return generateSkillInstallPrompt(data as GeneratedSkill, date)
    case 'command':
      return generateCommandInstallPrompt(data as GeneratedCommand, date)
    case 'agent':
      return generateAgentInstallPrompt(data as GeneratedAgent, date)
    case 'mcp':
      return generateMCPInstallPrompt(data as GeneratedMCP, date)
    default:
      throw new Error(`Unknown tool type: ${toolType}`)
  }
}

/**
 * Generate a compact install snippet (for copy-to-clipboard)
 */
export function generateQuickInstall(options: InstallPromptOptions): string {
  const { toolType, data } = options

  switch (toolType) {
    case 'skill':
      return `# Quick Install: ${data.name}
mkdir -p ~/.claude/skills && cat > ~/.claude/skills/${data.slug}.md << 'EOF'
${(data as GeneratedSkill).rawContent || data.content}
EOF
echo "Skill installed! Test with: ${(data as GeneratedSkill).triggers?.[0] || data.name}"`

    case 'command':
      return `# Quick Install: ${data.name}
# Add to ~/.zshrc or ~/.bashrc:
alias ${data.slug.replace(/-/g, '_')}='${(data as GeneratedCommand).command}'
source ~/.zshrc`

    case 'agent':
      return `# Quick Install: ${data.name}
mkdir -p ~/.claude/agents && cat > ~/.claude/agents/${data.slug}.md << 'EOF'
${(data as GeneratedAgent).rawContent || data.content}
EOF
echo "Agent installed! Invoke with: ${(data as GeneratedAgent).triggers?.[0] || data.name}"`

    case 'mcp':
      const mcp = data as GeneratedMCP
      return `# Quick Install: ${data.name}
mkdir -p ~/.claude/mcps/${data.slug}
cd ~/.claude/mcps/${data.slug}
npm init -y && npm install ${mcp.dependencies?.join(' ') || '@modelcontextprotocol/sdk'}
# Then add to claude_desktop_config.json and create index.ts
echo "See full install instructions for MCP server setup"`

    default:
      return `# Unknown tool type: ${toolType}`
  }
}

/**
 * Get install location for a tool type
 */
export function getInstallLocation(toolType: ToolType, slug: string): string {
  switch (toolType) {
    case 'skill':
      return `~/.claude/skills/${slug}.md`
    case 'command':
      return `~/.zshrc or ~/.bashrc (as alias)`
    case 'agent':
      return `~/.claude/agents/${slug}.md`
    case 'mcp':
      return `~/.claude/mcps/${slug}/`
    default:
      return 'Unknown location'
  }
}
