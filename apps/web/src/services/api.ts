import type {
  ApiResponse,
  ContactInput,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/portfolio";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
      ...options?.headers,
    },
  });

  let result: ApiResponse<T>;

  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.error?.message ?? `API request failed: ${response.status}`,
    );
  }

  return result.data;
}

export function getProfile(): Promise<Profile> {
  return apiFetch<Profile>("/profile");
}

export function getExperiences(): Promise<Experience[]> {
  return apiFetch<Experience[]>("/experiences");
}

export function getEducations(): Promise<Education[]> {
  return apiFetch<Education[]>("/educations");
}

export function getSkills(): Promise<Skill[]> {
  return apiFetch<Skill[]>("/skills");
}

export function getProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/projects");
}

export function getProjectBySlug(slug: string): Promise<Project> {
  return apiFetch<Project>(`/projects/${encodeURIComponent(slug)}`);
}

export function submitContact(input: ContactInput): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
