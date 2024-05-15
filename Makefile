.PHONY: prepare environments

DEV_ENV_FILE := .env.development
TEST_ENV_FILE := .env.test
COMPOSE_FILE := docker-compose.yaml

up-dev:
	@echo "Starting development environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) up -d db-dev
	@echo "Development environment started"

down-dev:
	@echo "Stopping development environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) down db-dev
	@echo "Development environment stopped"

up-test:
	@echo "Starting test environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(TEST_ENV_FILE) up -d db-test
	@echo "Test environment started"

down-test:
	@echo "Stopping test environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(TEST_ENV_FILE) down db-test
	@echo "Test environment stopped"

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
