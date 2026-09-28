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
    imageUrl: "",
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
    status: "ongoing",
    shortDescription:
      "A modern full-stack portfolio website built to showcase experience, projects, and technical skills.",
    description:
      "Realla Web is a personal portfolio platform designed with a clean and focused interface. The project combines a React frontend with a REST API and MongoDB backend, giving the portfolio a real full-stack architecture instead of a static presentation site.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    technologies: ["React", "TypeScript", "Vite", "Express", "MongoDB"],
    featured: true,
    sortOrder: 1,
    progress: 70,
    currentFocus: ["Polishing portfolio UI", "Connecting project detail data", "Preparing production deployment"],
    milestones: [
      { title: "Project foundation", description: "Set up the monorepo, frontend, backend, and development workflow.", completed: true },
      { title: "Portfolio API", description: "Build profile, experience, education, skill, project, and contact endpoints.", completed: true },
      { title: "Portfolio UI", description: "Build the responsive portfolio pages and project detail experience.", completed: true },
      { title: "Production readiness", description: "Finish contact delivery, environment configuration, testing, and deployment.", completed: false },
    ],
  },
  {
    title: "GY-O-REAL E-Commerce",
    slug: "gy-o-real-ecommerce",
    status: "ongoing",
    shortDescription:
      "A full-stack fashion e-commerce platform built around a database-backed product experience.",
    description:
      "GY-O-REAL E-Commerce is a full-stack shopping platform exploring product catalogs, categories, database-backed APIs, and a modern storefront experience.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/GY-O-REAL-E-Commerce",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 2,
    progress: 45,
    currentFocus: ["Storefront implementation", "Product and category flows", "Database-backed shopping experience"],
    milestones: [
      { title: "Repository and workspace setup", description: "Create the monorepo and development infrastructure.", completed: true },
      { title: "Database foundation", description: "Set up PostgreSQL, Prisma, migrations, and seed data.", completed: true },
      { title: "Catalog API", description: "Implement category and product CRUD endpoints.", completed: true },
      { title: "Storefront", description: "Build the customer-facing product browsing and shopping flows.", completed: false },
    ],
  },
  {
    title: "FoodFoundry",
    slug: "foodfoundry",
    status: "planning",
    shortDescription:
      "A community-focused food showcase and feedback platform for discovering customer preferences.",
    description:
      "FoodFoundry is a planned full-stack web application created to showcase food products and collect direct customer feedback. The platform is designed around a simple experience: introduce the product, let people explore it, and make it easy for visitors to share what they think.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "https://github.com/EllaUktolseja/FoodFoundry",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 3,
    goal: "Create a lightweight digital touchpoint for introducing dessert products, collecting customer feedback, and turning real community responses into useful product insights.",
    scope: [
      "Product showcase and introduction",
      "Customer feedback submission",
      "Feedback data storage and basic analysis",
      "Responsive experience for mobile-first community use",
      "Simple deployment and maintainable backend architecture",
    ],
    timeline: [
      { phase: "Discovery", duration: "Week 1", description: "Validate the target audience, product positioning, feedback questions, and success criteria." },
      { phase: "UX & Architecture", duration: "Week 2", description: "Define the user journey, page structure, API contract, database schema, and visual direction." },
      { phase: "MVP Development", duration: "Weeks 3–4", description: "Build the product showcase, feedback flow, backend API, database, and validation." },
      { phase: "Testing & Iteration", duration: "Week 5", description: "Test the experience with real users, review feedback quality, and improve usability." },
      { phase: "Launch", duration: "Week 6", description: "Deploy the MVP, introduce it to the community, and monitor early responses." },
    ],
  },
  {
    title: "Meatloop",
    slug: "meatloop",
    status: "completed",
    shortDescription:
      "A food marketplace interface concept with a bold, youth-focused visual direction.",
    description:
      "Meatloop is a completed frontend exploration of a food-waste marketplace experience with bold visual hierarchy, responsive cards, and a playful interaction model.",
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
    status: "planning",
    shortDescription:
      "A security research dashboard concept for software supply-chain monitoring.",
    description:
      "A planned research-oriented interface for visualizing software supply-chain components, runtime signals, and anomaly indicators.",
    imageUrl: "",
    liveUrl: "",
    repositoryUrl: "",
    technologies: ["React", "TypeScript", "Node.js", "eBPF"],
    featured: false,
    sortOrder: 5,
    goal: "Explore a practical dashboard concept for correlating expected software supply-chain components with runtime behavioral signals.",
    scope: [
      "SBOM component overview",
      "Runtime event visualization",
      "Anomaly indicator presentation",
      "Service and dependency context",
      "Research-friendly dashboard structure",
    ],
    timeline: [
      { phase: "Research", duration: "Weeks 1–2", description: "Review the problem space, relevant telemetry, SBOM data, and research requirements." },
      { phase: "Concept Design", duration: "Week 3", description: "Define the dashboard information architecture and core monitoring views." },
      { phase: "Prototype", duration: "Weeks 4–6", description: "Build a proof of concept for ingesting and visualizing static and runtime signals." },
      { phase: "Evaluation", duration: "Weeks 7–8", description: "Evaluate the prototype with representative scenarios and refine the presentation." },
    ],
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
