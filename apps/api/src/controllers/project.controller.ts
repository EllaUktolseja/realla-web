import type { Request, Response } from "express";
import {
  getProjectBySlug,
  getProjects,
} from "../services/project.service.js";

export async function getProjectsController(
  _req: Request,
  res: Response,
): Promise<void> {
  const projects = await getProjects();

  res.status(200).json({
    success: true,
    data: projects,
  });
}

export async function getProjectBySlugController(
  req: Request,
  res: Response,
): Promise<void> {
  const { slug } = req.params;

  if (typeof slug !== "string" || slug.length === 0) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_PROJECT_SLUG",
        message: "Project slug is required",
      },
    });

    return;
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    res.status(404).json({
      success: false,
      error: {
        code: "PROJECT_NOT_FOUND",
        message: "Project not found",
      },
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: project,
  });
}