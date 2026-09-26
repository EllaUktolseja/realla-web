import "./config/env.js";

import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import profileRoutes from "./routes/profile.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import contactRoutes from "./routes/contact.routes.js";

import { errorHandler } from "./middleware/error-handler.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";
import { isDatabaseReady } from "./config/database.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: env.WEB_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "25kb" }));
app.use(loggerMiddleware);
app.use(apiRateLimiter);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      service: "realla-web-api",
    },
  });
});

app.get("/api/v1/health/live", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "alive",
    },
  });
});

app.get("/api/v1/health/ready", (_req, res) => {
  const ready = isDatabaseReady();

  res.status(ready ? 200 : 503).json({
    success: ready,
    data: {
      status: ready ? "ready" : "not_ready",
      database: ready ? "connected" : "disconnected",
    },
  });
});

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/experiences", experienceRoutes);
app.use("/api/v1/educations", educationRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
