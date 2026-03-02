# ── Stage 1: Base ─────────────────────────────────────
FROM node:18-alpine AS base
RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ── Stage 2: Dependencies ────────────────────────────
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build ───────────────────────────────────
FROM deps AS build
COPY packages/shared ./packages/shared
COPY apps/backend ./apps/backend
RUN pnpm --filter @cdm/shared run build
RUN pnpm --filter @cdm/backend exec prisma generate
RUN pnpm --filter @cdm/backend run build

# ── Stage 4: Runtime ─────────────────────────────────
FROM base AS runtime
COPY --from=build /app ./
RUN chmod +x ./apps/backend/entrypoint.sh

WORKDIR /app/apps/backend
ENV NODE_ENV=production
EXPOSE 4000
ENTRYPOINT ["./entrypoint.sh"]
