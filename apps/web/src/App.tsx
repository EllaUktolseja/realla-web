import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function renderPage() {
    if (pathname === "/" || pathname === "") return <HomePage />;
    if (pathname === "/experience") return <ExperiencePage />;
    if (pathname === "/tech-stack") return <SkillsPage />;
    if (pathname === "/projects") return <ProjectsPage />;
    if (pathname === "/contact") return <ContactPage />;

    if (pathname.startsWith("/projects/")) {
      const slug = decodeURIComponent(pathname.replace("/projects/", ""));
      return <ProjectDetailPage slug={slug} />;
    }

    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
