import cors from "cors";
import express from "express";
import helmet from "helmet";
import profileRoutes from "./routes/profile.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.WEB_URL ?? "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
    },
  });
});

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/experiences", experienceRoutes);
app.use("/api/v1/educations", educationRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/projects", projectRoutes);

export default app;