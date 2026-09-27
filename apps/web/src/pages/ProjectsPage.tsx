import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import { getProjects } from "@/services/api";
import type { Project, ProjectStatus } from "@/types/portfolio";

const statusMeta: Record<ProjectStatus, { label: string }> = {
  completed: { label: "Completed" },
  ongoing: { label: "Ongoing" },
  planning: { label: "Planning" },
};

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getProjects()
      .then((items) => setProjects(items))
      .catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Projects
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Things I’ve built, explored, and learned from.
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
            A mix of completed work, projects currently in development, and ideas
            being shaped before the first line of code.
          </p>

          {error ? (
            <p className="mt-10 text-sm text-destructive">{error}</p>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => {
                const status = statusMeta[project.status];

                return (
                  <a
                    key={project.slug}
                    href={`/projects/${encodeURIComponent(project.slug)}`}
                    className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="min-h-56 bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-6">
                      <div className="flex h-full min-h-44 flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            {status.label}
                          </span>
                          <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                            ↗
                          </span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-black tracking-tight">
                            {project.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {project.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      {project.status === "ongoing" && typeof project.progress === "number" && (
                        <div className="mb-5">
                          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                      <p className="mt-5 text-sm font-semibold text-primary">
                        View project details →
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {!error && projects.length === 0 && (
            <p className="mt-10 text-muted-foreground">No projects available yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProjectsPage;
