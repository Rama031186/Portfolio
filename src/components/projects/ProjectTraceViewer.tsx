import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import type { ProjectTrace } from "../../types/portfolio";
export function ProjectTraceViewer({ trace }: { trace: ProjectTrace }) {
  const [selected, setSelected] = useState(trace.spans[0].id);
  const node = trace.spans.find((s) => s.id === selected)!;
  const total = trace.spans.reduce((n, s) => n + (s.durationMs || 0), 0);
  let elapsed = 0;
  return (
    <div className="trace-viewer">
      <div className="viewer-top">
        <code>{trace.operation}</code>
        <span className="status">
          <Check size={13} />
          Success · illustrative trace
        </span>
      </div>
      <div className="viewer-columns">
        <div className="trace-tree">
          <div className="eyebrow">Trace tree</div>
          {trace.spans.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={selected === s.id ? "selected" : ""}
              aria-pressed={selected === s.id}
            >
              <ChevronRight size={12} />
              <span>{s.displayName}</span>
              <Check size={12} />
            </button>
          ))}
        </div>
        <div className="waterfall">
          <div className="eyebrow">
            Timeline <span>{total} ms / mock</span>
          </div>
          {trace.spans.map((s) => {
            const start = elapsed;
            elapsed += s.durationMs || 0;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                aria-label={`Inspect ${s.displayName}, ${s.durationMs} milliseconds`}
                aria-pressed={selected === s.id}
                className={selected === s.id ? "selected" : ""}
              >
                <span className="mobile-label">{s.displayName}</span>
                <span className="bar-track">
                  <span
                    className="duration-bar"
                    style={{
                      marginLeft: `${(start / total) * 75}%`,
                      width: `${((s.durationMs || 0) / total) * 75}%`,
                    }}
                  />
                  <span>{s.durationMs} ms</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="span-details" aria-live="polite">
          <div className="eyebrow">Span details</div>
          <h4>{node.displayName}</h4>
          <code>{node.name}</code>
          <p>{node.description}</p>
          <dl>
            <dt>Status</dt>
            <dd>Success</dd>
            <dt>Duration</dt>
            <dd>{node.durationMs} ms (mock)</dd>
            {Object.entries(node.attributes || {}).map(([k, v]) => (
              <div className="contents" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="viewer-bottom">
        <code>{trace.traceId}</code>
        <span>Static demo · no live requests</span>
      </div>
    </div>
  );
}
