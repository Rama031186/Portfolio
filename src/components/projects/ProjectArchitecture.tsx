import { useState } from "react";
import { ReactFlow, Background, Controls, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Project } from "../../types/portfolio";
export default function ProjectArchitecture({ project }: { project: Project }) {
  const parts = [
    {
      id: "client",
      label: "Client",
      description: "Receives user input and presents results.",
    },
    {
      id: "api",
      label: project.stack.includes("Java")
        ? "REST / gRPC API"
        : "Application API",
      description: "Validates input and coordinates the request boundary.",
    },
    { id: "service", label: "Business service", description: project.solution },
    {
      id: "database",
      label:
        project.stack.find((s) =>
          ["PostgreSQL", "Qdrant", "ChromaDB"].includes(s),
        ) || "Expense data",
      description:
        "Stores or retrieves the structured information needed by the workflow.",
    },
    {
      id: "external",
      label: project.stack.includes("Gemini Vision")
        ? "Gemini / Wallet API"
        : "Evaluation / AI",
      description:
        "Provides evaluation, reasoning or generation for the processing pipeline.",
    },
  ];
  const [selected, setSelected] = useState(parts[2]);
  const positions = [
    { x: 250, y: 0 },
    { x: 250, y: 95 },
    { x: 250, y: 190 },
    { x: 60, y: 300 },
    { x: 440, y: 300 },
  ];
  const nodes = parts.map((p, i) => ({
    id: p.id,
    data: { label: p.label },
    position: positions[i],
    className: selected.id === p.id ? "active-node" : "",
  }));
  const edges = [
    ["client", "api"],
    ["api", "service"],
    ["service", "database"],
    ["service", "external"],
  ].map(([source, target]) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#71717a" },
  }));
  return (
    <div className="architecture">
      <div className="architecture-graph">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          preventScrolling={false}
          onNodeClick={(_, node) =>
            setSelected(parts.find((p) => p.id === node.id)!)
          }
        >
          <Background gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <aside aria-live="polite">
        <span className="eyebrow">Conceptual architecture</span>
        <div className="architecture-buttons">
          {parts.map((p) => (
            <button
              key={p.id}
              aria-pressed={selected.id === p.id}
              onClick={() => setSelected(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <h3>{selected.label}</h3>
        <p>{selected.description}</p>
      </aside>
    </div>
  );
}
