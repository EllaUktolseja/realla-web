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

  const currentProject = projects[active] ?? projects[0];

  return (
    <>
      <Hero />
      <About />

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Navigate / 02</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">A little more about the work.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Four pages, one portfolio. Everything has a place.</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2">
            {overviewLinks.map((item) => (
              <a key={item.href} href={item.href} className="group bg-card p-7 transition-colors hover:bg-muted/50 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] font-bold text-primary">{item.number}</span>
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
                <h3 className="mt-12 text-xl font-black tracking-tight">{item.label}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Selected projects / 03</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">What I’m building.</h2>
            </div>
            <a href="/projects" className="text-sm font-bold hover:text-primary">View all projects ↗</a>
          </div>

          {currentProject ? (
            <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-80 overflow-hidden bg-foreground p-7 sm:p-9">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,oklch(0.55_0.22_293),transparent_35%),linear-gradient(145deg,oklch(0.2_0.03_286),oklch(0.11_0.02_286))]" />
                <div className="relative flex h-full min-h-64 flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Project {String(active + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">{currentProject.title}</p>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{currentProject.shortDescription}</p>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Overview</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">{currentProject.title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{currentProject.description || currentProject.shortDescription}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentProject.technologies.map((technology) => (
                    <span key={technology} className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">{technology}</span>
                  ))}
                </div>
                <a href={`/projects/${encodeURIComponent(currentProject.slug)}`} className="mt-7 inline-flex rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">View details ↗</a>

                <div className="mt-9 flex items-center justify-between border-t border-border pt-5">
                  <div className="flex gap-1.5">
                    {projects.map((project, index) => (
                      <button key={project.slug} type="button" aria-label={`Show ${project.title}`} onClick={() => setActive(index)}
                        className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-primary" : "w-2.5 bg-border"}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" aria-label="Previous project" disabled={projects.length < 2} onClick={() => setActive((value) => (value - 1 + projects.length) % projects.length)}
                      className="grid size-9 place-items-center rounded-full border border-border text-sm transition-colors hover:bg-muted disabled:opacity-40">←</button>
                    <button type="button" aria-label="Next project" disabled={projects.length < 2} onClick={() => setActive((value) => (value + 1) % projects.length)}
                      className="grid size-9 place-items-center rounded-full border border-border text-sm transition-colors hover:bg-muted disabled:opacity-40">→</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-border bg-card p-8 text-muted-foreground">Projects will appear here once the portfolio data is available.</div>
          )}
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
          <div className="overflow-hidden rounded-[2.25rem] bg-foreground p-8 text-background sm:p-12">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Get in touch / 04</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Have an opportunity, project, or a question?</h2>
                <p className="mt-5 max-w-xl leading-7 text-white/55">The contact page has the form and direct links. Let’s start a conversation.</p>
              </div>
              <a href="/contact" className="inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground transition-transform hover:-translate-y-0.5">Open contact page ↗</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
