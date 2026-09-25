import { ExperienceModel } from "../models/experience.model.js";

export async function getExperiences() {
  return ExperienceModel.find()
    .sort({ startDate: -1 })
    .lean();
}