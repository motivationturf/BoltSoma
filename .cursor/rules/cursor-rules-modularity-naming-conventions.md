# SomaSmart EduHub - Modular Structure & Naming Conventions

## 🧠 Cursor Prompt: Enforce Modular Structure for SomaSmart EduHub

### ✅ Context

We are building *SomaSmart EduHub*, a gamified educational platform for Zambian learners with multiple game modes, lessons, AI tools (like Chisomo and LAM), user types (pupil, teacher, parent), and offline potential.
The app must scale cleanly and remain maintainable.

### ✅ Goal

Ensure modularity across the app using a clean and scalable folder structure and logic separation.

## 🗂️ Suggested Project Structure

### app/

* `layout.tsx` – App-wide layout
* `page.tsx` – Landing page
* `ai-hub/` – AI tool routes: Chisomo Chat, Study Planner, Insights, Content Studio
* `arcade/` – Game routes: Zambezi Rush, Luangwa Flip, Mulungushi Quiz, etc.
* `lessons/` – Curriculum-based routes (grade → subject → topic)
* `dashboard/` – Separate dashboards by user type (pupil, teacher, parent)

### components/

* Reusable UI components with isolated logic
  e.g., `GameCard`, `LessonViewer`, `BadgeCard`, `AIChatWindow`, `PresentationMode`

### lib/ or utils/

* Pure utility functions and helpers
  e.g.,

  * `auth.ts` – authentication/session helpers
  * `gameHelpers.ts` – score calculation, streaks
  * `lessonEngine.ts` – logic to fetch + load lessons by topic
  * `ai.ts` – shared functions to call AI APIs (OpenRouter, Ollama, etc.)

### services/

* Handle communication with APIs and models
  e.g.,

  * `lamService.ts` – logic to generate questions/lessons with LAM
  * `chisomoService.ts` – handles Chisomo prompts/responses
  * `curriculumService.ts` – fetch curriculum metadata by grade/subject
  * `db.ts` – manage connections to Postgres or offline store

### data/

* Mock or static content:

  * List of subjects, grades, topics
  * Badge metadata
  * Prompt templates for AI tools
  * Game configuration

### styles/

* Tailwind configuration, custom classes, fonts, themes

---

### ✅ Developer Instructions

* Use a **component-first approach**: Every distinct UI should be a modular component
* All **logic-heavy operations** (AI, scoring, DB, curriculum) must live in services or lib
* Use **dynamic routing** and **context-based rendering** for different user types
* Future AI tools must be **plug-and-play** without needing core rewrites
* Curriculum and lesson structure logic must be **abstracted away from UI**
* Don’t hard-code lesson content – use services to fetch/generate by grade + topic

---

### ✳️ Next Actions

1. Check if our current file structure follows this modular layout
2. Refactor any components/pages that mix logic and UI
3. Move all API interactions and AI prompts to `services/`
4. Make sure lesson generation and LAM logic can be injected dynamically
5. Prepare folders to support multi-user role logic (pupil, teacher, parent)

SomaSmart Modularity Rules & Naming Conventions

1. The Lego Rule 🧱
"Everything is a reusable block."
→ All UI should be broken into atomic, reusable components (e.g., LessonCard, GameBadge, TopicAccordion).
2. The Elevator Rule 🛗
"No logic trapped in the UI."
→ Business logic must live in lib/ or services/, not inside components or pages.
3. The Curriculum Funnel Rule 📚
"Grade → Subject → Topic is sacred."
→ The lesson architecture must follow this structure and never be hardcoded. This rule drives curriculum navigation.
4. The Clean Doors Rule 🚪
"Each user enters through their door."
→ Pupil, Teacher, and Parent dashboards should be modular, with isolated access logic and routing paths (/dashboard/pupil, /dashboard/teacher, etc.).
5. The Smart Brain Rule 🧠
"All AI tools live in their own playground."
→ AI features (Chisomo, LAM, Planner) must be built as isolated modules with clear interfaces and minimal coupling.
6. The Airtight Service Rule 🧯
"No component calls the API directly."
→ API logic and AI prompts must be centralized in services/. Components call services only.
7. The Offline-First Rule 🌍
"Nothing breaks when the net drops."
→ When possible, build features to degrade gracefully or cache using service workers/local storage.
8. The Plug-and-Play Rule 🔌
"New tools should fit like Lego."
→ All new games, AI tools, or lessons should follow existing patterns (e.g., route, service, component, data).
9. The Prompt Router Rule 🧭
"Prompts are assets, not buried in code."
→ All AI prompt templates should live in a dedicated folder (/data/prompts) for easy updates and experimentation.
10. The Identity Rule 👤
"User context drives experience."
→ Never mix logic for different user types. Each user type’s features should depend on role-based context.

Bonus: Suggested Folder Nicknames
Folder Nickname Purpose
components/ 🧱 Blocks Atomic, reusable UI parts
lib/ 🧠 Brain Pure functions, logic-only modules
services/ 📡 Bridge APIs, LAM, AI models, DB interactions
data/ 📦 Crates Static assets, prompts, badge configs
app/lessons/ 📚 Funnel Grade → Subject → Topic learning tree
app/ai-hub/ 🤖 Lab Chisomo, LAM, Planner, etc.
