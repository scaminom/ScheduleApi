## Installation

```bash
$ yarn install
```

## Running the app

```bash
# test environment
$ yarn start:test

# development
$ yarn start:dev

# production mode
$ yarn start:prod

```

## Test

```bash
# unit tests
$ yarn test
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

## Instructions for Joining WebSocket Rooms and Subscribing to Events

### Reminder WebSocket

To join the reminder WebSocket:

1. Join the room `joinAdminsRoom`.
2. Subscribe to the event `new-reminder`.

### Appointment WebSocket

To join the appointment WebSocket:

1. Join the room `joinMechanicsRoom`.
2. Subscribe to the event `new-appointment`.
