# Project Architecture Blueprint

*Generated: 2025-08-10*

---

## 1. Architecture Detection and Analysis

**Technology Stacks Detected:**
- **Node.js** (TypeScript)
- **Next.js** (React-based framework)
- **Tailwind CSS** (utility-first CSS framework)
- **Drizzle ORM** (database abstraction)
- **PostgreSQL** (database, inferred from Drizzle and migration files)
- **Docker Compose** (container orchestration)

**Frameworks & Patterns:**
- Next.js conventions (app directory, API routes)
- Modular folder structure (app, components, lib, docs, notes)
- Use of environment configuration and migration scripts

**Architectural Pattern:**
- **Layered/Modular Monolith**
- Clear separation between UI, API, data access, and utility layers

---

## 2. Architectural Overview

The project follows a modular monolithic architecture using Next.js for both frontend and backend (API routes). The codebase is organized by feature and responsibility, with clear boundaries between UI components, API logic, and data access. Guiding principles include separation of concerns, reusability, and extensibility.

---

## 3. Architecture Visualization

**High-Level Overview:**
- **App Layer:** Next.js pages, layouts, and API routes
- **Component Layer:** Reusable UI components (in `components/ui`)
- **Lib Layer:** Shared utilities, environment config, actions, AI, and database logic
- **Data Layer:** Drizzle ORM, migrations, and schema definitions

**Component Interactions:**
- App layer invokes UI components and API routes
- API routes use lib actions and database modules
- Database modules interact with PostgreSQL via Drizzle

**Data Flow:**
- User → UI → API Route → Action/Lib → DB → Response → UI

---

## 4. Core Architectural Components

### App Layer
- **Purpose:** Entry point for UI and API
- **Structure:** `app/` directory with pages, layouts, and API routes
- **Interaction:** Uses components and lib actions
- **Evolution:** New pages/routes added as new features

### Component Layer
- **Purpose:** Reusable UI elements
- **Structure:** `components/ui/` with atomic components (button, card, input, etc.)
- **Interaction:** Used by app pages/layouts
- **Evolution:** New components added for new UI needs

### Lib Layer
- **Purpose:** Shared logic and utilities
- **Structure:** `lib/` with subfolders for env, utils, actions, ai, db
- **Interaction:** Used by both app and API routes
- **Evolution:** Extend with new utilities or actions

### Data Layer
- **Purpose:** Data persistence and schema
- **Structure:** `lib/db/` with Drizzle config, migrations, and schema
- **Interaction:** Used by lib actions and API routes
- **Evolution:** New migrations and schema updates as data model evolves

---

## 5. Architectural Layers and Dependencies

- **App Layer** depends on **Component** and **Lib** layers
- **Lib Layer** depends on **Data Layer** for persistence
- **No circular dependencies** detected
- **Dependency injection** is implicit via module imports

---

## 6. Data Architecture

- **Domain Model:** Defined in `lib/db/schema/`
- **Entity Relationships:** Managed via Drizzle ORM
- **Data Access:** Encapsulated in `lib/db/` and `lib/actions/`
- **Migrations:** SQL files in `lib/db/migrations/`
- **Validation:** Likely handled in actions or API routes

---

## 7. Cross-Cutting Concerns Implementation

- **Authentication & Authorization:** Not explicitly present; to be implemented in API routes or middleware
- **Error Handling:** To be handled in API routes and actions
- **Logging & Monitoring:** Not present; can be added via middleware or external services
- **Validation:** Input validation to be implemented in actions or API routes
- **Configuration Management:** Managed via `lib/env.mjs` and environment variables

---

## 8. Service Communication Patterns

- **Internal Communication:** Function/module imports
- **External Communication:** API routes (RESTful endpoints)
- **Protocols:** HTTP/HTTPS
- **No microservices or async messaging detected**

---

## 9. Technology-Specific Architectural Patterns

### Node.js/Next.js
- File-based routing (app/pages/api)
- API routes for backend logic
- Environment config via `.env` and `lib/env.mjs`
- Modular utility and action pattern

### React
- Functional components in `components/ui/`
- Composition and reuse of UI elements
- State management likely local or via React context (not detected in codebase)

---

## 10. Implementation Patterns

- **Interface Design:** TypeScript interfaces/types for props and data models
- **Service Implementation:** Actions in `lib/actions/` encapsulate business logic
- **Repository Pattern:** Drizzle ORM abstracts DB access
- **Controller/API Pattern:** API routes in `app/api/`
- **Domain Model:** Defined in `lib/db/schema/`

---

## 11. Testing Architecture

- **Testing strategy not detected** (no test files present)
- Recommend adding unit/integration tests for actions, API routes, and components

---

## 12. Deployment Architecture

- **Docker Compose** for local development and orchestration
- **Environment-specific config** via env files
- **Containerization** for app and database
- **No explicit cloud integration detected**

---

## 13. Extension and Evolution Patterns

- **Feature Addition:** Add new pages, API routes, or components in respective folders
- **Modification:** Update actions, components, or schema as needed
- **Integration:** Add new lib modules or external services as needed

---

## 14. Architectural Pattern Examples

### Layer Separation Example
```typescript
// lib/actions/resources.ts
import { db } from '../db';
export async function getResources() {
  return db.query('SELECT * FROM resources');
}
```

### Component Communication Example
```tsx
// app/page.tsx
import { Badge } from '../components/ui/badge';
export default function Home() {
  return <Badge>Welcome</Badge>;
}
```

---

## 15. Architecture Governance

- **Consistency:** Enforced by folder structure and Next.js conventions
- **Automated Checks:** Not detected; recommend adding linting and type checking
- **Documentation:** `README.md`, `GUIDE.md`, and this blueprint

---

## 16. Blueprint for New Development

- **Workflow:**
  - Add new features in `app/`, `components/`, or `lib/` as appropriate
  - Use TypeScript for type safety
  - Follow existing folder and naming conventions
  - Add migrations for DB changes
- **Templates:**
  - Use existing components and actions as templates
- **Pitfalls:**
  - Avoid mixing concerns between layers
  - Keep business logic out of UI components
  - Ensure DB migrations are in sync with schema

---

*This blueprint was generated on 2025-08-10. Update as the architecture evolves.*
