# LMS Platform - Enterprise Multi-Tenant SaaS Learning Management System

A production-ready, enterprise-grade multi-tenant Learning Management System specifically designed for Sri Lankan tuition classes.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## 🚀 Features

### Core Features
- ✅ **Multi-Tenancy**: Complete data isolation per institute with custom branding
- ✅ **Role-Based Access Control**: 5 user roles (Super Admin, Institute Admin, Teacher, Student, Parent)
- ✅ **Authentication**: Secure JWT-based auth with refresh token rotation
- ✅ **Real-time**: WebSocket support for chat and notifications
- ✅ **Multi-Language**: English, Sinhala, Tamil support
- ✅ **Theme System**: Light and dark mode
- ✅ **Responsive Design**: Mobile-first, fully responsive UI

### Academic Features
- 📚 Class Management (Grades 6-12, O/L, A/L)
- 📊 Attendance System (Manual + QR Code)
- 📝 Quiz & Examination (MCQ, Essay, True/False)
- 📹 Content Management (Notes, Videos, Recordings)
- 📈 Progress Tracking & Analytics
- 🏆 Achievement & Badge System
- 📅 Timetable & Schedule Management

### Communication
- 💬 Real-time Chat (Class groups, Direct messaging)
- 🔔 Notifications (In-app, Email, SMS ready)
- 📢 Announcements
- 📧 Parent Updates

### Financial
- 💰 Payment Management
- 🧾 Invoice Generation
- 📊 Revenue Analytics
- 💳 Payment Gateway Integration (Ready for Dialog Genie, Frimi, etc.)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI + Radix UI
- **State Management**: Redux Toolkit + TanStack Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Real-time**: Socket.IO Client
- **Animation**: Framer Motion
- **i18n**: react-i18next

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **WebSocket**: Socket.IO
- **Queue**: BullMQ
- **Documentation**: Swagger/OpenAPI

### File Storage
- **Images**: Cloudinary
- **Videos/PDFs**: Bunny.net or AWS S3

### DevOps
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (configured)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Docker**: >= 20.10 (for local development)
- **PostgreSQL**: 16+ (or use Docker)
- **Redis**: 7+ (or use Docker)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lms
```

### 2. Install Dependencies

```bash
# Install pnpm globally if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://lms_user:lms_password@localhost:5432/lms_db"

# JWT Secrets (Generate secure random strings)
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"

# Redis
REDIS_URL="redis://localhost:6379"

# Frontend
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
```

### 4. Start Development Services with Docker

```bash
# Start PostgreSQL, Redis, and Adminer
pnpm docker:dev

# Wait for services to be healthy (about 10-15 seconds)
```

**Access Services:**
- **Adminer** (Database UI): http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### 5. Setup Database

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# (Optional) Seed database with sample data
pnpm db:seed
```

### 6. Start Development Servers

```bash
# Start both frontend and backend in parallel
pnpm dev

# OR start individually:
pnpm api:dev  # Backend only (http://localhost:4000)
pnpm web:dev  # Frontend only (http://localhost:3000)
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs
- **Database UI**: http://localhost:8080

## 📁 Project Structure

```
lms/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── common/         # Guards, decorators, middleware
│   │   │   ├── config/         # Configuration files
│   │   │   ├── modules/        # Feature modules
│   │   │   └── prisma/         # Prisma schema & migrations
│   │   └── package.json
│   │
│   └── web/                    # Next.js Frontend
│       ├── app/                # App Router pages
│       ├── components/         # React components
│       ├── lib/                # Utilities & configurations
│       ├── public/             # Static assets
│       ├── styles/             # Global styles
│       └── package.json
│
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utility functions
│   ├── config/                 # Shared configs (ESLint, TS, Prettier)
│   └── ui/                     # Shared UI components
│
├── docker/
│   ├── Dockerfile.api          # Production API Dockerfile
│   ├── Dockerfile.web          # Production Web Dockerfile
│   └── docker-compose.prod.yml # Production compose file
│
├── docker-compose.yml          # Development services
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

## 🗄️ Database Schema

The system includes **32 comprehensive tables**:

### Core Tables
- `institutes` - Tenant root entity
- `users` - All system users
- `roles` & `permissions` - RBAC system
- `user_roles` & `role_permissions` - Many-to-many relationships
- `refresh_tokens` - Token management

### Academic Tables
- `students`, `teachers`, `parents` - User profiles
- `student_parents` - Parent-child relationships
- `subjects`, `classes` - Academic structure
- `enrollments` - Student-class relationships
- `schedules` - Timetables
- `attendance` - Attendance tracking

### Content Tables
- `notes`, `videos`, `recordings` - Learning materials

### Assessment Tables
- `quizzes`, `quiz_questions` - Quiz management
- `quiz_attempts`, `quiz_answers` - Student attempts
- `assignments`, `assignment_submissions` - Assignment system

### Financial Tables
- `payments`, `invoices` - Payment management
- `subscriptions` - Institute subscriptions

### Communication Tables
- `announcements`, `messages` - Communication
- `notifications` - Notification system

### Gamification & Audit
- `achievements` - Student achievements
- `activity_logs` - Audit trail

## 🔐 Authentication & Authorization

### User Roles

1. **Super Admin**
   - Global system management
   - Manage all institutes
   - Platform analytics
   - Feature toggles

2. **Institute Admin**
   - Manage institute settings
   - Manage students & teachers
   - Financial management
   - Institute analytics

3. **Teacher**
   - Create & manage classes
   - Upload materials
   - Create quizzes
   - Grade students
   - Track attendance

4. **Student**
   - View classes & materials
   - Attempt quizzes
   - Track progress
   - Chat with teachers

5. **Parent**
   - View child's progress
   - Payment history
   - Attendance reports
   - Receive notifications

### Authentication Flow

1. **Login**: Email + Password → JWT Access Token (15min) + Refresh Token (7d)
2. **Refresh**: Refresh Token → New Access Token
3. **Logout**: Invalidate refresh token
4. **Security**: HttpOnly cookies, CSRF protection, Rate limiting

## 🎨 Frontend Development

### Running Frontend

```bash
cd apps/web
pnpm dev
```

### Key Directories

- `app/` - Next.js 15 App Router pages
- `components/ui/` - ShadCN UI components
- `components/dashboard/` - Dashboard widgets
- `lib/api/` - API client & hooks
- `lib/store/` - Redux store
- `lib/validations/` - Zod schemas

### Adding New Pages

```bash
# Create new page in app router
mkdir -p apps/web/app/dashboard/students
touch apps/web/app/dashboard/students/page.tsx
```

### Theming

The app supports light/dark themes using `next-themes`. Theme preferences persist across sessions.

## 🔧 Backend Development

### Running Backend

```bash
cd apps/api
pnpm dev
```

### Creating New Module

```bash
# Navigate to modules directory
cd apps/api/src/modules

# Create module structure
mkdir -p my-module
cd my-module

# Create files
touch my-module.module.ts
touch my-module.controller.ts
touch my-module.service.ts
touch dto/create-my-module.dto.ts
touch dto/update-my-module.dto.ts
```

### API Documentation

Visit http://localhost:4000/api/docs for interactive Swagger documentation.

### Database Operations

```bash
# Create migration
pnpm db:migrate

# Reset database
pnpm db:push --force-reset

# Open Prisma Studio
pnpm db:studio
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run backend tests
pnpm --filter api test

# Run frontend tests
pnpm --filter web test

# E2E tests
pnpm test:e2e
```

## 📦 Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter api build
pnpm --filter web build
```

## 🐳 Docker Deployment

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production

```bash
# Build images
docker-compose -f docker/docker-compose.prod.yml build

# Start production stack
docker-compose -f docker/docker-compose.prod.yml up -d
```

## 🌐 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel
```

### Backend (Railway/AWS/DigitalOcean)

1. Build Docker image
2. Push to container registry
3. Deploy to platform
4. Set environment variables
5. Run database migrations

## 📝 Environment Variables

### Essential Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | JWT signing secret | Random 64-char string |
| `JWT_REFRESH_SECRET` | Refresh token secret | Random 64-char string |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:4000/api/v1` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_*` | Cloudinary credentials |
| `BUNNY_*` | Bunny.net credentials |
| `SMTP_*` | Email configuration |
| `ZOOM_*` | Zoom integration |

## 🔒 Security Best Practices

- ✅ JWT with short expiry (15 minutes)
- ✅ Refresh token rotation
- ✅ HttpOnly cookies
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ Helmet security headers
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ Multi-tenant data isolation

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Prisma Issues

```bash
# Reset Prisma
pnpm db:generate
rm -rf node_modules/.prisma
pnpm install
```

### Clear Cache

```bash
# Clear all caches and rebuild
pnpm clean
pnpm install
pnpm build
```

## 📚 Documentation

- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [API Documentation](http://localhost:4000/api/docs)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Team

Built with ❤️ by the LMS Platform Team

## 🆘 Support

For support and questions:
- 📧 Email: support@lmsplatform.com
- 📖 Documentation: [link-to-docs]
- 🐛 Issues: [GitHub Issues]

---

**Built for Sri Lankan Tuition Classes | Production-Ready | Enterprise-Grade**
