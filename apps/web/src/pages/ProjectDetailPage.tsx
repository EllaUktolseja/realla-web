import { useEffect, useState } from "react";

import Footer from "@/sections/Footer";
import type { Project } from "@/types/portfolio";

interface ProjectDetailPageProps {
  slug: string;
}

const dummyProjects: Record<string, Project> = {
  "realla-web": {
    title: "Realla Web",
    slug: "realla-web",
    shortDescription:
      "A modern full-stack portfolio website built to showcase experience, projects, and technical skills.",
    description:
      "Realla Web is a personal portfolio platform designed with a clean and focused interface. The project combines a React frontend with a REST API and MongoDB backend, giving the portfolio a real full-stack architecture instead of a static presentation site.",
    imageUrl: undefined,
    liveUrl: "https://example.com",
    repositoryUrl: "https://github.com/EllaUktolseja/realla-web",
    technologies: ["React", "TypeScript", "Vite", "Express", "MongoDB"],
    featured: true,
    sortOrder: 1,
  },
  foodfoundry: {
    title: "FoodFoundry",
    slug: "foodfoundry",
    shortDescription:
      "A community-focused food showcase and feedback platform for discovering customer preferences.",
    description:
      "FoodFoundry is a full-stack web application created to showcase food products and collect direct customer feedback. The platform is designed around a simple experience: introduce the product, let people explore it, and make it easy for visitors to share what they think.",
    imageUrl: undefined,
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    featured: true,
    sortOrder: 2,
  },
};

function getDummyProject(slug: string): Project {
  return (
    dummyProjects[slug] ?? {
      title: "Project Showcase",
      slug,
      shortDescription:
        "A selected project from my development work and learning journey.",
      description:
        "This project is part of my ongoing work building practical full-stack applications with modern web technologies. More details will be added as the project develops.",
      technologies: ["React", "TypeScript", "Node.js"],
      featured: false,
      sortOrder: 99,
    }
  );
}

function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Temporary dummy data. Replace this with getProjectBySlug(slug)
    // when the project API data is ready.
    setProject(getDummyProject(slug));
  }, [slug]);

  if (!project) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-sm text-muted-foreground">Loading project...</p>
        </section>
        <Footer />
      </>
    );
  }

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
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Project
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {project.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Live demo ↗
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </header>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-muted">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="aspect-[16/9] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/9] items-end bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7 sm:p-10">
                <div className="max-w-2xl rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg backdrop-blur sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Project preview
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                    {project.title}
                  </p>
                  <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                    {project.shortDescription}
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
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>

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
                <span
                  key={technology}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground"
                >
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
              <a
                href="/projects"
                className="text-sm font-semibold text-primary transition-colors hover:text-foreground"
              >
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
