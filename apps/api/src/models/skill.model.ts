import { Schema, model } from "mongoose";

export interface Skill {
  name: string;
  category: string;
  level?: string;
  yearsOfExperience?: number;
  sortOrder: number;
}

const skillSchema = new Schema<Skill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      trim: true,
    },

    yearsOfExperience: {
      type: Number,
      min: 0,
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

export const SkillModel = model<Skill>("Skill", skillSchema);
