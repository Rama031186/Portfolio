import type { Project, TraceSpan } from "../types/portfolio";
const definitions = [
  {
    slug: "payment-compliance",
    name: "Payment Compliance Engine",
    category: "Enterprise Backend / FinTech",
    subtitle: "Reliable decisions. Distributed by design.",
    description:
      "A compliance processing system combining rule-based logic and ML-assisted evaluation, built around Java and Spring Boot.",
    stack: [
      "Java",
      "Spring Boot",
      "REST",
      "gRPC",
      "PostgreSQL",
      "Redis",
      "Microservices",
    ],
    steps: [
      "payment_request",
      "validation",
      "rule_engine",
      "ml_evaluation",
      "compliance_result",
    ],
    problem:
      "Payment compliance requires consistent validation and understandable decisions across distributed services.",
    solution:
      "A conceptual view of the Endava engineering work: Java services coordinate rule-based processing, ML-assisted evaluation, persistence and caching. Client-specific implementation details are intentionally excluded.",
    decisions: [
      "REST at the application boundary; gRPC for service communication.",
      "PostgreSQL for persistent records and Redis for caching.",
      "Separate validation, evaluation and result handling into distinct responsibilities.",
    ],
    challenges:
      "Balancing service boundaries, data consistency and explainable compliance outcomes.",
    repository: null,
    demo: null,
  },
  {
    slug: "hisaab-ai",
    name: "Hisaab.AI",
    category: "Applied AI / Cloud",
    subtitle: "Agentic Receipt & Expense Automation",
    description:
      "From receipt to insight. An agentic system with visual extraction, multilingual interaction and Google Wallet integration.",
    stack: [
      "Python",
      "Gemini Vision",
      "Google ADK",
      "Docker",
      "Cloud Run",
      "Wallet API",
      "Masumi",
    ],
    steps: [
      "upload_receipt",
      "vision_extraction",
      "expense_processing",
      "agent_reasoning",
      "wallet_generation",
    ],
    problem:
      "Receipts turn everyday spending into unstructured information that is difficult to organize and use.",
    solution:
      "Gemini Vision extracts receipt information; agent workflows normalize expenses, support multilingual interactions and create Google Wallet passes in containerized cloud infrastructure.",
    decisions: [
      "Use visual extraction to structure receipt information.",
      "Separate agent reasoning from expense normalization.",
      "Containerize the system for Cloud Run.",
    ],
    challenges:
      "Handling varied receipt layouts and maintaining useful structured data throughout the agent workflow.",
    repository: null,
    demo: null,
  },
  {
    slug: "resume-intelligence",
    name: "AI Resume Intelligence",
    category: "AI / Semantic Search",
    subtitle: "Semantic Resume Matching Engine",
    description:
      "Connecting experience to opportunity with embeddings, vector search and LLM-assisted explanations.",
    stack: [
      "Python",
      "SentenceTransformers",
      "Qdrant",
      "LangChain",
      "Flask",
      "GPT-3.5",
    ],
    steps: [
      "resume_upload",
      "document_parse",
      "embedding",
      "vector_search",
      "match_score",
      "explanation",
    ],
    problem:
      "Keyword matching misses the semantic relationship between candidate experience and job requirements.",
    solution:
      "A Flask pipeline processes resumes, creates SentenceTransformer embeddings, retrieves relevant information from Qdrant and uses LLM-assisted processing to explain matches.",
    decisions: [
      "Use embeddings to represent semantic relationships.",
      "Keep vector retrieval separate from explanation generation.",
      "Expose processing through Flask APIs.",
    ],
    challenges:
      "Preserving meaningful context through parsing and explaining the limitations of semantic match scores.",
    repository: null,
    demo: null,
  },
  {
    slug: "rag-knowledge",
    name: "RAG Knowledge Engine",
    category: "AI / Knowledge Systems",
    subtitle: "Context-aware retrieval for documents",
    description:
      "An OCR-aware retrieval pipeline for PDFs and URLs, from ingestion to contextual answers.",
    stack: ["LangChain", "ChromaDB", "Gemini", "Streamlit", "GCP"],
    steps: [
      "source_ingestion",
      "text_extraction",
      "chunking",
      "embedding",
      "retrieval",
      "generation",
    ],
    problem:
      "Useful information is often buried in documents with inconsistent formatting.",
    solution:
      "Ingest PDFs and URLs, extract text with OCR awareness, create searchable chunks and retrieve context for Gemini-powered responses.",
    decisions: [
      "Treat ingestion and retrieval as independent stages.",
      "Use ChromaDB for embedding storage.",
      "Provide a Streamlit interface for exploring sources.",
    ],
    challenges:
      "Retaining source context while choosing useful chunk boundaries.",
    repository: null,
    demo: null,
  },
];
const stageDescriptions: Record<string, string> = {
  payment_request:
    "A payment request enters the service boundary for compliance processing.",
  validation:
    "Validate the request structure and required payment fields before evaluation.",
  rule_engine: "Apply rule-based compliance logic to the validated request.",
  ml_evaluation:
    "Use ML-assisted evaluation to complement the rule-based decision.",
  compliance_result:
    "Return the compliance evaluation result to the calling service.",
  upload_receipt: "A receipt enters the expense-processing pipeline.",
  vision_extraction:
    "Gemini Vision extracts structured receipt information from the uploaded image.",
  expense_processing:
    "Normalize extracted information into structured expense data.",
  agent_reasoning:
    "Google ADK coordinates reasoning and multilingual expense interactions.",
  wallet_generation:
    "Convert processed expense information into a Google Wallet pass.",
  resume_upload:
    "A resume and job context enter the semantic matching workflow.",
  document_parse:
    "Extract resume content into text suitable for semantic processing.",
  embedding:
    "Represent extracted content as vectors for semantic comparison and retrieval.",
  vector_search:
    "Search Qdrant for semantically relevant content using the generated embeddings.",
  match_score:
    "Evaluate the semantic relationship between resume experience and job requirements.",
  explanation:
    "Use LLM-assisted processing to explain the matching result in readable language.",
  source_ingestion: "Accept PDF or URL sources into the knowledge pipeline.",
  text_extraction:
    "Extract source text with OCR-aware handling for document ingestion.",
  chunking:
    "Divide source text into retrievable passages while preserving useful context.",
  retrieval:
    "Retrieve relevant passages from ChromaDB for the current question.",
  generation:
    "Provide retrieved context to Gemini to generate a context-aware response.",
};
const projects: Project[] = definitions.map((p) => ({
  ...p,
  trace: {
    traceId: `${p.slug}.demo.001`,
    operation:
      p.slug === "hisaab-ai"
        ? "process_receipt"
        : p.slug === "resume-intelligence"
          ? "process_resume"
          : p.slug === "payment-compliance"
            ? "process_payment"
            : "retrieve_knowledge",
    status: "success",
    spans: p.steps.map((name, i) => ({
      id: String(i + 1),
      parentId: i ? String(i) : undefined,
      name,
      displayName: name
        .split("_")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(" "),
      durationMs: [42, 180, 96, 240, 68, 120][i],
      status: "success",
      description: stageDescriptions[name],
      attributes: { environment: "demo", service: p.slug },
    })),
  },
}));
export const portfolio = {
  profile: {
    name: "Tarun Mangalampalli",
    role: "Software Engineer",
    headline: "Software Engineer building intelligent systems.",
    location: "Bengaluru, India",
    focus: ["Java", "Spring Boot", "React", "AI", "Data", "Cloud"],
    github: "https://github.com/tarun261003",
    linkedin: "https://www.linkedin.com/in/tarun-mangalampalli/",
    email: null as string | null,
    resume: null as string | null,
    source: null as string | null,
  },
  navigation: [
    { label: "Work", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Credentials", id: "credentials" },
    { label: "Lab", id: "lab" },
  ],
  experience: [
    {
      id: "endava",
      company: "Endava",
      role: "Software Developer",
      location: "Bengaluru, India",
      start: "Aug 2025",
      end: "Present",
      stack: [
        "Java",
        "Spring Boot",
        "REST",
        "gRPC",
        "PostgreSQL",
        "Redis",
        "Microservices",
      ],
      summary:
        "Building backend and distributed systems for production-oriented applications.",
      events: [
        "joined_engineering_team",
        "designed_compliance_engine",
        "implemented_rest_services",
        "defined_grpc_communication",
        "integrated_postgresql",
        "introduced_caching",
      ],
    },
    {
      id: "infosys",
      company: "Infosys Springboard",
      role: "AI Engineer Intern",
      location: "Remote",
      start: "May 2024",
      end: "Jul 2024",
      stack: ["Python", "LangChain", "Qdrant", "OpenAI", "LLMs"],
      summary:
        "Applied AI experience with language models, semantic retrieval and API-driven systems.",
      events: ["explored_semantic_retrieval", "developed_ai_workflows"],
    },
  ],
  projects,
  skills: {
    Backend: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "gRPC",
      "Microservices",
      "FastAPI",
      "Flask",
      "Node.js",
    ],
    "AI / GenAI": [
      "LLMs",
      "RAG",
      "AI Agents",
      "LangChain",
      "Gemini",
      "OpenAI",
      "Google ADK",
      "TensorFlow",
      "Scikit-learn",
    ],
    Data: ["SQL", "PostgreSQL", "Redis", "Qdrant", "ChromaDB"],
    Frontend: ["React", "JavaScript", "TypeScript"],
    "Cloud / DevOps": ["GCP", "Cloud Run", "Docker", "Git", "GitHub Actions"],
  },
  credentials: [
    {
      name: "Microsoft Azure AI Engineer Associate",
      area: "Artificial intelligence",
      code: "01",
      url: null,
    },
    {
      name: "Microsoft SQL AI Developer Associate",
      area: "Data & development",
      code: "02",
      url: null,
    },
    {
      name: "Microsoft Azure Data Engineer Associate",
      area: "Data engineering",
      code: "03",
      url: null,
    },
  ] as { name: string; area: string; code: string; url: string | null }[],
  secondaryCredentials: [] as string[],
  trace: [
    {
      id: "identity",
      technicalLabel: "resolve_identity",
      displayLabel: "About",
      status: "idle",
      targetSection: "hero",
    },
    {
      id: "experience",
      technicalLabel: "inspect_experience",
      displayLabel: "Experience",
      status: "idle",
      targetSection: "experience",
    },
    {
      id: "projects",
      technicalLabel: "inspect_projects",
      displayLabel: "Projects",
      status: "idle",
      targetSection: "projects",
    },
    {
      id: "skills",
      technicalLabel: "inspect_skills",
      displayLabel: "Skills",
      status: "idle",
      targetSection: "skills",
    },
    {
      id: "credentials",
      technicalLabel: "verify_credentials",
      displayLabel: "Credentials",
      status: "idle",
      targetSection: "credentials",
    },
    {
      id: "contact",
      technicalLabel: "contact_engineer",
      displayLabel: "Contact",
      status: "idle",
      targetSection: "contact",
    },
  ] as TraceSpan[],
  lab: [
    "RAG Retrieval Visualizer",
    "JWT Flow Explorer",
    "REST vs gRPC Visualizer",
    "Embedding Similarity Explorer",
    "Cache Behaviour Simulator",
  ],
  signals: [
    "Backend Engineering",
    "Distributed Systems",
    "React",
    "Applied AI",
    "Data Systems",
    "Cloud",
  ],
};
