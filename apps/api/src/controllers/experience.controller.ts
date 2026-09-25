import type { Request, Response } from "express";
import { getExperiences } from "../services/experience.service.js";

export async function getExperiencesController(
  _req: Request,
  res: Response,
): Promise<void> {
  const experiences = await getExperiences();

  res.status(200).json({
    success: true,
    data: experiences,
  });
}