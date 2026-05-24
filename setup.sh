#!/bin/bash

# LMS Platform - Automated Setup Script
# This script automates the initial setup process

set -e  # Exit on error

echo "═══════════════════════════════════════════════════════"
echo "  LMS Platform - Automated Setup"
echo "═══════════════════════════════════════════════════════"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 20.0.0${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Node.js version must be >= 20.0.0 (current: $(node -v))${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠ pnpm not found. Installing pnpm...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm $(pnpm -v)${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker not found. You'll need to install Docker for database services.${NC}"
else
    echo -e "${GREEN}✓ Docker $(docker -v | cut -d' ' -f3 | tr -d ',')${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "📝 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠ Created .env file. Please edit it with your configuration.${NC}"
    echo -e "${YELLOW}   Important: Set JWT_SECRET and JWT_REFRESH_SECRET to secure random values.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo "🐳 Starting Docker services..."
if command -v docker &> /dev/null; then
    pnpm docker:dev
    echo -e "${GREEN}✓ Docker services started (PostgreSQL, Redis, Adminer)${NC}"
    echo "   Waiting for services to be ready..."
    sleep 10
else
    echo -e "${YELLOW}⚠ Docker not available. Please start PostgreSQL and Redis manually.${NC}"
fi

echo ""
echo "🗄️  Setting up database..."
cd apps/api

# Generate Prisma Client
echo "   Generating Prisma Client..."
pnpm db:generate

# Run migrations
echo "   Running database migrations..."
export DATABASE_URL="postgresql://lms_user:lms_password@localhost:5432/lms_db"
pnpm db:migrate --name init

cd ../..

echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "🚀 To start the development servers:"
echo "   pnpm dev"
echo ""
echo "📍 Access the application:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:4000"
echo "   API Docs:  http://localhost:4000/api/docs"
echo "   Adminer:   http://localhost:8080"
echo ""
echo "📚 Next steps:"
echo "   1. Edit .env file with your configuration"
echo "   2. Run 'pnpm dev' to start development"
echo "   3. Read GETTING_STARTED.md for detailed guide"
echo ""
echo "═══════════════════════════════════════════════════════"
