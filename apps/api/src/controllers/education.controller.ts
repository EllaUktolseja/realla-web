import type { Request, Response } from "express";
import { getEducations } from "../services/education.service.js";

export async function getEducationsController(
  _req: Request,
  res: Response,
): Promise<void> {
  const educations = await getEducations();

  res.status(200).json({
    success: true,
    data: educations,
  });
}