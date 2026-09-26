import mongoose from "mongoose";

import "./config/env.js";
import { env } from "./config/env.js";
import { ProfileModel } from "./models/profile.model.js";
import { ExperienceModel } from "./models/experience.model.js";
import { EducationModel } from "./models/education.model.js";
import { SkillModel } from "./models/skill.model.js";
import { ProjectModel } from "./models/project.model.js";

if (!env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not configured");
}

await mongoose.connect(env.MONGODB_URI);

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
    whatsappUrl: "https://wa.me/6200000000000",
    resumeUrl: "",
  },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);

const experiences = [
  {
    company: "Placeholder Company",
    position: "Software Engineer",
    employmentType: "Full-time",
    location: "Indonesia",
    startDate: new Date("2025-01-01"),
    current: true,
    description: "Placeholder experience entry. Replace with your real work history.",
    technologies: ["TypeScript", "React", "Node.js"],
  },
];

for (const experience of experiences) {
  await ExperienceModel.findOneAndUpdate(
    { company: experience.company, position: experience.position },
    experience,
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

const educations = [
  {
    institution: "Your University",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2026-01-01"),
    description: "Placeholder education entry.",
  },
];

for (const education of educations) {
  await EducationModel.findOneAndUpdate(
    { institution: education.institution, degree: education.degree },
    education,
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

const skills = [
  { name: "TypeScript", category: "Language", level: "Working", yearsOfExperience: 1, sortOrder: 1 },
  { name: "React", category: "Frontend", level: "Working", yearsOfExperience: 1, sortOrder: 2 },
  { name: "Node.js", category: "Backend", level: "Working", yearsOfExperience: 1, sortOrder: 3 },
  { name: "MongoDB", category: "Database", level: "Working", yearsOfExperience: 1, sortOrder: 4 },
];

for (const skill of skills) {
  await SkillModel.findOneAndUpdate(
    { name: skill.name },
    skill,
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

const projects = [
  {
    title: "Realla Web",
    slug: "realla-web",
    shortDescription: "Production-oriented personal portfolio platform.",
    description: "Placeholder project description. Replace this with the actual case study and technical decisions.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    technologies: ["React", "Vite", "Express", "MongoDB"],
    featured: true,
    sortOrder: 1,
  },
];

for (const project of projects) {
  await ProjectModel.findOneAndUpdate(
    { slug: project.slug },
    project,
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

await mongoose.disconnect();
console.log("Database seeded successfully.");
