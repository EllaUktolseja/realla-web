import { Router } from "express";

import { createContactController } from "../controllers/contact.controller.js";
import { contactRateLimiter } from "../middleware/rate-limit.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { contactSchema } from "../validators/contact.validator.js";

const router = Router();

router.post("/", contactRateLimiter, validateBody(contactSchema), createContactController);

export default router;
