# OOAD Final Project

Scalable fullstack starter using React + NestJS + Prisma + PostgreSQL.

## Structure

- `frontend/`: React + TypeScript + Vite app
- `backend/`: NestJS API with modular architecture
- `backend/prisma/`: Prisma schema and migrations

## Backend Setup

1. Go to `backend/`
2. Install packages: `npm install`
3. Copy `.env.example` to `.env`
4. Set `DATABASE_URL` for your PostgreSQL instance
5. Generate Prisma client: `npm run prisma:generate`
6. Run migration: `npm run prisma:migrate`
7. Start backend: `npm run start:dev`

## Frontend Setup

1. Go to `frontend/`
2. Install packages: `npm install`
3. Copy `.env.example` to `.env`
4. Start frontend: `npm run dev`

## API Endpoints

- `GET /users`: list users
- `POST /users`: create user

POST body example:

```json
{
  "email": "jane@example.com",
  "name": "Jane"
}
```

## Docker Setup

This project includes Docker support for:

- `frontend` (React + Vite on port `5173`)
- `backend` (NestJS + Prisma on port `3000`)
- `db` (PostgreSQL on port `5432`)

### Files

- `docker-compose.yml`
- `frontend/Dockerfile`
- `frontend/.dockerignore`
- `backend/Dockerfile`
- `backend/.dockerignore`
- `.env`

### Run Full Stack With Docker

```bash
docker-compose up --build
```

Startup order and behavior:

1. PostgreSQL starts and passes health check.
2. Backend runs Prisma migrations (`prisma migrate deploy`).
3. Backend starts on `http://localhost:3000`.
4. Frontend starts on `http://localhost:5173`.

Stop and remove containers:

```bash
docker-compose down
```

Stop and remove containers with database volume reset:

```bash
docker-compose down -v
```
