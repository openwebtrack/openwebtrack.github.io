---
title: Revenue Tracking
description: Track payments and revenue analytics
---

# Revenue Tracking

Track payments and revenue to analyze your business metrics alongside visitor analytics.

## Basic Usage

```javascript
window.owt.trackPayment(99.99);
```

## Full Payment Details

```javascript
window.owt.trackPayment(149.99, 'EUR', 'txn_1234567890');
```

## API Reference

```javascript
window.owt.trackPayment(amount, currency, transactionId, callback);
```

<br />

| Parameter       | Type       | Required | Description                                 |
| --------------- | ---------- | -------- | ------------------------------------------- |
| `amount`        | `number`   | Yes      | Payment amount (will be rounded to integer) |
| `currency`      | `string`   | No       | Currency code (default: 'USD')              |
| `transactionId` | `string`   | No       | Unique transaction identifier               |
| `callback`      | `function` | No       | Called with HTTP status code when complete  |

## Revenue Analytics

Revenue data appears in your dashboard with breakdowns by:

- **Location**: Country, Region, City
- **Page**: Which pages generate revenue
- **Device**: Desktop, Mobile, Tablet
- **Browser**: Chrome, Firefox, Safari, etc.
- **OS**: Windows, macOS, Linux, iOS, Android
- **Referrer**: Which sources drive revenue
