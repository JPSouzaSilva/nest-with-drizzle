# Arquitetura do Projeto White Label

## Visão Geral

Este projeto é uma API REST construída com **NestJS** seguindo os princípios de **Clean Architecture**, com separação clara entre domínio e infraestrutura. O padrão de design principal é o **Repository Pattern** combinado com **Use Cases** para encapsular a lógica de negócio.

## Stack Tecnológica

| Categoria         | Tecnologia                                    |
|-------------------|-----------------------------------------------|
| Framework         | NestJS 11                                     |
| Linguagem         | TypeScript 5                                  |
| ORM               | Drizzle ORM                                   |
| Banco de Dados    | PostgreSQL                                    |
| Validação         | class-validator + class-transformer           |
| Documentação API  | @nestjs/swagger + @scalar/nestjs-api-reference|
| Observabilidade   | OpenTelemetry (OTLP via gRPC)                 |
| Linting           | ESLint + Prettier                             |
| Git Hooks         | Husky                                         |

## Estrutura de Diretórios

```
src/
├── domain/                  # Camada de Domínio (regras de negócio puras)
│   ├── adapters/            # Contratos abstratos para serviços externos
│   │   └── exceptions.ts    # Interface abstrata para tratamento de exceções
│   ├── constants/           # Tipos e constantes de domínio
│   │   └── pagination.ts    # PaginationParams e PaginatedResponse
│   ├── entities/            # Entidades de domínio
│   │   └── customer.ts      # Entidade Customer
│   ├── repositories/        # Contratos abstratos de repositório
│   │   └── customer.ts      # Abstract class CustomerRepository
│   └── use-cases/           # Tipos e interfaces dos use cases
│       ├── index.ts         # Interface UseCase<Input, Output>
│       └── customer/        # Tipos de input/output por use case
│
├── use-cases/               # Implementações dos Use Cases
│   └── customer/
│       ├── create/
│       ├── delete/
│       ├── find-all/
│       ├── find-by-id/
│       └── update/
│
└── infra/                   # Camada de Infraestrutura
    ├── config/
    │   ├── env/             # Validação de variáveis de ambiente
    │   ├── main.ts          # Bootstrap da aplicação
    │   ├── swagger/         # Configuração e decorators do Swagger
    │   └── tracing/         # Configuração do OpenTelemetry
    ├── controllers/
    │   └── customer/        # Controller REST + DTOs
    │       └── dtos/        # DTOs de request (create, update)
    ├── integrations/
    │   └── exceptions/      # Implementação concreta do ExceptionsAdapter
    ├── modules/
    │   ├── index.ts         # AppModule (módulo raiz)
    │   ├── customer/        # CustomerModule
    │   ├── database/        # DatabaseModule (Drizzle + repositórios)
    │   │   └── tokens/      # Tokens de injeção (DRIZZLE)
    │   └── exceptions/      # ExceptionsModule
    ├── repositories/
    │   └── drizzle/         # Implementações concretas de repositório
    └── utils/
        └── pagination.ts    # PaginationDto (query params)

drizzle/
├── schema/                  # Schema do banco de dados (Drizzle)
│   ├── customer.ts
│   └── index.ts
└── migrations/              # Migrations geradas pelo drizzle-kit
```

## Camadas da Arquitetura

### 1. Domínio (`src/domain/`)

A camada de domínio é completamente independente de frameworks e bibliotecas externas. Contém:

- **Entidades**: Classes simples que representam os objetos de negócio (ex: `Customer`).
- **Repositórios abstratos**: `abstract class` que define o contrato de persistência sem saber a implementação.
- **Adapters abstratos**: `abstract class` para serviços externos (ex: `ExceptionsAdapter`).
- **Tipos de Use Cases**: Interfaces que definem o contrato `UseCase<Input, Output>` e os tipos de input/output de cada operação.
- **Constantes/Tipos**: Tipos reutilizáveis como `PaginationParams` e `PaginatedResponse<T>`.

### 2. Use Cases (`src/use-cases/`)

Implementações concretas da lógica de negócio. Cada use case:

- É um `@Injectable()` do NestJS.
- Implementa a interface `UseCase<Input, Output>` definida no domínio.
- Recebe dependências injetadas via construtor (repositório, adapter de exceções).
- Nunca conhece detalhes de HTTP, banco de dados ou frameworks.

**Exemplo de fluxo (`CreateCustomerUseCase`):**
1. Verifica se já existe cliente com o mesmo email via repositório.
2. Se existir, lança exceção via `ExceptionsAdapter`.
3. Cria o cliente com UUID gerado pelo `node:crypto`.

### 3. Infraestrutura (`src/infra/`)

Implementa os contratos do domínio e conecta tudo ao framework NestJS:

- **Controllers**: Recebem requisições HTTP, validam DTOs e delegam aos use cases.
- **DTOs**: Usam `class-validator` e `class-transformer` para validação e transformação.
- **Repositories (Drizzle)**: Implementam `CustomerRepository` usando Drizzle ORM + PostgreSQL.
- **Integrations**: `ExceptionsIntegration` implementa `ExceptionsAdapter` mapeando para exceções HTTP do NestJS.
- **Modules**: Organizam provedores e dependências via sistema de módulos do NestJS.
- **Config**: Bootstrap, validação de env vars, Swagger e tracing.

## Padrões de Injeção de Dependência

O projeto usa o sistema de DI do NestJS com dois padrões:

### 1. Abstract Class como Token
```typescript
// Domínio define o contrato
export abstract class CustomerRepository { ... }

// Módulo faz o binding
{ provide: CustomerRepository, useClass: DrizzleCustomerRepository }
```

### 2. Token String/Symbol
```typescript
// Token de injeção (DRIZZLE = 'DRIZZLE')
export const DRIZZLE = "DRIZZLE";

// Módulo provê via factory
{ provide: DRIZZLE, useFactory(): NodePgDatabase { return drizzle(...) } }

// Use via @Inject
constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}
```

## Módulos NestJS

```
AppModule
├── ConfigModule (global, valida env vars)
├── ExceptionsModule
│   └── ExceptionsAdapter -> ExceptionsIntegration
└── CustomerModule
    ├── DatabaseModule
    │   ├── DRIZZLE (NodePgDatabase)
    │   └── CustomerRepository -> DrizzleCustomerRepository
    ├── ExceptionsModule
    ├── CreateCustomerUseCase
    ├── FindCustomerByIdUseCase
    ├── FindAllCustomersUseCase
    ├── UpdateCustomerUseCase
    ├── DeleteCustomerUseCase
    └── CustomerController
```

## API REST - Endpoints de Customer

| Método | Rota              | Use Case                  | Status de Sucesso |
|--------|-------------------|---------------------------|-------------------|
| POST   | /customers        | CreateCustomerUseCase     | 201 Created       |
| GET    | /customers        | FindAllCustomersUseCase   | 200 OK            |
| GET    | /customers/:id    | FindCustomerByIdUseCase   | 200 OK            |
| PATCH  | /customers/:id    | UpdateCustomerUseCase     | 204 No Content    |
| DELETE | /customers/:id    | DeleteCustomerUseCase     | 204 No Content    |

Listagem usa paginação obrigatória via query params `page` e `limit`.

## Banco de Dados

- **ORM**: Drizzle ORM com driver `node-postgres`.
- **Schema**: Definido em `drizzle/schema/` (separado do `src/`).
- **Migrations**: Gerenciadas pelo `drizzle-kit`.
- **Convenção de nomes**: `casing: "snake_case"` configurado no Drizzle.
- **Tabela `customers`**: `id` (text PK), `name`, `email` (unique), `address`, `state`, `zip_code`, `country`, `date_of_birth`.

## Observabilidade

- **OpenTelemetry** inicializado antes do NestJS (importado no topo do `main.ts`).
- Exporta traces via **OTLP gRPC** para o endpoint configurado em `OTEL_EXPORTER_OTLP_ENDPOINT`.
- Auto-instrumentação de Node.js (HTTP, Express, pg, etc.) exceto `fs`.
- Graceful shutdown via `SIGTERM`.

## Variáveis de Ambiente

Validadas via `class-validator` no bootstrap (falha rápido se inválidas):

| Variável                    | Descrição                        |
|-----------------------------|----------------------------------|
| `DATABASE_URL`              | URL de conexão com PostgreSQL    |
| `PORT`                      | Porta do servidor HTTP           |
| `NODE_ENV`                  | `LOCAL`, `DEVELOPMENT` ou `PRODUCTION` |
| `OTEL_SERVICE_NAME`         | Nome do serviço no tracing       |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Endpoint do coletor OTLP      |

## Documentação da API

Disponível em `/docs` usando **Scalar** (tema dark) integrado com Swagger/OpenAPI.
Decorators de resposta Swagger são encapsulados em arquivos em `src/infra/config/swagger/customer/`.

## Como Adicionar um Novo Recurso

Para adicionar um novo recurso (ex: `Product`) seguindo a arquitetura existente:

1. **Domínio**: Criar entidade em `src/domain/entities/`, repositório abstrato em `src/domain/repositories/`, e tipos de use cases em `src/domain/use-cases/<recurso>/`.
2. **Use Cases**: Implementar cada use case em `src/use-cases/<recurso>/<acao>/index.ts`.
3. **Schema**: Definir tabela em `drizzle/schema/<recurso>.ts` e exportar em `drizzle/schema/index.ts`.
4. **Repositório**: Implementar em `src/infra/repositories/drizzle/<recurso>-repository.ts`.
5. **Controller + DTOs**: Criar em `src/infra/controllers/<recurso>/`.
6. **Swagger**: Criar decorators em `src/infra/config/swagger/<recurso>/`.
7. **Módulo**: Criar `<Recurso>Module` em `src/infra/modules/<recurso>/` e importar no `AppModule`.
