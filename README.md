# Schedule API

A comprehensive scheduling and appointment management system API for automotive service centers, built with NestJS, TypeScript, and Prisma.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Push Notifications](#push-notifications)
- [Reminders System](#reminders-system)
- [Getting Started](#getting-started)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [CI/CD](#cicd)

## Overview

The Schedule API is a backend application designed to manage appointments, inspections, and maintenance tasks for automotive service centers. It provides a complete system for mechanics and staff to schedule vehicle inspections, track jobs, notify clients, and manage reminders.

## Features

- **User Management**: Role-based users (Admin, Mechanic, Technician, Secretary)
- **Appointment System**: Schedule and manage appointments with clients
- **Vehicle Inspections**: Track inspections and their status
- **Job Management**: Create and manage individual tasks within an inspection
- **Real-time Notifications**: Web push notifications for users and clients
- **Reminders System**: Set and manage reminders with notification scheduling
- **Authentication**: JWT-based auth with role-based access control
- **Firebase Integration**: Mobile notifications through Firebase Cloud Messaging

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Passport.js with JWT
- **Authorization**: Role-based access control
- **API Documentation**: Swagger/OpenAPI
- **Push Notifications**: Web-Push and Firebase Admin
- **Testing**: Jest
- **Containerization**: Docker

## Project Structure

The project follows a modular structure organized by features:

```
src/
├── app.module.ts                 # Main application module
├── auth/                         # Authentication module
├── appointments/                 # Appointments management
├── inspections/                  # Vehicle inspections
├── jobs/                         # Individual tasks within inspections
├── reminders/                    # Reminder management
├── notifications/                # Push notification system
├── subscriptions/                # Web Push subscriptions
├── users/                        # User management
├── crypto/                       # Encryption utilities
├── firebase/                     # Firebase integration
└── prisma/                       # Prisma ORM configuration
```

## Database Schema

The application uses a PostgreSQL database with the following main entities:

- **User**: Staff members with roles (Admin, Mechanic, etc.)
- **Appointment**: Client appointments for vehicle services
- **Inspection**: Detailed inspection information tied to appointments
- **Job**: Individual tasks within an inspection
- **Reminder**: Time-based reminders for staff
- **Subscription**: Push notification subscriptions

## API Endpoints

The API provides endpoints for all main features:

### Authentication
- `POST /auth/login` - Authenticate user and get JWT token
- `POST /auth/register` - Register a new user (admin only)

### Users
- `GET /users` - List all users
- `GET /users/:ci` - Get user by ID
- `POST /users` - Create a new user
- `PATCH /users/:ci` - Update user details
- `DELETE /users/:ci` - Delete a user

### Appointments
- `GET /appointments` - List all appointments
- `GET /appointments/:id` - Get appointment details
- `POST /appointments` - Create a new appointment
- `PATCH /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel/delete appointment

### Inspections
- `GET /inspections` - List all inspections
- `GET /inspections/:id` - Get inspection details
- `POST /inspections` - Create a new inspection
- `PATCH /inspections/:id` - Update inspection status
- `DELETE /inspections/:id` - Delete an inspection

### Jobs
- `GET /jobs` - List all jobs
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create a new job
- `PATCH /jobs/:id` - Update job status
- `DELETE /jobs/:id` - Delete a job

### Reminders
- `GET /reminders` - List all reminders
- `GET /reminders/:id` - Get reminder details
- `POST /reminders` - Create a new reminder
- `PATCH /reminders/:id` - Update reminder
- `DELETE /reminders/:id` - Delete a reminder

### Subscriptions
- `POST /subscriptions` - Create a new push notification subscription
- `DELETE /subscriptions/:id` - Delete a subscription

## Authentication & Authorization

The API uses JWT-based authentication with Passport.js:

- Users authenticate via username/password to receive a JWT token
- Tokens have a configurable expiration time
- Role-based authorization controls access to endpoints
- Guards protect routes based on user roles

## Push Notifications

The application provides web push notifications through multiple channels:

- Web Push API for browser notifications
- Firebase Cloud Messaging for mobile apps
- Subscriptions are stored securely with encryption
- Notification tokens can be managed through the API

## Reminders System

The reminders system provides:

- Scheduled reminders for tasks and appointments
- Notifications at specific times or minutes before events
- Automatic notifications through the web push system
- Reminder management with prioritization

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Firebase project (for mobile notifications)

### Installation
```bash
# Clone the repository
git clone https://github.com/scaminom/ScheduleApi.git
cd ScheduleApi

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
yarn prisma migrate dev

# Start the application
yarn start:dev
```

## Docker Setup

The application can be run in Docker containers:

```bash
# Build and start the containers
docker-compose up -d

# Run migrations
docker-compose exec app yarn prisma migrate dev
```

## Environment Variables

Key environment variables include:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRATION=2h

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_SUBJECT=mailto:your-email@example.com
```

## Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## CI/CD

The repository includes GitHub Actions workflows for:

- Linting and code style checking
- Running tests
- Building Docker images
- Continuous integration and deployment
