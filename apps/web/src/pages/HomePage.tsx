import { useEffect, useState } from "react";

import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";
import { getProjects } from "@/services/api";
import type { Project } from "@/types/portfolio";

const overviewLinks = [
  { href: "/experience", number: "01", label: "Experience & Education", description: "The background behind the work." },
  { href: "/tech-stack", number: "02", label: "Tech Stack", description: "Tools and technologies I work with." },
  { href: "/projects", number: "03", label: "Projects", description: "A closer look at what I’ve built." },
  { href: "/contact", number: "04", label: "Contact", description: "Opportunities, questions, or a hello." },
];

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    void getProjects().then((items) => setProjects(items.slice(0, 5))).catch(() => undefined);
  }, []);

  const visibleProjects = projects.length ? projects : [];
  const currentProject = visibleProjects[active] ?? visibleProjects[0];

  return (
    <>
      <Hero />
      <About />

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Explore</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Everything else, one click away.</h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {overviewLinks.map((item) => (
              <a key={item.href} href={item.href} className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-bold text-primary">{item.number}</span>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">↗</span>
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-tight">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Selected projects</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A quick look at what I’m building.</h2>
            </div>
            <a href="/projects" className="text-sm font-semibold text-primary hover:underline">View all projects ↗</a>
          </div>

          {currentProject ? (
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-card">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="min-h-72 bg-[linear-gradient(145deg,oklch(0.94_0.035_293),oklch(0.82_0.11_293))] p-7">
                  <div className="flex h-full min-h-64 flex-col justify-between rounded-2xl border border-white/60 bg-white/70 p-7 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project {String(active + 1).padStart(2, "0")}</span>
                      <span className="text-xs text-muted-foreground">{projects.length}/5</span>
                    </div>
                    <div>
                      <p className="text-3xl font-black tracking-tight">{currentProject.title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{currentProject.shortDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Overview</p>
                  <h3 className="mt-2 text-2xl font-bold">{currentProject.title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{currentProject.description || currentProject.shortDescription}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {currentProject.technologies.map((technology) => (
                      <span key={technology} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{technology}</span>
                    ))}
                  </div>
                  <a href={`/projects/${encodeURIComponent(currentProject.slug)}`} className="mt-7 inline-flex rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">View project details ↗</a>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                    <div className="flex gap-2">
                      {projects.map((project, index) => (
                        <button key={project.slug} type="button" aria-label={`Show ${project.title}`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-primary" : "w-3 bg-border"}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button type="button" aria-label="Previous project" disabled={projects.length < 2} onClick={() => setActive((value) => (value - 1 + projects.length) % projects.length)} className="grid size-9 place-items-center rounded-full border border-border disabled:opacity-40">←</button>
                      <button type="button" aria-label="Next project" disabled={projects.length < 2} onClick={() => setActive((value) => (value + 1) % projects.length)} className="grid size-9 place-items-center rounded-full border border-border disabled:opacity-40">→</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-muted-foreground">Projects will appear here once the portfolio data is available.</div>
          )}
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-foreground/65">Get in touch</p>
            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Have an opportunity, project, or just a question?</h2>
                <p className="mt-4 leading-7 text-primary-foreground/75">The full contact page has the form and direct links. I’d be happy to hear from you.</p>
              </div>
              <a href="/contact" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary">Open contact page ↗</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
