import { Schema, model } from "mongoose";

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

const educationSchema = new Schema<Education>(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
);

educationSchema.index({ startDate: -1 });

export const EducationModel = model<Education>("Education", educationSchema);
