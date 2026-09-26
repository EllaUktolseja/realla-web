export interface Profile {
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
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

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  technologies: string[];
  featured: boolean;
  sortOrder: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}