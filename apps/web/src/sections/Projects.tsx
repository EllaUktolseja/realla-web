import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getProjects } from "@/services/api";
import type { Project } from "@/types/portfolio";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getProjects()
      .then(setProjects)
      .catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-xl border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                {project.featured && (
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">
                {project.shortDescription}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border border-border px-3 py-1 text-xs">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                {project.liveUrl && (
                  <a className="underline underline-offset-4" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {project.repositoryUrl && (
                  <a className="underline underline-offset-4" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Projects;
