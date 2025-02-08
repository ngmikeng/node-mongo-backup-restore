FROM node:18-alpine

WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml ./
RUN npm install --only=production

COPY ../../dist ./dist

CMD ["node", "dist/apps/backup/index.js"]
