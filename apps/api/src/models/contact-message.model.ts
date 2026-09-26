import { Schema, model } from "mongoose";

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied";
}

const contactMessageSchema = new Schema<ContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true, versionKey: false },
);

contactMessageSchema.index({ createdAt: -1 });

export const ContactMessageModel = model<ContactMessage>(
  "ContactMessage",
  contactMessageSchema,
);
