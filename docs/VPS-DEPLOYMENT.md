# Bible Journey - VPS Deployment Guide

## Server Configuration

- **VPS IP**: 168.231.84.168
- **Application Port**: 3010
- **Supabase API Port**: 8000
- **Supabase Studio Port**: 3001
- **PostgreSQL Port**: 5432

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                         VPS Server                            │
│  ┌─────────────┐   ┌─────────────────────────────────────┐   │
│  │ Bible       │   │         Supabase Stack              │   │
│  │ Journey App │   │  ┌───────┐  ┌──────┐  ┌────────┐   │   │
│  │   :3010     │◄──┼──┤ Kong  │◄─┤ Auth │  │  REST  │   │   │
│  └─────────────┘   │  │ :8000 │  │ :9999│  │  :3000 │   │   │
│                    │  └───┬───┘  └──────┘  └────────┘   │   │
│                    │      │       ┌────────────────┐     │   │
│                    │      │       │  PostgreSQL    │     │   │
│                    │      └──────►│    :5432       │     │   │
│                    │              └────────────────┘     │   │
│                    └─────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Prerequisites

```bash
# Connect to VPS
ssh user@168.231.84.168

# Navigate to project
cd /path/to/bible-journey

# Pull latest code
git pull origin claude/analyze-vps-setup-302Ya
```

### 2. Environment Setup

The `.env.supabase` file contains all required environment variables:
- `POSTGRES_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing key
- `ANON_KEY` - Public API key for anonymous access
- `SERVICE_ROLE_KEY` - Admin API key (keep secret)
- `API_EXTERNAL_URL` - External Supabase API URL
- `SITE_URL` - Frontend application URL

### 3. Deploy Services

```bash
# Load environment variables
export $(cat .env.supabase | grep -v '^#' | xargs)

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs if needed
docker-compose logs -f
```

### 4. Verify Deployment

- **App**: http://168.231.84.168:3010
- **Supabase API**: http://168.231.84.168:8000
- **Supabase Studio**: http://168.231.84.168:3001

## HTTPS-Only Mode Issue (Firefox)

### Problem
Firefox's HTTPS-Only Mode automatically upgrades all HTTP requests to HTTPS. Since Supabase is configured for HTTP, connections fail with errors like:
```
HTTPS-Only Mode: Upgrading insecure request 'http://168.231.84.168:8000' to use 'https'
```

### Solution Options

#### Option 1: Disable HTTPS-Only Mode for This Site (Quickest)

1. In Firefox, click the lock icon in the address bar
2. Click "Turn off HTTPS-Only Mode for this site"
3. Reload the page

Or via Firefox settings:
1. Go to `about:preferences#privacy`
2. Scroll to "HTTPS-Only Mode"
3. Click "Manage Exceptions"
4. Add `http://168.231.84.168`

#### Option 2: Use a Reverse Proxy with SSL (Recommended for Production)

Add Nginx with Let's Encrypt SSL (requires a domain name):

```bash
# Install Nginx and Certbot
apt update && apt install -y nginx certbot python3-certbot-nginx

# Configure Nginx (replace YOUR_DOMAIN)
cat > /etc/nginx/sites-available/bible-journey <<EOF
server {
    listen 80;
    server_name YOUR_DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/bible-journey /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Get SSL certificate
certbot --nginx -d YOUR_DOMAIN
```

## Troubleshooting

### Docker Container Issues

```bash
# Stop all Bible Journey containers
docker-compose down --remove-orphans

# Remove corrupted containers (if any)
docker rm -f $(docker ps -aq --filter "name=bible-journey" --filter "name=supabase") 2>/dev/null

# Clean up
docker container prune -f
docker volume prune -f  # WARNING: This removes unused volumes

# Restart
docker-compose up -d
```

### Database Not Initializing

```bash
# Check if init scripts ran
docker-compose logs db | grep -E "(roles|schema|import)"

# Re-run initialization
docker-compose down -v  # WARNING: This deletes database data
docker-compose up -d
```

### Auth Service Restarting

```bash
# Check auth logs
docker-compose logs auth

# Common issues:
# - Database not ready: Wait for db health check
# - Wrong password: Check POSTGRES_PASSWORD matches in all configs
# - Missing roles: Ensure 00-roles.sql ran first
```

### Connection Refused

```bash
# Check if services are running
docker-compose ps

# Check Kong gateway
docker-compose logs kong

# Test API directly
curl http://localhost:8000/auth/v1/health
```

## Service Ports Reference

| Service | Internal Port | External Port | Description |
|---------|--------------|---------------|-------------|
| app     | 80           | 3010          | Bible Journey frontend |
| kong    | 8000         | 8000          | API Gateway |
| kong    | 8443         | 8444          | API Gateway (HTTPS) |
| db      | 5432         | 5432          | PostgreSQL |
| auth    | 9999         | -             | GoTrue Auth |
| rest    | 3000         | -             | PostgREST API |
| realtime| 4000         | -             | Realtime subscriptions |
| studio  | 3000         | 3001          | Supabase Dashboard |
| meta    | 8080         | -             | Postgres Meta |

## Data Import

CSV files are automatically imported during database initialization via `supabase/init/03-import-csv.sh`.

To manually import:
```bash
docker-compose exec db psql -U postgres -c "\COPY public.profiles(...) FROM '/csv-data/profiles.csv' ..."
```

## JWT Keys

The JWT keys in `.env.supabase` were generated with:
- **ANON_KEY**: Role `anon`, for unauthenticated API access
- **SERVICE_ROLE_KEY**: Role `service_role`, for admin operations (keep secret!)

Both keys expire in 2035 (10 years from generation).
