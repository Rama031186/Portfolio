export type TraceSpan = {
  id: string;
  technicalLabel: string;
  displayLabel: string;
  status: "idle" | "active" | "complete";
  targetSection: string;
};
export type TraceNode = {
  id: string;
  parentId?: string;
  name: string;
  displayName: string;
  durationMs?: number;
  status: "success" | "warning" | "error";
  description: string;
  attributes?: Record<string, string>;
};
export type ProjectTrace = {
  traceId: string;
  operation: string;
  status: "success" | "warning" | "error";
  spans: TraceNode[];
};
export type Project = {
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  stack: string[];
  steps: string[];
  problem: string;
  solution: string;
  decisions: string[];
  challenges: string;
  repository: string | null;
  demo: string | null;
  trace: ProjectTrace;
};
