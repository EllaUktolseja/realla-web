import { ProjectModel } from "../models/project.model.js";

export async function getProjects() {
  return ProjectModel.find()
    .sort({ sortOrder: 1 })
    .lean();
}

export async function getProjectBySlug(slug: string) {
  return ProjectModel.findOne({ slug }).lean();
}