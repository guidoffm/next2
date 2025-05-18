FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

FROM base AS builder
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs || true 
RUN adduser --system --uid 1001 nextjs || true   

COPY --chown=nextjs:nodejs package*.json ./
RUN npm ci
COPY --chown=nextjs:nodejs . .
RUN npx next build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs || true 
RUN adduser --system --uid 1001 nextjs || true   

COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./ 
RUN npm ci --omit=dev

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static 
COPY --from=builder --chown=nextjs:nodejs /app/public ./public          

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
