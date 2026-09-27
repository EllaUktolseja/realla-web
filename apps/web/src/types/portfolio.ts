export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsappUrl?: string;
  resumeUrl?: string;
}

export interface Experience {
  company: string;
  position: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: string;
  level?: string;
  yearsOfExperience?: number;
  sortOrder: number;
}

export type ProjectStatus = "completed" | "ongoing" | "planning";

export interface ProjectMilestone {
  title: string;
  description: string;
  completed: boolean;
}

export interface ProjectTimelineItem {
  phase: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  shortDescription: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
  progress?: number;
  currentFocus?: string[];
  milestones?: ProjectMilestone[];
  goal?: string;
  scope?: string[];
  timeline?: ProjectTimelineItem[];
}

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}
