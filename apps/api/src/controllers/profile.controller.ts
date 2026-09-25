import type { Request, Response } from "express";
import { getProfile } from "../services/profile.service.js";

export async function getProfileController(
  _req: Request,
  res: Response,
): Promise<void> {
  const profile = await getProfile();

  if (!profile) {
    res.status(404).json({
      success: false,
      error: {
        code: "PROFILE_NOT_FOUND",
        message: "Profile not found",
      },
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
}