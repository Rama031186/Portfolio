import { lazy, Suspense, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { Tags, SectionHeader, ExternalLink } from "../components/ui";
import { ProjectTraceViewer } from "../components/projects/ProjectTraceViewer";
import { useTraceStore } from "../store/traceStore";
const ProjectArchitecture = lazy(
  () => import("../components/projects/ProjectArchitecture"),
);
export default function ProjectPage() {
  const { slug } = useParams();
  const project = portfolio.projects.find((p) => p.slug === slug);
  const select = useTraceStore((s) => s.setSelectedProject);
  useEffect(() => {
    select(slug || null);
    document.title = project
      ? `${project.name} | Tarun Mangalampalli`
      : "Project not found | Tarun Mangalampalli";
    return () => {
      select(null);
      document.title = "Tarun Mangalampalli | Software Engineer";
    };
  }, [slug, project, select]);
  if (!project)
    return (
      <div className="not-found">
        <h1>Project not found.</h1>
        <Link to="/projects">
          Explore projects <ArrowUpRight size={16} />
        </Link>
      </div>
    );
  return (
    <div className="project-page">
      <Link className="text-link" to="/projects">
        <ArrowLeft size={16} />
        All projects
      </Link>
      <header className="project-header">
        <span className="eyebrow">CASE STUDY / {project.category}</span>
        <h1>{project.name}</h1>
        <p>{project.subtitle}</p>
        <Tags items={project.stack} />
      </header>
      <div className="case-overview">
        <section>
          <span className="eyebrow">01 / Problem</span>
          <h2>The problem to solve.</h2>
          <p>{project.problem}</p>
        </section>
        <section>
          <span className="eyebrow">02 / Solution</span>
          <h2>A connected approach.</h2>
          <p>{project.solution}</p>
        </section>
      </div>
      <section className="detail-section">
        <SectionHeader
          number="03"
          title="System Architecture"
          subtitle="component.map"
        />
        <p className="section-intro">
          A conceptual system view. Select a component to explore its role.
        </p>
        <Suspense fallback={<p>Loading architecture…</p>}>
          <ProjectArchitecture project={project} />
        </Suspense>
      </section>
      <section id="execution" className="detail-section">
        <SectionHeader
          number="04"
          title="Execution Trace"
          subtitle="request.lifecycle"
        />
        <p className="section-intro">
          Follow a sample request. Select a stage to inspect its details.
        </p>
        <ProjectTraceViewer key={project.slug} trace={project.trace} />
      </section>
      <div className="case-overview">
        <section>
          <span className="eyebrow">05 / Engineering decisions</span>
          <h2>Designed with intent.</h2>
          <ul>
            {project.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
        <section>
          <span className="eyebrow">06 / Challenges</span>
          <h2>The interesting parts.</h2>
          <p>{project.challenges}</p>
        </section>
      </div>
      <section className="detail-section">
        <SectionHeader number="07" title="Technology" subtitle="toolkit" />
        <Tags items={project.stack} />
      </section>
      <section className="repository-panel">
        <div>
          <h3>Continue exploring</h3>
          <p>
            {project.repository || project.demo
              ? "Explore the project beyond this case study."
              : project.slug === "payment-compliance"
                ? "Professional work overview. Source code and client details are private."
                : "Repository and demo links have not been supplied yet."}
          </p>
        </div>
        {project.repository && (
          <ExternalLink href={project.repository}>Repository</ExternalLink>
        )}
        {project.demo && (
          <ExternalLink href={project.demo}>Live demo</ExternalLink>
        )}
        <Link className="button secondary" to="/contact">
          Get in touch
          <ArrowUpRight size={16} />
        </Link>
      </section>
    </div>
  );
}
