import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  X,
  Command,
  Search,
  ArrowRight,
} from "lucide-react";
import HomePage, {
  Projects,
  Experience,
  Skills,
  Credentials,
  Lab,
  Contact,
} from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import { portfolio } from "./data/portfolio";
import { useTraceStore } from "./store/traceStore";
import { ExternalLink } from "./components/ui";
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const setActive = useTraceStore((s) => s.setActiveSpan);
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
    const sections = [
      ...document.querySelectorAll<HTMLElement>(".observe-section"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname, hash, setActive]);
  return null;
}
function Navbar({ onCommand }: { onCommand: () => void }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = useTraceStore((s) => s.activeSpan);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("trace-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("trace-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Tarun Trace home">
          <span className="brand-mark">
            <Activity size={18} />
          </span>
          TARUN <span className="brand-slash">//</span>{" "}
          <span className="brand-trace">TRACE</span>
        </Link>
        <nav
          id="mobile-menu"
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
        >
          {portfolio.navigation.map((n) => (
            <Link
              key={n.id}
              to={pathname === "/" ? `/#${n.id}` : `/${n.id}`}
              className={
                (
                  pathname === "/"
                    ? active === n.id
                    : pathname.startsWith(`/${n.id}`)
                )
                  ? "active"
                  : ""
              }
              aria-current={
                (
                  pathname === "/"
                    ? active === n.id
                    : pathname.startsWith(`/${n.id}`)
                )
                  ? "location"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            className="mobile-contact"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button command-trigger"
            onClick={onCommand}
            aria-label="Open command palette"
          >
            <Command size={15} />
            <span>K</span>
          </button>
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="icon-button nav-social"
            href={portfolio.profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (opens in new tab)"
          >
            <Github size={17} />
          </a>
          <a
            className="icon-button nav-social"
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn (opens in new tab)"
          >
            <Linkedin size={17} />
          </a>
          {portfolio.profile.resume ? (
            <a className="nav-resume" href={portfolio.profile.resume}>
              Resume
            </a>
          ) : (
            <span className="nav-resume muted" title="Resume coming soon">
              Resume
            </span>
          )}
          <Link className="nav-contact" to="/contact">
            Contact
            <ArrowUpRight size={14} />
          </Link>
          <button
            className="icon-button mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
function CommandPalette({ open, close }: { open: boolean; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (open) {
      setQuery("");
      dialog.current?.showModal();
      input.current?.focus();
    } else dialog.current?.close();
  }, [open]);
  const commands = [
    { label: "Go to Projects", href: "/#projects" },
    { label: "Go to Experience", href: "/#experience" },
    { label: "Explore Skills", href: "/#skills" },
    { label: "Download Resume", href: portfolio.profile.resume },
    { label: "Open GitHub", href: portfolio.profile.github },
    { label: "Open LinkedIn", href: portfolio.profile.linkedin },
    { label: "Contact Tarun", href: "/contact" },
  ].filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <dialog
      ref={dialog}
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      className="command-dialog"
      aria-label="Navigation command palette"
    >
      <div className="command-search">
        <Search size={20} />
        <input
          ref={input}
          placeholder="Where would you like to go?"
          aria-label="Search commands"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              dialog.current
                ?.querySelector<HTMLElement>(".command-results a")
                ?.focus();
            }
          }}
        />
        <button
          className="icon-button"
          onClick={close}
          aria-label="Close command palette"
        >
          <X size={18} />
        </button>
      </div>
      <div
        className="command-results"
        onKeyDown={(e) => {
          if (["ArrowDown", "ArrowUp"].includes(e.key)) {
            const links = [
              ...dialog.current!.querySelectorAll<HTMLAnchorElement>(
                ".command-results a",
              ),
            ];
            const index = links.indexOf(
              document.activeElement as HTMLAnchorElement,
            );
            e.preventDefault();
            links[
              (index + (e.key === "ArrowDown" ? 1 : -1) + links.length) %
                links.length
            ]?.focus();
          }
        }}
      >
        {commands.length ? (
          commands.map((c) =>
            c.href ? (
              c.href.startsWith("http") || c.label === "Download Resume" ? (
                <a
                  key={c.label}
                  href={c.href}
                  download={c.label === "Download Resume" || undefined}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                >
                  {c.label}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <Link key={c.label} to={c.href} onClick={close}>
                  {c.label}
                  <ArrowRight size={16} />
                </Link>
              )
            ) : (
              <div className="unavailable-command" key={c.label}>
                {c.label}
                <span>File not yet supplied</span>
              </div>
            ),
          )
        ) : (
          <p>No matching commands.</p>
        )}
      </div>
      <div className="command-hint">
        ↑ ↓ Navigate · Enter to open · Esc to close
      </div>
    </dialog>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <Link to="/" className="brand">
          TARUN <span className="brand-slash">//</span> TRACE
        </Link>
        <p>
          Built with React + TypeScript.
          <br />
          Designed as an open-source engineering portfolio.
        </p>
      </div>
      <div className="footer-links">
        <ExternalLink href={portfolio.profile.github}>GitHub</ExternalLink>
        <ExternalLink href={portfolio.profile.linkedin}>LinkedIn</ExternalLink>
        {portfolio.profile.email ? (
          <a href={`mailto:${portfolio.profile.email}`}>Email</a>
        ) : (
          <span title="Email address not yet supplied">Email pending</span>
        )}
        {portfolio.profile.source ? (
          <ExternalLink href={portfolio.profile.source}>
            View source
          </ExternalLink>
        ) : (
          <span title="Repository URL not yet supplied">
            Source link pending
          </span>
        )}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Tarun Mangalampalli</span>
        <code>End of trace. Beginning of a conversation.</code>
      </div>
    </footer>
  );
}
export default function App() {
  const [command, setCommand] = useState(false);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar onCommand={() => setCommand(true)} />
      <main id="main" className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <div className="route-page">
                <h1 className="sr-only">Projects</h1>
                <Projects all />
              </div>
            }
          />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          {[
            ["experience", Experience],
            ["skills", Skills],
            ["credentials", Credentials],
            ["lab", Lab],
            ["contact", Contact],
          ].map(([path, Component]) => {
            const Page = Component as typeof Experience;
            return (
              <Route
                key={path as string}
                path={`/${path}`}
                element={
                  <div className="route-page">
                    <h1 className="sr-only">{String(path)}</h1>
                    <Page />
                  </div>
                }
              />
            );
          })}
          <Route
            path="*"
            element={
              <div className="not-found">
                <span className="eyebrow">404 / unresolved_route</span>
                <h1>This trace ends here.</h1>
                <p>The page you're looking for couldn't be found.</p>
                <Link className="button primary" to="/">
                  Back to overview
                  <ArrowRight size={16} />
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <div className="container">
        <Footer />
      </div>
      <CommandPalette open={command} close={() => setCommand(false)} />
    </>
  );
}
