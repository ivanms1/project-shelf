#!/bin/bash

echo "🚀 Setting up Project Shelf Docker environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️ Running database migrations..."
docker compose exec app yarn workspace api prisma migrate deploy

# Seed the database (if seed script exists)
if [ -f "apps/api/src/prisma/seed.ts" ]; then
    echo "🌱 Seeding database..."
    docker compose exec app yarn workspace api prisma db seed
fi

echo "✅ Setup complete!"
echo ""
echo "🌐 Services are running on:"
echo "   Web Frontend: http://localhost:3000"
echo "   Admin Dashboard: http://localhost:4000"
echo "   API: http://localhost:8080"
echo "   Database: localhost:5432"
echo ""
echo "📝 Useful commands:"
echo "   docker compose logs -f app  # View app logs"
echo "   docker compose exec app yarn workspace api prisma studio  # Open Prisma Studio"
echo "   docker compose down  # Stop all services" 