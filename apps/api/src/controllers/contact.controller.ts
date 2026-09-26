import type { Request, Response } from "express";

import { createContactMessage } from "../services/contact.service.js";

export async function createContactController(
  req: Request,
  res: Response,
): Promise<void> {
  await createContactMessage(req.body);

  res.status(201).json({
    success: true,
    data: {
      message: "Your message has been received.",
    },
  });
}
