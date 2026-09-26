import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`border-b ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default Section;