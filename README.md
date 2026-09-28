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

## Portfolio routes

- `/` — portfolio overview
- `/experience` — experience and education
- `/tech-stack` — skills and technologies
- `/projects` — project directory
- `/projects/:slug` — project detail / case study
- `/contact` — contact form and direct contact links

The homepage intentionally stays concise. Detailed information lives on dedicated pages so the portfolio remains easy to scan on desktop and mobile.

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

The public API is intentionally read-only for portfolio content. Contact submissions are persisted in MongoDB and delivered to the configured Gmail inbox through SMTP. The SMTP transporter is reused by the API process instead of being recreated for every submission. Project and profile images are URL-backed API fields so the frontend does not need to own portfolio assets.

## Contact email

Configure `SMTP_USER`, `SMTP_PASS`, and `CONTACT_EMAIL` in `.env`. Gmail SMTP uses `smtp.gmail.com`; port 587 uses STARTTLS. Google requires 2-Step Verification before an App Password can be created, and Google recommends using Sign in with Google where supported. Never commit the App Password to Git.
