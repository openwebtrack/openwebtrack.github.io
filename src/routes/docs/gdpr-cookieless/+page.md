---
title: GDPR & Cookieless Tracking
description: Learn about the differences between default and cookieless tracking with OpenWebTrack
---

OpenWebTrack offers two ways to track your website visitors. Choose the one that best fits your privacy and data needs.

### Default tracking (`https://analytics.example.com/script.js`)

- **Cookies**: Uses cookies to track returning visitors.
- **Consent UI**: **You need a cookie banner.** Since it stores data on the visitor's device, laws like GDPR usually require a banner.
- **Accuracy**: Best accuracy. It can follow a user over multiple days and different sessions.

### Cookieless tracking (`https://analytics.example.com/script.cookieless.js`)

- **Cookies**: Does not use any cookies.
- **Consent UI**: **Usually no banner needed.** Designed to work without asking for consent, keeping your site clean.
- **Accuracy**: Lower accuracy. It's great for counting visits, but harder to track the same person returning days later.
