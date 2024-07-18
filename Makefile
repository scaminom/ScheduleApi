.PHONY: prepare environments

ECR_REPO := 471112695037.dkr.ecr.us-east-2.amazonaws.com/schedule-repo
DEV_TAG := dev

up-dev:
	@echo "Starting development environment"
	docker compose up -d --build my-service-dev
	@echo "Development environment started"

down-dev:
	@echo "Stopping development environment"
	docker compose rm -s -v my-service-dev db-dev
	@echo "Development environment stopped"

up-test:
	@echo "Starting test environment"
	docker compose up -d db-testing
	@echo "Test environment started"

down-test:
	@echo "Stopping test environment"
	docker compose down db-testing
	@echo "Test environment stopped"

connect-db-dev:
	@echo "Connecting to development database"
	docker exec -it db-dev psql -U postgres development_db
	@echo "Connected to development database"

connect-db-test:
	@echo "Connecting to test database"
	docker exec -it db-testing psql -U postgres testing_db
	@echo "Connected to test database"

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
	docker exec -it schedule-api-dev yarn install
	@echo "Dependencies installed"
