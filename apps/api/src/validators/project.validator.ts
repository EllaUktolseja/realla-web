import { z } from "zod";

export const projectSlugSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Project slug is required")
    .max(100, "Project slug is too long"),
});