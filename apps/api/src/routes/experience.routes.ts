import { Router } from "express";
import { getExperiencesController } from "../controllers/experience.controller.js";

const router = Router();

router.get("/", getExperiencesController);

export default router;