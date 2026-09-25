import { Router } from "express";
import {
  getProjectBySlugController,
  getProjectsController,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProjectsController);
router.get("/:slug", getProjectBySlugController);

export default router;
