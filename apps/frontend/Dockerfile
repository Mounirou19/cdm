# ── Stage 1: Base ─────────────────────────────────────
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ── Stage 2: Dependencies ────────────────────────────
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build ───────────────────────────────────
FROM deps AS build
COPY packages/shared ./packages/shared
COPY apps/frontend ./apps/frontend
RUN pnpm --filter @cdm/shared run build
ENV NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
ENV NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
RUN pnpm --filter @cdm/frontend run build

# ── Stage 4: Runtime ─────────────────────────────────
FROM node:18-alpine AS runtime
WORKDIR /app

COPY --from=build /app/apps/frontend/.next/standalone ./
COPY --from=build /app/apps/frontend/.next/static ./apps/frontend/.next/static

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "apps/frontend/server.js"]
