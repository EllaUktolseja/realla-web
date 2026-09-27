import { useEffect, useState } from "react";

import { getProfile } from "@/services/api";
import type { Profile } from "@/types/portfolio";

function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    void getProfile().then(setProfile).catch(() => undefined);
  }, []);

  const name = profile?.name ?? "Your Name";
  const headline = profile?.headline ?? "Undergraduate Software Engineer";
  const bio =
    profile?.bio ??
    "I build thoughtful full-stack web applications while continuously strengthening my software engineering fundamentals.";

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_72%_18%,oklch(0.91_0.08_293),transparent_32%),radial-gradient(circle_at_18%_30%,oklch(0.96_0.035_293),transparent_28%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            Open to internship opportunities
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {headline}
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Building software,
            <span className="block text-primary">one project at a time.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Hi, I’m <span className="font-semibold text-foreground">{name}</span>. {bio}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-border border-y border-border py-5">
            <div className="pr-4">
              <p className="text-xl font-bold">Full-stack</p>
              <p className="mt-1 text-xs text-muted-foreground">Web development</p>
            </div>
            <div className="px-4">
              <p className="text-xl font-bold">TypeScript</p>
              <p className="mt-1 text-xs text-muted-foreground">Primary language</p>
            </div>
            <div className="pl-4">
              <p className="text-xl font-bold">Hands-on</p>
              <p className="mt-1 text-xs text-muted-foreground">Build & learn</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card p-3 shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-1.5 border-b border-border px-3 pb-3">
              <span className="size-2.5 rounded-full bg-red-300" />
              <span className="size-2.5 rounded-full bg-yellow-300" />
              <span className="size-2.5 rounded-full bg-green-300" />
              <span className="ml-2 text-[10px] text-muted-foreground">realla.dev</span>
            </div>
            <div className="flex aspect-[4/5] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(145deg,oklch(0.96_0.025_293),oklch(0.86_0.08_293))] p-8">
              <div className="w-full rounded-2xl border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur">
                <p className="font-mono text-xs text-primary">~/realla-web</p>
                <p className="mt-6 text-3xl font-black tracking-tight">Build.</p>
                <p className="text-3xl font-black tracking-tight text-primary">Learn.</p>
                <p className="text-3xl font-black tracking-tight">Ship.</p>
                <div className="mt-7 space-y-2 font-mono text-[10px] text-muted-foreground">
                  <p>✓ React + TypeScript</p>
                  <p>✓ REST API + MongoDB</p>
                  <p>✓ Tests + CI</p>
                  <p>→ always improving</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-float absolute -bottom-5 -left-5 rounded-2xl border border-primary/15 bg-card px-4 py-3 shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Currently</p>
            <p className="mt-1 text-sm font-semibold">Learning by building</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
