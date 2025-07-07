.PHONY: help dev dev-build dev-down dev-logs dev-clean prod prod-build prod-down prod-logs prod-clean setup db-migrate db-seed db-studio logs clean

help: ## Show this help message
	@echo "Project Shelf Docker Commands"
	@echo "============================"
	@echo ""
	@echo "Development Commands:"
	@echo "  make dev          - Start development environment"
	@echo "  make dev-build    - Build and start development environment"
	@echo "  make dev-down     - Stop development environment"
	@echo "  make dev-logs     - View development logs"
	@echo "  make dev-clean    - Stop and clean development environment"
	@echo ""
	@echo "Production Commands:"
	@echo "  make prod         - Start production environment"
	@echo "  make prod-build   - Build and start production environment"
	@echo "  make prod-down    - Stop production environment"
	@echo "  make prod-logs    - View production logs"
	@echo "  make prod-clean   - Stop and clean production environment"
	@echo ""
	@echo "Database Commands:"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make db-seed      - Seed the database"
	@echo "  make db-studio    - Open Prisma Studio"
	@echo ""
	@echo "Utility Commands:"
	@echo "  make logs         - View all logs"
	@echo "  make clean        - Clean all Docker resources"
	@echo "  make setup        - Run initial setup script"

# Development commands
dev: ## Start development environment
	docker compose up -d

dev-build: ## Build and start development environment
	docker compose up -d --build

dev-down: ## Stop development environment
	docker compose down

dev-logs: ## View development logs
	docker compose logs -f app

dev-clean: ## Stop and clean development environment
	docker compose down -v

# Database commands
db-migrate: ## Run database migrations
	docker compose exec app yarn workspace api prisma migrate deploy

db-seed: ## Seed the database
	docker compose exec app yarn workspace api prisma db seed

db-studio: ## Open Prisma Studio
	docker compose exec app yarn workspace api prisma studio

# Utility commands
logs: ## View all logs
	docker compose logs -f

clean: ## Clean all Docker resources
	docker compose down -v --remove-orphans
	docker system prune -a -f