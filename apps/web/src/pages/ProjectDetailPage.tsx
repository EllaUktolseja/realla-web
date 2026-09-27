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
          <a href="/projects" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Back to projects</a>
        </section>
        <Footer />
      </>
    );
  }

  if (!project) {
    return <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 text-muted-foreground">Loading project...</section>;
  }

  return (
    <>
      <article className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
          <a href="/projects" className="text-sm font-semibold text-primary hover:underline">← All projects</a>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7">
                <div className="flex aspect-square flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-7 shadow-lg backdrop-blur">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Case study</span>
                  <div>
                    <p className="text-4xl font-black tracking-tight">{project.title}</p>
                    <p className="mt-3 leading-7 text-muted-foreground">{project.shortDescription}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => <span key={technology} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium">{technology}</span>)}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Live demo ↗</a>}
                {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/30 hover:bg-primary/5">Repository ↗</a>}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Project details</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{project.title}</h1>
              <p className="mt-7 text-lg leading-8 text-muted-foreground">{project.description || project.shortDescription}</p>

              <div className="mt-12 border-t border-border pt-10">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="mt-4 leading-8 text-muted-foreground">{project.description || project.shortDescription}</p>
              </div>

              <div className="mt-10 border-t border-border pt-10">
                <h2 className="text-2xl font-bold">Technology</h2>
                <p className="mt-4 leading-8 text-muted-foreground">Built with the technologies listed above, with the implementation shaped around the project’s goals and constraints.</p>
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
