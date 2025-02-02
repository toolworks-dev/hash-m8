FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

ENV NODE_ENV=production
RUN bun run build

EXPOSE 3333

CMD ["bun", "start"] 