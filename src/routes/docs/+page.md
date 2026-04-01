---
title: Introduction
description: Get started with OpenWebTrack - the open-source web analytics platform
---

# Welcome to OpenWebTrack

OpenWebTrack is a free and open-source website analytics platform that gives you complete control over your data while providing enterprise-grade features.

## Features

### Analytics & Insights

- **Real-time Traffic Monitoring**: Watch your visitors in real-time
- **Detailed Pageviews**: Track URLs, titles, and referrers
- **Session Recording**: Monitor session duration and activity
- **Custom Events**: Track specific user interactions (clicks, signups, etc.)
- **Customer Identification**: Identify and track customers based on payment data
- **Geolocation Data**: See where your users are coming from (Country, Region, City)
- **Device & Tech Specs**: Analyze Browsers, OS, Device Types, and Screen Sizes
- **UTM Tracking**: Measure campaign performance with automatic UTM parameter extraction
- **Traffic Spike Alerts**: Get instant notifications when your website experiences unusual traffic spikes
- **Revenue Tracking**: Track payments and revenue per country, region, city, page, hostname, device, browser, OS, and referrer source
- **Real-Time Map**: Visualize visitors and movements on an interactive globe.

### Notifications & Alerts

- **Weekly Summary**: Receive automated weekly email reports with key analytics metrics
- **Traffic Spike Detection**: Configure thresholds to get notified when visitor counts exceed expectations
- **Multi-Provider Support**: Send notifications via Resend, Maileroo, or custom SMTP servers

### Visitor Intelligence

- **Visitor Profiles**: Track individual visitor journeys
- **Retention Metrics**: "First seen" and "Last seen" tracking
- **Auto-generated Identities**: Friendly names and avatars for anonymous visitors

### Management & Tools

- **Multi-Website Support**: Manage all your projects from a single dashboard
- **Team Collaboration**: Invite team members to view analytics
- **Data Export/Import**: Full ownership of your data with easy export options
- **Filtering**: Deep dive into data with filters (Date, Device, Location, etc.)

## Architecture

OpenWebTrack consists of:

- **App Server**: SvelteKit application handling the dashboard and API
- **Tracking Script**: Lightweight JavaScript snippet for data collection
- **PostgreSQL Database**: Stores all analytics data
- **Optional Cron Service**: Weekly summary emails

## Next Steps

Ready to get started?

- [Installation](/docs/installation) - Set up your instance
- [Events](/docs/tracking/events) - Track custom events
- [Revenue](/docs/tracking/revenue) - Track payments and revenue
- [API] (/docs/api) - Integrate with your applications
