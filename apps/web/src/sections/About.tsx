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
    <Section id="about" eyebrow="About" title="Engineering with purpose.">
      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 leading-8 text-muted-foreground">
          <p>
            {profile?.bio ??
              "I’m a software engineer interested in building reliable, maintainable, and scalable web applications."}
          </p>
          <p>
            This placeholder content is intentionally simple. Replace it with
            your real story, achievements, and engineering philosophy when the
            final visual design is applied.
          </p>
        </div>

        <div className="rounded-xl border border-border p-6">
          <p className="text-sm font-medium">Focus areas</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Full-stack web development</li>
            <li>REST API architecture</li>
            <li>Database design</li>
            <li>Software engineering practices</li>
            <li>Deployment & infrastructure</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default About;
