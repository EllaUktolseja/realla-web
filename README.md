# Realla Web

Production-oriented full-stack personal portfolio platform.

## Stack

- React 19 + Vite + TypeScript + Tailwind CSS
- Express 5 + TypeScript + Mongoose
- MongoDB
- Docker Compose for local MongoDB
- npm workspaces

## Structure

```
realla-web/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── config/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       ├── models/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── validators/
│   │       └── tests/
│   └── web/
│       └── src/
│           ├── components/
│           ├── sections/
│           ├── services/
│           └── types/
├── .github/workflows/
├── docker-compose.yml
└── package.json
```

## Local setup

```powershell
Copy-Item .env.example .env
Copy-Item apps\web\.env.example apps\web\.env.local
npm ci
docker compose up -d
npm run seed --workspace=api
npm run typecheck
npm run lint
npm run test
npm run build
npm run dev
```

Web: http://localhost:5173  
API: http://localhost:4000

## API

- GET /api/v1/health
- GET /api/v1/health/live
- GET /api/v1/health/ready
- GET /api/v1/profile
- GET /api/v1/experiences
- GET /api/v1/educations
- GET /api/v1/skills
- GET /api/v1/projects
- GET /api/v1/projects/:slug
- POST /api/v1/contact

The public API is intentionally read-only for portfolio content. Contact messages are write-only from the public client's perspective; management can be added later without changing the public contracts.
