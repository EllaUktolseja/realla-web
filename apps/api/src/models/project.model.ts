import { Schema, model } from "mongoose";

export type ProjectStatus = "completed" | "ongoing" | "planning";

export interface ProjectMilestone {
  title: string;
  description: string;
  completed: boolean;
}

export interface ProjectTimelineItem {
  phase: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  shortDescription: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
  progress?: number;
  currentFocus?: string[];
  milestones?: ProjectMilestone[];
  goal?: string;
  scope?: string[];
  timeline?: ProjectTimelineItem[];
}

const milestoneSchema = new Schema<ProjectMilestone>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false },
);

const timelineSchema = new Schema<ProjectTimelineItem>(
  {
    phase: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const projectSchema = new Schema<Project>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["completed", "ongoing", "planning"],
      required: true,
      default: "planning",
    },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    repositoryUrl: { type: String, trim: true },
    technologies: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    progress: { type: Number, min: 0, max: 100 },
    currentFocus: { type: [String], default: [] },
    milestones: { type: [milestoneSchema], default: [] },
    goal: { type: String, trim: true },
    scope: { type: [String], default: [] },
    timeline: { type: [timelineSchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

projectSchema.index({ sortOrder: 1 });
projectSchema.index({ status: 1, sortOrder: 1 });

export const ProjectModel = model<Project>("Project", projectSchema);
