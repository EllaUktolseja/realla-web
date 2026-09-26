import { useEffect, useState } from "react";

import type { Profile } from "@/types/portfolio";
import { getProfile } from "@/services/api";

function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <section id="hero" className="flex min-h-[calc(100svh-4rem)] items-center border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {profile?.headline ?? "Software Engineer"}
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {profile?.name
              ? `Hi, I’m ${profile.name}.`
              : "Building reliable software with thoughtful engineering."}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile?.bio ??
              "I design and build maintainable web applications with a focus on sound architecture, practical systems, and meaningful user experiences."}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
