import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getSkills } from "@/services/api";
import type { Skill } from "@/types/portfolio";

function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getSkills()
      .then(setSkills)
      .catch(() => setError("Unable to load skills."));
  }, []);

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : skills.length === 0 ? (
        <p className="text-muted-foreground">No skills available yet.</p>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-semibold">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-border px-4 py-3 text-sm"
                    >
                      {skill.name}
                      {skill.level ? (
                        <span className="ml-2 text-muted-foreground">· {skill.level}</span>
                      ) : null}
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
