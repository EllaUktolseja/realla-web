import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getExperiences } from "@/services/api";
import type { Experience as ExperienceData } from "@/types/portfolio";

function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getExperiences()
      .then(setExperiences)
      .catch(() => setError("Unable to load experience data."));
  }, []);

  return (
    <Section id="experience" eyebrow="Experience" title="Where I have worked.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : experiences.length === 0 ? (
        <p className="text-muted-foreground">No experience data available yet.</p>
      ) : (
        <div className="space-y-8">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.position}-${experience.startDate}`}
              className="border-l-2 border-border pl-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{experience.position}</h3>
                  <p className="mt-1 text-muted-foreground">{experience.company}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(experience.startDate).getFullYear()} —{" "}
                  {experience.current
                    ? "Present"
                    : experience.endDate
                      ? new Date(experience.endDate).getFullYear()
                      : "—"}
                </p>
              </div>
              {experience.location && (
                <p className="mt-4 text-sm text-muted-foreground">{experience.location}</p>
              )}
              <p className="mt-4 leading-7 text-muted-foreground">
                {experience.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Experience;
