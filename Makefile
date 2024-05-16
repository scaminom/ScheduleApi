.PHONY: prepare environments

DEV_ENV_FILE := .env.development
TEST_ENV_FILE := .env.test
PROD_ENV_FILE := .env.production
COMPOSE_FILE := docker-compose.yaml
COMPOSE_FILE_PROD := docker-compose-prod.yaml

up-prod:
	@echo "Starting production environment"
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) up -d app
	@echo "Production environment started"

down-prod:
	@echo "Stopping production environment"
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) stop app
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) down
	@echo "Production environment stopped"

up-dev:
	@echo "Starting development environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) up -d db-dev app
	@echo "Development environment started"

down-dev:
	@echo "Stopping development environment"
	@echo "Stopping server"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) stop app
	@echo "Stopping development containers"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) down
	@echo "Development environment stopped"

up-test:
	@echo "Starting test environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(TEST_ENV_FILE) up -d db-test
	@echo "Test environment started"

down-test:
	@echo "Stopping test environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(TEST_ENV_FILE) down db-test
	@echo "Test environment stopped"

run-migrations-prod:
	@echo "Running migrations"
	yarn dotenv -e $(PROD_ENV_FILE) yarn prisma migrate deploy
	@echo "Migrations ran"

run-migrations-dev:
	@echo "Running migrations"
	yarn dotenv -e $(DEV_ENV_FILE) yarn prisma migrate dev --name init
	@echo "Migrations ran"

run-migrations-test:
	@echo "Running migrations"
	yarn dotenv -e $(TEST_ENV_FILE) yarn prisma migrate dev --name init
	@echo "Migrations ran"

connect-db-dev:
	@echo "Connecting to development database"
	docker exec -it ScheduleDbDev  psql -U postgres SchedulesDbDev
	@echo "Connected to development database"

connect-db-test:
	@echo "Connecting to test database"
	docker exec -it ScheduleDbTest  psql -U postgres SchedulesDbTest
	@echo "Connected to test database"

build-app:
	@echo "Building the application"
	docker compose -f $(COMPOSE_FILE) build app
	@echo "Application built"
