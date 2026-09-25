import { EducationModel } from "../models/education.model.js";

export async function getEducations() {
  return EducationModel.find()
    .sort({ startDate: -1 })
    .lean();
}