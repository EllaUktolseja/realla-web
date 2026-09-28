import { Schema, model } from "mongoose";

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsappUrl?: string;
  resumeUrl?: string;
}

const profileSchema = new Schema<Profile>(
  {
    name: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    whatsappUrl: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProfileModel = model<Profile>("Profile", profileSchema);
