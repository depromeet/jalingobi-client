# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS base

# dependency 설치
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY --link package.json pnpm-lock.yaml ./
ENV HUSKY 0
RUN yarn global add pnpm && pnpm i --frozen-lockfile --prod

# 프로젝트를 빌드하는 컨테이너입니다.
FROM base AS builder

WORKDIR /usr/src/app
COPY --from=deps --link /usr/src/app/node_modules ./node_modules
COPY --link next.config.js ./
COPY --link tsconfig.json ./
COPY --link package.json pnpm-lock.yaml ./
COPY --link public ./public
COPY --link src ./src

RUN yarn global add pnpm && pnpm run build

# 프로덕션에서 실행되는 이미지입니다. 빌드된 결과물과 public asset을 가지고 와서 next를 실행합니다.
FROM base AS runner

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs

COPY --from=builder --link /usr/src/app/public ./public
COPY --from=builder --link --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --link --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
