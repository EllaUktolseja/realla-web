import { Router } from "express";
import { getEducationsController } from "../controllers/education.controller.js";

const router = Router();

router.get("/", getEducationsController);

export default router;