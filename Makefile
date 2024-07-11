.PHONY: prepare environments

DEV_ENV_FILE := .env.development
TEST_ENV_FILE := .env.test
PROD_ENV_FILE := .env.production
COMPOSE_FILE := docker-compose.yaml
COMPOSE_FILE_PROD := docker-compose-prod.yaml
ECR_REPO := 471112695037.dkr.ecr.us-east-2.amazonaws.com/schedule-repo
DEV_TAG := dev

up-prod:
	@echo "Starting production environment"
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) up --build -d app
	@echo "Production environment started"

down-prod:
	@echo "Stopping production environment"
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) stop app
	docker compose -f $(COMPOSE_FILE_PROD) --env-file $(PROD_ENV_FILE) down
	@echo "Production environment stopped"

up-dev:
	@echo "Starting development environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) up --build -d db-dev
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) up --build app
	@echo "Development environment started"

down-dev:
	@echo "Stopping development environment"
	@echo "Stopping server"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) stop app
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) down
	@echo "Stopping development containers"
	@echo "Development environment stopped"

up-test:
	@echo "Starting test environment"
	docker compose -f $(COMPOSE_FILE) --env-file $(TEST_ENV_FILE) up --build -d db-test
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
	docker exec -it ScheduleDbDev psql -U postgres SchedulesDbDev
	@echo "Connected to development database"

connect-db-test:
	@echo "Connecting to test database"
	docker exec -it ScheduleDbTest psql -U postgres SchedulesDbTest
	@echo "Connected to test database"

build-app:
	@echo "Building the application"
	docker compose -f $(COMPOSE_FILE) --env-file $(DEV_ENV_FILE) build app
	@echo "Application built"

tag-dev:
	@echo "Tagging the development image"
	docker tag scheduleapi-app:latest $(ECR_REPO):$(DEV_TAG)
	@echo "Development image tagged"

push-dev:
	@echo "Pushing the development image to ECR"
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin $(ECR_REPO)
	docker push $(ECR_REPO):$(DEV_TAG)
	@echo "Development image pushed to ECR"

i-dep:
	@echo "Installing dependencies"
	docker exec -it scheduleapi-app-1 yarn install
	@echo "Dependencies installed"

