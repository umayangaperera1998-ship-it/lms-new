# Getting Started with LMS Platform

This guide will walk you through setting up the LMS Platform development environment step by step.

## Prerequisites Check

Before starting, verify you have the required tools:

```bash
# Check Node.js version (should be >= 20.0.0)
node --version

# Check pnpm (install if not present)
pnpm --version || npm install -g pnpm

# Check Docker (optional but recommended)
docker --version
docker-compose --version
```

## Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd lms

# Install all dependencies (this may take a few minutes)
pnpm install
```

Expected output: All packages installed successfully without errors.

### Step 2: Start Database Services

```bash
# Start PostgreSQL and Redis using Docker
pnpm docker:dev

# Wait 10-15 seconds for services to initialize
# You can verify services are running:
docker ps
```

You should see 3 containers running:
- `lms-postgres`
- `lms-redis`
- `lms-adminer`

### Step 3: Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file (use nano, vim, or your preferred editor)
nano .env
```

**Minimal Required Configuration:**

```env
DATABASE_URL="postgresql://lms_user:lms_password@localhost:5432/lms_db"
JWT_SECRET="generate-a-secure-random-string-here"
JWT_REFRESH_SECRET="generate-another-secure-random-string-here"
REDIS_URL="redis://localhost:6379"
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
```

**Tip**: Generate secure JWT secrets:
```bash
# On Linux/Mac
openssl rand -base64 64
```

### Step 4: Setup Database

```bash
# Generate Prisma Client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# You'll be prompted to name the migration, e.g., "init"
```

Expected output: Migration successful, database schema created.

### Step 5: (Optional) Seed Database

```bash
# Populate database with sample data
pnpm db:seed
```

This will create:
- Sample institute
- Admin user
- Sample students and teachers
- Sample classes

### Step 6: Start Development Servers

```bash
# Start both frontend and backend
pnpm dev
```

This will start:
- **Backend API**: http://localhost:4000
- **Frontend Web**: http://localhost:3000

Wait for both servers to fully start (you'll see "ready" messages).

### Step 7: Verify Installation

Open your browser and visit:

1. **Frontend**: http://localhost:3000
   - You should see the LMS Platform homepage

2. **API Docs**: http://localhost:4000/api/docs
   - You should see Swagger documentation

3. **Database UI**: http://localhost:8080
   - System: PostgreSQL
   - Server: postgres
   - Username: lms_user
   - Password: lms_password
   - Database: lms_db

## Default Credentials (if you ran seed)

```
Email: admin@example.com
Password: Admin@123
```

## Common Issues and Solutions

### Issue: Port already in use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Or use different ports
PORT=3001 pnpm web:dev
PORT=4001 pnpm api:dev
```

### Issue: Database connection failed

**Error**: `Can't reach database server`

**Solution**:
```bash
# Ensure Docker services are running
docker ps

# Restart Docker services
pnpm docker:down
pnpm docker:dev

# Wait 15 seconds and try again
```

### Issue: Prisma Client not generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
cd apps/api
pnpm db:generate
cd ../..
pnpm dev
```

### Issue: Missing dependencies

**Error**: Various module not found errors

**Solution**:
```bash
# Clean install
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Development Workflow

### Working on Frontend

```bash
# Start only frontend (faster)
pnpm web:dev

# The frontend will run on http://localhost:3000
```

### Working on Backend

```bash
# Start only backend
pnpm api:dev

# API will run on http://localhost:4000
# Docs available at http://localhost:4000/api/docs
```

### Database Changes

```bash
# After modifying schema.prisma
pnpm db:generate
pnpm db:migrate

# Open Prisma Studio to view data
pnpm db:studio
```

### Adding New Dependencies

```bash
# Add to specific package
pnpm --filter web add package-name
pnpm --filter api add package-name

# Add to root
pnpm add -w package-name
```

## Next Steps

1. **Explore the codebase**:
   - `apps/api/src/modules/` - Backend modules
   - `apps/web/app/` - Frontend pages
   - `apps/api/src/prisma/schema.prisma` - Database schema

2. **Read the documentation**:
   - [README.md](./README.md) - Complete documentation
   - [Architecture](./docs/ARCHITECTURE.md) - System architecture
   - [API Docs](http://localhost:4000/api/docs) - API reference

3. **Start building**:
   - Create a new module in backend
   - Add a new page in frontend
   - Modify the database schema

## Useful Commands

```bash
# Development
pnpm dev                    # Start both frontend and backend
pnpm web:dev                # Start frontend only
pnpm api:dev                # Start backend only

# Database
pnpm db:generate            # Generate Prisma Client
pnpm db:migrate             # Run migrations
pnpm db:push                # Push schema changes (dev only)
pnpm db:studio              # Open Prisma Studio
pnpm db:seed                # Seed database

# Docker
pnpm docker:dev             # Start dev services
pnpm docker:down            # Stop services
pnpm docker:logs            # View logs

# Building
pnpm build                  # Build all apps
pnpm lint                   # Lint all apps
pnpm type-check             # Type check all apps

# Cleaning
pnpm clean                  # Clean all build artifacts
```

## Tips for Success

1. **Always start Docker services first** before running migrations
2. **Run `pnpm db:generate`** after modifying Prisma schema
3. **Use Prisma Studio** (`pnpm db:studio`) to inspect database
4. **Check API docs** at http://localhost:4000/api/docs for endpoint details
5. **Use TypeScript** - the project is fully typed
6. **Follow the folder structure** - keep code organized

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting section](./README.md#-troubleshooting) in README
2. Check Docker service status: `docker ps`
3. Check logs: `pnpm docker:logs`
4. Verify environment variables in `.env`

## You're Ready!

You now have a fully functional LMS Platform development environment. Start exploring and building! 🚀

---

**Happy Coding!**
