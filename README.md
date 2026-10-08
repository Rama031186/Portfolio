# TARUN // TRACE

A frontend-only React portfolio built with TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, React Flow, Zustand and TanStack Query.

## Run locally

Requires Node.js 20.18 or newer.

```sh
npm install
npm run dev
```

## Verify

```sh
npm run build
npx playwright test
```

Browser checks use installed Google Chrome and automatically start the production preview. They cover routes, responsive overflow, keyboard commands, trace selection, skills, theme persistence, and automated WCAG checks.

## Content

Edit `src/data/portfolio.ts`. All experience and credential entries are supplied mock profile content, not independently verified records. Project diagrams and durations are illustrative. No production telemetry is collected.

Add a resume PDF to `public/`, then set `profile.resume` to its root-relative URL. Set `profile.email`, `profile.source`, project `repository` / `demo`, and credential `url` values when supplied. Missing links are visibly unavailable; they never point to fabricated destinations. Secondary credentials can be configured through `secondaryCredentials`.

## Frontend scope

The app has no authentication, backend endpoints, database, AI inference or deployment setup. QueryClient is configured for future work but no remote queries run. Zustand contains UI selection state only. Fonts are served locally.

Desktop skills and project architecture use React Flow, with equivalent HTML controls and simplified mobile views. Trace spans, project stages and the command palette are keyboard accessible. Theme preference persists in local storage. Motion respects the operating system reduced-motion setting.

Deployment and SPA route rewrites are intentionally left for a later phase.
