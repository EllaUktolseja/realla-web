import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getSkills } from "@/services/api";
import type { Skill } from "@/types/portfolio";

function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getSkills().then(setSkills).catch(() => setError("Unable to load skills."));
  }, []);

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <Section id="skills" eyebrow="Toolkit" title="Technologies I use to turn ideas into software.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : skills.length === 0 ? (
        <p className="text-muted-foreground">No skills available yet.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-bold">{category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <span key={skill.name} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium">
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Skills;
