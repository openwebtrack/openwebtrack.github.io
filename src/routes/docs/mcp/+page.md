---
title: MCP Server
description: Connect AI assistants to your OpenWebTrack analytics through the Model Context Protocol
---

# MCP Server

OpenWebTrack ships a built-in [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that lets AI assistants and coding agents query your analytics with natural language. Use it to ask Claude, Codex, or any MCP-compatible client questions like _"How many visitors did we get last week?"_ or _"Which pages had the most traffic this month?"_

## How It Works

- One **account-scoped key** gives read access to every website you own or that is shared with you — no per-website configuration needed.
- The server uses the **Streamable HTTP** transport, so it works with any MCP client that supports remote servers.
- All tools are **read-only** and enforce your existing website access rules.
- Keys are prefixed with `owt_mcp_` and stored only as a SHA-256 hash. The full key is shown **once** at creation, so keep it safe.

## Creating a Key

1. Log in to your OpenWebTrack dashboard.
2. Go to **Account Settings → MCP access**.
3. Click **Generate key**, give it a name (e.g., "My AI assistant"), and copy the returned key.
4. Use that key to configure your MCP client (below).

Keys can be revoked at any time from the same page. If you prefer the API:

```bash
# Create a key
curl -X POST https://your-domain.com/api/account/mcp \
  -H "Cookie: <session>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My AI assistant"}'

# Revoke a key
curl -X DELETE "https://your-domain.com/api/account/mcp?keyId=<keyId>" \
  -H "Cookie: <session>"
```

## Configuring an MCP Client

The server endpoint is:

```
https://your-domain.com/api/mcp
```

Authenticate by sending your key in the `Authorization` header as a Bearer token.

### General (Claude Desktop, Cursor, etc.)

```json
{
	"mcpServers": {
		"openwebtrack": {
			"url": "https://your-domain.com/api/mcp",
			"headers": {
				"Authorization": "Bearer owt_mcp_..."
			}
		}
	}
}
```

### OpenAI Codex

```toml
# ~/.codex/config.toml
[mcp_servers.openwebtrack]
url = "https://your-domain.com/api/mcp"
http_headers = {
  Authorization = "Bearer owt_mcp_..."
}
```

Replace `your-domain.com` with your instance's `ORIGIN` and `owt_mcp_...` with your actual key.

## Available Tools

### list_websites

Lists every website available to your account, including sites you own and sites shared with you.

Returns `id`, `domain`, `timezone`, `currency`, and `access` (`owner` or `shared`).

> Start here — the returned `id` values are the `websiteId` used by the analytics tools below.

### analytics_overview

Headline traffic, engagement, and revenue metrics for one website.

| Parameter   | Type   | Required | Description                        |
| :---------- | :----- | :------- | :--------------------------------- |
| `websiteId` | string | Yes      | Website UUID from `list_websites`  |
| `startDate` | string | No       | ISO 8601 date. Defaults to 24h ago |
| `endDate`   | string | No       | ISO 8601 date. Defaults to now     |

Returns `pageviews`, `sessions`, `uniqueVisitors`, `revenue`, `currency`, and the top 10 pages.

### analytics_breakdown

Breaks down traffic by a single dimension for one website.

| Parameter   | Type   | Required | Description                                                                             |
| :---------- | :----- | :------- | :-------------------------------------------------------------------------------------- |
| `websiteId` | string | Yes      | Website UUID from `list_websites`                                                       |
| `dimension` | string | Yes      | `pages`, `referrers`, `countries`, `browsers`, `devices`, `event_names`, or `campaigns` |
| `startDate` | string | No       | ISO 8601 date. Defaults to 24h ago                                                      |
| `endDate`   | string | No       | ISO 8601 date. Defaults to now                                                          |
| `limit`     | number | No       | 1–100 results. Defaults to 25                                                           |

### analytics_records

Retrieves recent raw records from one website.

| Parameter   | Type   | Required | Description                                                  |
| :---------- | :----- | :------- | :----------------------------------------------------------- |
| `websiteId` | string | Yes      | Website UUID from `list_websites`                            |
| `dataset`   | string | Yes      | `pageviews`, `events`, `sessions`, `payments`, or `visitors` |
| `startDate` | string | No       | ISO 8601 date. Defaults to 24h ago                           |
| `endDate`   | string | No       | ISO 8601 date. Defaults to now                               |
| `limit`     | number | No       | Max 100 results. Defaults to 25                              |

## Example Conversation

> **You:** How many visitors did we have in the last 30 days?
>
> **Assistant:** Let me check. First, let me list your websites... `list_websites` → found `example.com`. Now fetching the overview for the last 30 days... `analytics_overview` → Your site received **12,480 pageviews** from **3,205 unique visitors** over the last 30 days, with **$1,240.50** in tracked revenue.

## Notes

- All tools are read-only and never modify analytics data.
- `list_websites` only returns websites your account owns or has been granted access to.
- Results use each website's configured timezone.
- The server reports itself as `OpenWebTrack` v0.1.6 with the instruction to call `list_websites` first.
