FROM node:18-alpine AS base

# dependency 설치
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
ENV HUSKY 0
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 프로젝트를 빌드하는 컨테이너입니다.
FROM base AS builder

WORKDIR /usr/src/app

COPY next.config.js ./
COPY tsconfig.json ./
COPY package.json pnpm-lock.yaml ./
COPY .env.production ./
COPY --from=deps --link /usr/src/app/node_modules ./node_modules
COPY public ./public
COPY src ./src


ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


# 프로덕션에서 실행되는 이미지입니다. 빌드된 결과물과 public asset을 가지고 와서 next를 실행합니다.
FROM base AS runner

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs

COPY --from=builder --link /usr/src/app/public ./public
COPY --from=builder --link --chown=nextjs:nodejs /usr/src/app/.env.production ./.env.production
COPY --from=builder --link --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --link --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
