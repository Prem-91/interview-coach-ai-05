# Contributing to Interview Coach AI

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for everyone.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/interview-coach-ai-05.git
   cd interview-coach-ai-05
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Copy environment variables**:
   ```bash
   cp .env.example .env
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch from `main` for your feature or fix:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
2. Make your changes, writing tests where applicable
3. Run the test suite to ensure nothing is broken:
   ```bash
   npm run test
   ```
4. Run the linter:
   ```bash
   npm run lint
   ```
5. Run the TypeScript compiler:
   ```bash
   npx tsc --noEmit
   ```
6. Commit your changes following the [commit message guidelines](#commit-message-guidelines)
7. Push your branch and open a Pull Request

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:**
- `feat` – A new feature
- `fix` – A bug fix
- `docs` – Documentation only changes
- `style` – Formatting changes (no logic change)
- `refactor` – Code refactoring without feature change or bug fix
- `test` – Adding or updating tests
- `chore` – Build process or auxiliary tool changes

**Examples:**
```
feat(interview): add timer to mock interview session
fix(feedback): correct score calculation for technical questions
docs(readme): update installation instructions
```

## Pull Request Process

1. Ensure all checks pass (lint, type-check, tests, build)
2. Update documentation if your changes affect public-facing behaviour
3. Fill in the pull request template completely
4. Request a review from a maintainer
5. Address any review feedback promptly
6. A maintainer will merge your PR once approved

## Coding Standards

- **TypeScript**: All new code must be written in TypeScript with proper types. Avoid `any`.
- **React**: Use functional components and hooks. Do not use class components.
- **Formatting**: The project uses ESLint for linting. Run `npm run lint` before committing.
- **Component structure**: Place reusable UI components in `src/components/ui`, feature components in `src/components`, and pages in `src/pages`.
- **Imports**: Use absolute imports where possible (configured via `tsconfig`).

## Reporting Issues

Use the GitHub issue templates to report bugs or request features. Before opening a new issue, please search existing issues to avoid duplicates.

When reporting a bug, include:
- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Browser/OS information
- Screenshots if applicable
