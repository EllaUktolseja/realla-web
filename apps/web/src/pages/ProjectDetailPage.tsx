import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import { getProjectBySlug } from "@/services/api";
import type { Project } from "@/types/portfolio";

interface ProjectDetailPageProps {
  slug: string;
}

function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProject(null);
    setError(null);
    void getProjectBySlug(slug).then(setProject).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "Project not found.");
    });
  }, [slug]);

  if (error) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Project</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Project not found.</h1>
          <p className="mt-4 text-muted-foreground">{error}</p>
          <a href="/projects" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Back to projects
          </a>
        </section>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <p className="text-sm text-muted-foreground">Loading project...</p>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <article className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
          <a href="/projects" className="text-sm font-semibold text-primary hover:underline">
            ← All projects
          </a>

          <header className="mt-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Project case study</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.description || project.shortDescription}
            </p>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7">
              <div className="flex min-h-[24rem] flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-7 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project preview</span>
                  <span className="text-xs font-medium text-muted-foreground">Portfolio work</span>
                </div>
                <div>
                  <p className="max-w-xl text-4xl font-black tracking-tight">{project.title}</p>
                  <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{project.shortDescription}</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border bg-card p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project snapshot</p>

              <dl className="mt-6 divide-y divide-border">
                <div className="py-4 first:pt-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Technologies</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Status</dt>
                  <dd className="mt-2 font-semibold">{project.featured ? "Featured project" : "Project"}</dd>
                </div>
                <div className="py-4 last:pb-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Links</dt>
                  <dd className="mt-3 flex flex-wrap gap-3">
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
                    {!project.liveUrl && !project.repositoryUrl && (
                      <span className="text-sm text-muted-foreground">Links will be added as the project is published.</span>
                    )}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">01</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Context</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-muted-foreground">{project.shortDescription}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">02</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">What I built</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                {project.description || project.shortDescription}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">03</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Technology</h2>
            </div>
            <div className="flex flex-wrap content-start gap-3">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Next step</p>
            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Want to see more?</h2>
                <p className="mt-2 max-w-xl leading-7 text-muted-foreground">
                  Browse the other projects or get in touch if you’d like to talk about the work.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/projects" className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary/30">
                  All projects
                </a>
                <a href="/contact" className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                  Contact me
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

export default ProjectDetailPage;
