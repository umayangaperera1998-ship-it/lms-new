# ✅ Vercel Deployment Checklist

## Critical Fixes Applied

### 1. Prisma Client Generation (FIXED ✅)
**Problem**: Vercel build was failing because Prisma Client wasn't being generated.

**Changes Made**:
- ✅ Moved `prisma` from `devDependencies` to `dependencies` in `apps/api/package.json`
- ✅ Added `postinstall` script: `"postinstall": "prisma generate"`
- ✅ Added `vercel-build` script: `"vercel-build": "prisma generate"`
- ✅ Updated `vercel.json` to use proper serverless configuration

### 2. CORS Configuration (FIXED ✅)
**Problem**: Frontend couldn't access backend API due to CORS policy.

**Changes Made**:
- ✅ Updated `apps/api/src/main.ts` with multiple allowed origins
- ✅ Updated `apps/api/src/vercel.ts` with multiple allowed origins
- ✅ Added support for:
  - `http://localhost:3000` (local dev)
  - `http://localhost:4000` (local API)
  - `https://lms-new-web.vercel.app` (production frontend)
  - Dynamic origin from `FRONTEND_URL` environment variable

## Deployment Steps

### Step 1: Set Environment Variables in Vercel

#### Backend API (lms-new-api)
Go to: https://vercel.com/your-username/lms-new-api/settings/environment-variables

**Required Variables**:
```env
# Database
DATABASE_URL=postgresql://postgres.gyqogsxvewgnjargkuyi:LMS1996@abcd@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.gyqogsxvewgnjargkuyi:LMS1996@abcd@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (CRITICAL FOR CORS)
FRONTEND_URL=https://lms-new-web.vercel.app

# Backend URL
BACKEND_URL=https://lms-new-api.vercel.app

# Environment
NODE_ENV=production
PORT=4000
```

#### Frontend (lms-new-web)
Go to: https://vercel.com/your-username/lms-new-web/settings/environment-variables

**Required Variables**:
```env
NEXT_PUBLIC_API_URL=https://lms-new-api.vercel.app/api/v1
```

### Step 2: Commit and Push Changes

```bash
cd /home/nirmal/Desktop/lms

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "fix: resolve Prisma Client generation and CORS issues for Vercel

- Move prisma to dependencies for Vercel build
- Add postinstall and vercel-build scripts
- Update CORS to allow multiple origins
- Fix vercel.json serverless configuration"

# Push to trigger Vercel deployment
git push origin main
```

### Step 3: Monitor Deployment

1. **Watch Vercel Build Logs**:
   - Backend: https://vercel.com/your-username/lms-new-api
   - Frontend: https://vercel.com/your-username/lms-new-web

2. **Expected Success Indicators**:
   - ✅ Prisma Client generation completes
   - ✅ No TypeScript compilation errors
   - ✅ Build completes successfully
   - ✅ Deployment goes live

### Step 4: Test the Deployment

#### Test 1: Check CORS Headers
```bash
curl -I -X OPTIONS https://lms-new-api.vercel.app/api/v1/auth/login \
  -H "Origin: https://lms-new-web.vercel.app" \
  -H "Access-Control-Request-Method: POST"
```

**Expected Response**:
```
HTTP/2 200
access-control-allow-origin: https://lms-new-web.vercel.app
access-control-allow-methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
access-control-allow-credentials: true
```

#### Test 2: Test Authentication Flow
1. Go to: https://lms-new-web.vercel.app/login
2. Try to sign up with test credentials
3. Should NOT see CORS errors in browser console
4. Should see successful API communication

#### Test 3: Check API Health
```bash
curl https://lms-new-api.vercel.app/api/v1/health
```

Should return 200 OK.

## Files Changed

### Backend API
1. ✅ `apps/api/package.json` - Moved prisma to dependencies
2. ✅ `apps/api/src/main.ts` - Updated CORS configuration
3. ✅ `apps/api/src/vercel.ts` - Updated CORS configuration  
4. ✅ `apps/api/vercel.json` - Fixed serverless configuration
5. ✅ `.env` - Updated FRONTEND_URL

### Documentation
1. ✅ `VERCEL_DEPLOYMENT_FIX.md` - Detailed troubleshooting guide
2. ✅ `DEPLOYMENT_CHECKLIST.md` - This file

## Troubleshooting

### Issue: Still Getting "Property does not exist on PrismaService"

**Solution**:
```bash
# Locally regenerate Prisma Client
cd apps/api
pnpm db:generate

# Verify build works
pnpm build
```

If it works locally but fails on Vercel:
1. Check that `prisma` is in `dependencies` (not `devDependencies`)
2. Check that `postinstall` script exists
3. Check Vercel build logs for Prisma generation errors

### Issue: Still Getting CORS Error

**Possible Causes**:
1. `FRONTEND_URL` environment variable not set in Vercel
2. Frontend URL doesn't match exactly (check for trailing slash)
3. Need to redeploy after setting environment variables

**Solution**:
1. Double-check environment variables in Vercel dashboard
2. Ensure no typos in URLs
3. Redeploy both frontend and backend
4. Clear browser cache and test again

### Issue: Database Connection Fails

**Possible Causes**:
1. `DATABASE_URL` not set correctly
2. Supabase firewall blocking Vercel IPs
3. Connection string missing `?pgbouncer=true`

**Solution**:
1. Verify `DATABASE_URL` is correct in Vercel settings
2. Check Supabase dashboard → Settings → Network → Allow all
3. Ensure connection pooling is enabled

### Issue: Build Succeeds but API Returns 500

**Possible Causes**:
1. Missing environment variables
2. Database migration not run
3. Redis connection failing (if used)

**Solution**:
1. Check Vercel Function logs for error details
2. Run database migrations: `pnpm db:migrate:deploy`
3. If using Redis, ensure `REDIS_URL` is set or disable Redis temporarily

## Post-Deployment Verification

### ✅ Checklist
- [ ] Backend deploys without build errors
- [ ] Frontend deploys without build errors
- [ ] Can access backend API at https://lms-new-api.vercel.app
- [ ] Can access frontend at https://lms-new-web.vercel.app
- [ ] CORS headers are present in API responses
- [ ] Can signup from frontend (no CORS error)
- [ ] Can login from frontend
- [ ] JWT tokens are being set correctly
- [ ] Database connection works
- [ ] API endpoints return correct responses

## Success Metrics

Once everything is deployed successfully:

1. **No Build Errors**: Both frontend and backend build without errors
2. **No CORS Errors**: Browser console shows no CORS-related errors
3. **Authentication Works**: Users can signup and login
4. **API Responds**: All endpoints return expected responses
5. **Database Connected**: Prisma queries work correctly

## Next Steps After Successful Deployment

1. **Security**:
   - Change JWT secrets to strong random values
   - Review CORS origins list
   - Enable rate limiting
   - Setup monitoring

2. **Performance**:
   - Enable Vercel Edge caching
   - Optimize database queries
   - Add Redis caching layer
   - Monitor function execution times

3. **Monitoring**:
   - Setup error tracking (Sentry)
   - Enable Vercel Analytics
   - Monitor database performance
   - Setup uptime monitoring

4. **Database**:
   - Run production migrations
   - Seed initial data if needed
   - Setup automated backups
   - Review indexes and performance

## Support

If issues persist after following this guide:

1. Check Vercel deployment logs carefully
2. Check browser console for detailed error messages  
3. Use `curl` to test API endpoints directly
4. Verify all environment variables are set correctly
5. Test locally first to isolate Vercel-specific issues

## Important Notes

⚠️ **Before Production**:
- Change all default secrets and passwords
- Review and restrict CORS origins
- Enable HTTPS only
- Setup database backups
- Configure monitoring and logging
- Review security best practices

✅ **After This Fix**:
- Prisma Client will generate automatically on every Vercel build
- CORS will allow your frontend to communicate with backend
- Both local development and production will work correctly
