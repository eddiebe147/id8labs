# StackShack API v1

REST API for the StackShack CLI and marketplace.

## Base URL

```
https://id8labs.app/api/v1
```

## Endpoints

### GET /skills/:slug

Fetch skill details with full content for CLI installation.

**Parameters:**
- `slug` (path) - Skill slug identifier

**Response:**
```json
{
  "id": "uuid",
  "slug": "pitch-deck-builder",
  "name": "Pitch Deck Builder",
  "description": "Create compelling pitch decks...",
  "category": "business",
  "tags": ["writing", "business", "presentations"],
  "triggers": ["pitch deck", "investor presentation"],
  "version": "1.0.0",
  "verified": true,
  "featured": false,
  "author": "ID8Labs",
  "license": "MIT",
  "repository": "https://github.com/id8labs/claude-code-skills",
  "repository_path": "skills/pitch-deck-builder",
  "downloads": 1250,
  "rating": 4.5,
  "quality_score": 85,
  "content": "---\nname: pitch-deck-builder\n...",
  "type": "skill"
}
```

---

### GET /agents/:slug

Fetch agent details with full content for CLI installation.

**Parameters:**
- `slug` (path) - Agent slug identifier

**Response:**
```json
{
  "id": "uuid",
  "slug": "nextjs-senior-dev",
  "name": "Next.js Senior Developer",
  "description": "Expert Next.js developer...",
  "category": "agents",
  "tags": ["agent", "nextjs", "react"],
  "triggers": ["nextjs", "app router"],
  "version": "1.0.0",
  "verified": true,
  "featured": true,
  "author": "ID8Labs",
  "license": "MIT",
  "repository": "https://github.com/eddiebe147/claude-settings",
  "repository_path": "agents/nextjs-senior-dev.md",
  "downloads": 3420,
  "rating": 4.8,
  "quality_score": 90,
  "content": "---\nname: nextjs-senior-dev\n...",
  "type": "agent"
}
```

---

### GET /search

Search the StackShack marketplace.

**Query Parameters:**
- `q` (optional) - Search query string. If omitted, returns trending items
- `category` (optional) - Filter by category slug
- `type` (optional) - Filter by type: `skill`, `agent`, `command`, `setting`
- `limit` (optional) - Number of results (default: 20, max: 100)
- `offset` (optional) - Pagination offset (default: 0)

**Response:**
```json
{
  "results": [
    {
      "id": "uuid",
      "slug": "instagram-strategist",
      "name": "Instagram Strategist",
      "description": "Master Instagram strategy...",
      "category": "writing",
      "tags": ["social-media", "instagram"],
      "triggers": ["instagram", "reels"],
      "version": "1.0.0",
      "verified": true,
      "featured": false,
      "author": "ID8Labs",
      "downloads": 890,
      "rating": 4.3,
      "type": "skill"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0,
  "query": "social media"
}
```

---

### GET /stacks/:slug

Fetch pre-built stack details for CLI installation.

**Parameters:**
- `slug` (path) - Stack slug identifier

**Response:**
```json
{
  "id": "uuid",
  "slug": "next-js-saas",
  "name": "Next.js SaaS Starter",
  "description": "Complete Next.js 14 App Router + Supabase + Stripe SaaS stack",
  "category": "stack",
  "emoji": "🚀",
  "author": "ID8Labs",
  "is_official": true,
  "items": {
    "skills": [
      "nextjs-project-manager",
      "supabase-expert",
      "database-design",
      "api-design",
      "ui-builder"
    ],
    "agents": [
      "nextjs-senior-dev",
      "backend-architect"
    ],
    "commands": [
      "create-nextjs-supabase",
      "deploy-vercel"
    ],
    "settings": [
      "rapid-prototyping"
    ]
  },
  "total_items": 9,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-07T00:00:00Z"
}
```

---

### POST /track-download

Track installation/download of items via CLI for analytics.

**Body:**
```json
{
  "itemType": "skill",
  "itemId": "uuid",
  "installedVia": "cli",
  "version": "0.1.0"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Download tracked successfully",
  "tracked": true
}
```

## Authentication

Phase 1 API endpoints are public and do not require authentication.

Authentication will be added in Phase 3 for:
- Private skills/agents
- Team features
- Premium content

## Rate Limiting

- **Public endpoints**: 100 requests per minute per IP
- **CLI installs**: 50 requests per minute per IP

Rate limits may be adjusted based on usage patterns.

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Versioning

The API is versioned via the URL path (`/api/v1/`). Breaking changes will result in a new version (`/api/v2/`).

## CORS

CORS is enabled for all origins to support CLI usage from any environment.

## Support

- **Issues**: https://github.com/id8labs/stackshack-cli/issues
- **Email**: hello@id8labs.app
- **Documentation**: https://docs.id8labs.app

---

**Last Updated:** 2026-01-07  
**API Version:** 1.0.0  
**Status:** Phase 1 Active Development
