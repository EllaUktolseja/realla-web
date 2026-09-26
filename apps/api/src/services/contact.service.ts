import { ContactMessageModel } from "../models/contact-message.model.js";
import type { ContactInput } from "../validators/contact.validator.js";

export async function createContactMessage(input: ContactInput): Promise<void> {
  await ContactMessageModel.create({
    name: input.name,
    email: input.email,
    ...(input.subject ? { subject: input.subject } : {}),
    message: input.message,
  });
}
