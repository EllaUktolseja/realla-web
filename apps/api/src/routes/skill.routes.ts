import { Router } from "express";
import { getSkillsController } from "../controllers/skill.controller.js";

const router = Router();

router.get("/", getSkillsController);

export default router;