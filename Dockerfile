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
RUN npx prisma generate && npx nest build \
    && echo '{"type":"commonjs"}' > dist/generated/prisma/package.json \
    && echo '{"type":"commonjs"}' > dist/generated/prisma/internal/package.json \
    && cat dist/generated/prisma/package.json

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/src/main
