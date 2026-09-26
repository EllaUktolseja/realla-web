function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <p>© {new Date().getFullYear()} Realla. All rights reserved.</p>
      <p>Built with React, TypeScript, Express and MongoDB.</p>
    </footer>
  );
}

export default Footer;
