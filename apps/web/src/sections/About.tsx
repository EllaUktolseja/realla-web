import Section from "@/components/Section";

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering with purpose."
    >
      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-muted-foreground leading-8">
          <p>
            I&apos;m a software engineer interested in building reliable,
            maintainable, and scalable web applications.
          </p>

          <p>
            My approach combines product thinking with solid engineering
            fundamentals—from API design and database architecture to frontend
            experience and deployment.
          </p>

          <p>
            I enjoy turning complex requirements into systems that are
            understandable, testable, and practical to maintain.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-sm font-medium">Focus areas</p>

          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Full-stack web development</li>
            <li>REST API architecture</li>
            <li>Database design</li>
            <li>Software engineering practices</li>
            <li>Deployment & infrastructure</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default About;