import { Schema, model } from "mongoose";

export interface Experience {
  company: string;
  position: string;
  employmentType?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
}

const experienceSchema = new Schema<Experience>(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    employmentType: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false },
);

experienceSchema.index({ startDate: -1 });

export const ExperienceModel = model<Experience>("Experience", experienceSchema);
