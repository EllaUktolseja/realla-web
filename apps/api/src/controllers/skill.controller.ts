import type { Request, Response } from "express";
import { getSkills } from "../services/skill.service.js";

export async function getSkillsController(
  _req: Request,
  res: Response,
): Promise<void> {
  const skills = await getSkills();

  res.status(200).json({
    success: true,
    data: skills,
  });
}