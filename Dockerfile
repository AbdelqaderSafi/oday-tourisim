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
RUN npm run build
RUN ls /app/dist/main.js || (echo "ERROR: dist/main.js was not created by build!" && exit 1)

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/main
