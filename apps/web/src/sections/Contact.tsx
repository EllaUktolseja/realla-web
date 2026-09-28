import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import Section from "@/components/Section";
import { getProfile, submitContact } from "@/services/api";
import type { ContactInput, Profile } from "@/types/portfolio";

const initialForm: ContactInput = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<ContactInput>(initialForm);
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setStatusType(null);
    setSubmitting(true);

    try {
      const response = await submitContact(form);
      setStatus(response.message);
      setStatusType("success");
      setForm(initialForm);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send message.");
      setStatusType("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Have an opportunity or just want to say hello?">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-3xl bg-primary p-7 text-primary-foreground sm:p-9">
          <p className="text-sm font-semibold text-primary-foreground/70">Let’s connect</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight">I’m open to learning, contributing, and building.</h3>
          <p className="mt-5 leading-7 text-primary-foreground/75">
            For internship opportunities, project conversations, or engineering discussions, feel free to reach out.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            {profile?.email && <a className="block underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile?.linkedinUrl && <a className="block underline underline-offset-4" href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            {profile?.githubUrl && <a className="block underline underline-offset-4" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {profile?.whatsappUrl && <a className="block underline underline-offset-4" href={profile.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a>}
          </div>
        </div>

        <form className="rounded-3xl border border-border bg-card p-7 sm:p-9" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              <span>Name</span>
              <input
                required
                name="name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Email</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>

          <label className="mt-5 block space-y-2 text-sm font-medium">
            <span>Subject <span className="font-normal text-muted-foreground">(optional)</span></span>
            <input
              name="subject"
              autoComplete="off"
              maxLength={200}
              value={form.subject}
              onChange={(event) => setForm({ ...form, subject: event.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="mt-5 block space-y-2 text-sm font-medium">
            <span>Message</span>
            <textarea
              required
              name="message"
              minLength={10}
              maxLength={5000}
              rows={6}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={submitting} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Sending..." : "Send message"}
            </button>
            {status && (
              <p
                role="status"
                aria-live="polite"
                className={statusType === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}
              >
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}

export default Contact;
