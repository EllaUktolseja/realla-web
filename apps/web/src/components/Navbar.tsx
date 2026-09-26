import { useState } from "react";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#hero" className="font-semibold tracking-tight">
          Realla.
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex">
          <a
            href="#contact"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Contact me
          </a>
        </div>

        <button
          type="button"
          className="inline-flex rounded-md border border-border px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
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
