---
title: Stats API
description: Get general data about your website
---

## Authentication

You can create and manage API keys in your website settings under the **API Keys** tab.
![alt text](/images/api-keys.png)
Pass the API key in the `Authorization` header as a Bearer token:

```bash
Authorization: Bearer owt_your_api_key_here
```

---

Retrieve a summary of website traffic and performance for a specific date range.

**Endpoint:** `GET /api/v1/{websiteId}/stats`

### Query Parameters

| Parameter     | Type     | Required | Description                                                     |
| :------------ | :------- | :------- | :-------------------------------------------------------------- |
| `startDate`   | `string` | No       | ISO 8601 date string (e.g., `2024-01-01`). Defaults to 24h ago. |
| `endDate`     | `string` | No       | ISO 8601 date string (e.g., `2024-01-31`). Defaults to now.     |
| `granularity` | `string` | No       | `hourly`, `daily`, `weekly`, or `monthly`. Defaults to `daily`. |

### Example Request

```bash
curl "https://your-domain.com/api/v1/550e8400-e29b-41d4-a716-446655440000/stats?granularity=daily" \
  -H "Authorization: Bearer owt_..."
```

### Example Response

```json
{
	"summary": {
		"pageviews": 1250,
		"sessions": 450,
		"visitors": 380,
		"bounceRate": 42,
		"dateRange": {
			"start": "2024-01-01T00:00:00.000Z",
			"end": "2024-01-31T23:59:59.999Z"
		}
	},
	"timeSeries": [
		{ "date": "2024-01-01", "pageviews": 45 },
		{ "date": "2024-01-02", "pageviews": 52 }
	],
	"topPages": [
		{ "pathname": "/", "views": 500 },
		{ "pathname": "/blog", "views": 250 }
	],
	"topReferrers": [
		{ "referrer": "google.com", "sessions": 120 },
		{ "referrer": "twitter.com", "sessions": 85 }
	]
}
```

---

## Error Responses

| Status Code | Description                                                   |
| :---------- | :------------------------------------------------------------ |
| `400`       | Invalid request parameters or website ID format.              |
| `401`       | Unauthorized - API key is missing or invalid.                 |
| `404`       | Website not found or API key does not belong to this website. |

## Notes

- All timestamps in the response are returned in the website's configured timezone.
- `bounceRate` is the percentage of sessions that only recorded a single pageview.
- `topPages` and `topReferrers` are limited to the top 10 results.
