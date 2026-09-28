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
    void getProjects().then(setProjects).catch(() => setError("Unable to load projects."));
  }, []);

  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Selected work / 01</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Projects with a reason to exist.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Completed work, active builds, and ideas still taking shape — each project is a snapshot of how I approach software.
            </p>
          </div>

          {error ? (
            <p className="mt-12 text-sm text-destructive">{error}</p>
          ) : (
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => {
                const status = statusMeta[project.status] ?? {
                  label: "Project",
                };
                return (
                  <a key={project.slug} href={`/projects/${encodeURIComponent(project.slug)}`}
                    className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/8">
                    <div className="relative min-h-72 overflow-hidden bg-foreground p-5 sm:min-h-80 sm:p-7">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,oklch(0.55_0.22_293),transparent_30%),linear-gradient(145deg,oklch(0.22_0.03_286),oklch(0.12_0.02_286))]" />
                      <div className="relative flex h-full min-h-64 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:min-h-72 sm:p-7">
                        <div className="flex items-center justify-between gap-4">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                            {String(index + 1).padStart(2, "0")} / {status.label}
                          </span>
                          <span className="text-xl text-white/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-primary-foreground/50">{project.slug}</p>
                          <h2 className="mt-2 max-w-xl text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{project.title}</h2>
                          <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">{project.shortDescription}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      {project.status === "ongoing" && typeof project.progress === "number" && (
                        <div className="mb-6">
                          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            <span>Progress</span><span>{project.progress}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                            {technology}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                        <span className="text-sm font-bold">View project</span>
                        <span className="text-sm font-bold text-primary transition-transform group-hover:translate-x-1">Details →</span>
                      </div>
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
