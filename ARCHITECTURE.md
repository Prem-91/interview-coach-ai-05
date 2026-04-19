# Architecture Overview

This document describes the project structure and data flow for Interview Coach AI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router v6 |
| Server State | TanStack Query (React Query) |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library |

## Project Structure

```
interview-coach-ai-05/
├── public/               # Static assets served as-is
├── src/
│   ├── components/       # Shared React components
│   │   └── ui/           # shadcn/ui primitives (Button, Card, etc.)
│   ├── hooks/            # Custom React hooks
│   │   ├── use-mobile.tsx    # Responsive breakpoint detection
│   │   ├── use-session.ts    # Interview session state
│   │   └── use-toast.ts      # Toast notification helper
│   ├── lib/              # Utility functions and helpers
│   │   └── utils.ts          # Tailwind class merging (cn helper)
│   ├── pages/            # Route-level page components
│   │   ├── Index.tsx         # Landing / home page
│   │   ├── Documentation.tsx # App documentation page
│   │   └── NotFound.tsx      # 404 fallback page
│   ├── test/             # Test setup and utilities
│   ├── App.tsx           # Root component with router setup
│   ├── App.css           # Global app styles
│   ├── index.css         # Tailwind base / global CSS
│   └── main.tsx          # Application entry point
├── .env.example          # Required environment variables template
├── .github/              # GitHub configuration
│   ├── workflows/        # GitHub Actions CI/CD pipelines
│   └── ISSUE_TEMPLATE/   # Issue templates
├── components.json       # shadcn/ui configuration
├── eslint.config.js      # ESLint configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration (root)
├── tsconfig.app.json     # TypeScript configuration (app source)
├── tsconfig.node.json    # TypeScript configuration (Vite config)
├── vite.config.ts        # Vite bundler configuration
└── vitest.config.ts      # Vitest test runner configuration
```

## Data Flow

```
User Interaction
      │
      ▼
React Component (src/pages or src/components)
      │
      ├─► Custom Hook (src/hooks)
      │         │
      │         └─► TanStack Query (data fetching / caching)
      │                   │
      │                   └─► External AI API
      │
      └─► Local State (useState / useReducer)
```

### Key Data Flows

1. **Interview Session**
   - User selects job role and difficulty on the home page
   - `use-session` hook manages session state (questions, answers, score)
   - AI responses are fetched via TanStack Query and cached to avoid redundant requests

2. **Feedback & Analytics**
   - After each answer, feedback is derived from the AI response
   - Session results are stored in component state and displayed on the analytics dashboard

3. **Routing**
   - React Router v6 handles client-side navigation
   - Routes are defined in `App.tsx`
   - A catch-all `*` route renders the `NotFound` page

## Configuration

| File | Purpose |
|------|---------|
| `.env` | Local environment variables (not committed) |
| `.env.example` | Template for required environment variables |
| `vite.config.ts` | Dev server, build output, and plugin configuration |
| `tailwind.config.ts` | Custom theme tokens, content paths |
| `components.json` | shadcn/ui component registry settings |

## CI/CD

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push and pull request:

1. **Lint** – ESLint checks code quality
2. **Type-check** – TypeScript compiler validates types
3. **Test** – Vitest runs the test suite
4. **Build** – Vite compiles the production bundle
5. **Deploy** *(optional)* – Deploys to Vercel when `VERCEL_TOKEN` is configured
