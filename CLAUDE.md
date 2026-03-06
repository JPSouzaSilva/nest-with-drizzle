# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm start:dev          # Watch mode
pnpm build              # Compile TypeScript
pnpm start:prod         # Run compiled output

# Code quality
pnpm lint               # ESLint with auto-fix (covers src/, test/, drizzle/)

# Database migrations (requires DATABASE_URL env var)
pnpm drizzle-kit generate   # Generate migration from schema changes
pnpm drizzle-kit migrate    # Apply migrations
pnpm drizzle-kit studio     # Open Drizzle Studio
```

## Architecture

Clean Architecture with three layers:

- **`src/domain/`** — Pure TypeScript, no framework dependencies. Contains entities, repository abstract classes, adapter abstract classes, and use-case type definitions (`UseCase<Input, Output>` interface).
- **`src/use-cases/`** — NestJS `@Injectable()` classes that implement domain use-case types. Business logic lives here. Each use case is a class with a single `execute()` method.
- **`src/infra/`** — Everything framework/infrastructure related: NestJS modules, controllers, Drizzle repositories, integrations (bcrypt, JWT, nodemailer, TOTP), guards, decorators, mappers, and config.

### Path Aliases

| Alias | Maps to |
|---|---|
| `@domain/*` | `src/domain/*` |
| `@infra/*` | `src/infra/*` |
| `@use-cases/*` | `src/use-cases/*` |

### Dependency Injection Pattern

- Repository abstract classes (from `src/domain/`) are used directly as DI tokens: `{ provide: CustomerRepository, useClass: DrizzleCustomerRepository }`
- The Drizzle client uses a string token: `DRIZZLE = "DRIZZLE"` injected via `@Inject(DRIZZLE)`
- `DatabaseModule` provides and exports `CustomerRepository` and `TwoFactorCodeRepository`

### Adding a New Feature

1. Define entity/types in `src/domain/`
2. Add repository abstract methods if needed
3. Create use-case type in `src/domain/use-cases/<resource>/<action>.ts`
4. Implement use case in `src/use-cases/<resource>/<action>/index.ts`
5. Implement repository methods in `src/infra/repositories/drizzle/`
6. Create/update controller in `src/infra/controllers/<resource>/`
7. Wire everything in `src/infra/modules/<resource>/`

### Database Schema

Schema defined in `drizzle/schema/` (outside `src/`). Migrations output to `drizzle/migrations/`. Both schema and ORM use `casing: "snake_case"`, so camelCase TypeScript fields map to snake_case DB columns automatically.

When converting Drizzle rows to domain entities, use mappers in `src/infra/mappers/` to handle type mismatches (e.g., Drizzle returns literal string types like `"NORMAL"|"PREMIUM"` instead of `CustomerRole` enum).

### Auth Flow

- `@Auth(...roles)` decorator applies `JwtGuard` + `RolesGuard` — any module using it must import `TokenModule`
- `@CurrentUser()` extracts `JwtPayload` (`{ sub: string, role: CustomerRole }`) from the request
- NORMAL customers use email-based 2FA; PREMIUM customers use TOTP via authenticator app

### Swagger

API docs available at `/docs`. Swagger decorators live in `src/infra/config/swagger/<resource>/` as standalone decorator functions applied to controller methods.

## Environment Variables

```
DATABASE_URL
PORT
NODE_ENV              # LOCAL | DEVELOPMENT | PRODUCTION
OTEL_SERVICE_NAME
OTEL_EXPORTER_OTLP_ENDPOINT
JWT_SECRET
JWT_EXPIRES_IN
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
SMTP_FROM
```

OpenTelemetry tracing is initialized before NestJS bootstrap via `src/infra/config/tracing/index.ts` (imported as the first line of `main.ts`).
