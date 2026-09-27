import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getEducations, getExperiences } from "@/services/api";
import type { Education, Experience as ExperienceData } from "@/types/portfolio";

function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.all([getExperiences(), getEducations()])
      .then(([experienceData, educationData]) => {
        setExperiences(experienceData);
        setEducation(educationData);
      })
      .catch(() => setError("Unable to load background data."));
  }, []);

  return (
    <Section id="experience" eyebrow="Experience & education" title="The work and learning behind the projects.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Experience</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {experiences.length === 0 ? (
              <p className="text-muted-foreground">No experience data available yet.</p>
            ) : (
              <div className="space-y-7">
                {experiences.map((experience) => (
                  <article key={`${experience.company}-${experience.position}-${experience.startDate}`} className="relative pl-7">
                    <span className="absolute left-0 top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
                    <div className="absolute bottom-0 left-[4px] top-5 w-px bg-border" />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{experience.position}</h3>
                        <p className="mt-1 text-muted-foreground">{experience.company}</p>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {new Date(experience.startDate).getFullYear()} —{" "}
                        {experience.current ? "Present" : experience.endDate ? new Date(experience.endDate).getFullYear() : "—"}
                      </p>
                    </div>
                    {experience.location && <p className="mt-3 text-xs text-muted-foreground">{experience.location}</p>}
                    <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{experience.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <span key={technology} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Education</p>
                <h3 className="mt-2 text-xl font-bold">Academic background</h3>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                Student
              </span>
            </div>

            <div className="mt-7 space-y-6">
              {education.length === 0 ? (
                <p className="text-sm text-muted-foreground">No education data available yet.</p>
              ) : (
                education.map((item) => (
                  <article key={`${item.institution}-${item.degree}`}>
                    <h4 className="font-semibold">{item.degree}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                    {item.field && <p className="mt-1 text-sm text-muted-foreground">{item.field}</p>}
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(item.startDate).getFullYear()} — {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                    </p>
                    {item.description && <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>}
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

export default Experience;
