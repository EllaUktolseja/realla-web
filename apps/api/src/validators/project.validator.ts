import { z } from "zod";

export const projectSlugSchema = z.object({
  slug: z.string().trim().min(1).max(100),
});
