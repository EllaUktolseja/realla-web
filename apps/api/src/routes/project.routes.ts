import { Router } from "express";

import {
  getProjectBySlugController,
  getProjectsController,
} from "../controllers/project.controller.js";
import { validateParams } from "../middleware/validate.middleware.js";
import { projectSlugSchema } from "../validators/project.validator.js";

const router = Router();

router.get("/", getProjectsController);
router.get("/:slug", validateParams(projectSlugSchema), getProjectBySlugController);

export default router;
