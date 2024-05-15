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

## Environments

In this proyect we'll have three environments

- Production
- Development
- Test

There is a file called .env.example where you can create each enviroment file with those environment options.
