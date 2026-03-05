FROM node:22-slim

WORKDIR /app

# Install dependencies for native modules (argon2, bcrypt)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/main
