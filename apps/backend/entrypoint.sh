#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."

until node -e "
const url = new URL(process.env.DATABASE_URL);
const net = require('net');
const s = new net.Socket();
s.setTimeout(2000);
s.connect(parseInt(url.port), url.hostname, () => { s.destroy(); process.exit(0); });
s.on('error', () => process.exit(1));
s.on('timeout', () => { s.destroy(); process.exit(1); });
" 2>/dev/null; do
  echo "  MySQL not ready, retrying in 2s..."
  sleep 2
done

echo "✅ MySQL is ready"

echo "📦 Running migrations..."
pnpm exec prisma migrate deploy

echo "🌱 Seeding database..."
pnpm exec prisma db seed || echo "⚠️  Seed already applied or skipped"

echo "🚀 Starting server..."
exec node dist/index.js
