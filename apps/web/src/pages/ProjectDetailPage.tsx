import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import { getProjectBySlug } from "@/services/api";
import type { Project } from "@/types/portfolio";

interface ProjectDetailPageProps {
  slug: string;
}

const statusMeta = {
  completed: {
    label: "Completed",
    description: "A finished project with the main scope delivered.",
  },
  ongoing: {
    label: "Ongoing",
    description: "Currently being developed and actively improved.",
  },
  planning: {
    label: "Planning",
    description: "The project is being shaped before active development begins.",
  },
} as const;

function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    void getProjectBySlug(slug)
      .then((item) => {
        if (active) setProject(item);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setProject(null);
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load project.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-sm text-muted-foreground">Loading project...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <a href="/projects" className="text-sm font-semibold text-primary">
            ← Back to projects
          </a>
          <div className="mt-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Project
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Project not found
            </h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              {error ?? "This project does not exist or is no longer available."}
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const status = statusMeta[project.status];
  const completedMilestones =
    project.milestones?.filter((milestone) => milestone.completed).length ?? 0;

  return (
    <>
      <article>
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <a
            href="/projects"
            className="text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            ← Back to projects
          </a>

          <header className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Project
              </p>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {status.label}
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {project.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                  Live demo ↗
                </a>
              )}
              {project.repositoryUrl && (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-primary/5">
                  GitHub ↗
                </a>
              )}
            </div>
          </header>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-muted">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="aspect-[16/9] w-full object-cover" />
            ) : (
              <div className="flex aspect-[16/9] items-end bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7 sm:p-10">
                <div className="max-w-2xl rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {status.label}
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                    {project.title}
                  </p>
                  <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                    {status.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                About
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                The project
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          {project.status === "ongoing" && (
            <>
              <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Current progress
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Where the project is now
                  </h2>
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Overall progress
                    </span>
                    <span className="text-3xl font-black">
                      {project.progress ?? 0}%
                    </span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${project.progress ?? 0}%` }}
                    />
                  </div>
                  {project.currentFocus && project.currentFocus.length > 0 && (
                    <div className="mt-8">
                      <p className="text-sm font-bold">Current focus</p>
                      <ul className="mt-3 space-y-3 text-muted-foreground">
                        {project.currentFocus.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="text-primary">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {project.milestones && project.milestones.length > 0 && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Milestones
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      Development progress
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {completedMilestones} of {project.milestones.length} milestones completed.
                    </p>
                  </div>
                  <div className="space-y-5">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.title} className="rounded-2xl border border-border p-5">
                        <div className="flex items-start gap-4">
                          <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${milestone.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {milestone.completed ? "✓" : "•"}
                          </span>
                          <div>
                            <h3 className="font-bold">{milestone.title}</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {project.status === "planning" && (
            <>
              {project.goal && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Project brief
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      Project goal
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-muted-foreground">
                    {project.goal}
                  </p>
                </div>
              )}

              {project.scope && project.scope.length > 0 && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Scope
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      What we plan to build
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.scope.map((item) => (
                      <div key={item} className="rounded-2xl border border-border bg-card p-5 text-sm font-semibold">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.timeline && project.timeline.length > 0 && (
                <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Timeline
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      Project roadmap
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      A high-level delivery plan that can evolve as the project is validated.
                    </p>
                  </div>
                  <div className="space-y-0">
                    {project.timeline.map((item, index) => (
                      <div key={item.phase} className="relative border-l border-border pb-8 pl-7 last:pb-0">
                        <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <h3 className="font-bold">{index + 1}. {item.phase}</h3>
                          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                            {item.duration}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Stack
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Technologies
              </h2>
            </div>
            <div className="flex flex-wrap content-start gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Explore more
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  More projects
                </h2>
              </div>
              <a href="/projects" className="text-sm font-semibold text-primary transition-colors hover:text-foreground">
                View all projects →
              </a>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

export default ProjectDetailPage;
