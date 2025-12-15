# 🚀 TanStack SaaS Starter

A modern, full-stack SaaS boilerplate built with cutting-edge technologies for rapid development and scalability.

## ✨ Features

- 🎯 **Type-Safe End-to-End** - Full TypeScript coverage from database to UI
- 🔐 **Authentication Ready** - Built-in auth with Better Auth
- 📧 **Email Templates** - Pre-built React Email templates for verification and password reset
- 🎨 **Beautiful UI** - shadcn/ui components with Tailwind CSS 4.0
- 🔥 **Lightning Fast** - Bun runtime for exceptional performance
- 📦 **Monorepo Architecture** - Turborepo for efficient multi-package management
- 🎭 **Type-Safe APIs** - tRPC for end-to-end type safety
- 🗄️ **Database Ready** - PostgreSQL with Drizzle ORM
- 🐳 **Docker Support** - Containerized database setup
- 🎨 **Modern Routing** - TanStack Router with file-based routing
- 🔄 **Smart Data Fetching** - TanStack Query for caching and synchronization
- 📱 **Responsive Design** - Mobile-first UI components
- 🌙 **Dark Mode** - Built-in theme switching
- 🛠️ **Developer Experience** - Hot reload, type safety, and excellent DevTools

## 🏗️ Architecture

This is a monorepo structured with Turborepo containing:

### Apps
- **`apps/web`** - Frontend application (Vite + React + TanStack Router)
- **`apps/server`** - Backend API server (Hono + tRPC)

### Packages
- **`packages/api`** - tRPC API routes and procedures
- **`packages/auth`** - Better Auth configuration
- **`packages/db`** - Database schema, migrations, and client
- **`packages/email`** - React Email templates
- **`packages/ui`** - Shared UI components (shadcn/ui)
- **`packages/config`** - Shared configuration (TypeScript, environment variables)

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing with file-based routes
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form management
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[@iconify/react](https://iconify.design/)** - Unified icon framework

### Backend
- **[Hono](https://hono.dev/)** - Ultrafast web framework
- **[tRPC](https://trpc.io/)** - End-to-end type-safe APIs
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution
- **[Bun](https://bun.sh/)** - Fast all-in-one JavaScript runtime

### Database
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe ORM with migrations
- **[Docker](https://www.docker.com/)** - Containerized database setup

### Email
- **[React Email](https://react.email/)** - Design emails with React
- **[Resend](https://resend.com/)** - Modern email API

### Development Tools
- **[Turborepo](https://turbo.build/)** - High-performance monorepo build system
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety across the stack
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migration tools
- **TanStack DevTools** - Debug tools for Router, Query, and Form

## 📋 Prerequisites

- **[Bun](https://bun.sh/)** >= 1.3.4
- **[Docker](https://www.docker.com/)** (for local database)
- **Node.js** >= 18 (optional, Bun is preferred)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd tanstack
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_PORT=5432
DATABASE_URL=postgresql://your_db_user:your_db_password@localhost:5432/your_db_name

# Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

### 4. Start the database

```bash
bun db:start
```

This will start a PostgreSQL database in Docker.

### 5. Run database migrations

```bash
bun db:push
```

### 6. Start development servers

```bash
# Start all services
bun dev

# Or start specific services:
bun dev:web        # Web app + server
bun dev:email      # Email template preview
```

The app will be available at:
- **Web App**: http://localhost:5173
- **API Server**: http://localhost:3000

## 📝 Available Scripts

### Development
- `bun dev` - Start all development servers
- `bun dev:web` - Start web app and API server
- `bun dev:email` - Start email template preview server

### Database
- `bun db:start` - Start PostgreSQL in Docker (detached)
- `bun db:watch` - Start PostgreSQL with logs
- `bun db:stop` - Stop PostgreSQL container
- `bun db:down` - Stop and remove PostgreSQL container
- `bun db:push` - Push schema changes to database
- `bun db:generate` - Generate migrations from schema
- `bun db:generate:auth` - Generate auth schema
- `bun db:migrate` - Run migrations
- `bun db:studio` - Open Drizzle Studio (database GUI)

### Build & Quality
- `bun build` - Build all packages for production
- `bun lint` - Lint and fix code with Biome
- `bun format` - Format code with Biome

## 📁 Project Structure

```
.
├── apps/
│   ├── server/           # Backend API server
│   │   └── src/
│   │       └── index.ts  # Hono server with tRPC
│   └── web/              # Frontend application
│       └── src/
│           ├── components/  # React components
│           ├── routes/      # TanStack Router routes
│           ├── functions/   # Business logic
│           ├── lib/         # Client configurations
│           └── middleware/  # Route middleware
├── packages/
│   ├── api/              # tRPC API definitions
│   │   └── src/
│   │       └── router/   # API routes
│   ├── auth/             # Better Auth configuration
│   ├── db/               # Database layer
│   │   └── src/
│   │       ├── schema/   # Drizzle schemas
│   │       └── migrations/  # SQL migrations
│   ├── email/            # Email templates
│   │   └── src/
│   │       ├── templates/   # React Email templates
│   │       └── layouts/     # Email layouts
│   ├── ui/               # Shared UI components
│   │   └── src/
│   │       ├── components/  # shadcn/ui components
│   │       └── styles/      # Global styles
│   └── config/           # Shared configuration
│       ├── env/          # Environment validation
│       └── tsconfig/     # TypeScript configs
├── biome.jsonc           # Biome configuration
├── docker-compose.yml    # Docker services
├── turbo.json            # Turborepo pipeline
└── package.json          # Workspace configuration
```

## 🎯 Key Benefits

### 🚄 Blazing Fast Development
- **Bun** provides instant startup and hot reload
- **Vite** offers lightning-fast HMR
- **Turborepo** optimizes build caching

### 🔒 Type Safety Everywhere
- End-to-end type safety from database to UI
- **tRPC** ensures API contracts are always in sync
- **Drizzle ORM** provides type-safe database queries
- **Zod** validates runtime data

### 🎨 Beautiful & Accessible
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS 4.0** for rapid styling
- Dark mode support out of the box
- Mobile-responsive design

### 📦 Scalable Architecture
- Monorepo structure for code sharing
- Modular packages for easy maintenance
- Separation of concerns (API, Auth, DB, UI)

### 🔐 Authentication Ready
- **Better Auth** with session management
- Email verification flows
- Password reset functionality
- Social login ready

### 🧪 Developer Experience
- Comprehensive DevTools for debugging
- Hot reload across all packages
- Type-safe environment variables
- Database GUI with Drizzle Studio

## 🔧 Customization

### Adding New Routes
Routes are file-based in `apps/web/src/routes/`. Create a new file:

```tsx
// apps/web/src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>About page</div>
}
```

### Adding API Endpoints
Add new procedures in `packages/api/src/router/`:

```typescript
export const myRouter = router({
  getItems: publicProcedure.query(async () => {
    // Your logic here
    return { items: [] }
  }),
})
```

### Adding Database Tables
Define schemas in `packages/db/src/schema/` and run:

```bash
bun db:generate  # Generate migration
bun db:push      # Apply to database
```

### Adding UI Components
Use shadcn CLI to add components:

```bash
bunx shadcn@latest add <component-name>
```

## 📚 Learn More

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Hono Documentation](https://hono.dev/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using the best tools in the JavaScript ecosystem.
