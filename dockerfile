FROM node:18-alpine AS base

# dependency 설치
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# 요약하면 process.dlopen라는 library가 없어 많이 문제를 일으켰기 때문에 필요하다고 합니다.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 프로젝트를 빌드하는 컨테이너입니다.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

RUN ls ./

# 프로덕션에서 실행되는 이미지입니다. 빌드된 결과물과 public asset을 가지고 와서 next를 실행합니다.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# builder 컨테이너에서 public asset들을 가져옵니다.
COPY --from=builder /app/public ./public

RUN npm install next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# builder 컨테이너에서 빌드 결과물을 가져옵니다.
# COPY --from=builder --chown=nextjs:nodejs /app/package.json /package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next /app/.next
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npx", "next", "start"]
