import { useState } from "react";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#hero" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground transition-transform group-hover:-rotate-3">
            R
          </span>
          <span>Realla<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
        >
          Let’s connect
        </a>

        <button
          type="button"
          className="inline-flex rounded-full border border-border bg-card px-3 py-2 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
