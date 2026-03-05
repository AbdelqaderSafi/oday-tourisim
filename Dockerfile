FROM node:22-slim

WORKDIR /app

# Install dependencies for native modules (argon2, bcrypt)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install ALL dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm ci --include=dev

# Copy source and build
COPY . .

# 1. Generate Prisma client
RUN npx prisma generate

# 2. Ensure source package.json files exist for tsc ESM detection
RUN echo '{"type":"module"}' > generated/prisma/package.json \
    && echo '{"type":"module"}' > generated/prisma/internal/package.json \
    && echo "=== SOURCE package.json ===" && cat generated/prisma/package.json

# 3. Build NestJS (tsc will see type:module and output ESM for generated files)
RUN npx nest build

# 4. Debug: show what tsc produced
RUN echo "=== DIST client.js first 5 lines ===" && head -5 dist/generated/prisma/client.js

# 5. Ensure runtime package.json for Node ESM resolution
RUN mkdir -p dist/generated/prisma/internal \
    && echo '{"type":"module"}' > dist/generated/prisma/package.json \
    && echo '{"type":"module"}' > dist/generated/prisma/internal/package.json

EXPOSE 3000

CMD npx prisma migrate deploy && npx tsx prisma/seed.ts && node dist/src/main
