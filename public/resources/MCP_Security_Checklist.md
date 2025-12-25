# MCP Security Checklist
## Avoiding the "Wild West" of AI Integration

*By ID8Labs | 2025 Edition*

---

## Why This Matters

Forrester predicts 30% of enterprise app vendors will launch MCP servers by 2026. But rapid adoption without security creates serious risks:

- **Backdoored community servers** - Untrusted code with sensitive access
- **Blanket permissions** - AI agents with unrestricted access to email, CRMs, databases
- **Data exfiltration** - Sensitive information leaving your perimeter

Use this checklist before deploying any MCP server in production.

---

## Pre-Deployment Checklist

### 1. Source Verification
- [ ] Server source code is open and auditable
- [ ] Publisher identity is verified (official vendor, known maintainer)
- [ ] Code has been reviewed for obvious backdoors
- [ ] Dependencies are scanned for vulnerabilities
- [ ] No obfuscated or minified source code without build artifacts

### 2. Permission Scoping
- [ ] Server requests only necessary permissions
- [ ] No blanket access to sensitive services (email, CRM, databases)
- [ ] Read vs write permissions are separated
- [ ] Resource access is scoped to specific paths/domains
- [ ] Credential storage follows least-privilege principle

### 3. Authentication & Authorization
- [ ] MCP server uses secure credential storage (not plaintext)
- [ ] API keys are rotated regularly
- [ ] OAuth tokens have appropriate expiration
- [ ] Service accounts have minimal required permissions
- [ ] MFA is enabled where supported

### 4. Network Security
- [ ] Server runs in isolated network segment
- [ ] Outbound traffic is monitored and restricted
- [ ] No unnecessary open ports
- [ ] TLS is enforced for all connections
- [ ] DNS requests are logged and auditable

### 5. Data Handling
- [ ] Sensitive data is not logged or cached unnecessarily
- [ ] PII handling complies with regulations (GDPR, CCPA)
- [ ] Data retention policies are enforced
- [ ] Encryption at rest is enabled for cached data
- [ ] Data classification is documented

---

## Runtime Monitoring Checklist

### 6. Logging & Observability
- [ ] All tool invocations are logged with timestamps
- [ ] User/agent identity is captured in logs
- [ ] Sensitive parameters are redacted in logs
- [ ] Anomaly detection is configured
- [ ] Logs are immutable and retained per policy

### 7. Rate Limiting & Abuse Prevention
- [ ] Request rate limits are enforced
- [ ] Concurrent session limits are configured
- [ ] Cost controls are in place for paid APIs
- [ ] Circuit breakers prevent cascading failures
- [ ] Abuse patterns trigger alerts

### 8. Incident Response
- [ ] Kill switch exists to disable server immediately
- [ ] Runbook documents response procedures
- [ ] Contact info for server maintainer is documented
- [ ] Rollback procedure is tested
- [ ] Post-incident review process is defined

---

## Vendor-Specific Considerations

### Official Vendor Servers (Google, Slack, GitHub)
- Generally safer but still verify:
  - [ ] Using official package source (npm, PyPI)
  - [ ] Version matches vendor documentation
  - [ ] No unauthorized forks

### Community/Third-Party Servers
- Higher scrutiny required:
  - [ ] Active maintenance (commits in last 90 days)
  - [ ] Issue response time is acceptable
  - [ ] No abandoned dependencies
  - [ ] Security policy exists (SECURITY.md)

### Self-Built Servers
- Full control but full responsibility:
  - [ ] Security review by separate team member
  - [ ] Dependency scanning in CI/CD
  - [ ] Regular penetration testing
  - [ ] Documented threat model

---

## Quick Reference: Red Flags

Stop and investigate if you see:

1. **Excessive permissions** - Server wants access to everything
2. **No source code** - Binary-only distribution
3. **Hardcoded credentials** - API keys in source
4. **No update mechanism** - Can't patch vulnerabilities
5. **Unknown publisher** - No verifiable identity
6. **No logging** - Can't audit what it does
7. **Outbound to unknown hosts** - Data exfiltration risk

---

## Next Steps

1. **Audit existing MCP servers** using this checklist
2. **Establish governance policy** for new server approvals
3. **Train your team** on MCP security best practices

---

## Need Help?

ID8Labs offers:
- **MCP Security Audits** - We review your MCP infrastructure
- **Custom MCP Development** - Secure, production-ready servers
- **Team Training** - Claude Code and MCP security workshops

**Contact:** hello@id8labs.app
**Web:** https://id8labs.app/services

---

*This checklist is provided for educational purposes. Always consult with your security team before deploying AI integrations in production.*

© 2025 ID8Labs. Free to share with attribution.
