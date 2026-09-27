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
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">{title}</h2>
          </div>
          <span className="hidden text-xs font-medium text-muted-foreground md:block">Realla / portfolio</span>
        </div>
        <div className="pt-10">{children}</div>
      </div>
    </section>
  );
}

export default Section;
