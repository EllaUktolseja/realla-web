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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10">
        <a href="/" onClick={(event) => navigate(event, "/")} className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-sm font-black text-background transition-transform group-hover:-rotate-6">
            R
          </span>
          <span className="text-[15px] font-bold tracking-tight">Realla<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1.5 shadow-sm md:flex">
          {links.slice(1).map(([href, label]) => {
            const active = pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));
            return (
              <a key={href} href={href} onClick={(event) => navigate(event, href)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${active ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                {label}
              </a>
            );
          })}
        </nav>

        <a href="/contact" onClick={(event) => navigate(event, "/contact")}
          className="hidden items-center gap-2 rounded-full bg-primary px-4.5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 sm:inline-flex">
          Let’s connect <span aria-hidden>↗</span>
        </a>

        <button type="button" className="inline-flex rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold md:hidden"
          aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([href, label]) => {
              const active = pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));
              return (
                <a key={href} href={href} onClick={(event) => navigate(event, href)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
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
