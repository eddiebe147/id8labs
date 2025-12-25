# MCP Security Checklist
## What I Learned After Getting Burned

*By ID8Labs | 2025 Edition*

---

## The Wake-Up Call

I installed a community MCP server for Notion integration. Clean GitHub repo, 400+ stars, active issues. It worked beautifully - synced my notes, updated pages automatically, even handled blocks and databases better than I expected.

Three weeks later, I was debugging something unrelated and noticed unfamiliar outbound traffic. Dug deeper. The server had been logging every API call to an external analytics endpoint. Every note title. Every edit. Every database query. Three weeks of everything.

The maintainer wasn't malicious - they were collecting "anonymized usage data" for a dashboard they were building. But my client strategy docs? My project notes with API keys in code blocks? Not so anonymous.

That was my last "just install it" moment with MCP servers.

---

## Why This Matters Now

**Forrester predicts 30% of enterprise app vendors will launch MCP servers by 2026.**

We're in the Wild West phase. The protocol is brilliant. The ecosystem is exploding. The security standards? Still being written in blood.

Here's what's at stake:

- **Data exfiltration**: Your MCP server talking to your CRM is also talking to someone else's logging service
- **Credential theft**: That GitHub integration you installed has your PAT, and it's stored in plaintext
- **Supply chain attacks**: The dependency three layers deep in your MCP server just got compromised
- **Privilege escalation**: The "read-only" calendar integration that somehow has write access to your email

The problem isn't the protocol. The problem is trusting code you haven't read with access you haven't scoped.

---

## The Pre-Flight Checklist

Before you add any MCP server to your Claude Desktop config, run through this. Every single one. I don't care how "official" it looks.

### 1. Source Verification

- [ ] **Source code is open and auditable**
  → If you can't read the code, you're trusting a stranger with your data. No exceptions. Binary-only distributions are an automatic no.

- [ ] **Publisher identity is verified**
  → Check GitHub stars, but also check commit history, who's maintaining it, and when they last shipped. A repo with 1k stars and no commits in 8 months is a ghost town.

- [ ] **Code has been reviewed for obvious backdoors**
  → Search for `fetch(`, `axios`, `http.request` - where does data go? Are there any outbound calls that aren't documented?

- [ ] **Dependencies are scanned for vulnerabilities**
  → Run `npm audit` or `pip-audit`. If it has 15 high-severity vulns, that's not a tool - that's a liability.

- [ ] **No obfuscated or minified code without build artifacts**
  → If the source is minified and there's no `build` script, someone's hiding something. Move on.

### 2. Permission Scoping

- [ ] **Server requests only necessary permissions**
  → A weather MCP server doesn't need filesystem access. A file search tool doesn't need network access. Trust your gut.

- [ ] **No blanket access to sensitive services**
  → "Full Gmail access" for a tool that just reads your calendar? That's not lazy - that's dangerous.

- [ ] **Read vs write permissions are separated**
  → If it can read your notes, it shouldn't automatically be able to delete them. Principle of least privilege isn't optional.

- [ ] **Resource access is scoped to specific paths/domains**
  → Filesystem access should be to a specific directory, not `/`. API access should be to specific endpoints, not wildcard.

- [ ] **Credential storage follows least-privilege principle**
  → Does it need your master API key, or can it use a scoped token? Can you create a service account with limited permissions?

### 3. Authentication & Authorization

- [ ] **MCP server uses secure credential storage (not plaintext)**
  → If your API keys are in a `config.json` sitting in your home directory unencrypted, you're one malware infection away from a breach.

- [ ] **API keys are rotated regularly**
  → Set a calendar reminder. Rotate keys every 90 days. Automate it if you can.

- [ ] **OAuth tokens have appropriate expiration**
  → "Never expires" tokens are never the right choice. 30-90 days max.

- [ ] **Service accounts have minimal required permissions**
  → Don't give your MCP server your admin account. Create a dedicated service account with only what it needs.

- [ ] **MFA is enabled where supported**
  → If the service supports MFA, use it. Yes, even for automation accounts.

### 4. Network Security

- [ ] **Server runs in isolated network segment**
  → If you're running this in production, isolate it. VPC, subnet, whatever your infrastructure supports.

- [ ] **Outbound traffic is monitored and restricted**
  → Know what it's connecting to. If it's a Slack MCP server and it's hitting `analytics.shady-domain.ru`, kill it.

- [ ] **No unnecessary open ports**
  → If it opens a port, it better have a damn good reason documented.

- [ ] **TLS is enforced for all connections**
  → Plaintext HTTP in 2025 is unacceptable. Period.

- [ ] **DNS requests are logged and auditable**
  → DNS exfiltration is real. Log it. Review it occasionally.

### 5. Data Handling

- [ ] **Sensitive data is not logged or cached unnecessarily**
  → Check the logs. If you see API keys, passwords, or PII in plaintext, that's a failure.

- [ ] **PII handling complies with regulations (GDPR, CCPA)**
  → If you're touching user data, you need a data processing agreement and compliance documentation. "I didn't know" isn't a defense.

- [ ] **Data retention policies are enforced**
  → How long does it cache data? Where? Can you purge it? Is there a documented policy?

- [ ] **Encryption at rest is enabled for cached data**
  → If it's storing anything locally, it should be encrypted. Check the temp directories.

- [ ] **Data classification is documented**
  → Does the maintainer know what "sensitive data" means in your context? Have they documented how they handle it?

---

## Runtime Monitoring Checklist

You deployed it. Great. Now watch it.

### 6. Logging & Observability

- [ ] **All tool invocations are logged with timestamps**
  → If Claude called a tool and you can't see what it did, you're flying blind.

- [ ] **User/agent identity is captured in logs**
  → Who triggered this action? Which Claude conversation? Tag everything.

- [ ] **Sensitive parameters are redacted in logs**
  → Search for "password", "token", "api_key" in your logs. If they're there in plaintext, fix it now.

- [ ] **Anomaly detection is configured**
  → Set up alerts for: spike in API calls, new outbound destinations, failed auth attempts, unusual hours.

- [ ] **Logs are immutable and retained per policy**
  → Someone compromised your MCP server? Your logs are the crime scene. Don't let them be tampered with.

### 7. Rate Limiting & Abuse Prevention

- [ ] **Request rate limits are enforced**
  → A runaway Claude loop shouldn't be able to make 10,000 API calls in 30 seconds. Set sane limits.

- [ ] **Concurrent session limits are configured**
  → How many simultaneous connections should this support? What happens when you hit that limit?

- [ ] **Cost controls are in place for paid APIs**
  → Claude accidentally triggering $5,000 in OpenAI embeddings calls is a bad Monday. Set billing alerts.

- [ ] **Circuit breakers prevent cascading failures**
  → If the upstream API is down, your MCP server should fail gracefully, not retry until it melts.

- [ ] **Abuse patterns trigger alerts**
  → Repeated failed auth, scanning behavior, unusual query patterns - alert on it.

### 8. Incident Response

- [ ] **Kill switch exists to disable server immediately**
  → You should be able to disable an MCP server in under 60 seconds. Practice it. Time yourself.

- [ ] **Runbook documents response procedures**
  → "Server is exfiltrating data, what do I do?" should have a documented answer. Write it before you need it.

- [ ] **Contact info for server maintainer is documented**
  → If it's 2am and things are breaking, can you reach someone? Is there a security contact?

- [ ] **Rollback procedure is tested**
  → Can you revert to the previous version? Have you actually tested it, or just assumed it works?

- [ ] **Post-incident review process is defined**
  → After the fire is out, do a post-mortem. What failed? What worked? What changes?

---

## Vendor-Specific Considerations

Not all MCP servers are created equal. Adjust your paranoia accordingly.

### Official Vendor Servers (Google, Slack, GitHub, etc.)

Generally safer, but "official" isn't a free pass.

- [ ] **Using official package source (npm, PyPI, official repo)**
  → Typosquatting is real. `@anthropic/mcp-server-github` is legit. `@anthropic/mcp-github-server` might not be.

- [ ] **Version matches vendor documentation**
  → If the docs say v1.2.0 and you're on v1.2.0-fork-by-random-person, stop.

- [ ] **No unauthorized forks**
  → Someone forked the official server and "added features"? Read every line they changed.

### Community/Third-Party Servers

Higher scrutiny. These are passion projects, and passion doesn't patch CVEs.

- [ ] **Active maintenance (commits in last 90 days)**
  → A server that hasn't been touched in 6 months is unmaintained. Period.

- [ ] **Issue response time is acceptable**
  → Check the Issues tab. Are security issues acknowledged? Fixed? Ignored?

- [ ] **No abandoned dependencies**
  → If it's using packages that are deprecated or have known vulns, it's a ticking time bomb.

- [ ] **Security policy exists (SECURITY.md)**
  → If there's no documented way to report security issues, the maintainer hasn't thought about security.

### Self-Built Servers

Full control, full responsibility. Don't skip steps because "you wrote it."

- [ ] **Security review by separate team member**
  → You can't review your own code objectively. Have someone else look.

- [ ] **Dependency scanning in CI/CD**
  → Automate `npm audit`, Snyk, Dependabot - whatever you use. Make it block PRs.

- [ ] **Regular penetration testing**
  → At least annually. More often if it touches sensitive data.

- [ ] **Documented threat model**
  → What are you protecting? What are the attack vectors? Write it down.

---

## Red Flags I've Learned to Spot

These are the warnings I ignore at my own peril:

### 1. "Requires full filesystem access" for a note-taking app
Why does a tool that reads Markdown files need access to `/etc/passwd`? It doesn't. Next.

### 2. Binary-only distribution with no build process
"Trust me, just run this executable." No. Show me the source and the build script or we're done here.

### 3. Last commit was 6 months ago but issues are piling up
Seven open security issues. No response from the maintainer. This is abandonware.

### 4. Outbound connections to analytics endpoints you didn't configure
If I didn't explicitly enable analytics, why is it phoning home? What else is it sending?

### 5. Credentials stored in plaintext in config files
"Just put your API key in `~/.config/mcp-server/config.json`" - and when malware scans your home directory, congrats, you just got owned.

### 6. Package name is too similar to an official one
`@anthropic-mcp/github` vs `@anthropic/mcp-server-github`. Spot the typosquat.

### 7. "Quick install" script that runs with sudo
`curl https://random-site.com/install.sh | sudo bash` is not an installation method. It's a suicide pact.

### 8. Maintainer has no other projects or online presence
Brand new GitHub account. One repo. No commit history anywhere else. Who are you?

---

## The ID8Labs Audit Process

This is how we evaluate MCP servers before we deploy them for clients. Adapt it for your workflow.

### Step 1: Clone, Don't Install
```bash
# Wrong
npm install -g sketchy-mcp-server

# Right
git clone https://github.com/vendor/mcp-server
cd mcp-server
# Now read the code
```

Don't `npm install` blindly. Clone the repo. Read the code first.

### Step 2: Hunt for Outbound Calls
```bash
# Search for network activity
grep -r "fetch(" .
grep -r "axios" .
grep -r "http.request" .
grep -r "net.connect" .
```

Every outbound call should be documented and justified. If you find one that isn't, ask why.

### Step 3: Check Permissions vs Needs
What does it *request* vs what does it *need*?

- File search tool requesting network access? Why?
- Calendar integration requesting filesystem write? Why?
- Weather API client requesting database access? Why?

If the answer isn't obvious, don't install it.

### Step 4: Sandbox First
Run it in a sandboxed environment before production:

- Docker container with limited network
- VM with snapshot capability
- Separate user account with no sensitive data

Let it run for 24 hours. Monitor network traffic, file access, resource usage.

### Step 5: Monitor Production Deployment
Even after it passes sandbox testing:

- Enable verbose logging for the first week
- Set up alerts for unusual behavior
- Review logs daily
- Have a rollback plan ready

---

## Quick Reference Card

Print this. Tape it to your monitor. Check it before every MCP server install.

### 5 Things to Check Before Installing

1. **Can I read the source code?** (No = Don't install)
2. **Is it actively maintained?** (Last commit >90 days ago = Don't install)
3. **What permissions does it request?** (More than it needs = Don't install)
4. **Where does data go?** (Unexplained outbound calls = Don't install)
5. **Can I disable it in 60 seconds?** (No kill switch = Don't install)

### 5 Red Flags That Mean "Don't Install"

1. Binary-only distribution
2. Plaintext credential storage
3. Excessive permissions for stated purpose
4. No security policy or maintainer contact
5. "Trust me" installation script with sudo

### Emergency Kill Switch Procedure

```bash
# 1. Stop Claude Desktop
killall "Claude"

# 2. Disable the MCP server in config
# Edit: ~/Library/Application Support/Claude/claude_desktop_config.json
# Remove the server entry

# 3. Revoke credentials
# GitHub: Settings → Developer settings → Personal access tokens
# Google: Security → Third-party apps → Remove access
# Slack: Settings → Apps → Remove

# 4. Review logs for damage assessment
# Check what the server accessed while it was running

# 5. Rotate any credentials it had access to
```

---

## Need Help?

### ID8Labs Services

**MCP Security Audits**
We review your MCP infrastructure, test your servers, and deliver a prioritized remediation plan.

**Custom MCP Development**
We build secure, production-ready MCP servers with proper auth, logging, and monitoring baked in.

**Team Training**
Claude Code and MCP security workshops. We teach your team to spot issues before they deploy.

**Contact:** hello@id8labs.app
**Web:** https://id8labs.app/services

---

## One More Thing

Security isn't about paranoia. It's about knowing what you're trusting and why.

The MCP protocol is powerful because it gives Claude real capabilities. But with real capabilities come real risks. The five minutes you spend reading the source code could save you from weeks of incident response.

I learned this the hard way. You don't have to.

---

*This checklist is provided for educational purposes. The "Notion incident" scenario is a hypothetical but realistic example based on common security patterns we've observed in the wild. Always consult with your security team before deploying AI integrations in production.*

**License:** Free to share, modify, and distribute with attribution to ID8Labs.

© 2025 ID8Labs • https://id8labs.app
