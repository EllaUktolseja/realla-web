function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <p>© {new Date().getFullYear()} Realla. Built with intention.</p>
      <div className="flex gap-5">
        <a href="#hero" className="hover:text-primary">Back to top ↑</a>
        <span>React · TypeScript · Express · MongoDB</span>
      </div>
    </footer>
  );
}

export default Footer;
