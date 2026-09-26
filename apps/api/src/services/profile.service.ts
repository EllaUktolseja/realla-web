import { ProfileModel } from "../models/profile.model.js";

export async function getProfile() {
  return ProfileModel.findOne().sort({ createdAt: 1 }).lean();
}
