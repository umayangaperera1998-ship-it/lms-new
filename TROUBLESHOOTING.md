# Troubleshooting Guide

## Issue: Login page shows 404

### Solution 1: Restart the dev server

```bash
# Stop the dev servers (Ctrl+C)

# Restart
pnpm dev
```

### Solution 2: Clear Next.js cache

```bash
# Stop the dev server

# Clear Next.js cache
cd apps/web
rm -rf .next

# Restart
cd ../..
pnpm dev
```

### Solution 3: Verify file structure

```bash
# Check if login page exists
ls -la apps/web/app/\(auth\)/login/

# Should show: page.tsx
```

## Issue: TypeScript errors in backend

All TypeScript errors have been fixed! If you see any errors:

```bash
# Restart the API server
pnpm api:dev
```

## Issue: Database connection error

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If not running, start Docker services
pnpm docker:dev

# Wait 15 seconds for services to start
```

## Issue: Cannot login - "Invalid credentials"

### Check 1: Database is seeded

```bash
# Run seed script
pnpm db:seed
```

### Check 2: Use correct credentials

Visit: http://localhost:3000/auth/login

Test credentials (these are shown on the login page):
- **Student**: student@futureacademy.lk / Admin@123
- **Teacher**: teacher@futureacademy.lk / Admin@123  
- **Admin**: institute@futureacademy.lk / Admin@123

### Check 3: Backend is running

```bash
# Check backend is accessible
curl http://localhost:4000

# Should return: {"statusCode":404,"message":"Cannot GET /"}
```

## Issue: Port already in use

```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9

# Or use different ports
PORT=3001 pnpm web:dev
PORT=4001 pnpm api:dev
```

## Issue: Module not found errors

```bash
# Clean install
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm db:generate
```

## Issue: Prisma Client errors

```bash
# Regenerate Prisma Client
pnpm db:generate

# If still errors, reset database
pnpm db:push --force-reset
pnpm db:seed
```

## Issue: CORS errors

Make sure:
1. Frontend is running on http://localhost:3000
2. Backend is running on http://localhost:4000
3. Check `.env` file has correct URLs

## Issue: Cookie not being set

Check browser console for errors. Make sure:
1. You're using http://localhost (not 127.0.0.1)
2. Browser allows cookies
3. No ad blockers blocking cookies

## Complete Reset (Nuclear Option)

If nothing works, do a complete reset:

```bash
# 1. Stop all services
pnpm docker:down
# Press Ctrl+C to stop dev servers

# 2. Clean everything
pnpm clean
rm -rf node_modules pnpm-lock.yaml
rm -rf apps/web/.next
rm -rf apps/api/dist

# 3. Reinstall
pnpm install

# 4. Start Docker
pnpm docker:dev

# Wait 15 seconds

# 5. Setup database
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# 6. Start development
pnpm dev
```

## Verification Checklist

Run these commands to verify everything is working:

```bash
# 1. Check Docker services
docker ps
# Should show: lms-postgres, lms-redis, lms-adminer

# 2. Check database connection
pnpm db:studio
# Should open Prisma Studio at http://localhost:5555

# 3. Check backend health
curl http://localhost:4000/api/docs
# Should return HTML (Swagger docs)

# 4. Check frontend
curl http://localhost:3000
# Should return HTML

# 5. Test login API
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@futureacademy.lk","password":"Admin@123"}'
# Should return JSON with user and tokens
```

## Still Having Issues?

1. **Check logs**:
   ```bash
   # Backend logs
   cd apps/api && pnpm dev
   
   # Frontend logs  
   cd apps/web && pnpm dev
   
   # Docker logs
   pnpm docker:logs
   ```

2. **Check environment variables**:
   ```bash
   cat .env
   # Verify all variables are set correctly
   ```

3. **Check database**:
   - Visit http://localhost:8080
   - Login to Adminer
   - Check if tables exist
   - Check if seed data exists

## Common Environment Issues

### Wrong Node version

```bash
node --version
# Should be >= 20.0.0

# If wrong version, install nvm and switch
nvm install 20
nvm use 20
```

### Wrong pnpm version

```bash
pnpm --version
# Should be >= 9.0.0

# Update pnpm
npm install -g pnpm@latest
```

### Docker not running

```bash
# Check Docker is running
docker --version
docker ps

# If Docker not installed, install Docker Desktop
# macOS/Windows: https://www.docker.com/products/docker-desktop
# Linux: https://docs.docker.com/engine/install/
```

## Success Indicators

When everything is working, you should see:

1. **Terminal output**:
   ```
   api:dev: [Nest] 12345  - 05/24/2026, 8:00:00 AM   LOG [NestApplication] Nest application successfully started
   web:dev: ▲ Next.js 15.0.0
   web:dev: - Local:        http://localhost:3000
   ```

2. **Browser**:
   - http://localhost:3000 → Landing page
   - http://localhost:3000/auth/login → Login page
   - http://localhost:4000/api/docs → Swagger UI

3. **Database**:
   - http://localhost:8080 → Adminer
   - Can see all 32 tables
   - Has sample data (4 users, 1 institute, etc.)

4. **Login works**:
   - Enter test credentials
   - Get redirected to dashboard
   - See user info displayed

---

**If this guide doesn't solve your issue, please check:**
- README.md
- GETTING_STARTED.md  
- IMPLEMENTATION_STATUS.md

Or create an issue with:
- Error message
- Steps you tried
- Terminal output
- Browser console errors
