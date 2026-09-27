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
    name: "Gabriella Uktolseja",
    headline: "Undergraduate Software Engineer",
    bio: "Computer science student building full-stack web applications with TypeScript, React, Node.js, and modern backend tooling. I enjoy learning by turning ideas into products.",
    email: "hello@example.com",
    location: "Bekasi, Indonesia",
    linkedinUrl: "https://www.linkedin.com/",
    githubUrl: "https://github.com/EllaUktolseja",
    whatsappUrl: "https://wa.me/6200000000000",
    resumeUrl: "https://example.com/resume.pdf",
  },
  { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
);

const experiences = [
  {
    company: "Campus Software Lab",
    position: "Software Engineering Intern",
    employmentType: "Internship",
    location: "Jakarta, Indonesia",
    startDate: new Date("2026-01-01"),
    current: true,
    description: "Worked on full-stack web features, API integration, database-backed workflows, and developer tooling while learning production engineering practices.",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Independent Projects",
    position: "Full-stack Developer",
    employmentType: "Project-based",
    location: "Indonesia",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-01"),
    current: false,
    description: "Built and iterated on portfolio, e-commerce, and community product prototypes with a focus on clean architecture and practical user flows.",
    technologies: ["React", "Next.js", "NestJS", "MongoDB"],
  },
];

for (const experience of experiences) {
  await ExperienceModel.findOneAndUpdate(
    { company: experience.company, position: experience.position },
    experience,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  );
}

const educations = [
  {
    institution: "Your University",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2027-01-01"),
    description: "Studying software engineering, databases, algorithms, distributed systems, and web application development.",
  },
];

for (const education of educations) {
  await EducationModel.findOneAndUpdate(
    { institution: education.institution, degree: education.degree },
    education,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  );
}

const skills = [
  { name: "TypeScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 1 },
  { name: "JavaScript", category: "Languages", level: "Working", yearsOfExperience: 2, sortOrder: 2 },
  { name: "React", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 3 },
  { name: "Next.js", category: "Frontend", level: "Learning", yearsOfExperience: 1, sortOrder: 4 },
  { name: "Tailwind CSS", category: "Frontend", level: "Working", yearsOfExperience: 2, sortOrder: 5 },
  { name: "Node.js", category: "Backend", level: "Working", yearsOfExperience: 2, sortOrder: 6 },
  { name: "Express", category: "Backend", level: "Working", yearsOfExperience: 1, sortOrder: 7 },
  { name: "NestJS", category: "Backend", level: "Learning", yearsOfExperience: 1, sortOrder: 8 },
  { name: "MongoDB", category: "Databases", level: "Working", yearsOfExperience: 1, sortOrder: 9 },
  { name: "PostgreSQL", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 10 },
  { name: "Prisma", category: "Databases", level: "Learning", yearsOfExperience: 1, sortOrder: 11 },
  { name: "Docker", category: "Tools", level: "Working", yearsOfExperience: 1, sortOrder: 12 },
  { name: "Git & GitHub", category: "Tools", level: "Working", yearsOfExperience: 2, sortOrder: 13 },
];

for (const skill of skills) {
  await SkillModel.findOneAndUpdate(
    { name: skill.name },
    skill,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  );
}

const projects = [
  {
    title: "Realla Web",
    slug: "realla-web",
    shortDescription: "A production-oriented personal portfolio platform.",
    description: "A full-stack portfolio built to present projects, experience, technical skills, and contact information through a focused editorial interface.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    technologies: ["React", "Vite", "Express", "MongoDB"],
    featured: true,
    sortOrder: 1,
  },
  {
    title: "GY-O-REAL E-Commerce",
    slug: "gy-o-real-ecommerce",
    shortDescription: "Full-stack fashion commerce platform prototype.",
    description: "An e-commerce application exploring product catalogs, categories, database-backed APIs, and a modern shopping experience.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/GY-O-REAL-E-Commerce",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 2,
  },
  {
    title: "FoodFoundry",
    slug: "foodfoundry",
    shortDescription: "Community-focused dessert feedback platform.",
    description: "A product prototype designed to collect real customer feedback around dessert products and help turn community input into product decisions.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/FoodFoundry",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 3,
  },
  {
    title: "Meatloop",
    slug: "meatloop",
    shortDescription: "Food marketplace interface concept for Gen Z.",
    description: "A frontend exploration of a food-waste marketplace experience with bold visual hierarchy, responsive cards, and a playful interaction model.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Supply Chain Monitor",
    slug: "supply-chain-monitor",
    shortDescription: "Security research dashboard concept.",
    description: "A research-oriented interface concept for visualizing software supply-chain components, runtime signals, and anomaly indicators.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "",
    technologies: ["React", "TypeScript", "Node.js", "eBPF"],
    featured: false,
    sortOrder: 5,
  },
];

for (const project of projects) {
  await ProjectModel.findOneAndUpdate(
    { slug: project.slug },
    project,
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
  );
}

await mongoose.disconnect();
console.log("Database seeded successfully.");
