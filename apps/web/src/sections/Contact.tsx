import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import Section from "@/components/Section";
import { getProfile, submitContact } from "@/services/api";
import type { ContactInput, Profile } from "@/types/portfolio";

const initialForm: ContactInput = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<ContactInput>(initialForm);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const response = await submitContact(form);
      setStatus(response.message);
      setForm(initialForm);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to send message.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something useful.">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6 text-muted-foreground">
          <p>
            This is a functional placeholder contact flow. Replace the visual
            treatment with your final design later.
          </p>

          <div className="space-y-3 text-sm">
            {profile?.email && (
              <a
                className="block underline underline-offset-4 hover:text-foreground"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            )}
            {profile?.whatsappUrl && (
              <a
                className="block underline underline-offset-4 hover:text-foreground"
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            )}
            {profile?.linkedinUrl && (
              <a
                className="block underline underline-offset-4 hover:text-foreground"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {profile?.githubUrl && (
              <a
                className="block underline underline-offset-4 hover:text-foreground"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium">Name</span>
              <input
                required
                minLength={2}
                maxLength={100}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium">Email</span>
              <input
                required
                type="email"
                maxLength={254}
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm">
            <span className="font-medium">Subject</span>
            <input
              maxLength={200}
              value={form.subject}
              onChange={(event) =>
                setForm({ ...form, subject: event.target.value })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="font-medium">Message</span>
            <textarea
              required
              minLength={10}
              maxLength={5000}
              rows={7}
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send message"}
          </button>

          {status && (
            <p role="status" className="text-sm text-muted-foreground">
              {status}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

export default Contact;
