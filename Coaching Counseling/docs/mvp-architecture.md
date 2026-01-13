# MVP Architecture & Repository Plan

## 1. Deployment Topology (Self-Hosted)
- **Container Orchestration**: Docker Compose (initially) running on a self-managed server (Linux recommended).
- **Services**:
  - `web`: Next.js frontend serving the dashboard, planner, knowledge hub, and session builder UI.
  - `api`: Node.js (TypeScript) API server exposing REST/GraphQL endpoints, authentication, RBAC, and connector management.
  - `worker`: Background job runner handling sync connectors, notifications, and AI/offline processing.
  - `db`: PostgreSQL database for relational data, permissions, and audit logs.
  - `cache` (optional in MVP): Redis for job queues and caching.
  - `storage`: Object storage (local/minio or mounted NAS) for files; plan to abstract for later S3/Azure adoption.
  - `desktop-agent` (deferred optional): Electron-based sync client for local Obsidian vaults, built after core web platform stabilizes.
- **Networking**: Reverse proxy (Caddy/Nginx) terminating TLS and routing traffic to `web` & `api` containers.

## 2. Application Layers
- **Presentation Layer** (`apps/web`): Next.js + Chakra UI PWA with offline capture support, role-aware navigation, and knowledge viewer.
- **API Layer** (`apps/api`): Modular Express/Nest-style architecture with controllers, services, repositories, and domain modules (e.g., LearningGoals, Sessions, Connectors).
- **Background Processing** (`apps/worker`): Shared code with API for jobs (BullMQ) executing sync, notifications, and AI tasks.
- **AI Integration**: Anthropic (primary) via optional job module; provide non-AI fallback flows (manual summaries, rule-based tagging) to maintain compliance.

## 3. Data & Integrations
- **Database**: PostgreSQL schema with domain tables, connection via Prisma or TypeORM (decision pending during implementation step).
- **File Sources**: Obsidian (via desktop agent extension), cloud storage connectors (OneDrive, Dropbox) using API credentials stored securely.
- **Messaging**: Redis-backed queues for connector sync jobs and notifications.
- **Observability**: Local first-party logging (winston/pino) with JSON logs; pluggable exporters for future centralized monitoring.

## 4. Repository Structure (Monorepo)
```
coaching-platform/
├── apps/
│   ├── api/            # Backend service (TypeScript)
│   ├── web/            # Frontend Next.js application
│   └── worker/         # Background job runner (shares domain packages)
├── packages/
│   ├── config/         # Shared ESLint, tsconfig, tailwind, etc.
│   ├── domain/         # Shared entities, DTOs, validation schemas
│   └── utils/          # Cross-cutting utilities (logging, config loaders)
├── infra/
│   ├── docker/         # Dockerfiles and compose files
│   └── terraform/      # Future IaC when migrating beyond single server
├── docs/               # Specifications, architecture, and planning docs
├── .github/            # Workflows for CI/CD
└── package.json        # Workspace root config
```

## 5. MVP Component Responsibilities
- **Learning Planner Module**
  - Endpoints: goal CRUD, resource queue management.
  - UI: calendar, resource cards, study tasks.
- **Knowledge Hub Module**
  - Endpoints: resource listing, tags, ingestion pipeline.
  - UI: file viewer, search, filter, detail pane.
  - Sync: OneDrive connector (MVP), Obsidian manual import (desktop agent stub).
- **Session Builder Module**
  - Endpoints: session template CRUD, content assembly, export API.
  - UI: outline composer, drag-and-drop blocks, export options.
- **Auth & RBAC**
  - JWT-based sessions, role-based policies for pastors, mentors, mentees, admins.

## 6. Phased Desktop Agent Strategy
1. **MVP**: Provide manual upload & OneDrive sync; design API endpoints for future agent use.
2. **Phase 2**: Build Electron app consuming the same API, monitoring local Obsidian vault changes, pushing diffs to `api`.
3. **Phase 3**: Add bi-directional conflict resolution, offline-first queueing, and service installer.

## 7. Configuration & Secrets
- `.env` files per service (root-managed with dotenv-compatible loader).
- Secrets (API tokens, Anthropic keys) managed via server-side vault (e.g., Doppler/Infisical) or OS-level secret store until upgraded.
- Provide sample `.env.example` per app.

## 8. Build & Deployment Flow
1. Developers run `npm install` to bootstrap workspaces.
2. `npm run dev` spins up `api`, `web`, and `worker` in watch mode via Turbo or concurrent scripts.
3. `docker compose up` (in `infra/docker/`) for production-like local environment (api, web, postgres, redis).
4. CI pipeline: lint → test → build each app → package Docker images → push to registry.
5. Deployment: Pull latest images on self-hosted server, run `docker compose up -d` with `.env` secrets.

## 9. Risk & Mitigation Notes
- **Self-Hosted Maintenance**: Ensure automated backups (Postgres dump, file storage snapshot) and monitoring scripts.
- **AI Cost Controls**: Gate Anthropic calls behind feature flags; provide manual override for high-cost operations.
- **Connector Compliance**: Secure storage of OAuth tokens; rotate credentials; store minimal data required.
- **Scalability**: Start with single-node Compose, but design so services can migrate to Kubernetes or Docker Swarm if needed.
