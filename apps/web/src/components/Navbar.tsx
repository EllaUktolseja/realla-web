import { useEffect, useState, type MouseEvent } from "react";

const links = [
  ["/", "Home"],
  ["/experience", "Experience"],
  ["/tech-stack", "Tech Stack"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("/") || href.includes("://")) return;

    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="/" onClick={(event) => navigate(event, "/")} className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground transition-transform group-hover:-rotate-3">
            R
          </span>
          <span>Realla<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 md:flex">
          {links.slice(1).map(([href, label]) => {
            const active = pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));

            return (
              <a
                key={href}
                href={href}
                onClick={(event) => navigate(event, href)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <a
          href="/contact"
          onClick={(event) => navigate(event, "/contact")}
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
            {links.map(([href, label]) => {
              const active = pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));

              return (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => navigate(event, href)}
                  className={`rounded-xl px-3 py-3 text-sm font-medium ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
