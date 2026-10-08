import { ArrowUpRight, Check, CornerDownRight } from "lucide-react";
import type { TraceSpan } from "../../types/portfolio";
export function TraceTimeline({ spans }: { spans: TraceSpan[] }) {
  return (
    <div className="trace-overview">
      <div className="trace-root">
        <CornerDownRight size={16} />
        <span>explore_engineer</span>
        <span className="muted">6 spans</span>
      </div>
      <div className="trace-rows">
        {spans.map((span, i) => (
          <a
            key={span.id}
            href={`#${span.targetSection}`}
            className={`trace-row ${span.status}`}
            aria-current={span.status === "active" ? "location" : undefined}
          >
            <span className="trace-point">
              {span.status === "complete" ? (
                <Check size={10} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <span className="trace-human">{span.displayLabel}</span>
            <code>{span.technicalLabel}</code>
            <span className="row-status">{span.status}</span>
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}
