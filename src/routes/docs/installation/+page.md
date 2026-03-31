---
title: Installation
description: Learn how to install and set up OpenWebTrack
---

# Installation

OpenWebTrack can be deployed in multiple ways. Choose the one that best fits your infrastructure.

## Quick Install

Create a `compose.yml` file with the following content:

```yaml
services:
    app:
        image: ghcr.io/openwebtrack/openwebtrack:latest
        container_name: openwebtrack
        restart: unless-stopped
        ports:
            - 8424:8424
        environment:
            - DATABASE_URL=postgres://postgres:STRONG_PASSWORD@db:5432/openwebtrack
            - ORIGIN=http://localhost:8424
            - AUTH_SECRET=STRONG_SECRET
            - DISABLE_REGISTER=false
            # - AUTH_GOOGLE_CLIENT_ID=
            # - AUTH_GOOGLE_CLIENT_SECRET=
            # Optional: Email configuration
            # - CRON_SECRET=STRING
            # - SENDER_EMAIL=openwebtrack@yourdomain.com
            # - RESEND_API_KEY=STRING
            # - MAILEROO_API_KEY=STRING
            # - SMTP_HOST=smtp.example.com
            # - SMTP_PORT=587
            # - SMTP_USER=STRING
            # - SMTP_PASS=STRING
        depends_on:
            - db

    db:
        image: postgres:17-alpine
        container_name: openwebtrack-db
        restart: unless-stopped
        ports:
            - 5432:5432
        environment:
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=STRONG_PASSWORD
            - POSTGRES_DB=openwebtrack
        volumes:
            - postgres_data:/var/lib/postgresql/data

    # Optional: Weekly summary emails
    # cron:
    #     image: alpine:latest
    #     command: >
    #         sh -c "echo '0 9 * * 1 curl -s -H \"Authorization: Bearer CRON_SECRET\" http://app:8424/api/cron/weekly-summary' > /etc/crontabs/root && crond -f -L /dev/stdout"
    #     depends_on:
    #         - app

volumes:
    postgres_data:
```

Then run:

```bash
docker compose up -d
```

## Environment Variables

### Required

| Variable       | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                                            |
| `ORIGIN`       | Your domain (e.g., `https://analytics.example.com`)                     |
| `AUTH_SECRET`  | Secret key for authentication (generate with `openssl rand -base64 32`) |

### Optional

| Variable                    | Description                                |
| --------------------------- | ------------------------------------------ |
| `DISABLE_REGISTER`          | Set to `true` to disable new registrations |
| `AUTH_GOOGLE_CLIENT_ID`     | Enable sign in/up with Google              |
| `AUTH_GOOGLE_CLIENT_SECRET` | Enable sign in/up with Google              |
| `CRON_SECRET`               | Secret for cron job authentication         |
| `SENDER_EMAIL`              | Email address for notifications            |
| `RESEND_API_KEY`            | API key for Resend email service           |
| `MAILEROO_API_KEY`          | API key for Maileroo email service         |
| `SMTP_HOST`                 | SMTP server hostname                       |
| `SMTP_PORT`                 | SMTP server port                           |
| `SMTP_USER`                 | SMTP username                              |
| `SMTP_PASS`                 | SMTP password                              |

## Railway Deployment

Click the button below to deploy on Railway:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/c0cdXL?referralCode=ewDp_s&utm_medium=integration&utm_source=template&utm_campaign=generic)

## Post-Installation

1. **Access the dashboard** at `http://localhost:8424` (or your configured origin)
2. **Create your admin account** on first visit
3. **Add your first website** in the dashboard
4. **Install the tracking script** on your website

### Security Recommendation

After creating your account, set `DISABLE_REGISTER=true` in your `compose.yml` and restart:

```bash
docker compose down
docker compose up -d
```

## Verification

Once installed, you can verify the installation:

1. Visit your OpenWebTrack URL
2. You should see the login/register page
3. Create an account
4. Add a website and get your tracking script

## Troubleshooting

### Port Already in Use

If port 8424 is taken, change the port mapping in `compose.yml`:

```yaml
ports:
    - 3000:8424 # Use port 3000 instead
```

### Database Connection Issues

Ensure the database container is healthy before the app starts:

```bash
docker compose ps
docker compose logs db
```

### Email Not Working

Check your email provider configuration and ensure the cron service is running for weekly summaries.
