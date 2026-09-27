import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProfile } from "@/services/api";
import type { Profile } from "@/types/portfolio";

function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  return (
    <Section id="about" eyebrow="About me" title="Curious about how things work — and how to make them better.">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
          <p className="text-lg leading-8 text-foreground/85">
            {profile?.bio ??
              "I’m a computer science student who enjoys turning ideas into working software. My interests sit around full-stack development, backend systems, databases, and the engineering practices that make projects easier to maintain."}
          </p>
          <p className="mt-6 leading-7 text-muted-foreground">
            I’m early in my professional journey, so this portfolio is less about
            claiming expertise and more about showing the work: what I build, how I
            think through problems, and what I’m learning along the way.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["01", "Build & learn", "Turn concepts into working software."],
            ["02", "Full-stack", "Move comfortably across the stack."],
            ["03", "Own the details", "Care about quality beyond the UI."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-3xl border border-border bg-card p-6">
              <span className="text-xs font-bold text-primary">{number}</span>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default About;
