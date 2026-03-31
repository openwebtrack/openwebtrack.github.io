---
title: Event Tracking
description: Track custom events and user interactions
---

# Event Tracking

Track custom events to understand user behavior and measure conversions.

## Basic Usage

```javascript
window.owt.trackEvent('button_click');
```

## Event with Data

```javascript
window.owt.trackEvent('signup', {
	plan: 'pro',
	source: 'header',
	method: 'google'
});
```

## API Reference

```javascript
window.owt.trackEvent(name, data, callback);
```

<br />

| Parameter  | Type       | Required | Description                                                 |
| ---------- | ---------- | -------- | ----------------------------------------------------------- |
| `name`     | `string`   | Yes      | Event name (max 32 chars, alphanumeric + underscore/hyphen) |
| `data`     | `object`   | No       | Event properties (max 10 properties)                        |
| `callback` | `function` | No       | Called with HTTP status code when complete                  |

## Declarative Goal Tracking

Track goals without JavaScript using data attributes:

```html
<button data-owt-goal="signup" data-owt-goal-plan="pro" data-owt-goal-source="homepage">Sign Up Now</button>
```

Any click on an element with `data-owt-goal` triggers tracking. Additional `data-owt-goal-*` attributes become properties.

## Common Event Examples

```javascript
// E-commerce
window.owt.trackEvent('add_to_cart', { product_id: '123', price: 49.99 });
window.owt.trackEvent('checkout_started', { items: 3 });
window.owt.trackEvent('checkout_completed', { total: 149.97 });

// Engagement
window.owt.trackEvent('video_play', { video_id: 'abc', duration: 120 });
window.owt.trackEvent('scroll_depth', { percent: 75 });
window.owt.trackEvent('file_download', { file: 'brochure.pdf' });

// User actions
window.owt.trackEvent('signup', { method: 'email' });
window.owt.trackEvent('login', { method: 'google' });
window.owt.trackEvent('search', { query: 'analytics' });
```
