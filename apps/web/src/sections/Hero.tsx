function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center border-b"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Software Engineer
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Building reliable software with thoughtful engineering.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            I design and build modern web applications with a focus on
            maintainable architecture, scalable systems, and meaningful user
            experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View projects
            </a>

            <a
              href="#contact"
              className="inline-flex items-center rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;