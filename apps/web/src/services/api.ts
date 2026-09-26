import type { ApiResponse, Experience } from "@/types/portofolio";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse<T>;

  if (!result.success) {
    throw new Error("API request was unsuccessful");
  }

  return result.data;
}

export async function getExperiences(): Promise<Experience[]> {
  return apiFetch<Experience[]>("/experiences");
}