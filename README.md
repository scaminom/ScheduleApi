## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# test environment
$ yarn start:test

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

```

## Test

```bash
# unit tests
$ yarn run test
```

## Make Commands

```bash
# up development database container
$ make up-dev

# down development database container
$ make down-dev

# up test database container
$ make up-test

# down development database container
$ make down-test

# run migrations in development database
$ make run-migrations-dev

# run migrations in test database
$ make run-migrations-test

# connect to development database
$ make connect-db-dev

# connect to test database
$ make connect-db-test
```
