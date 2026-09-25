import dotenv from "dotenv";
import mongoose from "mongoose";
import { ProfileModel } from "./models/profile.model.js";

dotenv.config({
  path: "../../.env",
});

async function seed(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(mongoUri);

  await ProfileModel.findOneAndUpdate(
    {},
    {
      name: "Your Name",
      headline: "Software Engineer",
      bio: "Software engineer focused on building reliable and scalable web applications.",
      email: "your@email.com",
      location: "Indonesia",
      linkedinUrl: "https://www.linkedin.com/",
      githubUrl: "https://github.com/",
      resumeUrl: "",
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );

  console.log("Database seeded successfully");

  await mongoose.disconnect();
}

seed().catch((error: unknown) => {
  console.error("Database seed failed:", error);
  process.exit(1);
});