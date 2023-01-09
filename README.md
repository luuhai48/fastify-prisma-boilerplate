# Fastify - Prisma Boilerplate

## How to install

```bash
yarn
```

## How to run in local

```bash
# Create .env file
cp .env.example .env

# Start postgresql
docker-compose up -d

# Run db migrations
yarn migrate

# Start API server
yarn dev
```
