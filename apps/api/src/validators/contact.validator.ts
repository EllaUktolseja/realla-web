import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must not exceed 254 characters"),

  subject: z
    .string()
    .trim()
    .max(200, "Subject must not exceed 200 characters")
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;