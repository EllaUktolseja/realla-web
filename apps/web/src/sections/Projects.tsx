import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProjects } from "@/services/api";
import type { Project } from "@/types/portfolio";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getProjects().then(setProjects).catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <Section id="projects" eyebrow="Selected work" title="Projects that show how I learn by building.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects available yet.</p>
      ) : (
        <div className="space-y-7">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-all hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="min-h-64 bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7">
                  <div className="flex h-full min-h-56 flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {project.featured ? "Featured project" : `Project 0${index + 1}`}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                        {project.technologies[0] ?? "Web"}
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-black tracking-tight">{project.title}</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Case study</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h3>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">0{index + 1}</span>
                  </div>

                  <p className="mt-5 leading-7 text-muted-foreground">{project.description || project.shortDescription}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                        Live demo ↗
                      </a>
                    )}
                    {project.repositoryUrl && (
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/30 hover:bg-primary/5">
                        Repository ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Projects;
