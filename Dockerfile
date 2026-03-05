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
RUN npx prisma generate && npx nest build

# Write package.json for ESM support in generated prisma
RUN node -e "const fs=require('fs');fs.mkdirSync('dist/generated/prisma/internal',{recursive:true});fs.writeFileSync('dist/generated/prisma/package.json','{\"type\":\"module\"}');fs.writeFileSync('dist/generated/prisma/internal/package.json','{\"type\":\"module\"}');"

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/src/main
