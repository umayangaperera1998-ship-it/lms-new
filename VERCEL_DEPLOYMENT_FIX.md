# Vercel Deployment Fix Guide

## Issues Fixed

### 1. ✅ Prisma Client Generation
- **Problem**: TypeScript couldn't find `@prisma/client` exports
- **Solution**: Ran `pnpm db:generate` to generate Prisma Client
- **Status**: FIXED

### 2. ✅ CORS Configuration
- **Problem**: Backend API blocked frontend requests due to CORS
- **Solution**: Updated `apps/api/src/main.ts` to allow multiple origins
- **Status**: FIXED in code

## Vercel Environment Variables Setup

### Backend API (lms-new-api.vercel.app)

You need to set these environment variables in your Vercel backend project:

1. Go to: https://vercel.com/your-username/lms-new-api/settings/environment-variables

2. Add the following variables:

```env
# Database
DATABASE_URL=postgresql://postgres.gyqogsxvewgnjargkuyi:LMS1996@abcd@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.gyqogsxvewgnjargkuyi:LMS1996@abcd@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (IMPORTANT for CORS)
FRONTEND_URL=https://lms-new-web.vercel.app

# Backend URL
BACKEND_URL=https://lms-new-api.vercel.app

# Environment
NODE_ENV=production
PORT=4000

# Redis (if using Vercel Redis or Upstash)
REDIS_URL=your-redis-url

# Optional: Other services
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (lms-new-web.vercel.app)

1. Go to: https://vercel.com/your-username/lms-new-web/settings/environment-variables

2. Add:

```env
NEXT_PUBLIC_API_URL=https://lms-new-api.vercel.app/api/v1
```

## Deployment Steps

### Step 1: Commit and Push Changes

```bash
cd /home/nirmal/Desktop/lms

# Add all changes
git add .

# Commit
git commit -m "fix: resolve Prisma Client and CORS issues for Vercel deployment"

# Push to trigger deployment
git push origin main
```

### Step 2: Redeploy Backend

The backend will automatically redeploy when you push. The new CORS configuration will:
- Allow `http://localhost:3000` (local development)
- Allow `http://localhost:4000` (local API testing)
- Allow `https://lms-new-web.vercel.app` (production frontend)
- Allow any URL from `FRONTEND_URL` environment variable

### Step 3: Verify CORS Headers

After deployment, test the CORS by making a request:

```bash
curl -I -X OPTIONS https://lms-new-api.vercel.app/api/v1/auth/login \
  -H "Origin: https://lms-new-web.vercel.app" \
  -H "Access-Control-Request-Method: POST"
```

You should see:
```
Access-Control-Allow-Origin: https://lms-new-web.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Credentials: true
```

## Common Issues & Solutions

### Issue 1: Still Getting CORS Error

**Solution**: 
- Double-check that `FRONTEND_URL` environment variable is set in Vercel backend settings
- Make sure it exactly matches your frontend URL (no trailing slash)
- Redeploy the backend after updating environment variables

### Issue 2: Prisma Client Not Generated on Vercel

**Solution**: 
Your `package.json` already has the correct scripts:
- `postinstall`: Runs `prisma generate` automatically
- `vercel-build`: Also runs `prisma generate`

If it still fails, check Vercel build logs for errors.

### Issue 3: Database Connection Fails

**Solution**:
- Use the `DATABASE_URL` with `?pgbouncer=true` for connection pooling
- Make sure Supabase allows connections from Vercel IPs
- Check if `DIRECT_URL` is needed for migrations

## Testing Locally Before Deployment

1. **Test Backend Locally**:
```bash
cd apps/api
pnpm dev
```

2. **Test Frontend Locally**:
```bash
cd apps/web
pnpm dev
```

3. **Test CORS**:
- Open browser console
- Try to signup/login from `http://localhost:3000`
- Should connect to `https://lms-new-api.vercel.app` without CORS errors

## Code Changes Made

### File: `apps/api/src/main.ts`

Changed from single origin:
```typescript
origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
```

To multiple origins with validation:
```typescript
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:4000',
  configService.get('FRONTEND_URL'),
  'https://lms-new-web.vercel.app',
].filter(Boolean));

app.enableCors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Institute-Id'],
});
```

## Next Steps

1. ✅ Prisma Client generated
2. ✅ CORS configuration updated
3. ⏳ Set environment variables in Vercel
4. ⏳ Commit and push changes
5. ⏳ Test deployment
6. ⏳ Verify authentication flow works

## Support

If you still face issues:

1. Check Vercel deployment logs
2. Check browser console for detailed error messages
3. Verify environment variables are set correctly
4. Make sure database is accessible from Vercel

## Security Notes

- Change JWT secrets before production deployment
- Use strong passwords for database
- Enable HTTPS only in production
- Review CORS origins list regularly
- Keep environment variables secure
