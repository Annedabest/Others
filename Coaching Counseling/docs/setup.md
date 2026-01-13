# Project Setup Guide

## 1. Prerequisites
- Node.js 20+
- npm 10+
- Docker Desktop (for optional Compose stack)
- PostgreSQL and Redis (local or via Docker)

## 2. Install Dependencies
```powershell
npm install
```

## 3. Environment Variables
1. Copy templates:
   ```powershell
   Copy-Item .env.example .env
   Copy-Item apps/api/.env.example apps/api/.env
   Copy-Item apps/worker/.env.example apps/worker/.env
   ```
2. Adjust credentials/ports if different from defaults.

### Key Variables
- `API_PORT`: NestJS API port (default `2000`).
- `DATABASE_URL`: PostgreSQL connection string.
- `NEXT_PUBLIC_API_URL`: Frontend API base URL.
- `REDIS_HOST` / `REDIS_PORT`: Redis connection for worker queues.
- `DEFAULT_QUEUE`: BullMQ queue name.

## 4. Database Setup (Prisma)
1. Ensure Postgres is running and accessible.
2. Generate Prisma client & run migrations:
   ```powershell
   cd apps/api
   npm run prisma:generate
   npm run prisma:migrate
   ```
   Provide a migration name like `init-schema` when prompted.
3. To inspect data via Prisma Studio:
   ```powershell
   npm run prisma:studio
   ```

## 5. Development Servers
- **API** (`http://localhost:2000`):
  ```powershell
  npm run dev:api
  ```
- **Web** (`http://localhost:5200`):
  ```powershell
  npm run dev:web
  ```
- **Worker** (requires Redis):
  ```powershell
  npm run dev -- --filter=@coaching-platform/worker
  ```

## 6. Docker Compose (Optional)
```powershell
cd infra/docker
docker compose up --build
```
Services: Postgres, Redis, API, Web, Worker. Update `.env` values to match mapped ports before running.

## 7. Linting & Builds
- API lint:
  ```powershell
  npm run lint -- --filter=@coaching-platform/api
  ```
- Web lint:
  ```powershell
  npm run lint -- --filter=@coaching-platform/web
  ```
- Full build (after migrations):
  ```powershell
  npm run build
  ```

## 8. Next Tasks
- Implement authentication module (NestJS + JWT).
- Build Learning Planner CRUD endpoints & React views.
- Implement OneDrive connector integration.
- Add E2E tests (Playwright) once basic flows exist.
