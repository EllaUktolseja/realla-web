import nodemailer from "nodemailer";

import { env } from "../config/env.js";
import { ContactMessageModel } from "../models/contact-message.model.js";
import type { ContactInput } from "../validators/contact.validator.js";

function getTransporter() {
  if (!env.SMTP_USER || !env.SMTP_PASS || !env.CONTACT_EMAIL) {
    throw new Error("Contact email delivery is not configured");
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

export async function createContactMessage(input: ContactInput): Promise<void> {
  await ContactMessageModel.create({
    name: input.name,
    email: input.email,
    ...(input.subject ? { subject: input.subject } : {}),
    message: input.message,
  });

  const transporter = getTransporter();

  await transporter.sendMail({
    from: env.SMTP_USER,
    to: env.CONTACT_EMAIL,
    replyTo: input.email,
    subject: input.subject?.trim() || "Portfolio contact from " + input.name,
    text: [
      "Name: " + input.name,
      "Email: " + input.email,
      input.subject ? "Subject: " + input.subject : "",
      "",
      input.message,
    ].filter(Boolean).join("\n"),
  });
}
