import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

function Section({ id, eyebrow, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`border-b border-border/70 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default Section;
