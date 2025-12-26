# Practitioner Action Plan
## Production-Grade Agent Systems

**Score: 14-17** | You're ahead of 90% of developers. Now make it reliable, secure, and repeatable.

---

## The One Thing to Understand

> **Multi-agent isn't about more agents - it's about specialized agents with clear handoffs.**

Don't use a general-purpose agent for everything. Different jobs need different agents.

---

## Week 1: Define Agent Roles

Create `agent-roles.md`:

| Agent | Purpose | MCPs | Restrictions |
|-------|---------|------|--------------|
| **Builder** | Feature development | filesystem, git, db, tests | No prod deploy |
| **Security** | Code audits | filesystem (read-only), search | Read-only |
| **Operations** | Deployments, monitoring | filesystem, git, k8s | Approval gate |
| **Docs** | Documentation | filesystem, git | Only /docs/ |

Each agent gets its own CLAUDE.md profile with specific permissions.

---

## Week 2: Security Hardening

Audit every MCP server:
- [ ] Least-privilege access
- [ ] Path restrictions (no /etc/, ~/.ssh/, ~/.aws/)
- [ ] Rate limiting
- [ ] Audit logging

Add to all agent contexts:

```markdown
## Never Auto-Approve
- rm -rf, sudo, curl | bash
- Production database changes
- Deployments without passing tests

## Always Require Review
- Auth/payment logic
- User data exports
- Security configurations
```

**Test by trying to break your own rules.**

---

## Week 3: Monitoring & Observability

Track these metrics weekly:

| Metric | Why |
|--------|-----|
| Tasks completed vs failed | Agent reliability |
| Tokens used / estimated cost | Budget management |
| Time saved per task | ROI proof |
| Security policy violations | Risk awareness |

Set alerts for: policy violations, repeated failures, cost spikes, prod access attempts.

---

## Week 4: Team Patterns

Document your workflows as playbooks:

**Example: Adding a Feature**
1. Builder creates branch, implements feature with PEV
2. Security audits for vulnerabilities
3. Docs updates documentation
4. Operations deploys (with approval gate)

Create a setup script so new team members are running in <30 minutes.

---

## You're Ready for Pioneer Level When:
- [ ] Multiple specialized agents working in coordination
- [ ] Security hardening in production
- [ ] Monitoring and cost tracking active
- [ ] Team-wide adoption with documented patterns

---

## Hit a Wall?

Most Practitioners struggle with over-engineering orchestration or ignoring cost at scale.

**Free:** [MCP Security Checklist](https://id8labs.app/resources/MCP_Security_Checklist.md) - audit your setup

**Paid:**
- Architecture consultation ($5k, 4 sessions) → [Book here](https://cal.com/id8labs/practitioner-consult)
- Custom MCP development (from $10k)
- Team enablement program (from $25k)

---

*Built by [ID8Labs](https://id8labs.app) - Tools for Builders*
