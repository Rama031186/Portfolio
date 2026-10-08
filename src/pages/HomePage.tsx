import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Activity,
  GitBranch,
  Check,
  ShieldCheck,
  FlaskConical,
  MapPin,
  ChevronRight,
  Layers,
  Cpu,
  Network,
  Github,
  Linkedin,
} from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useTraceStore } from "../store/traceStore";
import {
  Tags,
  SectionHeader,
  ResumeLink,
  ExternalLink,
  Status,
} from "../components/ui";
import { TraceTimeline } from "../components/trace/TraceTimeline";
const SkillGraph = lazy(() => import("../components/skills/SkillGraph"));
export function Hero() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="hero" className="hero observe-section">
      <div className="hero-content">
        <div className="hero-kicker">
          <Status>{active ? "Trace active" : "Initializing"}</Status>
          <span className="kicker-line" />
          <span>ENGINEER PROFILE / 001</span>
        </div>
        <p className="hero-name">{portfolio.profile.name}</p>
        <h1>
          Software Engineer
          <br />
          <span>building intelligent</span>
          <br />
          <span className="hero-last">
            systems<span className="accent">.</span>
          </span>
        </h1>
        <p className="hero-description">
          Thoughtful software. Connected systems.
          <br />
          Turning complex problems into things that work.
        </p>
        <p className="hero-stack">{portfolio.profile.focus.join(" · ")}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore My Work
            <ArrowRight size={17} />
          </a>
          <ResumeLink />
        </div>
        <div className="hero-location">
          <MapPin size={13} />
          {portfolio.profile.location}
          <span> / </span>Software + AI + Data
        </div>
      </div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="floating-label">
          <GitBranch size={13} /> a little context, before the code
        </div>
        <div className="identity-card">
          <div className="identity-top">
            <span>
              <Activity size={15} /> TRACE
            </span>
            <span className="window-dots">● ● ●</span>
          </div>
          <div className="identity-body">
            <span className="eyebrow">operation</span>
            <p className="identity-operation">explore_engineer</p>
            <div className="trace-progress">
              <span className={active ? "activated" : ""} />
            </div>
            <dl>
              <dt>trace_id</dt>
              <dd>tarun.261003.01</dd>
              <dt>environment</dt>
              <dd>production</dd>
              <dt>status</dt>
              <dd>
                <Status>{active ? "ACTIVE" : "INITIALIZING"}</Status>
              </dd>
              <dt>specialization</dt>
              <dd>Software + AI + Data</dd>
              <dt>location</dt>
              <dd>Bengaluru, India</dd>
            </dl>
          </div>
          <div className="identity-bottom">
            <span className="status">
              <Check size={12} /> Profile resolved
            </span>
            <span>v.01</span>
          </div>
        </div>
        <div className="trace-caption">
          <span className="tiny-node" /> One engineer. Many connected ideas.
        </div>
      </motion.div>
      <a className="hero-scroll" href="#explore">
        <ArrowDown size={14} /> SCROLL TO EXPLORE<span>01 — 07</span>
      </a>
    </section>
  );
}
export function TraceOverview() {
  const active = useTraceStore((s) => s.activeSpan);
  const order = [
    "hero",
    "projects",
    "experience",
    "skills",
    "credentials",
    "lab",
    "contact",
  ];
  return (
    <section id="explore" className="explore-section">
      <div>
        <div className="eyebrow">THE BIG PICTURE</div>
        <h2>
          Explore Tarun<span className="accent">.</span>
        </h2>
        <p>
          A connected view of my work,
          <br />
          experience and engineering toolkit.
        </p>
        <code className="operation-label">operation: explore_engineer</code>
      </div>
      <TraceTimeline
        spans={portfolio.trace.map((s) => ({
          ...s,
          status:
            s.targetSection === active
              ? "active"
              : order.indexOf(s.targetSection) < order.indexOf(active)
                ? "complete"
                : "idle",
        }))}
      />
    </section>
  );
}
export function Projects({ all = false }: { all?: boolean }) {
  return (
    <section id="projects" className="section observe-section">
      <SectionHeader
        number="01"
        title="Selected Engineering"
        subtitle="service.map / selected_projects"
      >
        <Link className="text-link" to={all ? "/" : "/projects"}>
          {all ? "Back to overview" : "All projects"}
          <ArrowUpRight size={15} />
        </Link>
      </SectionHeader>
      <p className="section-intro">
        From production services to applied AI. A closer look at the systems I
        build.
      </p>
      <div className="projects-list">
        {portfolio.projects.slice(0, all ? 4 : 3).map((p, i) => (
          <article className="project-card" key={p.slug}>
            <div className="project-content">
              <div className="project-meta">
                <span className="project-number">0{i + 1}</span>
                <span>{p.category}</span>
              </div>
              <h3>
                <Link to={`/projects/${p.slug}`}>{p.name}</Link>
              </h3>
              <p className="project-subtitle">{p.subtitle}</p>
              <p>{p.description}</p>
              <Tags items={p.stack} />
              <div className="project-actions">
                <Link className="text-link" to={`/projects/${p.slug}`}>
                  {i === 0
                    ? "View Case Study"
                    : i === 1
                      ? "Explore System"
                      : "Explore Pipeline"}
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  className="muted-link"
                  to={`/projects/${p.slug}#execution`}
                >
                  Trace Request
                  <GitBranch size={14} />
                </Link>
              </div>
            </div>
            <div
              className={`mini-trace mini-trace-${i}`}
              aria-label={`${p.name} processing stages`}
            >
              <div className="mini-trace-heading">
                <span>
                  {i === 0 ? (
                    <Network size={14} />
                  ) : i === 1 ? (
                    <Cpu size={14} />
                  ) : (
                    <Layers size={14} />
                  )}{" "}
                  SYSTEM PREVIEW
                </span>
                <span>0{p.steps.length} SPANS</span>
              </div>
              {p.steps.map((step, j) => (
                <div className="mini-step" key={step}>
                  <span className="step-dot" />
                  <code>{step}</code>
                  <Check size={12} />
                  {j < p.steps.length - 1 && (
                    <span className="step-connector" />
                  )}
                </div>
              ))}
              <div className="mini-trace-footer">
                <span className="status">
                  <Check size={11} /> Conceptual pipeline
                </span>
                <ArrowRight size={14} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Experience() {
  const [view, setView] = useState("Summary");
  return (
    <section id="experience" className="section observe-section">
      <SectionHeader
        number="02"
        title="Execution History"
        subtitle="Experience"
      >
        <div className="segmented" aria-label="Experience view">
          {["Summary", "Trace"].map((v) => (
            <button
              key={v}
              aria-pressed={view === v}
              className={view === v ? "selected" : ""}
              onClick={() => setView(v)}
            >
              {v === "Trace" && <GitBranch size={13} />} {v}
            </button>
          ))}
        </div>
      </SectionHeader>
      <div className="experience-list">
        {portfolio.experience.map((e, i) => (
          <article key={e.id} className="experience-item">
            <div className="experience-date">
              <span className={`experience-dot ${i === 0 ? "current" : ""}`} />
              <span>
                {e.start} — {e.end}
              </span>
              <small>{e.location}</small>
            </div>
            <div className="experience-body">
              <div className="experience-company">
                <h3>{e.company}</h3>
                {i === 0 && <Status>Current</Status>}
              </div>
              <h4>{e.role}</h4>
              <p>{e.summary}</p>
              <Tags items={e.stack} />
              {view === "Trace" && (
                <div className="experience-trace">
                  <code>professional_experience.{e.id}</code>
                  <p>
                    Conceptual engineering events · not chronological telemetry
                  </p>
                  {e.events.map((event) => (
                    <div key={event}>
                      <Check size={13} />
                      <code>{event}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Skills() {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={section} id="skills" className="section observe-section">
      <SectionHeader
        number="03"
        title="Engineering Map"
        subtitle="capability_graph"
      />
      <p className="section-intro">
        A toolkit built around the problem. Explore the connections.
      </p>
      <Suspense fallback={<p className="panel">Loading interactive map…</p>}>
        <>
          {ready ? (
            <SkillGraph />
          ) : (
            <div className="skills-preview">
              {Object.entries(portfolio.skills).map(([category, skills]) => (
                <div key={category}>
                  <h3>{category}</h3>
                  <Tags items={skills} />
                </div>
              ))}
            </div>
          )}
        </>
      </Suspense>
    </section>
  );
}
export function Credentials() {
  return (
    <section id="credentials" className="section observe-section">
      <SectionHeader
        number="04"
        title="Verified Signals"
        subtitle="Credentials / verify_credentials"
      />
      <div className="credentials-grid">
        {portfolio.credentials.map((c) => (
          <article className="credential-card" key={c.name}>
            <div className="credential-top">
              <div className="credential-icon">
                <ShieldCheck size={23} />
              </div>
              <span className="eyebrow">MICROSOFT</span>
            </div>
            <h3>{c.name}</h3>
            <p>{c.area}</p>
            <div className="credential-bottom">
              {c.url ? (
                <ExternalLink href={c.url}>View credential</ExternalLink>
              ) : (
                <span>Verification link pending</span>
              )}
              <span>{c.code}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="data-note">
        Credentials shown as supplied in the portfolio brief. Verification links
        can be added to the profile data.
      </p>
      {portfolio.secondaryCredentials.length > 0 && (
        <Tags items={portfolio.secondaryCredentials} />
      )}
    </section>
  );
}
export function Lab() {
  return (
    <section id="lab" className="section observe-section">
      <SectionHeader
        number="05"
        title="Engineering Lab"
        subtitle="Experiments / work_in_progress"
      />
      <p className="section-intro">
        Small experiments. Big ideas made tangible.
      </p>
      <div className="lab-grid">
        {portfolio.lab.map((l, i) => (
          <article key={l} className="lab-card">
            <FlaskConical size={20} />
            <span className="eyebrow">EXPERIMENT 0{i + 1}</span>
            <h3>{l}</h3>
            <span className="coming-soon">Coming soon</span>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <section id="contact" className="contact-section observe-section">
      <div className="contact-top">
        <Status complete>Trace complete</Status>
        <code>explore_engineer</code>
      </div>
      <div className="contact-layout">
        <div>
          <div className="eyebrow">THE NEXT CONNECTION</div>
          <h2>
            Great systems start
            <br />
            with a conversation<span className="accent">.</span>
          </h2>
          <p>
            Have an interesting problem to solve?
            <br />
            Let's talk about what we can build.
          </p>
          <div className="hero-actions">
            <ExternalLink
              className="button primary"
              href={portfolio.profile.linkedin}
            >
              Contact Tarun
            </ExternalLink>
            <ResumeLink label="Download Resume" />
          </div>
        </div>
        <div className="signals">
          <div className="eyebrow">Signals discovered</div>
          {portfolio.signals.map((s) => (
            <div key={s}>
              <Check size={14} />
              {s}
            </div>
          ))}
          <div className="contact-socials">
            <ExternalLink href={portfolio.profile.github}>
              <Github size={15} />
              GitHub
            </ExternalLink>
            <ExternalLink href={portfolio.profile.linkedin}>
              <Linkedin size={15} />
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
      {portfolio.profile.email && (
        <a className="text-link" href={`mailto:${portfolio.profile.email}`}>
          {portfolio.profile.email}
          <ChevronRight size={15} />
        </a>
      )}
    </section>
  );
}
export default function HomePage() {
  return (
    <>
      <Hero />
      <TraceOverview />
      <Projects />
      <Experience />
      <Skills />
      <Credentials />
      <Lab />
      <Contact />
    </>
  );
}
