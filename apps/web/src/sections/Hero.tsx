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
  const bio = profile?.bio ?? "I build thoughtful full-stack web applications while continuously strengthening my software engineering fundamentals.";

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/70">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,oklch(0.91_0.09_293),transparent_27%),radial-gradient(circle_at_10%_35%,oklch(0.96_0.035_293),transparent_24%)]" />
      <div className="pointer-events-none absolute right-[8%] top-24 -z-10 size-64 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute right-[11%] top-28 -z-10 size-52 rounded-full border border-primary/10" />

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-7 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <div className="animate-pulse-ring inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/75 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            Open to internship opportunities
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground sm:mt-8 sm:text-sm">{headline}</p>

          <h1 className="mt-4 max-w-4xl text-[3.15rem] font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-[5.9rem]">
            Building useful
            <span className="block text-primary">software, deliberately.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg">
            Hi, I’m <span className="font-semibold text-foreground">{name}</span>. {bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
            <a href="/projects" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background shadow-xl shadow-foreground/10 transition-all hover:-translate-y-0.5">
              Explore projects <span aria-hidden>↗</span>
            </a>
            <a href="/contact" className="inline-flex items-center rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5">
              Get in touch
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 border-y border-border/80 py-5 sm:mt-12 sm:grid-cols-3">
            {[
              ["01", "Full-stack", "Web development"],
              ["02", "TypeScript", "Primary language"],
              ["03", "Hands-on", "Build & learn"],
            ].map(([number, title, description], index) => (
              <div
                key={number}
                className={
                  index === 1
                    ? "border-border/80 py-4 sm:border-x sm:px-5 sm:py-0 lg:px-8"
                    : index === 0
                      ? "pb-4 sm:pr-5 sm:pb-0 lg:pr-8"
                      : "pt-4 sm:pl-5 sm:pt-0 lg:pl-8"
                }
              >
                <p className="text-[10px] font-bold text-primary">{number}</p>
                <p className="mt-2 text-sm font-bold sm:text-base">{title}</p>
                <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[3rem] bg-primary/10 blur-3xl" />
          <div className="relative rounded-[2.5rem] border border-border bg-card/80 p-3 shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border px-4 pb-3 pt-1">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-300" />
                <span className="size-2.5 rounded-full bg-yellow-300" />
                <span className="size-2.5 rounded-full bg-green-300" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">realla-web / portfolio</span>
            </div>

            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-foreground">
              {profile?.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt={name}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute right-[-15%] top-[-8%] size-64 rounded-full bg-primary/30 blur-3xl" />
                  <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="font-mono text-xs text-white/45">01 — software engineer</p>
                      <p className="mt-10 text-5xl font-black leading-none tracking-[-0.05em] text-white sm:text-6xl">Build.</p>
                      <p className="text-5xl font-black leading-none tracking-[-0.05em] text-primary sm:text-6xl">Learn.</p>
                      <p className="text-5xl font-black leading-none tracking-[-0.05em] text-white sm:text-6xl">Ship.</p>
                    </div>
                    <div className="grid gap-2 font-mono text-[10px] text-white/60">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">✓ React + TypeScript</div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">✓ REST API + MongoDB</div>
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">→ always improving</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="animate-float absolute -bottom-5 -left-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl sm:-left-7">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Currently</p>
            <p className="mt-1 text-sm font-bold">Learning by building</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
