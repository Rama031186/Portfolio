import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { portfolio } from "../../data/portfolio";
import { useTraceStore } from "../../store/traceStore";
const categories = Object.keys(portfolio.skills);
const categorySkills = portfolio.skills as Record<string, string[]>;
export default function SkillGraph() {
  const selected = useTraceStore((s) => s.selectedSkill);
  const select = useTraceStore((s) => s.setSelectedSkill);
  const [category, setCategory] = useState(
    () =>
      categories.find((c) => categorySkills[c].includes(selected || "")) ||
      "Backend",
  );
  const nodes: Node[] = [
    {
      id: "tarun",
      position: { x: 350, y: 170 },
      data: { label: "Tarun · Engineer" },
      className: "root-node",
    },
    ...categories.map((c, i) => ({
      id: c,
      position: [
        { x: 30, y: 35 },
        { x: 570, y: 35 },
        { x: 30, y: 300 },
        { x: 570, y: 300 },
        { x: 330, y: 365 },
      ][i],
      data: { label: c },
      className: category === c ? "active-node" : "",
    })),
  ];
  const edges: Edge[] = categories.map((c) => ({
    id: c,
    source: "tarun",
    target: c,
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: category === c ? "#22c55e" : "#52525b" },
  }));
  const used =
    selected === "RAG"
      ? ["RAG Knowledge Engine", "AI Resume Intelligence"]
      : portfolio.projects
          .filter((p) => p.stack.includes(selected || ""))
          .map((p) => p.name);
  return (
    <div className="skills-layout">
      <div>
        <div className="graph-shell">
          <div className="graph-caption">
            <span className="status">Engineering connections</span>
            <span>Click a category to explore</span>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(_, n) => {
              if (n.id !== "tarun") {
                setCategory(n.id);
                select(null);
              }
            }}
            fitView
            minZoom={0.5}
            maxZoom={1.4}
            nodesDraggable={false}
            nodesConnectable={false}
            panOnScroll={false}
            zoomOnScroll={false}
            preventScrolling={false}
            attributionPosition="bottom-left"
          >
            <Background gap={22} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <div className="category-tabs" aria-label="Skill categories">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "selected" : ""}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                select(null);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="skill-buttons">
          {categorySkills[category].map((s) => (
            <button
              key={s}
              onClick={() => select(s)}
              aria-pressed={selected === s}
              className={selected === s ? "selected" : ""}
            >
              {s}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
      <aside className="skill-details" aria-live="polite">
        <span className="eyebrow">Capability details</span>
        <h3>{selected || category}</h3>
        <p>
          {selected
            ? "Connected technologies and project experience."
            : "Select a technology to explore where it fits."}
        </p>
        <span className="eyebrow">Category</span>
        <p>{category}</p>
        <span className="eyebrow">Used in</span>
        {selected ? (
          used.length ? (
            used.map((p) => (
              <p key={p} className="detail-item">
                {p}
              </p>
            ))
          ) : (
            <p>
              {["React", "TypeScript", "JavaScript"].includes(selected)
                ? "TARUN // TRACE portfolio"
                : "Listed in the skills profile; project details to be added."}
            </p>
          )
        ) : (
          <p>Explore a skill to see its connections.</p>
        )}
        <span className="eyebrow">Related technologies</span>
        <div className="tags">
          {(selected === "RAG"
            ? ["LangChain", "Embeddings", "Vector Search", "LLMs"]
            : categorySkills[category].filter((s) => s !== selected).slice(0, 4)
          ).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
