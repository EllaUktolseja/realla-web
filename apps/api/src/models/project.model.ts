import { Schema, model } from "mongoose";

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
}

const projectSchema = new Schema<Project>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
    },

    repositoryUrl: {
      type: String,
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProjectModel = model<Project>("Project", projectSchema);